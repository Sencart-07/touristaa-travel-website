import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from '@/lib/adminAuth';

async function requireAdmin() {
  const store = await cookies();
  return isAdminTokenValid(store.get(ADMIN_COOKIE_NAME)?.value);
}

function quoteNumber() {
  return `TT-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Booking fetch failed:', error);
    return NextResponse.json({ error: 'Unable to load bookings.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.customerName?.trim() || !body.phone?.trim()) return NextResponse.json({ error: 'Customer name and phone are required.' }, { status: 400 });
    await connectDB();
    const booking = await Booking.create({ ...body, quotationNumber: body.quotationNumber || quoteNumber() });
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json({ error: 'Unable to create booking.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ error: 'Booking id is required.' }, { status: 400 });
    await connectDB();
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!booking) return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking update failed:', error);
    return NextResponse.json({ error: 'Unable to update booking.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Booking id is required.' }, { status: 400 });
    await connectDB();
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking delete failed:', error);
    return NextResponse.json({ error: 'Unable to delete booking.' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from '@/lib/adminAuth';

async function requireAdmin() {
  const cookieStore = await cookies();
  return isAdminTokenValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Enquiry fetch failed:', error);
    return NextResponse.json({ error: 'Unable to load enquiries.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ error: 'Enquiry id is required.' }, { status: 400 });
    await connectDB();
    const item = await Enquiry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    return NextResponse.json({ success: true, enquiry: item });
  } catch (error) {
    console.error('Enquiry update failed:', error);
    return NextResponse.json({ error: 'Unable to update enquiry.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Enquiry id is required.' }, { status: 400 });
    await connectDB();
    const item = await Enquiry.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry delete failed:', error);
    return NextResponse.json({ error: 'Unable to delete enquiry.' }, { status: 500 });
  }
}

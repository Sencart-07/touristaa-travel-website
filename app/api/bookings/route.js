import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.customerName?.trim() || !body.phone?.trim()) return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    await connectDB();
    const booking = await Booking.create({
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || '',
      packageId: body.packageId || undefined,
      packageName: body.packageName || '',
      destination: body.destination || '',
      travelDate: body.travelDate || undefined,
      travellers: Number(body.travellers) || 1,
      duration: body.duration || '',
      amount: 0,
      status: 'quotation',
      paymentStatus: 'unpaid',
      notes: body.notes || '',
      quotationNumber: `TT-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`
    });
    return NextResponse.json({ success: true, id: booking._id, quotationNumber: booking.quotationNumber }, { status: 201 });
  } catch (error) {
    console.error('Public booking request failed:', error);
    return NextResponse.json({ error: 'Unable to submit booking request right now.' }, { status: 500 });
  }
}

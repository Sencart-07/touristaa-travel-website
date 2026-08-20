import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, destination, message } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    await connectDB();
    const enquiry = await Enquiry.create({ name, phone, email, destination, message });

    return NextResponse.json({ success: true, id: enquiry._id }, { status: 201 });
  } catch (error) {
    console.error('Enquiry creation failed:', error);
    return NextResponse.json({ error: 'Unable to submit enquiry right now.' }, { status: 500 });
  }
}

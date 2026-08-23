import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import TourPackage from '@/models/TourPackage';
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from '@/lib/adminAuth';

async function requireAdmin() {
  const cookieStore = await cookies();
  return isAdminTokenValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    await connectDB();
    const packages = await TourPackage.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Package fetch failed:', error);
    return NextResponse.json({ error: 'Unable to fetch packages.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const body = await request.json();
    const { name, destination, duration, price, description, image, category, featured, active } = body;
    if (!name?.trim() || !destination?.trim() || !duration?.trim() || price === undefined) {
      return NextResponse.json({ error: 'Name, destination, duration and price are required.' }, { status: 400 });
    }
    await connectDB();
    const item = await TourPackage.create({ name, destination, duration, price, description, image, category, featured, active: active !== false });
    return NextResponse.json({ success: true, package: item }, { status: 201 });
  } catch (error) {
    console.error('Package creation failed:', error);
    return NextResponse.json({ error: 'Unable to create package.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ error: 'Package id is required.' }, { status: 400 });
    await connectDB();
    const item = await TourPackage.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Package not found.' }, { status: 404 });
    return NextResponse.json({ success: true, package: item });
  } catch (error) {
    console.error('Package update failed:', error);
    return NextResponse.json({ error: 'Unable to update package.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Package id is required.' }, { status: 400 });
    await connectDB();
    const item = await TourPackage.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'Package not found.' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Package delete failed:', error);
    return NextResponse.json({ error: 'Unable to delete package.' }, { status: 500 });
  }
}

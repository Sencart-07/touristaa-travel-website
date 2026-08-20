import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TourPackage from '@/models/TourPackage';

export async function GET(){
  try{await connectDB();const packages=await TourPackage.find({}).sort({createdAt:-1}).lean();return NextResponse.json({packages});}
  catch(error){console.error(error);return NextResponse.json({error:'Unable to load packages.'},{status:500});}
}
export async function POST(request){
  try{const body=await request.json();if(!body.title?.trim())return NextResponse.json({error:'Package title is required.'},{status:400});await connectDB();const item=await TourPackage.create(body);return NextResponse.json({success:true,package:item},{status:201});}
  catch(error){console.error(error);return NextResponse.json({error:'Unable to create package.'},{status:500});}
}
export async function PUT(request){
  try{const {id,...data}=await request.json();if(!id)return NextResponse.json({error:'Package id is required.'},{status:400});await connectDB();const item=await TourPackage.findByIdAndUpdate(id,data,{new:true,runValidators:true});if(!item)return NextResponse.json({error:'Package not found.'},{status:404});return NextResponse.json({success:true,package:item});}
  catch(error){console.error(error);return NextResponse.json({error:'Unable to update package.'},{status:500});}
}
export async function DELETE(request){
  try{const {id}=await request.json();if(!id)return NextResponse.json({error:'Package id is required.'},{status:400});await connectDB();await TourPackage.findByIdAndDelete(id);return NextResponse.json({success:true});}
  catch(error){console.error(error);return NextResponse.json({error:'Unable to delete package.'},{status:500});}
}

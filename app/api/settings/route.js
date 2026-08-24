import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

const fallback={
 companyName:'Touristaa Travel Company',phone:'6387200498',email:'touristaaofficial@gmail.com',address:'Near Maharishi Valmiki International Airport, Ayodhya, Uttar Pradesh',
 gallery:[],services:[],testimonials:[],faqs:[],stats:[],seo:{title:'Touristaa Travel Company | Ayodhya Tours & Travel',description:'Touristaa Travel Company offers customized tours, holiday packages and travel services from Ayodhya.',keywords:''}
};

export async function GET(){try{await connectDB();const settings=await SiteSettings.findOne({key:'main'}).lean();return NextResponse.json({...fallback,...(settings||{}),seo:{...fallback.seo,...(settings?.seo||{})}})}catch(e){console.error(e);return NextResponse.json(fallback)}}

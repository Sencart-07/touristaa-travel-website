import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminToken } from '@/lib/adminAuth';

const ADMIN_EMAIL='touristaaofficial@gmail.com';
export async function POST(request){
 try{
  const {email,password}=await request.json();
  if(email?.trim().toLowerCase()!==ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||password!==process.env.ADMIN_PASSWORD){
   return NextResponse.json({error:'Invalid admin email or password.'},{status:401});
  }
  const response=NextResponse.json({success:true});
  response.cookies.set(ADMIN_COOKIE_NAME,createAdminToken(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24});
  return response;
 }catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
}

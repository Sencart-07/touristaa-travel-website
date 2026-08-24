import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from '@/lib/adminAuth';

async function requireAdmin(){const c=await cookies();return isAdminTokenValid(c.get(ADMIN_COOKIE_NAME)?.value)}
const defaults={
 companyName:'Touristaa Travel Company',phone:'6387200498',email:'touristaaofficial@gmail.com',address:'Near Maharishi Valmiki International Airport, Ayodhya, Uttar Pradesh',
 heroEyebrow:'Explore the World With Us',heroTitle:'DISCOVER. EXPLORE. EXPERIENCE.',heroDescription:'Touristaa Travel Company is your trusted travel partner for memorable journeys, customized tours and comfortable travel experiences.',
 aboutTitle:'Your journey, our responsibility.',aboutText:'Touristaa Travel Company creates memorable, safe and hassle-free travel experiences. We plan domestic and international holidays, educational tours, honeymoon trips, family vacations and corporate travel with customer-focused support from enquiry to return.',
 mapQuery:'Near Maharishi Valmiki International Airport, Ayodhya, Uttar Pradesh',
 services:[{icon:'✈️',title:'Domestic Tours',description:'Explore India with carefully planned itineraries and comfortable travel.'},{icon:'🌍',title:'International Tours',description:'Discover destinations worldwide with customized travel packages.'},{icon:'🎓',title:'Educational Tours',description:'Safe, engaging tours for schools, colleges and student groups.'},{icon:'💍',title:'Honeymoon Packages',description:'Romantic getaways designed around your dates and preferences.'},{icon:'👨‍👩‍👧',title:'Family Trips',description:'Flexible family holidays with comfortable stays and transport.'},{icon:'🏢',title:'Corporate Tours',description:'Reliable group travel, retreats and corporate arrangements.'}],
 gallery:[
  {src:'/gallery-touristaa-01.jpg',title:'Touristaa customer group at Ayodhya',kind:'Touristaa customer photo',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ayodhya_Diwali_2021_01.jpg?width=1400',title:'Ayodhya Deepotsav at Ram Ki Paidi',kind:'Deepotsav',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ram_Ki_Paidi_waterfront.jpg?width=1400',title:'Ram Ki Paidi waterfront in daylight',kind:'Ghat • Daytime',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Saryu_Ghat_Arti.jpg?width=1400',title:'Saryu Ghat evening Aarti',kind:'Ghat • Aarti',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Ram_Janambhoomi_Mandir,_Ayodhya.jpg?width=1400',title:'Shri Ram Janambhoomi Mandir',kind:'Ram Mandir',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ayodhya_Ram_Lalla_Virajman_Sarkar.jpg?width=1200',title:'Ram Lalla at Ram Mandir',kind:'Ram Lalla',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Garhi_Temple,_a_major_religious_site_in_Ayodhya_utter_pradesh.jpg?width=1400',title:'Hanuman Garhi Temple',kind:'Ayodhya highlight',active:true},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Kanak_Bhawan.jpg?width=1200',title:'Kanak Bhawan Temple',kind:'Ayodhya highlight',active:true}
 ],
 testimonials:[],faqs:[],stats:[{value:'1000+',label:'Happy Customers'},{value:'5+',label:'Years of Experience'},{value:'24/7',label:'Support'}],
 seo:{title:'Touristaa Travel Company | Ayodhya Tours & Travel',description:'Touristaa Travel Company offers customized tours, holiday packages and travel services from Ayodhya.',keywords:'Ayodhya tour, travel agency Ayodhya, Touristaa, tour packages'}
};

export async function GET(){if(!(await requireAdmin()))return NextResponse.json({error:'Unauthorized.'},{status:401});try{await connectDB();let settings=await SiteSettings.findOne({key:'main'}).lean();if(!settings)settings=await SiteSettings.create({key:'main',...defaults});else{const patch={};for(const k of ['gallery','testimonials','faqs','stats','seo'])if(settings[k]===undefined)patch[k]=defaults[k];if(Object.keys(patch).length)settings=await SiteSettings.findOneAndUpdate({key:'main'},{$set:patch},{new:true}).lean()}return NextResponse.json({settings})}catch(e){console.error(e);return NextResponse.json({error:'Unable to load website settings.'},{status:500})}}
export async function PUT(request){if(!(await requireAdmin()))return NextResponse.json({error:'Unauthorized.'},{status:401});try{const data=await request.json();delete data._id;delete data.key;await connectDB();const settings=await SiteSettings.findOneAndUpdate({key:'main'},{$set:data},{new:true,upsert:true,runValidators:true});return NextResponse.json({success:true,settings})}catch(e){console.error(e);return NextResponse.json({error:'Unable to save website settings.'},{status:500})}}

'use client';
import {useEffect,useState} from 'react';

const PHONE='6387200498';
const WHATSAPP=`https://wa.me/916387200498?text=${encodeURIComponent('Hello Touristaa Travel Company, I would like to enquire about this tour package.')}`;

export default function PackageDetails({params}){
 const [pkg,setPkg]=useState(null),[loading,setLoading]=useState(true);
 useEffect(()=>{Promise.resolve(params).then(p=>fetch('/api/packages').then(r=>r.json()).then(data=>{setPkg((data.packages||[]).find(x=>String(x._id)===String(p.id))||null)}).catch(()=>{}).finally(()=>setLoading(false)))},[params]);
 if(loading)return <main className="section"><div className="container"><h2>Loading package...</h2></div></main>;
 if(!pkg)return <main className="section"><div className="container"><h2>Tour package not found</h2><a className="btn primary" href="/">Back to website</a></div></main>;
 return <>
  <header className="nav"><div className="container navInner"><a href="/" className="logoWrap"><img src="/touristaa-logo.svg" alt="Touristaa Travel Company" className="logo"/></a><nav className="links"><a href="/">Home</a><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/#contact">Contact</a></nav><a className="btn primary navBtn" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp Enquiry</a></div></header>
  <main>
   <section className="section packagesSection"><div className="container">
    <a href="/#packages" className="outlineBtn">← Back to Packages</a>
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.05fr) minmax(0,1fr)',gap:'32px',marginTop:'28px',alignItems:'start'}}>
     <div>{pkg.image&&<img src={pkg.image} alt={pkg.name} style={{width:'100%',maxHeight:520,objectFit:'cover',borderRadius:22}}/>}</div>
     <div className="aboutBand" style={{padding:'28px',borderRadius:22}}><div className="eyebrow">Tour <span>Package</span></div><h1>{pkg.name}</h1><p><strong>📍 Destination:</strong> {pkg.destination}</p><p><strong>◷ Duration:</strong> {pkg.duration}</p><p><strong>💰 Price:</strong> ₹{Number(pkg.price||0).toLocaleString('en-IN')} / Person</p><p><strong>Category:</strong> {pkg.category}</p><a className="btn primary" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp Enquiry</a><a className="btn lightBtn" href={`tel:+91${PHONE}`} style={{marginLeft:10}}>📞 Call Now</a></div>
    </div>
    <article className="table" style={{marginTop:32}}><div className="eyebrow">Complete <span>Package Details</span></div><h2>Itinerary, inclusions & important information</h2>{pkg.description?<div style={{whiteSpace:'pre-wrap',lineHeight:1.85,fontSize:'1.05rem'}}>{pkg.description}</div>:<p>Detailed itinerary and inclusions will be shared by Touristaa Travel Company. Contact us for a customized plan.</p>}</article>
   </div></section>
  </main>
  <footer className="footer"><div className="container footerGrid"><div><img src="/touristaa-logo.svg" alt="Touristaa Travel Company" className="footerLogo"/><p>Affordable, safe and comfortable travel experiences from Ayodhya.</p></div><div><h4>Quick Links</h4><a href="/">Home</a><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/#contact">Contact</a></div><div><h4>Contact</h4><a href={`tel:+91${PHONE}`}>{PHONE}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="copyright">© 2026 Touristaa Travel Company. All rights reserved.</div></footer>
 </>
}

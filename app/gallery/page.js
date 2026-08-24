'use client';
import {useEffect,useState} from 'react';

const PHONE='6387200498',PHONE_DISPLAY='+91 63872 00498',EMAIL='touristaaofficial@gmail.com';
const WHATSAPP=`https://wa.me/916387200498?text=${encodeURIComponent('Hello Touristaa Travel Company, I would like to enquire about a tour package.')}`;
const fallback=[
 {src:'/gallery-touristaa-01.jpg',title:'Touristaa customer group at Ayodhya',kind:'Touristaa customer photo'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ayodhya_Diwali_2021_01.jpg?width=1400',title:'Ayodhya Deepotsav at Ram Ki Paidi',kind:'Deepotsav'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ram_Ki_Paidi_waterfront.jpg?width=1400',title:'Ram Ki Paidi waterfront in daylight',kind:'Ghat • Daytime'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Saryu_Ghat_Arti.jpg?width=1400',title:'Saryu Ghat evening Aarti',kind:'Ghat • Aarti'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Ram_Janambhoomi_Mandir,_Ayodhya.jpg?width=1400',title:'Shri Ram Janambhoomi Mandir',kind:'Ram Mandir'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ayodhya_Ram_Lalla_Virajman_Sarkar.jpg?width=1200',title:'Ram Lalla at Ram Mandir',kind:'Ram Lalla'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Garhi_Temple,_a_major_religious_site_in_Ayodhya_utter_pradesh.jpg?width=1400',title:'Hanuman Garhi Temple',kind:'Ayodhya highlight'},
 {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Kanak_Bhawan.jpg?width=1200',title:'Kanak Bhawan Temple',kind:'Ayodhya highlight'}
];

export default function GalleryPage(){
 const [gallery,setGallery]=useState(fallback);
 useEffect(()=>{fetch('/api/settings').then(r=>r.json()).then(d=>{const g=(d.gallery||[]).filter(x=>x.active!==false&&x.src);if(g.length)setGallery(g)}).catch(()=>{})},[]);
 return <><div className="topbar"><div className="container topbarInner"><span>📞 <a href={`tel:+91${PHONE}`}>{PHONE_DISPLAY}</a> &nbsp; | &nbsp; ✉️ <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span><span>Touristaa Travel Company • Ayodhya</span></div></div>
 <header className="nav"><div className="container navInner"><a href="/" className="logoWrap"><img src="/touristaa-logo.svg" alt="Touristaa Travel Company" className="logo"/></a><nav className="links"><a href="/">Home</a><a href="/#about">About Us</a><a href="/#packages">Tour Packages</a><a href="/#services">Services</a><a href="/gallery">Gallery</a><a href="/#contact">Contact Us</a></nav><a className="btn primary navBtn" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp Enquiry</a></div></header>
 <main><section className="section" style={{paddingTop:'56px'}}><div className="container"><div className="titleRow"><div><div className="eyebrow">Touristaa <span>Gallery</span></div><h1 style={{marginBottom:'12px'}}>Moments from Ayodhya & our journeys</h1><p className="sectionIntro">Customer memories, Deepotsav, Saryu Ghat, Aarti, Ram Mandir and Ayodhya highlights.</p></div><a className="outlineBtn" href="/">← Back to Home</a></div><div className="galleryGrid" style={{marginTop:'28px'}}>{gallery.map((g,i)=><a className={`galleryItem galleryItem${(i%6)+1}`} href={g.src} target="_blank" rel="noreferrer" key={`${g.src}-${i}`}><img src={g.src} alt={g.title} loading={i<6?'eager':'lazy'}/><span><b>{g.title}</b><small>{g.kind}</small></span></a>)}</div><p className="photoCredit" style={{marginTop:'24px'}}>The gallery is managed from the Admin → Website Content → Gallery panel. Reference photos may be sourced from Wikimedia Commons; source and licensing details remain with their respective pages.</p></div></section></main>
 <a className="callFloat" href={`tel:+91${PHONE}`} aria-label="Call Touristaa">📞</a><a className="whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp Touristaa">💬</a>
 <footer className="footer"><div className="container footerGrid"><div><img src="/touristaa-logo.svg" alt="Touristaa" className="footerLogo"/><p>Affordable, safe and comfortable travel experiences from Ayodhya.</p><p>📍 Near Maharishi Valmiki International Airport, Ayodhya</p></div><div><h4>Quick Links</h4><a href="/">Home</a><a href="/#about">About Us</a><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/#contact">Contact</a></div><div><h4>Contact</h4><a href={`tel:+91${PHONE}`}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a></div><div><h4>Admin</h4><a href="/admin/login">Admin Login</a></div></div><div className="copyright">© 2026 Touristaa Travel Company. All rights reserved.</div></footer></>
}

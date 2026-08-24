'use client';
import {useEffect} from 'react';

export default function SiteContentSync(){
 useEffect(()=>{let alive=true;fetch('/api/site-settings').then(r=>r.json()).then(({settings:s})=>{if(!alive||!s)return;
  const text=(sel,value)=>{const el=document.querySelector(sel);if(el&&value)el.textContent=value};
  text('.topbarInner span a[href^="tel:"]',s.phone);text('.topbarInner span a[href^="mailto:"]',s.email);text('.script',s.heroEyebrow);
  const hero=document.querySelector('.hero h1');if(hero&&s.heroTitle)hero.textContent=s.heroTitle;
  text('.heroCopy>p',s.heroDescription);text('.aboutGrid h2',s.aboutTitle);text('.aboutGrid p',s.aboutText);
  document.querySelectorAll('.contactQuick a').forEach(a=>{const href=a.getAttribute('href')||'';if(href.startsWith('tel:')){a.href=`tel:+91${s.phone}`;const b=a.querySelector('b');if(b)b.textContent=s.phone}else if(href.startsWith('mailto:')){a.href=`mailto:${s.email}`;const b=a.querySelector('b');if(b)b.textContent=s.email}});
  document.querySelectorAll('.footerGrid p').forEach(p=>{if(p.textContent?.includes('Near Maharishi'))p.textContent='📍 '+s.address});
  document.querySelectorAll('.footerGrid a[href^="tel:"]').forEach(a=>{a.href=`tel:+91${s.phone}`;a.textContent=s.phone});
  document.querySelectorAll('.footerGrid a[href^="mailto:"]').forEach(a=>{a.href=`mailto:${s.email}`;a.textContent=s.email});
  const map=document.querySelector('.mapCard iframe');if(map&&s.mapQuery)map.src=`https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`;
  if(Array.isArray(s.services)&&s.services.length){document.querySelectorAll('.serviceCard').forEach((card,i)=>{const item=s.services[i];if(!item)return;const h=card.querySelector('h3'),p=card.querySelector('p');if(h&&item.title)h.textContent=item.title;if(p&&item.description)p.textContent=item.description;if(item.icon){const icon=card.querySelector('.serviceIcon');if(icon)icon.textContent=item.icon}})}
  if(Array.isArray(s.stats)&&s.stats.length){document.querySelectorAll('.heroStats>div').forEach((card,i)=>{const item=s.stats[i];if(!item)return;const b=card.querySelector('b'),small=card.querySelector('small');if(b&&item.value)b.textContent=item.value;if(small&&item.label)small.textContent=item.label})}
  const gallery=(s.gallery||[]).filter(g=>g&&g.active!==false&&g.src);const homeItems=document.querySelectorAll('.gallerySection .galleryItem');homeItems.forEach((card,i)=>{const item=gallery[i];if(!item)return;const img=card.querySelector('img');const b=card.querySelector('span b');const small=card.querySelector('span small');if(img){img.src=item.src;img.alt=item.title||'Touristaa gallery photo'}if(b&&item.title)b.textContent=item.title;if(small&&item.kind)small.textContent=item.kind});
 }).catch(()=>{});return()=>{alive=false}},[]);return null
}

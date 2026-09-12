# Touristaa Travel Company

Production-ready travel website and admin CRM for Touristaa Travel Company, built with Next.js, React, CSS and MongoDB.

## Public routes
- `/` — public travel website
- `/packages/[id]` — full tour package details
- `/gallery` — full gallery
- `/booking` — customer booking / quotation request form

## Admin routes
- `/admin/login` — secure admin login
- `/admin` — dashboard, customer CRM, package manager and website content manager
- `/admin/bookings` — booking and quotation manager

## Admin features
- Tour package create, edit, delete and publish/hide
- Customer enquiry CRM with status, priority and follow-up fields
- Booking and quotation management with printable quotations
- Website content management for contact, homepage/about, services, gallery, testimonials, FAQs and SEO
- Device image upload with client-side resizing
- Google Maps, phone, email and WhatsApp contact actions

## Stack
- Next.js
- React
- MongoDB / Mongoose
- CSS
- bcryptjs
- jose / HMAC-based admin session authentication

## Environment variables
Keep production secrets in Vercel Environment Variables. Never commit real credentials to GitHub.

Required production configuration includes the MongoDB connection and admin authentication variables used by the application.

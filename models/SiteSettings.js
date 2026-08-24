import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'main' },
  companyName: { type: String, default: 'Touristaa Travel Company' },
  phone: { type: String, default: '6387200498' },
  email: { type: String, default: 'touristaaofficial@gmail.com' },
  address: { type: String, default: 'Near Maharishi Valmiki International Airport, Ayodhya, Uttar Pradesh' },
  heroEyebrow: { type: String, default: 'Explore the World With Us' },
  heroTitle: { type: String, default: 'DISCOVER. EXPLORE. EXPERIENCE.' },
  heroDescription: { type: String, default: 'Touristaa Travel Company is your trusted travel partner for memorable journeys, customized tours and comfortable travel experiences.' },
  aboutTitle: { type: String, default: 'Your journey, our responsibility.' },
  aboutText: { type: String, default: 'Touristaa Travel Company creates memorable, safe and hassle-free travel experiences. We plan domestic and international holidays, educational tours, honeymoon trips, family vacations and corporate travel with customer-focused support from enquiry to return.' },
  mapQuery: { type: String, default: 'Near Maharishi Valmiki International Airport, Ayodhya, Uttar Pradesh' },
  services: { type: [mongoose.Schema.Types.Mixed], default: [] },
  gallery: { type: [mongoose.Schema.Types.Mixed], default: [] },
  stats: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

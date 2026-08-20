import mongoose from 'mongoose';

const TourPackageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'Domestic Tour' },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.TourPackage || mongoose.model('TourPackage', TourPackageSchema);

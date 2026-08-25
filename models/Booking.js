import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' },
  packageName: { type: String, default: '' },
  destination: { type: String, default: '' },
  travelDate: { type: Date },
  travellers: { type: Number, default: 1, min: 1 },
  duration: { type: String, default: '' },
  amount: { type: Number, default: 0, min: 0 },
  advanceAmount: { type: Number, default: 0, min: 0 },
  status: { type: String, enum: ['quotation', 'pending', 'confirmed', 'completed', 'cancelled'], default: 'quotation' },
  paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  notes: { type: String, default: '' },
  quotationNumber: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

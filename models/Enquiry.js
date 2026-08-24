import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  destination: { type: String, trim: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'follow-up', 'converted', 'closed'], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  source: { type: String, enum: ['website', 'whatsapp', 'phone', 'walk-in', 'other'], default: 'website' },
  notes: { type: String, default: '' },
  followUpDate: { type: Date },
  assignedTo: { type: String, default: '' },
  budget: { type: String, default: '' },
  travelDate: { type: Date },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

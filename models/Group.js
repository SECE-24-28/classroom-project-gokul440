import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: String, required: true },
  participants: [String]
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  content: String,
  response: String,
  pdfUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Conversation', conversationSchema);
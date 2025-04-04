import express from 'express';
import { getAIResponse } from '../services/aiService.js';
import { generateAndUploadPdf } from '../services/pdfService.js';
import { Conversation } from '../models/index.js';

const router = express.Router();

router.post('/ask', async (req, res, next) => {
  try {
    const { content } = req.body;

    // Get AI response (markdown)
    const aiResponse = await getAIResponse(content);

    console.log(aiResponse)
    // Generate PDF and upload to Cloudinary
    // const pdfUrl = await generateAndUploadPdf(aiResponse);

    // Save to MongoDB
    const conversation = new Conversation({
      content,
      response: aiResponse,
      // pdfUrl,
    });

    const savedConversation = await conversation.save();

    res.json({
      success: true,
      response: aiResponse,
      // pdfUrl,
      dbRecord: savedConversation,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
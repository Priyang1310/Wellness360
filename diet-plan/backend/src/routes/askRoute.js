import express from 'express';
import { getAIResponse } from '../services/aiService.js';
import { Conversation } from '../models/index.js';

const router = express.Router();

router.post('/ask', async (req, res, next) => {
  try {
    const { content } = req.body;
    const aiResponse = await getAIResponse(content);
    
    const conversation = new Conversation({
      content,
      response: aiResponse
    });
    
    const savedConversation = await conversation.save();
    console.log(aiResponse);
    res.json({
      success: true,
      response: aiResponse,
      dbRecord: savedConversation
    });
  } catch (error) {
    next(error);
  }
});

export default router;
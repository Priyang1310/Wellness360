import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/index.js';
import setupRoutes from './routes/index.js';
import { errorHandler } from './utils/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware


app.use(cors({
  origin: ["http://localhost:5173", "https://wellness360.onrender.com"], // Allow frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"]
}));


app.use(express.json());

// Database connection
connectDB();

// Routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
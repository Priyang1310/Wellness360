import { cloudinary } from '../config/index.js';
import { mdToPdf } from 'md-to-pdf';
import { Readable } from 'stream';

export const generateAndUploadPdf = async (markdownContent) => {
  try {
    // Generate PDF in memory
    const pdf = await mdToPdf({ content: markdownContent });

    if (!pdf || !pdf.content) {
      throw new Error('PDF generation failed');
    }

    // Convert PDF buffer to a readable stream correctly
    const pdfStream = Readable.from([pdf.content]);

    // Upload PDF to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'pdfs',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the PDF stream to Cloudinary
      pdfStream.pipe(uploadStream);
    });

    return result.secure_url; // Return Cloudinary URL
  } catch (error) {
    console.error('Error in generateAndUploadPdf:', error);
    throw error;
  }
};

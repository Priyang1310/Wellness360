import PDFDocument from "pdfkit";
import markdownIt from "markdown-it";
import { Readable } from "stream";

const md = new markdownIt();

export const generateAndUploadPdf = async (markdownContent) => {
    try {
        // Convert markdown to HTML (optional step for custom formatting)
        const htmlContent = md.render(markdownContent);

        // Create a PDF document
        const doc = new PDFDocument();

        // Pipe the PDF output to a buffer
        const buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", async () => {
            const pdfBuffer = Buffer.concat(buffers);

            // Convert buffer to readable stream
            const pdfStream = Readable.from([pdfBuffer]);

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "pdfs",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                pdfStream.pipe(uploadStream);
            });

            return result.secure_url;
        });

        // Write content to the PDF
        doc.text(htmlContent, { align: "left" });
        doc.end();
    } catch (error) {
        console.error("PDF generation error:", error);
        throw error;
    }
};

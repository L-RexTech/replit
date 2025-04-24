import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to proxy the Gemini API requests if needed
  app.post('/api/analyze', async (req, res) => {
    try {
      const { resumeText, jobDescription, apiKey } = req.body;
      
      if (!resumeText || !jobDescription || !apiKey) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Construct the prompt for Gemini API
      const prompt = `
        As an AI career assistant, analyze the following resume and job description. 
        Provide a detailed analysis including:
        
        1. A job fit score as a percentage (e.g., 75%)
        2. List of matched skills found in both the resume and job description
        3. List of missing skills that are in the job description but not in the resume
        4. A brief analysis of the candidate's fit for the role and recommendations
        
        Resume:
        ${resumeText}
        
        Job Description:
        ${jobDescription}
        
        Format your response in HTML format with proper headings and bullet points. Include a job fit score at the beginning.
      `;
      
      // Call the Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 8192,
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ 
          error: `Gemini API error: ${response.status}`,
          details: errorText
        });
      }
      
      const geminiResponse = await response.json();
      return res.json(geminiResponse);
    } catch (error: any) {
      console.error('Error in /api/analyze:', error);
      return res.status(500).json({ 
        error: 'Failed to analyze', 
        message: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

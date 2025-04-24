# CV Job Fit Analyzer - Code Guide

## Core Files

### Client-side Components

1. `client/src/App.tsx`
   - Main application component with router setup
   - Routes users to the Analyzer page

2. `client/src/pages/Analyzer.tsx`
   - Main page with the analyzer functionality
   - Manages state for file upload, job description, and API key
   - Contains the analysis workflow and results display

3. `client/src/components/FileUpload.tsx`
   - Handles resume file upload (PDF/TXT)
   - Extracts text from uploaded files

4. `client/src/components/JobDescription.tsx`
   - Text area for entering job descriptions
   - Passes job description to the parent component

5. `client/src/components/ApiKeyInput.tsx`
   - Input field for Gemini API key
   - Includes instructions for obtaining an API key
   - Saves API key to local storage

6. `client/src/components/AnalysisResults.tsx`
   - Displays analysis results with charts
   - Uses Chart.js to visualize data
   - Shows job fit score, skills, market trends, etc.

7. `client/src/components/Navbar.tsx`
   - Application header with branding
   - Navigation links and mobile menu

8. `client/src/components/Footer.tsx`
   - Application footer with links and information

### Client-side Logic and Utilities

9. `client/src/hooks/useGeminiAPI.ts`
   - Custom hook for interfacing with the Gemini API
   - Handles API requests and response processing
   - Extracts structured data from AI responses

10. `client/src/lib/chartUtils.ts`
    - Utilities for creating and configuring charts
    - Sets up Chart.js instances for various visualizations

11. `client/src/lib/fileUtils.ts`
    - Utilities for extracting text from uploaded files
    - Handles PDF and TXT file formats

### Server-side Components

12. `server/index.ts`
    - Express server setup
    - Error handling and middleware configuration

13. `server/routes.ts`
    - API route definitions
    - Handles Gemini API proxy requests

14. `server/storage.ts`
    - In-memory storage implementation
    - User data handling (if needed)

### Styling and Configuration

15. `client/src/index.css`
    - Global styles and Tailwind CSS configuration
    - Custom animations and component styling

16. `tailwind.config.ts`
    - Tailwind CSS configuration
    - Theme customization

## Key Features Implementation

### Gemini API Integration

The application integrates with Google's Gemini 2.0 Flash model through:

```typescript
// In useGeminiAPI.ts
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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
```

### Data Extraction and Visualization

The application extracts structured data from the Gemini API response:

```typescript
// In useGeminiAPI.ts
// Extract job fit score
const jobFitScoreMatch = textResponse.match(/JOB_FIT_SCORE:\s*(\d+)/i);
const jobFitScore = jobFitScoreMatch ? parseInt(jobFitScoreMatch[1], 10) : 70;

// Extract matched and missing skills
const matchedSkills = extractSkills(textResponse, 'matched');
const missingSkills = extractSkills(textResponse, 'missing');

// Extract other data points
const marketData = extractMarketData(textResponse);
const careerProjection = extractCareerProjection(textResponse);
const businessMetrics = extractBusinessMetrics(textResponse);
```

### File Handling

The application handles file uploads and text extraction:

```typescript
// In FileUpload.tsx
if (file.type === "application/pdf") {
  content = await extractTextFromPDF(file);
} else if (file.type === "text/plain") {
  content = await extractTextFromTxt(file);
}
```

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Get a Gemini API key from Google AI Studio
4. Start the application with `npm run dev`
5. Open your browser to the URL shown in the console

## Running the Application

1. Enter your Gemini API key in the field at the top
2. Upload your resume (PDF or TXT)
3. Enter a job description
4. Click "Analyze Job Fit"
5. View the comprehensive analysis results
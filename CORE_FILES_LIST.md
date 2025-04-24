# CV Job Fit Analyzer - Core Files

Here's a list of the most important files to understand the application's functionality:

## Client-Side Core Files

1. `client/src/pages/Analyzer.tsx` - Main page component with all the application logic
2. `client/src/components/FileUpload.tsx` - Resume upload component
3. `client/src/components/JobDescription.tsx` - Job description input component
4. `client/src/components/ApiKeyInput.tsx` - API key input component
5. `client/src/components/AnalysisResults.tsx` - Results display with charts
6. `client/src/hooks/useGeminiAPI.ts` - Gemini API integration
7. `client/src/lib/chartUtils.ts` - Chart configuration utilities
8. `client/src/lib/fileUtils.ts` - File handling utilities

## Server-Side Core Files

9. `server/routes.ts` - API routes for handling Gemini API proxying
10. `server/index.ts` - Express server setup

## Configuration Files

11. `package.json` - Project dependencies
12. `vite.config.ts` - Vite configuration
13. `tailwind.config.ts` - Tailwind CSS configuration

## To Use the Application

1. Install dependencies with `npm install`
2. Start the application with `npm run dev`
3. Enter your Gemini API key
4. Upload a resume file (PDF/TXT)
5. Enter a job description
6. Click "Analyze Job Fit"

The application will process your resume against the job description using Google's Gemini AI and display the results with interactive visualizations.
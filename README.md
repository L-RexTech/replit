# CV Job Fit Analyzer Pro

A web application that analyzes resumes/CVs against job descriptions using Google's Gemini AI, providing job fit scores, skill matching, and career insights through interactive visualizations.

## Features

- Upload resume files (PDF/TXT) for analysis
- Enter job descriptions for comparison
- Integration with Google's Gemini 2.0 Flash AI model
- Interactive data visualizations showing job fit scores
- Skill matching and gap analysis
- Market demand trends
- Career progression projections
- Operational efficiency metrics

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js
- **API Integration**: Google Gemini AI
- **Data Visualization**: Chart.js
- **Build Tools**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Get a Gemini API key from [Google AI Studio](https://ai.google.dev/)
4. Start the application with `npm run dev`
5. Open your browser to the URL shown in the console

## Using the Application

1. Enter your Gemini API key in the dedicated field
2. Upload your resume/CV (PDF or TXT format)
3. Enter the job description
4. Click "Analyze Job Fit"
5. View the comprehensive analysis results

## API Integration

The application integrates with the Gemini 2.0 Flash model through Google's Generative Language API. The API key is stored locally in the browser and never sent to our servers.

## License

This project is licensed under the MIT License.
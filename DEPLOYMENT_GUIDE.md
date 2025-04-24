# Deploying CV Job Fit Analyzer on Vercel

This guide provides step-by-step instructions for deploying the CV Job Fit Analyzer to Vercel, a popular platform for hosting frontend applications.

## Preparation

Since Vercel doesn't support running a Node.js server (Express) with your frontend, we need to prepare a client-only version of the application. The key change is to make the API calls directly from the client without proxying through the server.

## Steps for Deployment

### 1. Prepare your project for Vercel deployment

Follow these steps to create a Vercel-ready version of your project:

1. Create a new repository on GitHub for your Vercel deployment
2. Copy only the client-side files to this new repository:
   - The entire `client` directory (rename to `src`)
   - Copy `shared` files into the `src/shared` directory
   - Use the Vercel-specific configuration files from the `vercel-deploy` directory:
     - `package.json`
     - `vite.config.ts`
     - `vercel.json`
     - `index.html`

### 2. Project structure for Vercel

Your Vercel-ready project should have this structure:

```
cv-job-fit-analyzer/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── shared/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── vercel.json
```

### 3. Deploy to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configuration settings:
   - Framework Preset: Vite
   - Build Command: npm run build (should be auto-detected)
   - Output Directory: dist (should be auto-detected)
5. Click "Deploy"

### 4. Usage after deployment

Once deployed, users can:
1. Access the application via your Vercel URL (e.g., cv-job-fit-analyzer.vercel.app)
2. Enter their Gemini API key
3. Upload their resume and job description for analysis

### 5. Important Notes

- **API Keys**: Since the Gemini API key is entered by the user in the browser, there's no need for environment variables on Vercel
- **Direct API Calls**: The application makes API calls directly from the browser to the Gemini API
- **CORS**: The Gemini API allows direct requests from browsers
- **Security**: Never store users' API keys on your server; the current implementation only stores them temporarily in the user's browser localStorage

### 6. Troubleshooting

If you encounter issues with the deployment:
1. Check the Vercel deployment logs for errors
2. Ensure all paths and imports are correct in your code
3. Make sure the browser console is free of errors
4. Verify that CORS is not blocking API requests

### 7. Domain Configuration (Optional)

To use a custom domain:
1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain and follow the verification steps
3. Update your DNS records as instructed by Vercel
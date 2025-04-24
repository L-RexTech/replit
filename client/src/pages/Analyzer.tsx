import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import JobDescription from "@/components/JobDescription";
import ApiKeyInput from "@/components/ApiKeyInput";
import AnalysisResults from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";
import useGeminiAPI from "@/hooks/useGeminiAPI";

export type AnalysisData = {
  jobFitScore: number;
  matchedSkills: { name: string; proficiency: number }[];
  missingSkills: { name: string; proficiency: number }[];
  marketDemand: {
    labels: string[];
    values: number[];
  };
  careerProjection: {
    average: number[];
    projected: number[];
  };
  businessMetrics: {
    timeToHire: {
      traditional: number;
      withTool: number;
    };
    costSavings: {
      traditional: number;
      withTool: number;
    };
  };
  analysisText: string;
};

function Analyzer() {
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const { toast } = useToast();
  
  const { 
    analyze, 
    isLoading, 
    error, 
    data: analysisData 
  } = useGeminiAPI();

  useEffect(() => {
    // Check for saved API key on component mount
    const savedKey = localStorage.getItem("geminiApiKey");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleFileContentChange = (content: string, name: string, size: number) => {
    setFileContent(content);
    setFileName(name);
    setFileSize(size);
  };

  const handleJobDescriptionChange = (description: string) => {
    setJobDescription(description);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem("geminiApiKey", key);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved",
      duration: 3000,
    });
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    if (!fileContent) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    try {
      await analyze(fileContent, jobDescription, apiKey);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("resultsContainer");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: error || "Failed to analyze your resume",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">AI-Powered CV & Job Analysis</h2>
          <p className="text-gray-300 mb-6">Upload your resume and paste a job description to get comprehensive insights on your job fit, skill matching, and career opportunities.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <FileUpload 
                onFileContentChange={handleFileContentChange}
                fileName={fileName}
                fileSize={fileSize}
              />
              
              <JobDescription 
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </div>
            
            <div className="lg:border-l lg:border-gray-600 lg:pl-8">
              <ApiKeyInput 
                value={apiKey}
                onChange={handleApiKeyChange}
              />
              
              <div className="mt-8">
                <button 
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  <span>{isLoading ? "Analyzing..." : "Analyze Job Fit"}</span>
                  {isLoading && (
                    <span className="ml-3">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
              
              {!apiKey && (
                <div className="mt-4 bg-gray-700/50 p-3 rounded border border-yellow-600/30">
                  <p className="text-sm text-yellow-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    An API key is required for analysis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {showResults && analysisData && (
          <div id="resultsContainer">
            <AnalysisResults
              isLoading={isLoading}
              analysisData={analysisData}
            />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Analyzer;

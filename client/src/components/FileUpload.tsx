import { useRef, useState } from "react";
import { extractTextFromPDF, extractTextFromTxt } from "@/lib/fileUtils";

interface FileUploadProps {
  onFileContentChange: (content: string, name: string, size: number) => void;
  fileName: string;
  fileSize: number;
}

export default function FileUpload({ onFileContentChange, fileName, fileSize }: FileUploadProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      let content = "";

      if (file.type === "application/pdf") {
        content = await extractTextFromPDF(file);
      } else if (file.type === "text/plain") {
        content = await extractTextFromTxt(file);
      } else {
        throw new Error("Unsupported file type. Please upload a PDF or TXT file.");
      }

      onFileContentChange(content, file.name, file.size);
    } catch (error) {
      console.error("Error reading file:", error);
      // You could add error handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <label className="block text-lg font-medium mb-2">Upload Resume</label>
      <div className="file-upload-container">
        <input 
          type="file" 
          id="cvFile"
          ref={fileInputRef}
          accept=".txt,.pdf" 
          className="hidden"
          onChange={handleFileChange}
        />
        <label 
          htmlFor="cvFile" 
          className="bg-gray-700 hover:bg-gray-600 cursor-pointer flex items-center justify-center p-4 rounded-lg border-2 border-dashed border-gray-600"
        >
          <svg className="h-8 w-8 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div>
            <span className="text-white">
              {loading ? "Processing..." : "Drop your file here or "}
              <span className="text-blue-400">browse</span>
            </span>
            <p className="text-xs text-gray-400 mt-1">Supports PDF and TXT files</p>
          </div>
        </label>
        <div className="text-gray-400 mt-2 text-sm">
          {fileName && !loading && `Selected: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)`}
          {loading && "Reading file content..."}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ApiKeyInput({ value, onChange }: ApiKeyInputProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const [saved, setSaved] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  const handleSave = () => {
    onChange(inputValue);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <h3 className="text-white font-medium">Gemini API Key</h3>
        </div>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {showHelp ? "Hide Info" : "How to get an API key?"}
        </button>
      </div>
      
      {showHelp && (
        <div className="bg-gray-700 p-4 rounded-lg mb-3 text-sm text-gray-300">
          <p className="mb-2">
            1. Visit <a href="https://ai.google.dev/tutorials/web_quickstart" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Google AI Studio</a> and sign in with your Google account.
          </p>
          <p className="mb-2">
            2. Navigate to the "Get API key" section and create a new API key.
          </p>
          <p className="mb-2">
            3. Copy your API key and paste it below.
          </p>
          <div className="bg-gray-800 p-2 rounded mt-2 overflow-x-auto text-xs">
            <code className="text-green-400">
              curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY" \<br />
              -H "Content-Type: application/json" \<br />
              -X POST \<br />
              -d '&#123; "contents": [&#123; "parts": [&#123; "text": "Explain how AI works" &#125;] &#125;] &#125;'
            </code>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        <input
          type="text"
          id="geminiApiKey"
          placeholder="Enter your Gemini API key"
          className={`bg-transparent border-none text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none p-1 w-64 ${saved ? 'bg-green-900/20' : ''}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          id="saveApiKey"
          className="ml-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold text-sm px-3 py-1 rounded transition-colors hover:from-yellow-600 hover:to-yellow-700"
          onClick={handleSave}
        >
          {saved ? "Saved!" : "Save Key"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-1 ml-1">Your API key will be stored locally in your browser and never sent to our servers.</p>
    </div>
  );
}

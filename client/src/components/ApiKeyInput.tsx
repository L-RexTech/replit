import { useState } from "react";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ApiKeyInput({ value, onChange }: ApiKeyInputProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const [saved, setSaved] = useState<boolean>(false);
  
  const handleSave = () => {
    onChange(inputValue);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  return (
    <div className="mt-6 flex justify-center md:justify-start">
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
          className="ml-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-3 py-1 rounded transition-colors"
          onClick={handleSave}
        >
          {saved ? "Saved!" : "Save"}
        </button>
      </div>
    </div>
  );
}

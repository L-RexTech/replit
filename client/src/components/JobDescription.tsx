interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescription({ value, onChange }: JobDescriptionProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <label htmlFor="jobDesc" className="block text-lg font-medium mb-2">Job Description</label>
      <textarea
        id="jobDesc"
        className="bg-gray-700 p-4 rounded-lg w-full h-40 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { AnalysisData } from "@/pages/Analyzer";
import { initializeCharts } from "@/lib/chartUtils";

interface AnalysisResultsProps {
  isLoading: boolean;
  analysisData: AnalysisData;
}

Chart.register(...registerables);

export default function AnalysisResults({ isLoading, analysisData }: AnalysisResultsProps) {
  const chartInstancesRef = useRef<{[key: string]: Chart | null}>({
    fitChart: null,
    skillProficiencyChart: null,
    skillGapChart: null,
    marketDemandChart: null,
    careerProgressionChart: null,
    timeToHireChart: null,
    costSavingsChart: null
  });

  useEffect(() => {
    if (!isLoading && analysisData) {
      // Clean up any existing charts
      Object.values(chartInstancesRef.current).forEach(chart => {
        if (chart) chart.destroy();
      });
      
      // Initialize new charts with data
      chartInstancesRef.current = initializeCharts(analysisData);
    }
    
    // Cleanup on unmount
    return () => {
      Object.values(chartInstancesRef.current).forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, [isLoading, analysisData]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-md">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-blue-300 rounded-full animate-spin mb-6"></div>
          <h3 className="text-xl font-semibold mb-2">Analyzing your data...</h3>
          <p className="text-gray-300 text-center mb-4">Our AI is comparing your CV with the job description to find the perfect match.</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>
          <p className="text-gray-400 text-sm">This usually takes about 15-30 seconds</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Analysis Results</h2>
        <div 
          id="results" 
          className="text-gray-300"
          dangerouslySetInnerHTML={{ __html: analysisData.analysisText }}
        ></div>
      </div>
      
      {/* Dashboard Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Skill Match Score */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Job Fit Score</h3>
          <div className="flex justify-center">
            <div className="relative">
              <canvas id="fitChart" className="my-4" width="250" height="250"></canvas>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-yellow-400">{analysisData.jobFitScore}%</span>
                <span className="text-sm text-gray-400">Job Match</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skill Proficiency */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Skill Proficiency</h3>
          <canvas id="skillProficiencyChart" className="my-4" width="250" height="250"></canvas>
        </div>
        
        {/* Skill Gap Analysis */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Skill Gap Analysis</h3>
          <canvas id="skillGapChart" className="my-4" width="250" height="250"></canvas>
        </div>
      </div>
      
      {/* Additional Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Market Demand */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Market Demand for Your Skills</h3>
          <canvas id="marketDemandChart" className="my-4" width="400" height="300"></canvas>
        </div>
        
        {/* Career Progression */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Career Progression Projection</h3>
          <canvas id="careerProgressionChart" className="my-4" width="400" height="300"></canvas>
        </div>
      </div>
      
      {/* Time Efficiency Metrics */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-10">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Operational Efficiency Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Time-to-Hire Reduction</h4>
            <canvas id="timeToHireChart" className="my-4" width="300" height="200"></canvas>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Client Acquisition Cost Savings</h4>
            <canvas id="costSavingsChart" className="my-4" width="300" height="200"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

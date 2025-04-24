import { useState } from "react";
import { AnalysisData } from "@/pages/Analyzer";

interface GeminiAPIResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
    index: number;
  }[];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export default function useGeminiAPI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);

  const analyze = async (resumeText: string, jobDescription: string, apiKey: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!resumeText.trim()) {
        throw new Error("Resume text is empty. Please upload a valid resume.");
      }
      
      if (!jobDescription.trim()) {
        throw new Error("Job description is empty. Please enter a job description.");
      }
      
      if (!apiKey.trim()) {
        throw new Error("API key is required. Please enter your Gemini API key.");
      }

      // Construct the prompt for Gemini API
      const prompt = `
        As an AI career assistant, analyze the following resume and job description.
        You will need to output structured data for visualization as well as analysis text.
        
        Resume:
        ${resumeText}
        
        Job Description:
        ${jobDescription}
        
        Please provide a detailed analysis in the following structured format:
        
        1. JOB_FIT_SCORE: [A number between 0-100 representing the job fit score]
        
        2. MATCHED_SKILLS:
        <ul>
        <li>[Skill name 1] - [proficiency score between 70-95]</li>
        <li>[Skill name 2] - [proficiency score between 70-95]</li>
        [Continue for all matched skills]
        </ul>
        
        3. MISSING_SKILLS:
        <ul>
        <li>[Skill name 1] - [importance score between 70-95]</li>
        <li>[Skill name 2] - [importance score between 70-95]</li>
        [Continue for all missing skills]
        </ul>
        
        4. MARKET_DEMAND:
        <ul>
        <li>Jan: [demand value between 30-100]</li>
        <li>Feb: [demand value between 30-100]</li>
        <li>Mar: [demand value between 30-100]</li>
        <li>Apr: [demand value between 30-100]</li>
        <li>May: [demand value between 30-100]</li>
        <li>Jun: [demand value between 30-100]</li>
        </ul>
        
        5. CAREER_PROJECTION:
        <ul>
        <li>Average 1 Year: [value between 30-50]</li>
        <li>Average 2 Years: [value between 40-60]</li>
        <li>Average 3 Years: [value between 50-70]</li>
        <li>Average 4 Years: [value between 60-80]</li>
        <li>Average 5 Years: [value between 70-90]</li>
        <li>Average 6 Years: [value between 80-95]</li>
        <li>Projected 1 Year: [value between 35-55]</li>
        <li>Projected 2 Years: [value between 45-65]</li>
        <li>Projected 3 Years: [value between 55-75]</li>
        <li>Projected 4 Years: [value between 65-85]</li>
        <li>Projected 5 Years: [value between 75-95]</li>
        <li>Projected 6 Years: [value between 85-100]</li>
        </ul>
        
        6. BUSINESS_METRICS:
        <ul>
        <li>Traditional Time to Hire: [value between 30-60] days</li>
        <li>Tool Time to Hire: [value between 10-25] days</li>
        <li>Traditional Cost: [value between 3000-7000] dollars</li>
        <li>Tool Cost: [value between 1000-3000] dollars</li>
        </ul>
        
        7. ANALYSIS_TEXT:
        <h1>Job Fit Analysis: [score]%</h1>
        [Provide a detailed HTML analysis with h2, h3 headings for sections, paragraphs, and bullet points]
        [Include sections for matched skills, missing skills, and recommendations]
        [Make it look professional and informative for a job seeker]
        
        Be sure to follow the exact format structure shown above so that the data can be properly extracted for visualization.
      `;
      
      console.log("Sending request to Gemini API...");
      
      // Call the Gemini API with 2.0-flash model
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

      const responseData = await response.json();
      
      // Check for API error
      if (!response.ok) {
        console.error("Gemini API error:", responseData);
        
        if (responseData.error) {
          if (responseData.error.code === 400) {
            throw new Error(`API error: ${responseData.error.message || "Bad request. Check your inputs."}`);
          } else if (responseData.error.code === 401) {
            throw new Error("Invalid API key. Please check your API key and try again.");
          } else if (responseData.error.code === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
          } else {
            throw new Error(`API error: ${responseData.error.message || "Unknown error occurred."}`);
          }
        }
        
        throw new Error(`API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      if (!responseData.candidates || responseData.candidates.length === 0) {
        throw new Error('No response received from Gemini API. Try a different prompt or check your inputs.');
      }
      
      const textResponse = responseData.candidates[0].content.parts[0].text;
      console.log("Received response from Gemini API");
      
      // Extract job fit score from response
      const jobFitScoreMatch = textResponse.match(/JOB_FIT_SCORE:\s*(\d+)/i);
      const jobFitScore = jobFitScoreMatch ? parseInt(jobFitScoreMatch[1], 10) : 70;
      
      // Parse the response to extract skills
      const matchedSkills = extractSkills(textResponse, 'matched');
      const missingSkills = extractSkills(textResponse, 'missing');
      
      // Extract market demand data
      const marketData = extractMarketData(textResponse);
      
      // Extract career projection
      const careerProjection = extractCareerProjection(textResponse);
      
      // Extract business metrics
      const businessMetrics = extractBusinessMetrics(textResponse);
      
      // Create final analysis data
      const analysisData: AnalysisData = {
        jobFitScore,
        matchedSkills,
        missingSkills,
        marketDemand: marketData,
        careerProjection,
        businessMetrics,
        analysisText: textResponse
      };
      
      setData(analysisData);
      return analysisData;
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze with Gemini API");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyze, isLoading, error, data };
}

// Extract skills data with proficiency scores
function extractSkills(text: string, type: 'matched' | 'missing'): { name: string; proficiency: number }[] {
  const skills: { name: string; proficiency: number }[] = [];
  
  // Define the section marker based on type
  const sectionMarker = type === 'matched' ? 'MATCHED_SKILLS:' : 'MISSING_SKILLS:';
  
  // Extract the skills section
  const sectionRegex = new RegExp(`${sectionMarker}\\s*<ul>([\\s\\S]*?)<\\/ul>`, 'i');
  const sectionMatch = text.match(sectionRegex);
  
  if (sectionMatch && sectionMatch[1]) {
    // Extract list items
    const listItemRegex = /<li>(.*?)<\/li>/g;
    let match;
    
    // Use regex to extract each list item
    while ((match = listItemRegex.exec(sectionMatch[1])) !== null) {
      const itemText = match[1].trim();
      
      // Try to extract skill name and proficiency
      const skillMatch = itemText.match(/(.*?)\s*-\s*(\d+)/);
      
      if (skillMatch) {
        const skillName = skillMatch[1].trim();
        const proficiency = parseInt(skillMatch[2], 10);
        
        if (skillName && !isNaN(proficiency)) {
          skills.push({ name: skillName, proficiency });
        }
      } else {
        // If no proficiency found, add with default value
        skills.push({ 
          name: itemText,
          proficiency: type === 'matched' ? 80 : 20
        });
      }
    }
  }
  
  // Fallback if no skills found
  if (skills.length === 0) {
    if (type === 'matched') {
      skills.push({ name: 'Communication', proficiency: 85 });
      skills.push({ name: 'Leadership', proficiency: 75 });
      skills.push({ name: 'Problem Solving', proficiency: 90 });
    } else {
      skills.push({ name: 'Technical Writing', proficiency: 25 });
      skills.push({ name: 'Data Analysis', proficiency: 15 });
    }
  }
  
  // Limit to top 8 skills for better visualization
  return skills.slice(0, 8);
}

// Extract market demand data
function extractMarketData(text: string): { labels: string[]; values: number[] } {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values: number[] = [];
  
  // Extract the market demand section
  const sectionRegex = /MARKET_DEMAND:\s*<ul>([\s\S]*?)<\/ul>/i;
  const sectionMatch = text.match(sectionRegex);
  
  if (sectionMatch && sectionMatch[1]) {
    // Process each month
    months.forEach(month => {
      const monthRegex = new RegExp(`<li>${month}:\\s*(\\d+)`, 'i');
      const monthMatch = sectionMatch[1].match(monthRegex);
      
      if (monthMatch && monthMatch[1]) {
        values.push(parseInt(monthMatch[1], 10));
      } else {
        // Default value if month not found
        values.push(40 + months.indexOf(month) * 5);
      }
    });
  } else {
    // Default data if section not found
    values.push(40, 45, 52, 58, 65, 72);
  }
  
  return { labels: months, values };
}

// Extract career projection data
function extractCareerProjection(text: string): { average: number[]; projected: number[] } {
  const average: number[] = [];
  const projected: number[] = [];
  
  // Extract the career projection section
  const sectionRegex = /CAREER_PROJECTION:\s*<ul>([\s\S]*?)<\/ul>/i;
  const sectionMatch = text.match(sectionRegex);
  
  if (sectionMatch && sectionMatch[1]) {
    // Extract average values
    for (let i = 1; i <= 6; i++) {
      const avgRegex = new RegExp(`<li>Average ${i} Year(?:s)?:\\s*(\\d+)`, 'i');
      const avgMatch = sectionMatch[1].match(avgRegex);
      
      if (avgMatch && avgMatch[1]) {
        average.push(parseInt(avgMatch[1], 10));
      } else {
        // Default value if not found
        average.push(30 + (i * 10));
      }
    }
    
    // Extract projected values
    for (let i = 1; i <= 6; i++) {
      const projRegex = new RegExp(`<li>Projected ${i} Year(?:s)?:\\s*(\\d+)`, 'i');
      const projMatch = sectionMatch[1].match(projRegex);
      
      if (projMatch && projMatch[1]) {
        projected.push(parseInt(projMatch[1], 10));
      } else {
        // Default value if not found
        projected.push(35 + (i * 10));
      }
    }
  } else {
    // Default data if section not found
    average.push(30, 45, 60, 75, 85, 95);
    projected.push(35, 50, 65, 80, 90, 98);
  }
  
  return { average, projected };
}

// Extract business metrics data
function extractBusinessMetrics(text: string): { timeToHire: { traditional: number; withTool: number }; costSavings: { traditional: number; withTool: number } } {
  let traditionalTime = 45;
  let toolTime = 15;
  let traditionalCost = 5000;
  let toolCost = 2000;
  
  // Extract the business metrics section
  const sectionRegex = /BUSINESS_METRICS:\s*<ul>([\s\S]*?)<\/ul>/i;
  const sectionMatch = text.match(sectionRegex);
  
  if (sectionMatch && sectionMatch[1]) {
    // Extract time to hire values
    const tradTimeRegex = /<li>Traditional Time to Hire:\s*(\d+)/i;
    const tradTimeMatch = sectionMatch[1].match(tradTimeRegex);
    if (tradTimeMatch && tradTimeMatch[1]) {
      traditionalTime = parseInt(tradTimeMatch[1], 10);
    }
    
    const toolTimeRegex = /<li>Tool Time to Hire:\s*(\d+)/i;
    const toolTimeMatch = sectionMatch[1].match(toolTimeRegex);
    if (toolTimeMatch && toolTimeMatch[1]) {
      toolTime = parseInt(toolTimeMatch[1], 10);
    }
    
    // Extract cost values
    const tradCostRegex = /<li>Traditional Cost:\s*(\d+)/i;
    const tradCostMatch = sectionMatch[1].match(tradCostRegex);
    if (tradCostMatch && tradCostMatch[1]) {
      traditionalCost = parseInt(tradCostMatch[1], 10);
    }
    
    const toolCostRegex = /<li>Tool Cost:\s*(\d+)/i;
    const toolCostMatch = sectionMatch[1].match(toolCostRegex);
    if (toolCostMatch && toolCostMatch[1]) {
      toolCost = parseInt(toolCostMatch[1], 10);
    }
  }
  
  return {
    timeToHire: {
      traditional: traditionalTime,
      withTool: toolTime
    },
    costSavings: {
      traditional: traditionalCost,
      withTool: toolCost
    }
  };
}

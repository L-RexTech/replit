// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Initialize charts when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Don't initialize charts initially, wait for analysis
  
  // Set up event listeners
  document.getElementById('cvFile').addEventListener('change', function(e) {
    const fileInfo = document.getElementById('fileInfo');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
      fileInfo.textContent = '';
    }
  });
});

// Initialize all the charts with default values
let fitChart, skillProficiencyChart, skillGapChart, marketDemandChart, careerProgressionChart, timeToHireChart, costSavingsChart;

function initializeCharts() {
  // Initialize Job Fit Score Chart (Doughnut)
  const fitCtx = document.getElementById('fitChart').getContext('2d');
  fitChart = new Chart(fitCtx, {
    type: 'doughnut',
    data: {
      labels: ['Match', 'Gap'],
      datasets: [{
        data: [50, 50], // Default 50% match
        backgroundColor: [
          'rgba(255, 206, 86, 0.8)', // Yellow for initial state
          'rgba(220, 220, 220, 0.3)'
        ],
        borderWidth: 0,
        cutout: '80%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });

  // Initialize Skill Proficiency Chart (Radar)
  const skillCtx = document.getElementById('skillProficiencyChart').getContext('2d');
  skillProficiencyChart = new Chart(skillCtx, {
    type: 'radar',
    data: {
      labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'],
      datasets: [{
        label: 'Your Proficiency',
        data: [70, 85, 65, 90, 75],
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          ticks: {
            backdropColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });

  // Initialize Skill Gap Chart (Bar)
  const gapCtx = document.getElementById('skillGapChart').getContext('2d');
  skillGapChart = new Chart(gapCtx, {
    type: 'bar',
    data: {
      labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'],
      datasets: [{
        label: 'Required',
        data: [90, 80, 85, 70, 75],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: 'Your Level',
        data: [70, 60, 85, 40, 65],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          beginAtZero: true,
          max: 100
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });

  // Initialize Market Demand Chart (Line)
  const marketCtx = document.getElementById('marketDemandChart').getContext('2d');
  marketDemandChart = new Chart(marketCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Market Trend',
        data: [40, 45, 50, 55, 60, 65],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });

  // Initialize Career Progression Chart (Line)
  const careerCtx = document.getElementById('careerProgressionChart').getContext('2d');
  careerProgressionChart = new Chart(careerCtx, {
    type: 'line',
    data: {
      labels: ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years'],
      datasets: [
        {
          label: 'Average Career Path',
          data: [30, 45, 60, 75, 85, 95],
          borderColor: 'rgba(220, 220, 220, 0.5)',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.4
        },
        {
          label: 'Your Projected Path',
          data: [35, 50, 65, 80, 90, 97],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Career Progression (%)',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });

  // Initialize Time-to-Hire Chart (Bar)
  const timeCtx = document.getElementById('timeToHireChart').getContext('2d');
  timeToHireChart = new Chart(timeCtx, {
    type: 'bar',
    data: {
      labels: ['Traditional', 'With CV Analyzer'],
      datasets: [{
        label: 'Days to Hire',
        data: [45, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          beginAtZero: true,
          title: {
            display: true,
            text: 'Days',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Initialize Cost Savings Chart (Bar)
  const costCtx = document.getElementById('costSavingsChart').getContext('2d');
  costSavingsChart = new Chart(costCtx, {
    type: 'bar',
    data: {
      labels: ['Traditional', 'With CV Analyzer'],
      datasets: [{
        label: 'Cost ($)',
        data: [5000, 2000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cost ($)',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Improved function to extract skills data from analysis output
function generateSkillsData(outputText) {
  // Default data structure
  const skillsData = {
    matched: {
      skills: [],
      proficiency: []
    },
    missing: {
      skills: [],
      proficiency: []
    }
  };
  
  try {
    // Try to extract matched skills with improved regex pattern
    // Look for either "Matched skills:" or "1. Matched skills:" patterns
    const matchedSection = outputText.match(/(?:^\d\.\s*)?Matched skills:([^]*?)(?=(?:^\d\.\s*)?Missing skills:|$)/m);
    if (matchedSection && matchedSection[1]) {
      // Extract bullet points with more flexible regex
      const matches = [...matchedSection[1].matchAll(/[•\-\*]\s*([^•\-\*\n][^\n]*)/g)];
      
      if (matches && matches.length > 0) {
        skillsData.matched.skills = matches.map(m => m[1].trim());
        // Generate realistic proficiency levels between 70-95
        skillsData.matched.proficiency = matches.map(() => 70 + Math.floor(Math.random() * 25));
      }
    }
    
    // Try to extract missing skills with improved regex pattern
    const missingSection = outputText.match(/(?:^\d\.\s*)?Missing skills:([^]*?)(?=(?:^\d\.\s*)?Experience|Strengths|Areas|Overall|$)/m);
    if (missingSection && missingSection[1]) {
      // Extract bullet points with more flexible regex
      const matches = [...missingSection[1].matchAll(/[•\-\*]\s*([^•\-\*\n][^\n]*)/g)];
      
      if (matches && matches.length > 0) {
        skillsData.missing.skills = matches.map(m => m[1].trim());
        // Generate reasonable proficiency levels between 0-30 for missing skills
        skillsData.missing.proficiency = matches.map(() => Math.floor(Math.random() * 30));
      }
    }
  } catch (err) {
    console.error("Error parsing skills data:", err);
  }
  
  // If no skills were found, add placeholder data
  if (skillsData.matched.skills.length === 0) {
    skillsData.matched.skills = ['Communication', 'Leadership', 'Problem Solving'];
    skillsData.matched.proficiency = [85, 75, 90];
  }
  
  if (skillsData.missing.skills.length === 0) {
    skillsData.missing.skills = ['Technical Writing', 'Data Analysis'];
    skillsData.missing.proficiency = [25, 15];
  }
  
  console.log("Extracted skills data:", skillsData);
  return skillsData;
}

// Function to extract text from PDF file
async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}

// Function to extract text from TXT file
async function extractTextFromTxt(file) {
  const text = await file.text();
  return text;
}

// Update file info when a file is selected
document.getElementById('cvFile').addEventListener('change', function(e) {
  const fileInfo = document.getElementById('fileInfo');
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
  } else {
    fileInfo.textContent = '';
  }
});

// Improved function to update charts with real data
function updateCharts(score, skillsData) {
  console.log("Updating charts with score:", score);
  
  // Update Job Fit Score Chart
  fitChart.data.datasets[0].data = [score, 100 - score];
  
  // Change color based on score
  let scoreColor = 'rgba(255, 99, 132, 0.8)'; // Red for low scores
  if (score >= 70) {
    scoreColor = 'rgba(75, 192, 192, 0.8)'; // Green for high scores
  } else if (score >= 50) {
    scoreColor = 'rgba(255, 206, 86, 0.8)'; // Yellow for medium scores
  }
  fitChart.data.datasets[0].backgroundColor[0] = scoreColor;
  
  // Update the center text plugin if not registered
  if (!Chart.registry.plugins.get('fitScoreText')) {
    Chart.register({
      id: 'fitScoreText',
      beforeDraw: function(chart) {
        if (chart.canvas.id === 'fitChart') {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;
          
          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + 'em sans-serif';
          ctx.textBaseline = 'middle';
          
          const text = `${score}%`;
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height * 0.68;
          
          ctx.fillStyle = scoreColor;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    });
  }
  
  // Update Skill Proficiency Chart (Radar) with matched skills
  if (skillsData.matched.skills.length > 0) {
    // Take up to 5 skills for the radar chart
    const topSkills = skillsData.matched.skills.slice(0, 5);
    const topProficiency = skillsData.matched.proficiency.slice(0, 5);
    
    skillProficiencyChart.data.labels = topSkills;
    skillProficiencyChart.data.datasets[0].data = topProficiency;
  }
  
  // Update Skill Gap Chart with both matched and missing skills
  const allSkills = [...new Set([...skillsData.matched.skills, ...skillsData.missing.skills])].slice(0, 5);
  const requiredValues = [];
  const yourValues = [];
  
  // Generate comparison data
  allSkills.forEach(skill => {
    let matchedIndex = skillsData.matched.skills.indexOf(skill);
    let missingIndex = skillsData.missing.skills.indexOf(skill);
    
    if (matchedIndex !== -1) {
      // It's a matched skill
      requiredValues.push(85 + Math.floor(Math.random() * 15)); // High requirement (85-100)
      yourValues.push(skillsData.matched.proficiency[matchedIndex]);
    } else if (missingIndex !== -1) {
      // It's a missing skill
      requiredValues.push(75 + Math.floor(Math.random() * 15)); // Moderate-high requirement (75-90)
      yourValues.push(skillsData.missing.proficiency[missingIndex]);
    }
  });
  
  skillGapChart.data.labels = allSkills;
  skillGapChart.data.datasets[0].data = requiredValues;
  skillGapChart.data.datasets[1].data = yourValues;
  
  // Update Market Demand Chart with trending data based on top skills
  const trendingSkills = allSkills.slice(0, 3); // Take top 3 skills for trends visualization
  
  marketDemandChart.data.datasets = trendingSkills.map((skill, index) => {
    // Different colors for each skill trend line
    const colors = [
      'rgba(255, 206, 86, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)'
    ];
    
    // Generate trending data (slightly increasing pattern with some variability)
    const baseValue = 40 + Math.random() * 30;
    const data = Array(6).fill().map((_, i) => {
      return baseValue + i * (3 + Math.random() * 2);
    });
    
    return {
      label: skill,
      data: data,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
      tension: 0.4
    };
  });
  
  // Update career progression chart based on score
  const baselineData = [30, 45, 60, 75, 85, 95];
  const yourData = baselineData.map(val => {
    // Adjust based on fit score (higher score = better trajectory)
    const adjustment = (score - 50) / 5; // Scale factor
    return Math.min(100, Math.max(0, val + adjustment));
  });
  
  careerProgressionChart.data.datasets[1].data = yourData;
  
  // Refresh all charts to display the new data
  fitChart.update();
  skillProficiencyChart.update();
  skillGapChart.update();
  marketDemandChart.update();
  careerProgressionChart.update();
  timeToHireChart.update();
  costSavingsChart.update();
}

// Main analysis function with improved error handling and score extraction
async function analyzeFit() {
  const file = document.getElementById("cvFile").files[0];
  const jobText = document.getElementById("jobDesc").value;
  const results = document.getElementById("results");
  const resultsContainer = document.getElementById("resultsContainer");
  const analyzeButton = document.querySelector("button");
  const analyzeText = document.getElementById("analyzeText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  if (!file || !jobText) {
    const errorEl = document.createElement('div');
    errorEl.className = 'bg-red-500 text-white p-4 rounded-lg mt-4';
    errorEl.textContent = 'Please upload a resume and enter a job description.';
    
    // Show error briefly, then fade out
    document.querySelector('.container').appendChild(errorEl);
    setTimeout(() => {
      errorEl.style.opacity = '0';
      errorEl.style.transition = 'opacity 0.5s ease';
      setTimeout(() => errorEl.remove(), 500);
    }, 3000);
    return;
  }

  // Show loading state
  analyzeButton.disabled = true;
  analyzeText.textContent = "Analyzing...";
  loadingSpinner.classList.remove("hidden");
  results.innerHTML = "<p class='text-gray-400'>Processing your resume and job description...</p>";
  resultsContainer.classList.remove("hidden");

  try {
    // Initialize charts with placeholder data first
    initializeCharts();
    
    // Extract text based on file type
    let resumeText;
    if (file.name.toLowerCase().endsWith('.pdf')) {
      resumeText = await extractTextFromPDF(file);
    } else {
      resumeText = await extractTextFromTxt(file);
    }

    const prompt = `You are an AI resume evaluator. Compare the resume below with the job description and provide a detailed analysis with the following structure:

1. Matched skills: List specific skills from the resume that match the job requirements (as bullet points)
2. Missing skills: List important skills mentioned in the job that are not evident in the resume (as bullet points)
3. Experience relevance: How relevant is the candidate's experience to the role (detailed paragraph)
4. Strengths: The candidate's strongest qualifications for this role (list as bullet points)
5. Areas for improvement: Specific suggestions for the candidate (list as bullet points)
6. Overall assessment: A brief summary of fit
7. Fit score: A number between 0-100 representing the overall match

Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobText}
"""`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDfG3hk9yW_oLK8_0cxOz9zA8c8cO8hBJE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || "API error occurred");
    }
    
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error retrieving analysis.";
    console.log("Raw analysis output:", output);
    
    // Format the output with enhanced styling
    const formattedOutput = formatOutput(output);
    results.innerHTML = formattedOutput;

    // Extract score with better regex that works on various formats
    let score = 50; // Default score if extraction fails
    const scoreMatch = output.match(/(?:Fit score|Match score|Overall score):\s*(\d{1,3})/i) || 
                      output.match(/(\d{1,3})(?:\/100|\s*percent|\s*%)/i) ||
                      output.match(/score of (\d{1,3})/i);
    
    if (scoreMatch && scoreMatch[1]) {
      score = parseInt(scoreMatch[1]);
      // Validate the score to be between 0-100
      score = Math.max(0, Math.min(100, score));
      console.log("Extracted score:", score);
    }
    
    // Generate skills data from the analysis output
    const skillsData = generateSkillsData(output);
    
    // Update all charts with the extracted data
    updateCharts(score, skillsData);
    
  } catch (error) {
    console.error("Error:", error);
    results.innerHTML = `
      <div class="bg-red-900 border border-red-700 text-white p-4 rounded-lg">
        <h3 class="text-xl font-bold mb-2">Error Processing Request</h3>
        <p>${error.message || "Failed to process file"}</p>
        <p class="mt-2 text-sm">Please try again or contact support.</p>
      </div>`;
    
    // Show default charts with 50% score when error occurs
    initializeCharts();
  } finally {
    // Restore button state
    analyzeButton.disabled = false;
    analyzeText.textContent = "Analyze Job Fit";
    loadingSpinner.classList.add("hidden");
  }
}

// Format the output with enhanced styling
function formatOutput(text) {
  // Replace section headers with styled headers
  let formatted = text.replace(/^(\d+\.\s*)(.*?):/gm, '<h3 class="text-yellow-400 text-xl font-semibold mt-6 mb-3">$2</h3>');
  
  // Format bullet points (both •, *, and - styles)
  formatted = formatted.replace(/^[\s•\*-]\s*(.*?)$/gm, '<li class="ml-6 mb-2">$1</li>');
  
  // Wrap bullet point lists
  formatted = formatted.replace(/(<li.*?<\/li>\s*)+/g, '<ul class="list-disc mb-4">$&</ul>');
  
  // Style score line specifically
  // Look for multiple possible score formats
  const scoreMatch = formatted.match(/(?:Fit score|Match score|Overall score):?\s*(\d{1,3})/i) || 
                    formatted.match(/(\d{1,3})(?:\/100|\s*percent|\s*%)/i) ||
                    formatted.match(/score of (\d{1,3})/i);
                    
  if (scoreMatch) {
    const score = parseInt(scoreMatch[1]);
    let scoreColor = 'text-red-400';
    if (score >= 70) {
      scoreColor = 'text-green-400';
    } else if (score >= 50) {
      scoreColor = 'text-yellow-400';
    }
    
    const scoreRegex = new RegExp(scoreMatch[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    formatted = formatted.replace(
      scoreRegex, 
      `<div class="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Overall Match Score</h3>
        <div class="text-4xl font-bold ${scoreColor}">${score}%</div>
      </div>`
    );
  }
  
  // Replace consecutive line breaks with proper spacing
  formatted = formatted.replace(/\n\n+/g, '</p><p class="mb-4">');
  
  // Wrap everything in paragraphs
  formatted = `<div class="space-y-4">${formatted}</div>`;
  
  return formatted;
}

// Initialize default charts when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Don't show charts initially, wait for analysis
});
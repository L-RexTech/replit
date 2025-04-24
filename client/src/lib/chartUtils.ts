import { Chart } from "chart.js";
import { AnalysisData } from "@/pages/Analyzer";

export function initializeCharts(data: AnalysisData): { [key: string]: Chart } {
  const charts: { [key: string]: Chart } = {};

  // Initialize Job Fit Score Chart (Doughnut)
  const fitCtx = document.getElementById('fitChart') as HTMLCanvasElement;
  if (fitCtx) {
    charts.fitChart = new Chart(fitCtx, {
      type: 'doughnut',
      data: {
        labels: ['Match', 'Gap'],
        datasets: [{
          data: [data.jobFitScore, 100 - data.jobFitScore],
          backgroundColor: [
            'rgba(255, 206, 86, 0.8)',
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
  }

  // Initialize Skill Proficiency Chart (Radar)
  const skillCtx = document.getElementById('skillProficiencyChart') as HTMLCanvasElement;
  if (skillCtx) {
    charts.skillProficiencyChart = new Chart(skillCtx, {
      type: 'radar',
      data: {
        labels: data.matchedSkills.map(skill => skill.name),
        datasets: [{
          label: 'Your Proficiency',
          data: data.matchedSkills.map(skill => skill.proficiency),
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
  }

  // Initialize Skill Gap Chart (Bar)
  const gapCtx = document.getElementById('skillGapChart') as HTMLCanvasElement;
  if (gapCtx) {
    // Create a combined list of skills
    const allSkills = [
      ...data.matchedSkills.map(s => s.name),
      ...data.missingSkills.map(s => s.name)
    ];
    
    // Create a map of skill proficiencies
    const yourSkills: {[key: string]: number} = {};
    data.matchedSkills.forEach(s => { yourSkills[s.name] = s.proficiency; });
    data.missingSkills.forEach(s => { yourSkills[s.name] = s.proficiency; });
    
    // Create required levels (typically higher than your level)
    const requiredLevels: {[key: string]: number} = {};
    allSkills.forEach(skill => {
      requiredLevels[skill] = Math.min(Math.max(yourSkills[skill] + 15, 75), 95);
    });
    
    charts.skillGapChart = new Chart(gapCtx, {
      type: 'bar',
      data: {
        labels: allSkills,
        datasets: [{
          label: 'Required',
          data: allSkills.map(skill => requiredLevels[skill]),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Your Level',
          data: allSkills.map(skill => yourSkills[skill]),
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
  }

  // Initialize Market Demand Chart (Line)
  const marketCtx = document.getElementById('marketDemandChart') as HTMLCanvasElement;
  if (marketCtx) {
    charts.marketDemandChart = new Chart(marketCtx, {
      type: 'line',
      data: {
        labels: data.marketDemand.labels,
        datasets: [{
          label: 'Market Trend',
          data: data.marketDemand.values,
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
  }

  // Initialize Career Progression Chart (Line)
  const careerCtx = document.getElementById('careerProgressionChart') as HTMLCanvasElement;
  if (careerCtx) {
    charts.careerProgressionChart = new Chart(careerCtx, {
      type: 'line',
      data: {
        labels: ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years'],
        datasets: [
          {
            label: 'Average Career Path',
            data: data.careerProjection.average,
            borderColor: 'rgba(220, 220, 220, 0.5)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4
          },
          {
            label: 'Your Projected Path',
            data: data.careerProjection.projected,
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
  }

  // Initialize Time-to-Hire Chart (Bar)
  const timeCtx = document.getElementById('timeToHireChart') as HTMLCanvasElement;
  if (timeCtx) {
    charts.timeToHireChart = new Chart(timeCtx, {
      type: 'bar',
      data: {
        labels: ['Traditional', 'With CV Analyzer'],
        datasets: [{
          label: 'Days to Hire',
          data: [
            data.businessMetrics.timeToHire.traditional,
            data.businessMetrics.timeToHire.withTool
          ],
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
  }

  // Initialize Cost Savings Chart (Bar)
  const costCtx = document.getElementById('costSavingsChart') as HTMLCanvasElement;
  if (costCtx) {
    charts.costSavingsChart = new Chart(costCtx, {
      type: 'bar',
      data: {
        labels: ['Traditional', 'With CV Analyzer'],
        datasets: [{
          label: 'Cost ($)',
          data: [
            data.businessMetrics.costSavings.traditional,
            data.businessMetrics.costSavings.withTool
          ],
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

  return charts;
}

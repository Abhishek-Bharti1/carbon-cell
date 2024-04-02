import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function PopulationGraph() {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => {
        const data = response?.data.data.map(entry => ({
          x: entry.Nation,
          y: entry.Population
        }));
        setPopulationData(data);
      })
      .catch(error => console.error('Error fetching population data:', error));
  }, []);

  useEffect(() => {
    let chartInstance = null;
    
    if (populationData) {
      const ctx = document.getElementById('populationChart');
      
      // Destroy existing chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: populationData.map(entry => entry.x),
          datasets: [{
            label: 'Population',
            data: populationData.map(entry => entry.y),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Population'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          responsive: true
        }
      });
    }
    
    // Clean up function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [populationData]);


  return (
    <div>
      <h2>Population Data</h2>
      <div className='chart'>
        <canvas id='populationChart' height="100px" ></canvas>
      </div>
    </div>
  );
}

export default PopulationGraph;

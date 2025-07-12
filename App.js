import React, { useState, useEffect } from 'react';
import { getTransactionCount } from './api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [txCounts, setTxCounts] = useState({});

  useEffect(() => {
    getTransactionCount().then(counts => setTxCounts(counts));
  }, []);

  const chartData = {
    labels: chains,
    datasets: [
      {
        label: 'Transaction Count',
        data: chains.map(chain => txCounts[chain] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Union Transaction Dashboard</h1>
      <Bar data={chartData} />
      <ul>
        {chains.map(chain => (
          <li key={chain}>{chain}: {txCounts[chain] || 0} transactions</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
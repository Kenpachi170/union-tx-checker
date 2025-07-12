import React, { useState, useEffect } from 'react';
import { getTransactionCount } from './api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { chains } from './config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [txCounts, setTxCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTransactionCount()
      .then(counts => {
        setTxCounts(counts);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load transaction data. Check console for details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
      {Object.values(txCounts).every(count => count === 0) ? (
        <p>No transaction data available.</p>
      ) : (
        <Bar data={chartData} />
      )}
      <ul>
        {chains.map(chain => (
          <li key={chain}>{chain}: {txCounts[chain] || 0} transactions</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

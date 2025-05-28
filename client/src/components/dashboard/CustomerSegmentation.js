// Customer Segmentation Component
// client/src/components/dashboard/CustomerSegmentation.js

import React from 'react';
import { Paper, Typography, CircularProgress, Grid } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const CustomerSegmentation = () => {
  const loading = false; // Replace with actual loading state from Redux

  const data = {
    labels: ['New Customers', 'Repeat Customers', 'VIP Customers', 'At Risk Customers'],
    datasets: [
      {
        data: [35, 40, 15, 10],
        backgroundColor: ['#3f51b5', '#4caf50', '#ff9800', '#f44336'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 3, // 3 * 8px = 24px
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3, // marginBottom: 24px
        }}
      >
        Customer Segmentation
      </Typography>

      <div
        style={{
          height: 300,
          position: 'relative',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 16, // theme.spacing(2) = 16px
        }}
      >
        {data.labels.map((label, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 8, // theme.spacing(1) = 8px
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                marginRight: 8, // theme.spacing(1)
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            />
            <Typography variant="body2">
              {label} ({data.datasets[0].data[index]}%)
            </Typography>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default CustomerSegmentation;

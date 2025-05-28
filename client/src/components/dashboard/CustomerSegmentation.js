// client/src/components/dashboard/CustomerSegmentation.js

import React from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Divider,
  Tooltip,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const CustomerSegmentation = ({ loading = false, segmentationData = null }) => {
  // Example fallback data for static view/testing
  const fallbackData = {
    labels: ['New Customers', 'Repeat Customers', 'VIP Customers', 'At Risk Customers'],
    datasets: [
      {
        data: [35, 40, 15, 10],
        backgroundColor: ['#3f51b5', '#4caf50', '#ff9800', '#f44336'],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const data = segmentationData || fallbackData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
    },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        height: '100%',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={2}>
        Customer Segmentation
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box height={300} position="relative">
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </Box>

      <Grid container spacing={2} mt={2}>
        {data.labels.map((label, index) => (
          <Grid item xs={6} key={label}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '4px',
                  backgroundColor: data.datasets[0].backgroundColor[index],
                  mr: 1.5,
                }}
              />
              <Tooltip title={`Raw Value: ${data.datasets[0].data[index]}`}>
                <Typography variant="body2">
                  {label} ({data.datasets[0].data[index]}%)
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CustomerSegmentation;


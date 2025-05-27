// Customer Segmentation Component
// client/src/components/dashboard/CustomerSegmentation.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress, Grid } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    height: '100%',
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  chartContainer: {
    height: 300,
    position: 'relative',
  },
  legendContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: theme.spacing(1),
  },
}));

const CustomerSegmentation = () => {
  const classes = useStyles();
  
  const loading = false; // Replace with actual loading state from Redux
  
  const data = {
    labels: ['New Customers', 'Repeat Customers', 'VIP Customers', 'At Risk Customers'],
    datasets: [
      {
        data: [35, 40, 15, 10],
        backgroundColor: [
          '#3f51b5',
          '#4caf50',
          '#ff9800',
          '#f44336',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
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
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h5" className={classes.title}>
        Customer Segmentation
      </Typography>
      
      <div className={classes.chartContainer}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
      
      <div className={classes.legendContainer}>
        {data.labels.map((label, index) => (
          <div key={index} className={classes.legendItem}>
            <div 
              className={classes.legendColor} 
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
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
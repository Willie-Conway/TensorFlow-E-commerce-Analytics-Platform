// client/src/components/dashboard/SalesChart.js - Sales visualization component

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSalesData, getPredictions } from '../../redux/actions/analyticsActions';
// import { Line } from 'react-chartjs-2';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(3),
//     marginBottom: theme.spacing(3),
//   },
//   title: {
//     marginBottom: theme.spacing(3),
//   },
//   progress: {
//     display: 'flex',
//     justifyContent: 'center',
//     margin: theme.spacing(3),
//   },
// }));

// const SalesChart = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const { salesData, loading } = useSelector((state) => state.analytics);
//   const { predictions, predictionsLoading } = useSelector((state) => state.analytics);

//   useEffect(() => {
//     dispatch(getSalesData());
//     dispatch(getPredictions());
//   }, [dispatch]);

//   const chartData = {
//     labels: salesData?.map((item) => item._id) || [],
//     datasets: [
//       {
//         label: 'Sales Amount',
//         data: salesData?.map((item) => item.totalSales) || [],
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   const predictionData = {
//     labels: predictions?.map((item) => item.date) || [],
//     datasets: [
//       {
//         label: 'Predicted Sales',
//         data: predictions?.map((item) => item.predictedSales) || [],
//         fill: false,
//         backgroundColor: 'rgba(255,99,132,0.4)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderDash: [5, 5],
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Sales Analytics',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <>
//       <Paper className={classes.paper}>
//         <Typography variant="h5" className={classes.title}>
//           Historical Sales Data
//         </Typography>
//         {loading ? (
//           <div className={classes.progress}>
//             <CircularProgress />
//           </div>
//         ) : (
//           <Line data={chartData} options={options} />
//         )}
//       </Paper>

//       <Paper className={classes.paper}>
//         <Typography variant="h5" className={classes.title}>
//           Sales Predictions (Next 7 Days)
//         </Typography>
//         {predictionsLoading ? (
//           <div className={classes.progress}>
//             <CircularProgress />
//           </div>
//         ) : predictions && predictions.length > 0 ? (
//           <Line data={predictionData} options={options} />
//         ) : (
//           <Typography variant="body1">
//             Not enough data available for predictions
//           </Typography>
//         )}
//       </Paper>
//     </>
//   );
// };

// export default SalesChart;

// Advanced Sales Chart with Time Filters
// client/src/components/dashboard/SalesChart.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Paper, 
  Typography, 
  CircularProgress, 
  Grid, 
  Tabs, 
  Tab, 
  MenuItem, 
  Select, 
  FormControl,
  InputLabel
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { getSalesData, getPredictions } from '../../redux/actions/analyticsActions';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontWeight: 600,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  },
  tab: {
    minWidth: 80,
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
      width: '100%',
    },
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  chartContainer: {
    height: 400,
    marginTop: theme.spacing(2),
  },
}));

const timeRanges = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last year' },
];

const chartTypes = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'orders', label: 'Orders' },
  { value: 'average', label: 'Average Order' },
];

const SalesChart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { salesData, loading } = useSelector((state) => state.analytics);
  const { predictions, predictionsLoading } = useSelector((state) => state.analytics);
  
  const [timeRange, setTimeRange] = useState('30');
  const [chartType, setChartType] = useState('revenue');
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    dispatch(getSalesData(timeRange));
    if (showPredictions) {
      dispatch(getPredictions());
    }
  }, [dispatch, timeRange, showPredictions]);

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d');
  };

  const getChartData = () => {
    const labels = salesData?.map((item) => formatDate(item._id)) || [];
    const revenueData = salesData?.map((item) => item.totalSales) || [];
    const ordersData = salesData?.map((item) => item.count) || [];
    const averageData = salesData?.map((item) => item.totalSales / item.count) || [];

    const data = {
      labels,
      datasets: [
        {
          label: chartType === 'revenue' ? 'Revenue ($)' : 
                chartType === 'orders' ? 'Orders' : 'Average Order Value ($)',
          data: chartType === 'revenue' ? revenueData : 
               chartType === 'orders' ? ordersData : averageData,
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#3f51b5',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3,
        },
      ],
    };

    if (showPredictions && predictions && predictions.length > 0) {
      const predictionLabels = predictions?.map((item) => formatDate(item.date)) || [];
      const predictionData = predictions?.map((item) => item.predictedSales) || [];
      
      data.datasets.push({
        label: 'Predicted Revenue ($)',
        data: [...Array(salesData?.length || 0).fill(null), ...predictionData],
        borderColor: '#f50057',
        backgroundColor: 'rgba(245, 0, 87, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#f50057',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      });

      data.labels = [...labels, ...predictionLabels];
    }

    return data;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += chartType === 'revenue' || chartType === 'average' ? 
                      `$${context.parsed.y.toFixed(2)}` : context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#718096',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#718096',
          callback: function(value) {
            return chartType === 'revenue' || chartType === 'average' ? 
                  `$${value}` : value;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Sales Performance
        </Typography>
        <div className={classes.controls}>
          <Tabs
            value={timeRange}
            onChange={handleTimeRangeChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {timeRanges.map((range) => (
              <Tab 
                key={range.value} 
                value={range.value} 
                label={range.label} 
                className={classes.tab}
              />
            ))}
          </Tabs>
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel>Metric</InputLabel>
            <Select
              value={chartType}
              onChange={handleChartTypeChange}
              label="Metric"
            >
              {chartTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      
      <div className={classes.chartContainer}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        ) : (
          <Line data={getChartData()} options={options} />
        )}
      </div>
    </Paper>
  );
};

export default SalesChart;
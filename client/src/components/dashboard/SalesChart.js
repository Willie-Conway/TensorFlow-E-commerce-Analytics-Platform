// Advanced Sales Chart with Time Filters
// client/src/components/dashboard/SalesChart.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Line } from 'react-chartjs-2';
import { getSalesData, getPredictions } from '../../redux/actions/analyticsActions';
import { format } from 'date-fns';

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
  const dispatch = useDispatch();
  const { salesData, loading, error, predictions, predictionsLoading, predictionsError } = useSelector(
    (state) => state.analytics
  );

  const [timeRange, setTimeRange] = useState('30');
  const [chartType, setChartType] = useState('revenue');
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    dispatch(getSalesData(timeRange));
  }, [dispatch, timeRange]);

  useEffect(() => {
    if (showPredictions) {
      dispatch(getPredictions());
    }
  }, [dispatch, showPredictions]);

  const handleTimeRangeChange = (event, newValue) => {
    if (newValue !== null) setTimeRange(newValue);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const toggleShowPredictions = () => {
    setShowPredictions((prev) => !prev);
  };

  const formatDate = (dateString) => format(new Date(dateString), 'MMM d');

  const getChartData = () => {
    if (!salesData) return { labels: [], datasets: [] };

    const labels = salesData.map((item) => formatDate(item._id));
    const revenueData = salesData.map((item) => item.totalSales);
    const ordersData = salesData.map((item) => item.count);
    const averageData = salesData.map((item) => item.totalSales / (item.count || 1));

    const mainData =
      chartType === 'revenue' ? revenueData : chartType === 'orders' ? ordersData : averageData;

    const data = {
      labels: [...labels],
      datasets: [
        {
          label:
            chartType === 'revenue'
              ? 'Revenue ($)'
              : chartType === 'orders'
              ? 'Orders'
              : 'Average Order Value ($)',
          data: mainData,
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

    if (showPredictions && predictions?.length > 0 && chartType === 'revenue') {
      const predictionLabels = predictions.map((item) => formatDate(item.date));
      const predictionData = predictions.map((item) => item.predictedSales);

      data.datasets.push({
        label: 'Predicted Revenue ($)',
        data: [...Array(salesData.length).fill(null), ...predictionData],
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
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label +=
                chartType === 'revenue' || chartType === 'average'
                  ? `$${context.parsed.y.toFixed(2)}`
                  : context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#718096' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: '#718096',
          callback: (value) =>
            chartType === 'revenue' || chartType === 'average' ? `$${value}` : value,
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
    <Paper elevation={0} sx={{ padding: 3, height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sales Performance
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Tabs
            value={timeRange}
            onChange={handleTimeRangeChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Select time range"
          >
            {timeRanges.map((range) => (
              <Tab key={range.value} value={range.value} label={range.label} sx={{ minWidth: 80 }} />
            ))}
          </Tabs>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="metric-select-label">Metric</InputLabel>
            <Select
              labelId="metric-select-label"
              value={chartType}
              onChange={handleChartTypeChange}
              label="Metric"
              aria-label="Select chart metric"
            >
              {chartTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Tooltip title={showPredictions ? 'Hide Predictions' : 'Show Predictions'}>
            <FormControlLabel
              control={<Switch checked={showPredictions} onChange={toggleShowPredictions} color="primary" />}
              label="Show Predictions"
            />
          </Tooltip>
        </div>
      </div>

      {(loading || predictionsLoading) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </div>
      )}

      {(error || predictionsError) && (
        <Typography color="error" variant="body1">
          {error || predictionsError || 'Failed to load sales data.'}
        </Typography>
      )}

      {salesData?.length === 0 && !loading && (
        <Typography variant="body1">No sales data available for the selected range.</Typography>
      )}

      {salesData?.length > 0 && !loading && !predictionsLoading && !error && !predictionsError && (
        <div style={{ height: 400, marginTop: 16 }}>
          <Line data={getChartData()} options={options} />
        </div>
      )}
    </Paper>
  );
};

export default SalesChart;

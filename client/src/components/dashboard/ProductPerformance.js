// Enhanced Product Performance Component
// client/src/components/dashboard/ProductPerformance.js

import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Paper,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  subtitle: {
    marginTop: theme.spacing(1),
    color: '#718096',
  },
  formControl: {
    minWidth: 120,
    [theme.breakpoints.down('xs')]: {
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
    height: 300,
    marginTop: theme.spacing(2),
  },
}));

const ProductPerformance = () => {
  const classes = useStyles();

  const [metric, setMetric] = useState('sales');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/products/performance');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load product performance data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('chart-area');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape');
    pdf.text('Product Performance Report', 14, 20);
    pdf.addImage(imgData, 'PNG', 10, 30, 270, 100);
    pdf.save(`Product_Performance_${metric}.pdf`);
  };

  const handleDownloadCSV = () => {
    const wsData = [
      ['Product Name', metric.charAt(0).toUpperCase() + metric.slice(1)],
      ...products.map((p) => [p.name, p[metric] ?? 0]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    const blob = new Blob(
      [XLSX.write(workbook, { bookType: 'csv', type: 'array' })],
      { type: 'application/octet-stream' }
    );
    saveAs(blob, `Product_Performance_${metric}.csv`);
  };

  const chartData = useMemo(
    () => ({
      labels: products.map((product) => product.name),
      datasets: [
        {
          label: metric.charAt(0).toUpperCase() + metric.slice(1),
          data: products.map((product) => product[metric] ?? 0),
          backgroundColor:
            metric === 'sales'
              ? 'rgba(63, 81, 181, 0.7)'
              : metric === 'stock'
              ? 'rgba(76, 175, 80, 0.7)'
              : 'rgba(255, 152, 0, 0.7)',
          borderColor:
            metric === 'sales'
              ? 'rgba(63, 81, 181, 1)'
              : metric === 'stock'
              ? 'rgba(76, 175, 80, 1)'
              : 'rgba(255, 152, 0, 1)',
          borderWidth: 1,
        },
      ],
    }),
    [metric, products]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
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
            precision: 0,
          },
        },
      },
    }),
    []
  );

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.header}>
        <div>
          <Typography variant="h5" className={classes.title}>
            Product Performance
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            Metric: {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </Typography>
        </div>
        <FormControl variant="outlined" className={classes.formControl} size="small">
          <InputLabel>Metric</InputLabel>
          <Select value={metric} onChange={handleMetricChange} label="Metric">
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="stock">Stock</MenuItem>
            <MenuItem value="views">Views</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={classes.chartContainer} id="chart-area">
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      {!loading && !error && (
        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDownloadCSV}>
            Download CSV
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default ProductPerformance;

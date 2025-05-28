// Enhanced Product Performance Component with Drill-Down View
// client/src/components/dashboard/ProductPerformance.js

import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { 
  Paper, Typography, CircularProgress, 
  FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button 
} from '@mui/material';
import { Bar } from 'react-chartjs-2';

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
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedProduct(products[index]);
    }
  };

  const chartData = useMemo(() => ({
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
  }), [metric, products]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    onClick: (event, elements) => handleBarClick(elements),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#718096' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#718096', precision: 0 },
      },
    },
  }), [metric, products]);

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

      <div className={classes.chartContainer}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Drill-down Modal */}
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)} fullWidth maxWidth="sm">
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent dividers>
          {selectedProduct && (
            <>
              <Typography variant="h6">{selectedProduct.name}</Typography>
              <DialogContentText>
                <strong>Sales:</strong> {selectedProduct.sales}<br />
                <strong>Stock:</strong> {selectedProduct.stock}<br />
                <strong>Views:</strong> {selectedProduct.views}<br />
                <strong>Description:</strong> {selectedProduct.description || 'N/A'}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedProduct(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductPerformance;

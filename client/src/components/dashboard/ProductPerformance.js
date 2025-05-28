// client/src/components/dashboard/ProductPerformance.js - Product analytics component

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../../redux/actions/productActions';
// import { Bar } from 'react-chartjs-2';
// import { makeStyles } from '@mui/styles';
// import Paper from '	@mui/material/Paper';
// import Typography from '	@mui/material/Typography';
// import CircularProgress from '	@mui/material/CircularProgress';

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

// const ProductPerformance = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const { products, loading } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   // Prepare data for top performing products
//   const topProducts = [...(products || [])]
//     .sort((a, b) => b.sales - a.sales)
//     .slice(0, 5);

//   const chartData = {
//     labels: topProducts.map((product) => product.name),
//     datasets: [
//       {
//         label: 'Sales',
//         data: topProducts.map((product) => product.sales),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Stock',
//         data: topProducts.map((product) => product.stock),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
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
//         text: 'Top Performing Products',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <Paper className={classes.paper}>
//       <Typography variant="h5" className={classes.title}>
//         Product Performance
//       </Typography>
//       {loading ? (
//         <div className={classes.progress}>
//           <CircularProgress />
//         </div>
//       ) : (
//         <Bar data={chartData} options={options} />
//       )}
//     </Paper>
//   );
// };

// export default ProductPerformance;

// Enhanced Product Performance Component
// client/src/components/dashboard/ProductPerformance.js

import React from 'react';
import { makeStyles } from '@mui/styles';
import { 
  Paper, 
  Typography, 
  CircularProgress, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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
  
  const loading = false; // Replace with actual loading state from Redux
  const [metric, setMetric] = React.useState('sales');
  
  const products = [
    { name: 'Wireless Headphones', sales: 1250, stock: 85, views: 3250 },
    { name: 'Smart Watch', sales: 980, stock: 42, views: 2780 },
    { name: 'Bluetooth Speaker', sales: 750, stock: 63, views: 1950 },
    { name: 'Phone Case', sales: 620, stock: 120, views: 4200 },
    { name: 'USB-C Cable', sales: 580, stock: 200, views: 3800 },
  ];

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: metric === 'sales' ? 'Sales' : metric === 'stock' ? 'Stock' : 'Views',
        data: products.map((product) => product[metric]),
        backgroundColor: metric === 'sales' ? 'rgba(63, 81, 181, 0.7)' : 
                         metric === 'stock' ? 'rgba(76, 175, 80, 0.7)' : 'rgba(255, 152, 0, 0.7)',
        borderColor: metric === 'sales' ? 'rgba(63, 81, 181, 1)' : 
                     metric === 'stock' ? 'rgba(76, 175, 80, 1)' : 'rgba(255, 152, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Product Performance
        </Typography>
        <FormControl variant="outlined" className={classes.formControl} size="small">
          <InputLabel>Metric</InputLabel>
          <Select
            value={metric}
            onChange={handleMetricChange}
            label="Metric"
          >
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
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </Paper>
  );
};

export default ProductPerformance;
// client/src/components/dashboard/Dashboard.js - Main dashboard component

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// import SalesChart from './SalesChart';
// import ProductPerformance from './ProductPerformance';
// import KpiCards from './KpiCards';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     marginBottom: theme.spacing(3),
//   },
// }));

// const Dashboard = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Typography variant="h4" className={classes.title}>
//         E-commerce Analytics Dashboard
//       </Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <KpiCards />
//         </Grid>
        
//         <Grid item xs={12}>
//           <SalesChart />
//         </Grid>
        
//         <Grid item xs={12}>
//           <ProductPerformance />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;



// Professional Dashboard Layout
// client/src/components/dashboard/Dashboard.js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Hidden } from '@material-ui/core';
import clsx from 'clsx';

import SalesChart from './SalesChart';
import ProductPerformance from './ProductPerformance';
import KpiCards from './KpiCards';
import CustomerSegmentation from './CustomerSegmentation';
import RecentOrders from './RecentOrders';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  fullHeight: {
    height: '100%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Analytics Dashboard
      </Typography>
      
      <div className={classes.section}>
        <KpiCards />
      </div>
      
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <SalesChart />
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <CustomerSegmentation />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ProductPerformance />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <RecentOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

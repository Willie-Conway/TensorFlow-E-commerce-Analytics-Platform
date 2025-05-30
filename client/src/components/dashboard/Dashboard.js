// Professional Dashboard Layout
// client/src/components/dashboard/Dashboard.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import SalesChart from './SalesChart';
import ProductPerformance from './ProductPerformance';
import KpiCards from './KpiCards';
import CustomerSegmentation from './CustomerSegmentation';
import RecentOrders from './RecentOrders';

const Dashboard = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <Typography>Loading...</Typography>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3} color="text.primary">
        Analytics Dashboard
      </Typography>

      <Box mb={4}>
        <KpiCards />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ height: '100%' }}>
            <SalesChart />
          </Box>
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
    </Box>
  );
};

export default Dashboard;

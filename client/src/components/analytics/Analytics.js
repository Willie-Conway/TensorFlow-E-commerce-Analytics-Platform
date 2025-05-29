// client/src/components/analytics/Analytics.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// Sample data for summary cards
const summaryData = [
  { label: 'Total Sales', value: '$25,000' },
  { label: 'New Customers', value: '120' },
  { label: 'Returning Customers', value: '85' },
  { label: 'Revenue Growth', value: '15%' },
];

// Sample chart data
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4000 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 7000 },
];

// Sample table data and columns
const rows = [
  { id: 1, product: 'Product A', sales: 2400, revenue: 15000 },
  { id: 2, product: 'Product B', sales: 1398, revenue: 9000 },
  { id: 3, product: 'Product C', sales: 9800, revenue: 58000 },
  { id: 4, product: 'Product D', sales: 3908, revenue: 27000 },
];

const columns = [
  { field: 'product', headerName: 'Product', flex: 1 },
  { field: 'sales', headerName: 'Units Sold', type: 'number', flex: 1 },
  { field: 'revenue', headerName: 'Revenue ($)', type: 'number', flex: 1 },
];

const Analytics = () => {
  return (
    <Box mt={6} mb={2}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
    
      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        {summaryData.map(({ label, value }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}
            >
              <Typography variant="subtitle1">{label}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Sales Line Chart */}
      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Sales
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Sales Data Table */}
      <Paper elevation={3} sx={{ height: 350, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Product Sales Details
        </Typography>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Paper>
    </Box>
  );
};

export default Analytics;

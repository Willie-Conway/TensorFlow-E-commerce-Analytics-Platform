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
  { id: 1, product: 'iPhone 15 Pro', sales: 9800, revenue: 11760000 },
  { id: 2, product: 'Samsung Galaxy S23', sales: 8700, revenue: 9861000 },
  { id: 3, product: 'MacBook Air M2', sales: 4300, revenue: 5157000 },
  { id: 4, product: 'Sony WH-1000XM5', sales: 5400, revenue: 1798200 },
  { id: 5, product: 'AirPods Pro 2', sales: 6200, revenue: 1612000 },
  { id: 6, product: 'Apple Watch Series 9', sales: 4100, revenue: 1599000 },
  { id: 7, product: 'Dell XPS 13', sales: 3700, revenue: 5406000 },
  { id: 8, product: 'Logitech MX Master 3S', sales: 6900, revenue: 758100 },
  { id: 9, product: 'Bose QuietComfort 45', sales: 3100, revenue: 1073600 },
  { id: 10, product: 'Oculus Quest 2', sales: 7200, revenue: 2152800 },
  { id: 11, product: 'Google Pixel 8', sales: 3600, revenue: 2880000 },
  { id: 12, product: 'Kindle Paperwhite', sales: 5300, revenue: 902100 },
  { id: 13, product: 'Nikon Z6 II', sales: 2200, revenue: 4397800 },
  { id: 14, product: 'Canon EOS R7', sales: 1900, revenue: 3278000 },
  { id: 15, product: 'iPad Air', sales: 5800, revenue: 3132000 },
  { id: 16, product: 'ASUS ROG Zephyrus', sales: 1500, revenue: 3300000 },
  { id: 17, product: 'HP Spectre x360', sales: 1700, revenue: 2890000 },
  { id: 18, product: 'GoPro HERO11', sales: 6400, revenue: 2304000 },
  { id: 19, product: 'JBL Flip 6', sales: 8600, revenue: 774000 },
  { id: 20, product: 'Anker PowerCore 20K', sales: 7200, revenue: 432000 },
  { id: 21, product: 'Fitbit Charge 6', sales: 5400, revenue: 756000 },
  { id: 22, product: 'Nest Thermostat', sales: 2300, revenue: 575000 },
  { id: 23, product: 'Apple TV 4K', sales: 4800, revenue: 864000 },
  { id: 24, product: 'Ring Video Doorbell Pro 2', sales: 3500, revenue: 875000 },
  { id: 25, product: 'Tile Pro Tracker', sales: 6900, revenue: 344400 },
  { id: 26, product: 'Roku Streaming Stick 4K', sales: 7100, revenue: 355000 },
  { id: 27, product: 'Sony PS5', sales: 9500, revenue: 4750000 },
  { id: 28, product: 'Xbox Series X', sales: 8700, revenue: 4347000 },
  { id: 29, product: 'Nintendo Switch OLED', sales: 6300, revenue: 2079000 },
  { id: 30, product: 'Samsung Galaxy Tab S9', sales: 3400, revenue: 2380000 },
  { id: 31, product: 'Echo Dot (5th Gen)', sales: 8000, revenue: 320000 },
  { id: 32, product: 'Philips Hue Starter Kit', sales: 4900, revenue: 980000 },
  { id: 33, product: 'DJI Mini 3 Pro', sales: 1700, revenue: 1615000 },
  { id: 34, product: 'WD My Passport SSD 1TB', sales: 5200, revenue: 499600 },
  { id: 35, product: 'Samsung T7 Shield SSD', sales: 4200, revenue: 504000 },
  { id: 36, product: 'BenQ 27" 4K Monitor', sales: 2500, revenue: 1125000 },
  { id: 37, product: 'Lacie Rugged SSD 1TB', sales: 1600, revenue: 368000 },
  { id: 38, product: 'Corsair K95 RGB Keyboard', sales: 3100, revenue: 619000 },
  { id: 39, product: 'Razer DeathAdder V2', sales: 4600, revenue: 299000 },
  { id: 40, product: 'HyperX Cloud II Headset', sales: 5700, revenue: 684000 },
  { id: 41, product: 'Apple Magic Keyboard', sales: 4500, revenue: 495000 },
  { id: 42, product: 'Lenovo ThinkPad X1', sales: 2900, revenue: 4640000 },
  { id: 43, product: 'Surface Laptop Studio', sales: 2400, revenue: 3840000 },
  { id: 44, product: 'Alienware Aurora R15', sales: 1800, revenue: 5040000 },
  { id: 45, product: 'CyberPowerPC Gamer Xtreme', sales: 2700, revenue: 2970000 },
  { id: 46, product: 'MSI Gaming Laptop', sales: 3200, revenue: 4096000 },
  { id: 47, product: 'Thermaltake PC Case', sales: 3300, revenue: 594000 },
  { id: 48, product: 'Corsair PSU 750W', sales: 4100, revenue: 533000 },
  { id: 49, product: 'Samsung QLED 55" TV', sales: 2300, revenue: 1840000 },
  { id: 50, product: 'LG C3 OLED 65"', sales: 1200, revenue: 2880000 },
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

// Enhanced KPI Cards Component
// client/src/components/dashboard/KpiCards.js

import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  LinearProgress,
  Box,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Equalizer as EqualizerIcon,
  MonetizationOn as MonetizationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const KpiCards = () => {
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$24,345',
      difference: 12.5,
      icon: <MonetizationOnIcon />,
      progress: 75,
    },
    {
      title: 'Total Orders',
      value: '1,235',
      difference: 8.2,
      icon: <ShoppingCartIcon />,
      progress: 60,
    },
    {
      title: 'New Customers',
      value: '342',
      difference: -3.1,
      icon: <PeopleIcon />,
      progress: 45,
    },
    {
      title: 'Conversion Rate',
      value: '3.42%',
      difference: 0,
      icon: <EqualizerIcon />,
      progress: 30,
    },
  ];

  return (
    <Grid container spacing={3}>
      {kpiData.map((kpi, index) => {
        const isPositive = kpi.difference > 0;
        const isNegative = kpi.difference < 0;

        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                {kpi.icon}
              </Avatar>

              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  mb: 1,
                }}
              >
                {kpi.title}
              </Typography>

              <Typography variant="h5" fontWeight={700} mb={1}>
                {kpi.value}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                sx={{
                  fontSize: '0.875rem',
                  color: isPositive
                    ? 'success.main'
                    : isNegative
                    ? 'error.main'
                    : 'warning.main',
                }}
              >
                {isPositive && <ArrowUpwardIcon fontSize="small" />}
                {isNegative && <ArrowDownwardIcon fontSize="small" />}
                {!isPositive && !isNegative && '—'}
                <Box ml={0.5}>
                  {kpi.difference !== 0
                    ? `${Math.abs(kpi.difference)}% ${
                        isPositive ? 'increase' : 'decrease'
                      }`
                    : 'No change'}
                </Box>
              </Box>

              <LinearProgress
                variant="determinate"
                value={kpi.progress}
                sx={{
                  mt: 2,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: isPositive
                      ? 'success.main'
                      : isNegative
                      ? 'error.main'
                      : 'warning.main',
                  },
                }}
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default KpiCards;

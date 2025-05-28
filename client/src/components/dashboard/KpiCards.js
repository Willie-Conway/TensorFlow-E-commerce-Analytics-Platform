// Enhanced KPI Cards Component
// client/src/components/dashboard/KpiCards.js

import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Paper, Typography, Avatar, LinearProgress } from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Equalizer as EqualizerIcon,
  MonetizationOn as MonetizationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: theme.spacing(1),
  },
  value: {
    fontWeight: 700,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(1),
  },
  difference: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.warning.main,
  },
  icon: {
    height: 56,
    width: 56,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
}));

const KpiCards = () => {
  const classes = useStyles();

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
    <div className={classes.root}>
      <Grid container spacing={3}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper className={classes.paper} elevation={1}>
              <Avatar className={classes.icon}>
                {kpi.icon}
              </Avatar>
              <Typography className={classes.title} variant="subtitle2">
                {kpi.title}
              </Typography>
              <Typography className={classes.value} variant="h3">
                {kpi.value}
              </Typography>
              <div className={classes.difference}>
                {kpi.difference > 0 && (
                  <ArrowUpwardIcon className={classes.positive} fontSize="small" />
                )}
                {kpi.difference < 0 && (
                  <ArrowDownwardIcon className={classes.negative} fontSize="small" />
                )}
                {kpi.difference === 0 && (
                  <span className={classes.neutral}>—</span>
                )}
                <span className={kpi.difference > 0 ? classes.positive : kpi.difference < 0 ? classes.negative : classes.neutral}>
                  {kpi.difference !== 0 ? `${Math.abs(kpi.difference)}%` : 'No change'} 
                  {kpi.difference > 0 ? ' increase' : kpi.difference < 0 ? ' decrease' : ''}
                </span>
              </div>
              <LinearProgress 
                className={classes.progress}
                variant="determinate" 
                value={kpi.progress} 
                color={kpi.difference > 0 ? 'primary' : kpi.difference < 0 ? 'secondary' : 'inherit'}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KpiCards;
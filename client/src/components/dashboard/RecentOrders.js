// Recent Orders Component
// client/src/components/dashboard/RecentOrders.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Paper, 
  Typography, 
  CircularProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Avatar,
  Chip
} from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    height: '100%',
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  table: {
    minWidth: 650,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  customerCell: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    fontWeight: 500,
  },
  completed: {
    backgroundColor: green[100],
    color: green[800],
  },
  pending: {
    backgroundColor: orange[100],
    color: orange[800],
  },
  cancelled: {
    backgroundColor: red[100],
    color: red[800],
  },
}));

const RecentOrders = () => {
  const classes = useStyles();
  
  const loading = false; // Replace with actual loading state from Redux
  
  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Smith',
      avatar: 'JS',
      date: '2023-05-15',
      amount: 125.99,
      status: 'completed',
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      avatar: 'SJ',
      date: '2023-05-14',
      amount: 89.50,
      status: 'completed',
    },
    {
      id: '#ORD-003',
      customer: 'Michael Brown',
      avatar: 'MB',
      date: '2023-05-14',
      amount: 234.75,
      status: 'pending',
    },
    {
      id: '#ORD-004',
      customer: 'Emily Davis',
      avatar: 'ED',
      date: '2023-05-13',
      amount: 56.25,
      status: 'completed',
    },
    {
      id: '#ORD-005',
      customer: 'Robert Wilson',
      avatar: 'RW',
      date: '2023-05-12',
      amount: 189.99,
      status: 'cancelled',
    },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" className={`${classes.status} ${classes.completed}`} size="small" />;
      case 'pending':
        return <Chip label="Pending" className={`${classes.status} ${classes.pending}`} size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" className={`${classes.status} ${classes.cancelled}`} size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h5" className={classes.title}>
        Recent Orders
      </Typography>
      
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="recent orders">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className={classes.customerCell}>
                      <Avatar className={classes.avatar}>{order.avatar}</Avatar>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell align="right">${order.amount.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    {getStatusChip(order.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default RecentOrders;
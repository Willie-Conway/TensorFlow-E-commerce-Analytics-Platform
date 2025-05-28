// Recent Orders Component
// client/src/components/dashboard/RecentOrders.js

import React, { useEffect } from 'react';
import {
  Avatar,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/orders/orderSlice'; // Redux Toolkit slice

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  customerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  avatar: {
    width: 32,
    height: 32,
  },
  status: {
    fontWeight: 500,
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  cancelled: {
    color: 'red',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

const RecentOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div className={classes.customerCell}>
                      <Avatar className={classes.avatar}>{order.avatar || order.customer[0]}</Avatar>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell align="right">${order.amount.toFixed(2)}</TableCell>
                  <TableCell align="right">{getStatusChip(order.status)}</TableCell>
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

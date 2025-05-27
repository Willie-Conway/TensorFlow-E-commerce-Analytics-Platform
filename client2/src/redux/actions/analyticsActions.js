// client/src/redux/actions/analyticsActions.js - Analytics actions

import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_SALES_DATA,
  SALES_ERROR,
  GET_PREDICTIONS,
  PREDICTIONS_ERROR
} from './types';

// Get sales data
export const getSalesData = () => async dispatch => {
  try {
    const res = await axios.get('/api/analytics/sales');

    dispatch({
      type: GET_SALES_DATA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get sales predictions
export const getPredictions = () => async dispatch => {
  try {
    const res = await axios.get('/api/analytics/predict');

    dispatch({
      type: GET_PREDICTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PREDICTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
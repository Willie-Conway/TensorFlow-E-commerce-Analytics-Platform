import {
  GET_SALES_DATA,
  SALES_ERROR,
  GET_PREDICTIONS,
  PREDICTIONS_ERROR,
} from '../types';

const initialState = {
  salesData: [],
  predictions: [],
  loading: true,
  error: null,
};

export default function analyticsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_SALES_DATA:
      return { ...state, salesData: payload, loading: false };
    case GET_PREDICTIONS:
      return { ...state, predictions: payload, loading: false };
    case SALES_ERROR:
    case PREDICTIONS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}

import React from 'react';

const Alert = ({ message, type }) => {
  if (!message) return null;
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;

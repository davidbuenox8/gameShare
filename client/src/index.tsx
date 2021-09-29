import React from 'react';
import './main.css';
import ReactDOM from 'react-dom';
import App from './App';
document.body.style.backgroundColor = '#393d3f';
document.body.style.color = '#fdfdff';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

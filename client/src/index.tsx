import React from 'react';
import './main.css';
import Context, { myContext } from './Pages/Context';
import ReactDOM from 'react-dom';
import App from './App';
document.body.style.backgroundColor = '#393d3f';
document.body.style.color = '#fdfdff';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);

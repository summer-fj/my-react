import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import $axios from './http'
import $api from './http/api'
import './assets/js/rem.js'
import './assets/css/移动端-reset.css'
Component.prototype.$axios=$axios
Component.prototype.$api=$api
ReactDOM.render(
    <App />,
  document.getElementById('root')
);



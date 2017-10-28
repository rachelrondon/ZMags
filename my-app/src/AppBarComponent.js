import React, { Component } from "react";
import axios from "axios";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import './App.css';
import AppBar from 'material-ui/AppBar';

const AppBarComponent = () => (
  <AppBar
  title="HACKER'S TOP NEWS"
  showMenuIconButton={false}
  titleStyle={{
    fontSize: '20px',
    textAlign: 'center'
  }}
  style={{
    backgroundColor:'#333',
    height: '55px',
    iconElementLeft: 'none',
    textAlign: 'center',
    alignContent: 'center',
  }}
  />
);

export default AppBarComponent;


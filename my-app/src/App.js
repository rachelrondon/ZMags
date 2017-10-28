import React, { Component } from 'react';
import './App.css';
import HackerNews from './HackerNews';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <HackerNews />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

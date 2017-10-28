import React, { Component } from 'react';
import './App.css';
import HackerNews from './HackerNews';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarComponent from './AppBarComponent';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBarComponent />
          <HackerNews />
          </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

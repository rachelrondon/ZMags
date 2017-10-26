import React, { Component } from 'react';
import './App.css';
import HackerNews from './HackerNews';

class App extends Component {
  render() {
    return (
      <div>
        <h3>HackerNews App</h3>
        <HackerNews />
      </div>
    );
  }
}

export default App;

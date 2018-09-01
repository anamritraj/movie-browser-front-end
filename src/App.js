import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <p className="">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

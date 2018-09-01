import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Movies from './containers/movies/Movies';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Movies></Movies>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Movies from './containers/movies/Movies';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="container">
          <Movies></Movies>
        </div>
      </div>
    );
  }
}

export default App;

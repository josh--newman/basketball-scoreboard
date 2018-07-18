import React, { Component } from 'react';
import './global.css';
import Scoreboard from './Scoreboard';
import Question from './Question';

class App extends Component {
  render() {
    return <Question question='Whats your name?' />
  }
}

export default App;

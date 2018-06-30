import React, { Component } from 'react';
import numeral from 'numeral';
import './App.css';
import PlayerList from './PlayerList';

const actionTypes = {
  PLAYER_SCORE: 'PLAYER_SCORE'
}

const INTERVAL_TYPES = {
  QUARTER: 'quarter',
  HALF: 'half'
}

const initialState = {
  intervalType: INTERVAL_TYPES.QUARTER,
  currentInterval: 1,
  intervalTimeSecs: 1200,
  secsPerInterval: 1200,
  gameEvents: [],
  clockRunning: false,
  players: {
    dgreen: {
      name: 'Draymond Green',
      position: 'PF',
      number: 23,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6589.png&w=350&h=254',
      team: 'teamA'
    },
    jmcgee: {
      name: 'JaVale McGee',
      position: 'C',
      number: 1,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3452.png&w=350&h=254',
      team: 'teamA'
    },
    kdurant: {
      name: 'Kevin Durant',
      position: 'SF',
      number: 35,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png&w=350&h=254',
      team: 'teamA'
    },
    kthompson: {
      name: 'Klay Thompson',
      position: 'SG',
      number: 11,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6475.png&w=350&h=254',
      team: 'teamA'
    },
    scurry: {
      name: 'Stephen Curry',
      position: 'PG',
      number: 30,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254',
      team: 'teamA'
    },
    jgreen: {
      name: 'Jeff Green',
      position: 'PF',
      number: 32,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3209.png&w=350&h=254',
      team: 'teamB'
    },
    klove: {
      name: 'Kevin Love',
      position: 'C',
      number: 0,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3449.png&w=350&h=254',
      team: 'teamB'
    },
    kkorver: {
      name: 'Kyle Korver',
      position: 'SF',
      number: 26,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2011.png&w=350&h=254',
      team: 'teamB'
    },
    rhood: {
      name: 'Rodney Hood',
      position: 'SG',
      number: 1,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2581177.png&w=350&h=254',
      team: 'teamB'
    },
    ljames: {
      name: 'Lebron James',
      position: 'PG',
      number: 23,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254',
      team: 'teamB'
    }
  },
  teams: {
    teamA: {
      name: 'Golden State Warriors',
      logo: 'https://www.featuredcustomers.com/media/Company.logo/Golden_State_Warriors_GgMBJ0u.png',
      players: {
        dgreen: true,
        jmcgee: true,
        kdurant: true,
        kthompson: true,
        scurry: true
      }
    },
    teamB: {
      name: 'Cleveland Cavaliers',
      logo: 'http://www.stickpng.com/assets/images/58419c8da6515b1e0ad75a63.png',
      players: {
        jgreen: true,
        klove: true,
        kkorver: true,
        rhood: true,
        ljames: true
      }
    },
  }
}

let clockInterval = null;
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes > 0 ? minutes : '00';
  const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
  return `${formattedMinutes}:${formattedSeconds}`;
}

const formatInterval = (currentInterval, intervalType) => {
  const formatted = numeral(currentInterval).format('Oo');
  return `${formatted} ${intervalType}`;
}

const hasAnotherInterval = (intervalType, currentInterval) => {
  return (
    (intervalType === INTERVAL_TYPES.QUARTER && currentInterval >= 4) ||
    (intervalType === INTERVAL_TYPES.HALF && currentInterval >= 2)
  ) ? false : true;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.resetClock = this.resetClock.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.manageTime = this.manageTime.bind(this);
    this.onPlayerScore = this.onPlayerScore.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.startNextInterval = this.startNextInterval.bind(this);
  }

  resetClock() {
    clearInterval(clockInterval);
    return this.setState({
      gameRunning: false,
      intervalTimeSecs: 1200
    });
  }

  startClock() {
    clockInterval = setInterval(() => {
      return this.setState({
        gameRunning: true,
        intervalTimeSecs: this.state.intervalTimeSecs - 1
      })
    }, 1000)
  }

  stopClock() {
    clearInterval(clockInterval);
    return this.setState({
      gameRunning: false
    });
  }

  manageTime(direction, seconds) {
    let newTime = this.state.intervalTimeSecs;
    if (newTime <= 0 && direction === 'minus') return;
    switch (direction) {
      case 'plus':
        newTime += seconds;
        break;
      case 'minus':
        newTime -= seconds;
        break;
      default:
        break;
    }
    return this.setState({
      intervalTimeSecs: newTime
    })
  }

  onPlayerScore(player, points) {
    const scoreEvent = {
      type: actionTypes.PLAYER_SCORE,
      points,
      player,
      team: player.team
    }
    const newEvents = [
      ...this.state.gameEvents,
      scoreEvent
    ]
    return this.setState({ gameEvents: newEvents });
  }

  resetGame() {
    return this.setState({ gameEvents: [], currentInterval: 1 });
  }

  startNextInterval() {
    const { intervalType, currentInterval, secsPerInterval } = this.state;
    return hasAnotherInterval(intervalType, currentInterval) ?
      this.setState({
        currentInterval: currentInterval + 1,
        intervalTimeSecs: secsPerInterval
      }) : null
  }

  render() {
    const teamAPlayers = Object.values(this.state.players)
      .filter(player => player.team === 'teamA');
    const teamBPlayers = Object.values(this.state.players)
      .filter(player => player.team === 'teamB');

    const teamAScore = this.state.gameEvents
      .filter(event => event.type === actionTypes.PLAYER_SCORE)
      .filter(event => event.team === 'teamA')
      .reduce((tally, event) => tally + event.points, 0)

    const teamBScore = this.state.gameEvents
      .filter(event => event.type === actionTypes.PLAYER_SCORE)
      .filter(event => event.team === 'teamB')
      .reduce((tally, event) => tally + event.points, 0)

    return (
      <div className="App">
        <div className="sideA">
          <PlayerList
            {...this.state.teams.teamA}
            onPlayerScore={this.onPlayerScore}
            players={teamAPlayers}
          />
        </div>
        <div className="scoreA score">{teamAScore}</div>
        <div className="divider score">-</div>
        <div className="scoreB score">{teamBScore}</div>
        <div className="scoreButtons">
          <button onClick={this.resetGame}>Reset</button>
        </div>
        <div className="clock">
          <span>{formatTime(this.state.intervalTimeSecs)}</span>
        </div>
        <div className="interval">
          <span>{formatInterval(this.state.currentInterval, this.state.intervalType)}</span>
        </div>
        <div className="gameButtons">
          <button disabled={this.state.gameRunning} onClick={this.startClock}>Start</button>
          <button disabled={!this.state.gameRunning} onClick={this.stopClock}>Stop</button>
          <button disabled={this.state.gameRunning} onClick={this.resetClock}>Reset Clock</button>
          <button disabled={this.state.gameRunning} onClick={() => this.manageTime('plus', 60)}>+</button>
          <button disabled={this.state.gameRunning} onClick={() => this.manageTime('minus', 60)}>-</button>
          <button
            disabled={this.state.gameRunning || !hasAnotherInterval(this.state.intervalType, this.state.currentInterval)}
            onClick={() => this.startNextInterval()}>
            Start next {this.state.intervalType}
          </button>
        </div>
        <div className="sideB">
          <PlayerList
            {...this.state.teams.teamB}
            onPlayerScore={this.onPlayerScore}
            players={teamBPlayers}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import PlayerList from './PlayerList';

const actionTypes = {
  PLAYER_SCORE: 'PLAYER_SCORE'
}

const initialState = {
  intervalType: 'quarter',
  currentInterval: 1,
  gameTimeSecs: 1200,
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
      score: 0,
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
      score: 0,
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.resetClock = this.resetClock.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.manageTime = this.manageTime.bind(this);
    this.onPlayerScore = this.onPlayerScore.bind(this);
    this.onPlayerFoul = this.onPlayerFoul.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }

  resetClock() {
    clearInterval(clockInterval);
    return this.setState({
      gameRunning: false,
      gameTimeSecs: 1200
    });
  }

  startClock() {
    clockInterval = setInterval(() => {
      return this.setState({
        gameRunning: true,
        gameTimeSecs: this.state.gameTimeSecs - 1
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
    let newTime = this.state.gameTimeSecs;
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
      gameTimeSecs: newTime
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
    console.log(newEvents);
    return this.setState({ gameEvents: newEvents });
    // const team = this.state.teams[player.team];
    // const newTeamState = { ...team, score: team.score + points };
    // return this.setState({
    //   teams: {
    //     ...this.state.teams,
    //     [player.team]: newTeamState
    //   }
    // });
  }

  resetScore() {
    return this.setState({
      teams: {
        teamA: {
          ...this.state.teams.teamA,
          score: 0
        },
        teamB: {
          ...this.state.teams.teamB,
          score: 0
        }
      }
    })
  }

  onPlayerFoul(player) {

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
          <button onClick={this.resetScore}>Reset score</button>
        </div>
        <div className="clock">
          <span>{formatTime(this.state.gameTimeSecs)}</span>
        </div>
        <div className="gameButtons">
          <button disabled={this.state.gameRunning} onClick={this.startClock}>Start</button>
          <button disabled={!this.state.gameRunning} onClick={this.stopClock}>Stop</button>
          <button disabled={this.state.gameRunning} onClick={this.resetClock}>Reset Clock</button>
          <button disabled={this.state.gameRunning} onClick={() => this.manageTime('plus', 60)}>+</button>
          <button disabled={this.state.gameRunning} onClick={() => this.manageTime('minus', 60)}>-</button>
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

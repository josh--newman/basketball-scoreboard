import React, { Component } from 'react';
import './App.css';
import PlayerList from './PlayerList';

const initialState = {
  teamA: {
    name: 'Golden State Warriors',
    logo: 'https://www.featuredcustomers.com/media/Company.logo/Golden_State_Warriors_GgMBJ0u.png',
    players: [
      {
        name: 'Draymond Green',
        position: 'PF',
        number: 23,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6589.png&w=350&h=254'
      },
      {
        name: 'JaVale McGee',
        position: 'C',
        number: 1,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3452.png&w=350&h=254'
      },
      {
        name: 'Kevin Durant',
        position: 'SF',
        number: 35,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png&w=350&h=254'
      },
      {
        name: 'Klay Thompson',
        position: 'SG',
        number: 11,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6475.png&w=350&h=254'
      },
      {
        name: 'Stephen Curry',
        position: 'PG',
        number: 30,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254'
      }
    ]
  },
  teamB: {
    name: 'Cleveland Cavaliers',
    logo: 'http://www.stickpng.com/assets/images/58419c8da6515b1e0ad75a63.png',
    players: [
      {
        name: 'Jeff Green',
        position: 'PF',
        number: 32,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3209.png&w=350&h=254'
      },
      {
        name: 'Kevin Love',
        position: 'C',
        number: 0,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3449.png&w=350&h=254'
      },
      {
        name: 'Kyle Korver',
        position: 'SF',
        number: 26,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2011.png&w=350&h=254'
      },
      {
        name: 'Rodney Hood',
        position: 'SG',
        number: 1,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2581177.png&w=350&h=254'
      },
      {
        name: 'Lebron James',
        position: 'PG',
        number: 23,
        img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'
      }
    ]
  },
  gameTimeSecs: 0,
  gameEvents: []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div className="App">
        <div className="sideA">
          <PlayerList {...this.state.teamA} />
        </div>
        <div className="scoreA score">94</div>
        <div className="divider score">-</div>
        <div className="scoreB score">86</div>
        <div className="clock"></div>
        <div className="sideB">
          <PlayerList {...this.state.teamB} />
        </div>
      </div>
    );
  }
}

export default App;

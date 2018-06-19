import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = (props) => {
  return (
    <div className="playerList">
      <h1>{props.name}</h1>
      <div className="logo">
        <img src={props.logo} />
      </div>
      <div className="details">
        <ul>
          {props.players.map(player =>
            <li key={player.name}>
              <PlayerCard {...player} />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default PlayerList;
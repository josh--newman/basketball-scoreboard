import React, { Component } from 'react';

const PlayerCard = (props) => {
  const { onPlayerScore, ...player } = props;
  return (
    <div className="playerCard">
      <img src={props.img} />
      <div className="details">
        <span className="name">{props.name}</span>
        <span className="position">{props.position}</span>
        <span className="number">#{props.number}</span>
        <button onClick={() => onPlayerScore({ ...player }, 1)}>+1</button>
        <button onClick={() => onPlayerScore({ ...player }, 2)}>+2</button>
        <button onClick={() => onPlayerScore({ ...player }, 3)}>+3</button>
        <button>Foul</button>
      </div>
    </div>
  );
};

export default PlayerCard;
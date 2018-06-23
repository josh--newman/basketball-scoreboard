import React, { Component } from 'react';

const PlayerCard = (props) => {
  return (
    <div className="playerCard">
      <div className="photo">
        <img src={props.img} />
      </div>
      <div className="details">
        <span className="name">{props.name}</span>
        <span className="position">{props.position}</span>
        <span className="number">#{props.number}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
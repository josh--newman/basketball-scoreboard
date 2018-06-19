import React, { Component } from 'react';

const PlayerCard = (props) => {
  return (
    <div className="playerCard">
      <div className="photo">
        <img src={props.img} />
      </div>
      <div className="details">
        <h3>{props.name}</h3>
        <hr/>
        <p>{props.position} #{props.number}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
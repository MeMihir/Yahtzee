import React, { Component } from 'react';
import Die from './Die';
import './Dice.css';


class Dice extends Component {
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }
  
  handleClick(indx){
    this.props.handleClick(indx);
  }

  render() {
    return <div className="Dice">
      {this.props.dice.map((d, idx) =>
        <Die 
        handleClick={this.handleClick}
          val={d}
          locked={this.props.locked[idx]}
          idx={idx}
          key={idx}
          isRolling={this.props.isRolling} />
      )}
    </div>
  }
}
 
export default Dice;
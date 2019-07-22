import React, { Component } from "react";
import "./Die.css";
var diceA=["-one","-two","-three","-four","-five","-six"];

class Die extends Component {

  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.props.handleClick(this.props.idx);
  }

  render() {
    return (
      <i class={ "fas fa-3x fa-dice"+diceA[this.props.val-1]+" Die " + (this.props.locked ? "Die-locked":"") + (this.props.isRolling ? "Die-rolling": "")} 
      onClick={this.handleClick}>
      </i>
    );
  }
}

export default Die;

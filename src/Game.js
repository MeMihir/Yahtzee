import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      totalScore : undefined,
      isRolling : false,
      numRounds : 0
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked=this.toggleLocked.bind(this);
    this.rolling=this.rolling.bind(this);
    this.handlePalyAgain=this.handlePalyAgain.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    if(this.state.rollsLeft > 0){
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }));
    this.setState(st => ({
      isRolling : true,
      numRounds : st.rollsLeft===2 ? st.numRounds+1 : st.numRounds
    }))
    setTimeout(this.rolling,1000);
  }

  }

  rolling(){
    this.setState({
      isRolling : false
    })
  }


  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ]
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    console.log(Object.values(this.state.scores))
    this.roll();
    this.setState(st => ({
      totalScore : Object.values(st.scores).reduce((a,b)=> (a===undefined ? (b===undefined ? 0 : b) : (b===undefined ? a : a+b)))
    }))
  }

  handlePalyAgain(evt){
    this.setState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      totalScore : undefined,
      numRounds  : 0,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    })

  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              isRolling={this.state.isRolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x) || this.state.rollsLeft===0}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        {this.state.numRounds!==14 ? 
        <ScoreTable doScore={this.doScore} scores={this.state.scores} totalScore={this.state.totalScore}/>:
        <div>
        <h2>TOTAL SCORE : {this.state.totalScore}</h2>
        <button className='Game-reroll' onClick={this.handlePalyAgain}>PLAY AGAIN</button>
        </div>
        }
      </div>
    );
  }
}

export default Game;

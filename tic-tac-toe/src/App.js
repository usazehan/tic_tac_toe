import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      PLAYER_ONE: "X",
      PLAYER_TWO: "O",
      currentTurn: "X",
      board: [
        "", "", "", "", "", "", "", "", ""
      ]
    }
  }

  handleClick(index) {
    if(this.state.board[index] === "") {
      this.state.board[index] = this.state.currentTurn
      this.setState({
        board: this.state.board,
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE ? this.state.PLAYER_TWO :
          this.state.PLAYER_ONE,
      })
    }
    //console.log(index)
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((cell, index) =>{
          return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>
        })}
      </div>
    );
  }
}

export default App;

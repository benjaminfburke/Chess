import React from "react";
import { Chessboard } from "react-chessboard";
const jsonWeb = require("jsonwebtoken");
const Chess = require("chess.js");
let Game = new Chess();

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      //   a1: "wR",
      //   b1: "wN",
      //   c1: "wB",
      //   d1: "wQ",
      //   e1: "wK",
      //   f1: "wB",
      //   g1: "wN",
      //   h1: "wR",
      //   a2: "wP",
      //   b2: "wP",
      //   c2: "wP",
      //   d2: "wP",
      //   e2: "wP",
      //   f2: "wP",
      //   g2: "wP",
      //   h2: "wP",
      //   a7: "bP",
      //   b7: "bP",
      //   c7: "bP",
      //   d7: "bP",
      //   e7: "bP",
      //   f7: "bP",
      //   g7: "bP",
      //   h7: "bP",
      //   a8: "bR",
      //   b8: "bN",
      //   c8: "bB",
      //   d8: "bK",
      //   e8: "bQ",
      //   f8: "bB",
      //   g8: "bN",
      //   h8: "bR",
      fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    };
  }

  onDrop(sourceSquare, targetSquare) {
    Game.move({ from: sourceSquare, to: targetSquare });
    console.log(sourceSquare);
    console.log(targetSquare);
    this.setState({
      fen: Game.fen(),
    });
    if (Game.game_over()) {
      console.log("Winner");
    }
  }
  render() {
    return (
      <div>
        <Chessboard
          id="BasicBoard"
          position={this.state.fen}
          onPieceDrop={this.onDrop}
        />
      </div>
    );
  }
  componentDidMount() {
    Game = new Chess(this.state.fen);
    console.log(Game.fen());
  }
}

export default Board;

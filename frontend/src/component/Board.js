import React from "react";
import { Chessboard } from "react-chessboard";
const jsonWeb = require("jsonwebtoken");

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      a1:"wR",
      b1:"wN",
      c1:"wB",
      d1:"wQ",
      e1:"wK",
      f1:"wB",
      g1:"wN",
      h1:"wR",
      a2:"wP",
      b2:"wP",
      c2:"wP",
      d2:"wP",
      e2:"wP",
      f2:"wP",
      g2:"wP",
      h2:"wP",
      a7:"bP",
      b7:"bP",
      c7:"bP",
      d7:"bP",
      e7:"bP",
      f7:"bP",
      g7:"bP",
      h7:"bP",
      a8:"bR",
      b8:"bN",
      c8:"bB",
      d8:"bK",
      e8:"bQ",
      f8:"bB",
      g8:"bN",
      h8:"bR"
    };
  }

  onDrop(sourceSquare, targetSquare) {
    console.log(sourceSquare);
    console.log(targetSquare);
    this.setState({
      [sourceSquare]: "",
      [targetSquare]: "wP",
    });
  }
  render() {
    return (
      <div>
        <Chessboard
          id="BasicBoard"
          position={this.state}
          onPieceDrop={this.onDrop}
        />
      </div>
    );
  }
}

export default Board;

import React from "react";
import { Chessboard } from "react-chessboard";
const jsonWeb = require("jsonwebtoken");
const chessBoard = require("Chessboard");

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      e4: "wP",
      h7: "bN",
    };
  }

  onDrop(sourceSquare, targetSquare) {
    console.log(sourceSquare);
    console.log(targetSquare);
    this.setState({
      [sourceSquare]: "",
      [targetSquare]: "wP",
    });
    var string = chessBoard.objToFen(this.state);
    console.log(string);
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

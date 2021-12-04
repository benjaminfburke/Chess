import React from "react";
import { Chessboard } from "react-chessboard";
const jsonWeb = require("jsonwebtoken");

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

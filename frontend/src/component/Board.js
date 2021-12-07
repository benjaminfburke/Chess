import React from "react";
import { Chessboard } from "react-chessboard";
import axios from "axios";
const jsonWeb = require("jsonwebtoken");
const Chess = require("chess.js");
let Game = new Chess();

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      game_id: this.props.match.params.gameid,
      signIn: true,
      user: {},
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      side: "white",
    };
  }

  onDrop(sourceSquare, targetSquare) {
    if (Game.turn() !== this.state.side.indexOf(0)) {
      return;
    }
    Game.move({ from: sourceSquare, to: targetSquare });
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
          boardOrientation={this.state.side}
        />
      </div>
    );
  }
  async componentDidMount() {
    Game = new Chess(this.state.fen);
    if (document.cookie) {
      const token = document.cookie.substring(13);
      const decoded = jsonWeb.verify(token, "123456");
      await this.setState({ user: decoded, signIn: true });
      await axios
        .get(`http://127.0.0.1:5000/game?game_id=${this.state.game_id}`)
        .then((result) => {
          console.log(result.data);
          this.setState({ game: result.data, fen: result.data.gameboard });
          if (this.state.user.user_id !== result.data.white) {
            this.setState({ side: "white" });
          } else {
            this.setState({ side: "black" });
          }
          console.log(this.state);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export default Board;

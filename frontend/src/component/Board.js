import React from "react";
import { Chessboard } from "react-chessboard";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const jsonWeb = require("jsonwebtoken");
const Chess = require("chess.js");
let Game = new Chess();
const sides = ["Black", "White"];

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.endGame = this.endGame.bind(this);
    this.reload = this.reload.bind(this);
    this.state = {
      game_id: this.props.match.params.gameid,
      signIn: true,
      user: {},
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      side: "white",
      gameOver: false,
      winner: 0,
    };
  }
  async endGame() {
    let obj = this.state.user;
    obj.wins += 1;
    obj.score += 10;
    let opponent_id = this.state.game.black;
    if (this.state.side === "black") {
      opponent_id = this.state.game.white;
    }
    let opp = {};
    await axios
      .get(`http://127.0.0.1:5000/profile?user_id=${opponent_id}`)
      .then((result) => {
        opp = result.data.token;
      })
      .catch((err) => {
        console.log(err);
      });
    opp.losses += 1;
    opp.score -= 10;
    await axios
      .put(`http://127.0.0.1:5000/profile`, {
        username: obj.username,
        name: obj.name,
        user_id: obj.user_id,
        email: obj.email,
        wins: obj.wins,
        losses: obj.losses,
        score: obj.score,
      })
      .then((result) => {
        document.cookie =
          document.cookie + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        const decoded = JSON.stringify(result.data.token);
        console.log(decoded);
        document.cookie = "UserIdentity=" + decoded;
        this.setState({ user: result.data.token });
      })
      .catch((err) => {
        console.log(err);
      });
    await axios.put(`http://127.0.0.1:5000/profile`, {
      username: opp.username,
      name: opp.name,
      user_id: opp.user_id,
      email: opp.email,
      wins: opp.wins,
      losses: opp.losses,
      score: opp.score,
    });

    let outcome = "Win";
    let other = "Loss";
    if (Game.turn() === this.state.side[0]) {
      outcome = "Loss";
      other = "Win";
    }

    await axios
      .post(`http://127.0.0.1:5000/history`, {
        game_id: this.state.game_id,
        user_id: this.state.user.user_id,
        opponent: opp.user_id,
        outcome: outcome,
        number_of_moves: parseInt(this.state.fen[this.state.fen.length - 1]),
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    await axios
      .post(`http://127.0.0.1:5000/history`, {
        game_id: this.state.game_id,
        user_id: opp.user_id,
        opponent: obj.user_id,
        outcome: other,
        number_of_moves: parseInt(this.state.fen[this.state.fen.length - 1]),
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  async onDrop(sourceSquare, targetSquare) {
    if (this.state.gameOver) {
      return;
    }
    if (Game.turn() !== this.state.side[0]) {
      return;
    }
    Game.move({ from: sourceSquare, to: targetSquare });
    this.setState({
      fen: Game.fen(),
    });

    await axios.put(`http://127.0.0.1:5000/game`, {
      game_id: this.state.game_id,
      gameboard: Game.fen(),
      white: this.state.game.white,
      black: this.state.game.black,
    });

    if (Game.game_over()) {
      this.setState({ gameOver: true });
      if (Game.turn() === "b") {
        this.setState({ winner: 1 });
      }
      this.endGame();
    }
  }

  async reload() {
    await axios
      .get(`http://127.0.0.1:5000/game?game_id=${this.state.game_id}`)
      .then((result) => {
        this.setState({ game: result.data, fen: result.data.gameboard });
        Game.load(this.state.fen);
      })
      .catch((err) => {
        console.log(err);
      });
    if (Game.game_over()) {
      await axios
        .get(`http://127.0.0.1:5000/profile?user_id=${this.state.user_id}`)
        .then((result) => {
          document.cookie =
            document.cookie + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
          document.cookie = "UserIdentity=" + result.data.token;
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ gameOver: true });
      if (Game.turn() === "w") {
        this.setState({ winner: 1 });
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.gameOver && (
          <div>
            <h2>{sides[this.state.winner]} Wins!!!</h2>
          </div>
        )}
        {!this.state.gameOver && (
          <div>
            <br />
            <Form onSubmit={this.reload}>
              <Button type="submit">Refresh</Button>
            </Form>
            <br />
          </div>
        )}
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
    if (document.cookie) {
      const token = document.cookie.substring(13);
      const decoded = JSON.parse(token);
      await this.setState({ user: decoded, signIn: true });
      await axios
        .get(`http://127.0.0.1:5000/game?game_id=${this.state.game_id}`)
        .then((result) => {
          this.setState({ game: result.data, fen: result.data.gameboard });
          Game.load(this.state.fen);
          if (this.state.user.user_id === result.data.white) {
            this.setState({ side: "white" });
          } else {
            this.setState({ side: "black" });
          }
          console.log(this.state);
        })
        .catch((err) => {
          console.log(err);
        });
      if (Game.game_over()) {
        this.setState({ gameOver: true });
        if (Game.turn() === "b") {
          this.setState({ winner: 1 });
        }
      }
      console.log(this.state);
    }
  }
}

export default Board;

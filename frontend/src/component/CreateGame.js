import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const jsonWeb = require("jsonwebtoken");

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.handleCreate = this.handleCreate.bind(this);
  }

  async handleCreate(e) {
    e.preventDefault();
    const opponent_name = e.target.elements.opponent.value;
    let opponent_id = "";
    await axios
      .get(`http://127.0.0.1:5000/user_id?username=${opponent_name}`)
      .then((result) => {
        opponent_id = result.data.opponent_id;
      })
      .catch((err) => {
        console.log(err);
        alert("Not a valid user");
      });
    if (opponent_id === "") {
      return;
    }
    let game_id = "";
    await axios
      .post("http://127.0.0.1:5000/game", {
        gameboard: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        point_value: 0,
        white: this.state.user.user_id,
        black: opponent_id,
      })
      .then((result) => {
        game_id = result.data.game_id;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .post("http://127.0.0.1:5000/pairing", {
        user1_id: this.state.user.user_id,
        user2_id: opponent_id,
        game_id: game_id,
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    window.location = `/board/${game_id}`;
  }
  render() {
    return (
      <div>
        <h1>HERE!!!</h1>
        <Form onSubmit={this.handleCreate}>
          <Row>
            <Col xs="4">
              <Form.Group controlId="opponent">
                <Form.Control type="text" placeholder="Opponent Username" />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
  async componentDidMount() {
    if (document.cookie) {
      const token = document.cookie.substring(13);
      const decoded = jsonWeb.verify(token, "123456");
      await this.setState({ user: decoded, signIn: true });
    }
  }
}

export default CreateGame;

import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const jsonWeb = require("jsonwebtoken");

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false,
      user_id: "",
      games: [],
    };
  }

  render() {
    return (
      <div>
        <h2>Main page</h2>
        <br />
        <Form>
          <Row>
            <Col xs="4">
              <br />
              <Button type="submit">PlayNewGame</Button>
              <br />
              <br />
              <Link to="/history" className="btn btn-primary">
                History
              </Link>
              <br />
              <br />

              <Link to="/accountinformation" className="btn btn-primary">
                Account Information
              </Link>
            </Col>
          </Row>
        </Form>
        {this.state.games.map((item) => {
          //return (<div><h1>{item.game_id}</h1></div>)

          return (
            <div>
              {" "}
              <br />{" "}
              <Link to={"/board/" + item.game_id} className="btn btn-primary">
                {item.game_id}
              </Link>
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    if (document.cookie) {
      console.log(document.cookie);
      const token = document.cookie.substring(13);
      const decoded = jsonWeb.verify(token, "123456");
      await this.setState({ user: decoded, signIn: true });
      console.log(this.state);

      await axios
        .get(
          `http://127.0.0.1:5000/pairing?user1_id=${this.state.user.user_id}`
        )
        .then((result) => {
          console.log(result);
          this.setState({ games: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export default Homepage;

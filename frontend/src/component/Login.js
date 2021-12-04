import axios from "axios";
import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    await axios
      .post("http://127.0.0.1:5000/login", {
        username: username,
        password: password,
      })
      .then((result) => {
        this.setState({ user_id: result.data.user_id });
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    await axios
      .get(`http://127.0.0.1:5000/profile?user_id=${this.state.user_id}`)
      .then((result) => {
        console.log(result);
        document.cookie = "UserIdentity=" + result.data.token;
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ signin: true });
  }
  render() {
    if (this.state.signin) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h2>Sign Up</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs="4">
              <Form.Group controlId="username">
                <Form.Control type="text" placeholder="Enter Username" />
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              <br />
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Login;

import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false,
      user_id: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  checkPassword(password) {
    var message = "";

    var lengthReg = new RegExp("^(?=.{8,})");
    var capReg = new RegExp("^(?=.*[A-Z])");
    var numReg = new RegExp("^(?=.*[0-9])");
    var lowerReg = new RegExp("^(?=.*[a-z])");

    if (!lengthReg.test(password)) {
      message += "- Password must be at least 8 characters long\n";
    }
    if (!lowerReg.test(password)) {
      message += "- Password must contain at least one lowercase letter\n";
    }
    if (!capReg.test(password)) {
      message += "- Password must contain at least one uppercase letter\n";
    }
    if (!numReg.test(password)) {
      message += "- Password must contain at least one number\n";
    }
    return message;
  }

  async handleSubmit(e) {
    e.preventDefault();
    var user = e.target.elements.username.value;
    var email = e.target.elements.email.value;
    var name = e.target.elements.name.value;
    var password = e.target.elements.password.value;
    var confirm = e.target.elements.confirmPassword.value;

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    var output = this.checkPassword(password);
    if (output.length > 0) {
      alert(output);
      return;
    }

    await axios
      .post("http://127.0.0.1:5000/signin", {
        username: user,
        password: password,
      })
      .then((result) => {
        this.setState({ user_id: result.data.user_id });
        if (result.data === "Username is taken") {
          alert("The username " + user + " is already taken");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    await axios
      .post("http://127.0.0.1:5000/profile", {
        username: user,
        user_id: this.state.user_id,
        name: name,
        email: email,
      })
      .then((result) => {
        document.cookie = "UserIdentity=" + JSON.stringify(result.data.token);
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
              <Form.Group controlId="name">
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <br />
              <Form.Group controlId="username">
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <br />
              <Form.Group controlId="email">
                <Form.Control type="text" placeholder="Email" />
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              <br />
              <Form.Group controlId="confirmPassword">
                <Form.Control type="password" placeholder="Confirm Password" />
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

export default SignUp;

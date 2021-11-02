import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import axios from "axios";
// import { saveUser } from "../actions";
// import { signIn } from "../actions/signIn";
//const bcrypt = require("bcryptjs");

function SignUp() {
  //   const dispatch = useDispatch();
  //   const signin = useSelector((state) => state.signIn);

  //   function checkPassword(password) {
  //     var message = "";
  //     // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  //     var lengthReg = new RegExp("^(?=.{8,})");
  //     var capReg = new RegExp("^(?=.*[A-Z])");
  //     var numReg = new RegExp("^(?=.*[0-9])");
  //     var lowerReg = new RegExp("^(?=.*[a-z])");

  //     if (!lengthReg.test(password)) {
  //       message += "- Password must be at least 8 characters long\n";
  //     }
  //     if (!lowerReg.test(password)) {
  //       message += "- Password must contain at least one lowercase letter\n";
  //     }
  //     if (!capReg.test(password)) {
  //       message += "- Password must contain at least one uppercase letter\n";
  //     }
  //     if (!numReg.test(password)) {
  //       message += "- Password must contain at least one number\n";
  //     }
  //     return message;
  //   }

  async function handleSubmit(e) {
    e.preventDefault();
    var user = e.target.elements.users.value;
    var first = e.target.elements.first.value;
    var last = e.target.elements.last.value;
    var password = e.target.elements.password.value;
    var confirm = e.target.elements.confirmPassword.value;

    //     if (password !== confirm) {
    //       alert("Passwords do not match.");
    //       return;
    //     }

    //     var output = checkPassword(password);
    //     if (output.length > 0) {
    //       alert(output);
    //       return;
    //     }

    //     const salt = bcrypt.genSaltSync(10);
    //     const hash = bcrypt.hashSync(e.target.elements.password.value, salt);

    //     await axios
    //       .post("/api/users/signup", {
    //         username: user,
    //         first_name: first,
    //         last_name: last,
    //         password: hash,
    //       })
    //       .then((result) => {
    //         console.log(result);
    //         if (result.data === "Username is taken") {
    //           alert("The username " + user + " is already taken");
    //           return;
    //         }

    //         dispatch(saveUser(result.data));
    //         dispatch(signIn());
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
  }

  //   if (signin) {
  //     return <Redirect to="/" />;
  //   }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="4">
            <Form.Group controlId="first">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <br />
            <Form.Group controlId="last">
              <Form.Control type="text" placeholder="Email" />
            </Form.Group>
            <br />
            <Form.Group controlId="users">
              <Form.Control type="text" placeholder="Enter username" />
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

export default SignUp;

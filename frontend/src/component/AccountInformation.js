import React from "react";
import { Link } from "react-router-dom";
const jsonWeb = require("jsonwebtoken");

class AccountInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      user: {
        username: "",
        user_id: "",
        name: "",
        email: "",
        score: 0,
        wins: 0,
        losses: 0,
      },
    };
  }

  render() {
    return (
      <div className="pl-3 pr-3 pt-2">
        <h2>AccountInformation</h2>
        <h5>username: {this.state.user.username}</h5>
        <h5>user_id: {this.state.user.user_id}</h5>
        <h5>email: {this.state.user.email}</h5>

        <h5>rank: {this.state.user.score}</h5>
        <h5>wins: {this.state.user.wins}</h5>
        <h5>losses: {this.state.user.losses}</h5>
        <Link to="/Homepage" className="btn btn-primary">
          Home page
        </Link>
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
export default AccountInformation;

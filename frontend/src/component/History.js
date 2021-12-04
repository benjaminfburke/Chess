import React from "react";
import { Link } from "react-router-dom";
const jsonWeb = require("jsonwebtoken");

class History extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        signIn: false,
        user: {
          user_id:"",
          outcome: "",
          moves: 0,
          rating:0
        },
      };
    }

    render() {
        return (
          <div className="pl-3 pr-3 pt-2">
            <h2>History</h2>
            <h5>user_id: {this.state.user.user_id}</h5>
            <h5>outcome: {this.state.user.outcome}</h5>
            <h5>moves: {this.state.user.moves}</h5>
            <h5>rating: {this.state.user.rating}</h5>
            <Link to="/Homepage" className="btn btn-primary">Home page</Link>
          </div>
        );
      }



async componentDidMount() {
    if (document.cookie) {
      const token = document.cookie.substring(13);
      const decoded = jsonWeb.verify(token, "123456");
      await this.setState({ user: decoded, signIn: true });
      console.log(this.state);
    }
  }
}
export default History;


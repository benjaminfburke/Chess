import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
        games: [
          {
            game_id: "hello",
number_of_moves: -1,
opponent: "string",
outcome: "string"
          }
        ]
      };
    }

    render() {
        return (
          <div className="pl-3 pr-3 pt-2">
            <h2>History</h2>
            <h5>user_id: {this.state.user.user_id}</h5>
            <h5>outcome: {this.state.games[0].outcome}</h5>
            <h5>moves: {this.state.games[0].number_of_moves}</h5>
            <h5>rating: {this.state.user.score}</h5>
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

      await axios
        .get(`http://127.0.0.1:5000/history?user_id=${this.state.user.user_id}`)
        .then((result) => {
          console.log(result);
          this.setState({ games: result.data });
          console.log(this.state.games[0].number_of_moves)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
export default History;


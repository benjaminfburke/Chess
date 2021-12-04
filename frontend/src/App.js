import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Homepage from "./component/Homepage";
import Login from "./component/Login";
import AccountInformation from "./component/AccountInformation";
import History from "./component/History";
import Board from "./component/Board";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" component={() => <SignUp />} />
          <Route path="/Homepage" component={() => <Homepage />} />
          <Route path="/login" component={() => <Login />} />
          <Route
            path="/accountinformation"
            component={() => <AccountInformation />}
          />
          <Route path="/history" component={() => <History />} />
          <Route path="/board" component={() => <Board />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

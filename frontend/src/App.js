import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" component={() => <SignUp />} />
          <Route path="/login" component={() => <Login />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

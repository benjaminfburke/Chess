import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Homepage from "./component/Homepage";
import Login from "./component/Login";
import AccountInformation from "./component/AccountInformation";
import History from "./component/History";
import AppNavbar from "./component/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar/>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" component={() => <SignUp />} />
          <Route path="/Homepage" component={() => <Homepage />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/accountinformation" component={() => <AccountInformation />} />
          <Route path="/history" component={() => <History />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

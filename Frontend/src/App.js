import "./App.css";
import Home from "./Home";
import Start from "./Start";
import Login from "./Login";
import Header from "./Header";
import Signup from "./Signup";
import ScheduleNew from "./ScheduleNew";
import Interviewer from "./Interviewer";
import LoginInterviewer from "./LoginInterviewer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <h2 className="text-center mt-5">Welcome to Candidate Interview</h2>
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/loginInterviewer">
            <LoginInterviewer />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/schedulenew">
            <Header />
            <ScheduleNew />
          </Route>
          <Route path="/interviewer/:id">
            <Interviewer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

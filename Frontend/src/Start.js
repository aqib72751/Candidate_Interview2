import "./App.css";
import { Button } from "react-bootstrap";
import "./Start.css";
import { Link } from "react-router-dom";
function Start() {
  return (
    <div className="start flex-column d-flex justify-content-around">
      <Link to="/home">
        <Button variant="primary">Home</Button>
      </Link>
      <div className="d-flex justify-content-around">
        <Link to="/login">
          <Button variant="primary">Log in as HR Admin</Button>
        </Link>
        <Link to="/loginInterviewer">
          <Button variant="primary">Log in as Interviewer</Button>
        </Link>
      </div>
      <Link to="/signup">
        <Button variant="primary">Sign up</Button>
      </Link>
    </div>
  );
}

export default Start;

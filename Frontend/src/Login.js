import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import Axios from "axios";

function Login() {
  const [count, setCount] = useState(0);

  const [employee_id, setEmployee_id] = useState();
  const [password, setPassword] = useState("");
  const [employees, setEmployees] = useState([]);
  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3003/getEmployees").then((res) => {
      setEmployees(res.data);
    });
  }, [count]);
  function handleSubmit() {
    const found = employees.find((e) => {
      return employee_id == e.employee_id
        ? password == e.password
          ? e.role == "hr"
            ? history.push("/home")
            : history.push(`/interviewer/${employee_id}`)
          : false
        : false;
    });
  }

  console.log(employees);
  return (
    <div class="container login">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="employee_id">Employee ID :</label>
          <input
            type="number"
            class="form-control w-50 mx-auto"
            placeholder="Enter employee_id"
            id="employee_id"
            required
            value={employee_id}
            onChange={(e) => setEmployee_id(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control w-50 mx-auto"
            placeholder="Enter password"
            required
            value={password}
            id="pwd"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary" value="Submit">
          Login
        </button>
        <Link to="/signup">
          <button className="btn btn-secondary ml-5" variant="primary">
            Sign up
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;

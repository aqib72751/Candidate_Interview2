import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Signup.css";
import Axios from "axios";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      email: email,
      password: password,
      department: department,
      role: role,
    }).then(() => {
      console.log("valuse sent from frontend");
    });
  };
  return (
    <div class="container signup">
      <h2>Register</h2>
      <form
        class="d-flex flex-column"
        action={role == "hr" ? "./login" : "./loginInterviewer"}
        onSubmit={addEmployee}
      >
        <div className="">
          <div className="">
            <label for="fullname">Full Name:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              id="fullname"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label for="role">Role:</label>
          <select
            class="form-select form-control"
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected disabled>
              choose
            </option>
            <option>hr</option>
            <option>employee</option>
          </select>

          <label for="department">Department:</label>
          <select
            required
            class="form-select form-control"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option selected disabled>
              Choose
            </option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>IT</option>
            <option>HR</option>
          </select>

          <label for="email">Email:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            id="pwd"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button type="submit" class="btn btn-primary" value="Submit">
            Submit
          </button>
          <Link to="/">
            <button className="btn btn-secondary ml-5" variant="primary">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;

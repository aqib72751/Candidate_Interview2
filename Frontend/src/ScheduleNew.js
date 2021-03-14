import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ScheduleNew.css";

import Axios from "axios";
function ScheduleNew() {
  const [title, setTitle] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employee1, setEmployee1] = useState("");
  const [employee2, setEmployee2] = useState("");
  const [employee3, setEmployee3] = useState("");
  const [candidate, setCandidate] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [count, setCount] = useState(0);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getEmployees").then((res) => {
      setEmployees(res.data);
    });
    Axios.get("http://localhost:3001/getCandidates").then((res) => {
      setCandidates(res.data);
    });
  }, [count]);
  const addInterview = () => {
    Axios.post("http://localhost:3001/createSchedule", {
      title: title,
      employee1: employee1,
      employee2: employee2,
      employee3: employee3,
      candidate: candidate,
      date: date,
      time: time,
    }).then(() => {
      console.log("New Schedule sent from frontend");
    });
  };

  return (
    <div class="container schedulenew">
      <form class="d-flex flex-column" onSubmit={addInterview}>
        <h4>Add New Interview</h4>
        <div className="">
          <div className="">
            <label for="title">Title:</label>
            <input
              type="text"
              class="form-control ml-10"
              placeholder="Enter title"
              id="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <label for="employee1">Employee1 ID:</label>
          <select
            class="form-select form-control"
            required={true}
            aria-label="Default select example"
            onChange={(e) => {
              setEmployee1(e.target.value);
            }}
            value={employee1}
          >
            <option value="">Choose</option>
            {employees.map((e, v) => {
              if (e.role == "employee")
                return <option value={e.employee_id}>{e.employee_id}</option>;
            })}
          </select>
          <label for="employee1">Employee2 ID:</label>
          <select
            class="form-select form-control"
            required
            aria-label="Default select example"
            onChange={(e) => {
              setEmployee2(e.target.value);
            }}
          >
            <option value="">Choose</option>
            {employees.map((e, v) => {
              if (e.role == "employee")
                return <option value={e.employee_id}>{e.employee_id}</option>;
            })}
          </select>
          <label for="employee1">Employee3 ID:</label>
          <select
            class="form-select form-control"
            required
            aria-label="Default select example"
            onChange={(e) => {
              setEmployee3(e.target.value);
            }}
          >
            <option value="">Choose</option>
            {employees.map((e, v) => {
              if (e.role == "employee")
                return <option value={e.employee_id}>{e.employee_id}</option>;
            })}
          </select>
          <label for="Candidate">Candidate ID:</label>
          <select
            class="form-select form-control"
            required
            aria-label="Default select example"
            onChange={(e) => {
              setCandidate(e.target.value);
            }}
          >
            <option value="">Choose</option>
            {candidates.map((e, v) => {
              return <option value={e.candidate_id}>{e.candidate_id}</option>;
            })}
          </select>

          <div>
            <div class="form-group row  mt-2">
              <label for="example-date-input" class="col-2 col-form-label">
                Date :
              </label>
              <div class="col-10">
                <input
                  class="form-control"
                  type="date"
                  required
                  id="example-date-input"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="example-time-input" class="col-2 col-form-label">
              Time :
            </label>
            <div class="col-10">
              <input
                class="form-control"
                type="time"
                required
                id="example-time-input"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit" value="Submit" class="m-2 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ScheduleNew;

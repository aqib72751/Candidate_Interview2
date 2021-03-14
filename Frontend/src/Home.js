import { React, useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Button, Table, Tabs, Tab } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";
import ScheduleNew from "./ScheduleNew";
import Signup from "./Signup";
import AddEmployee from "./AddEmployee";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [count, setCount] = useState(0);

  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/getEmployees").then((res) => {
      setEmployees(res.data);
    });
    Axios.get("http://localhost:3001/getCandidates").then((res) => {
      setCandidates(res.data);
    });
    Axios.get("http://localhost:3001/getInterviews").then((res) => {
      setInterviews(res.data);
    });
  }, [count]);
  const getInterviews = () => {
    Axios.get("http://localhost:3001/getInterviews").then((res) => {
      setInterviews(res.data);
    });
    setCount((count) => count + 1);
  };
  const addCandidate = () => {
    Axios.post("http://localhost:3001/addCandidate", {
      name: candidateName,
      email: candidateEmail,
    });
  };
  const deleteCandidate = (name) => {
    Axios.delete(`http://localhost:3001/deleteCandidate/${name}`);
    setCount((count) => count + 1);
  };
  const deleteInterview = (id) => {
    Axios.delete(`http://localhost:3001/deleteInterview/${id}`);
    setCount((count) => count + 1);
  };
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/deleteEmployee/${id}`);
    setCount((count) => count + 1);
  };
  const lockInterview = (id) => {
    Axios.post(`http://localhost:3001/lockInterview/${id}`);
    setCount((count) => count + 1);
  };
  const pendingInterview = (id) => {
    Axios.post(`http://localhost:3001/pendingInterview/${id}`);
    setCount((count) => count + 1);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Tabs defaultActiveKey="scheduled" id="uncontrolled-tab-example">
          <Tab
            eventKey="scheduled"
            title={
              <Button className="m-2" onClick={getInterviews}>
                Interviews
              </Button>
            }
          >
            <Table striped bordered hover className="w-100">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Emp1</th>
                  <th>Emp2</th>
                  <th>Emp3</th>
                  <th>Cand</th>
                  <th>Emp1 Dec</th>
                  <th>Emp2 Dec</th>
                  <th>Emp3 Dec</th>
                  <th>Cand Dec</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((value, key) => {
                  return (
                    <tr>
                      <td>{value.interview_id}</td>
                      <td>{value.title}</td>
                      <td>{value.employee1_id}</td>
                      <td>{value.employee2_id}</td>
                      <td>{value.employee3_id}</td>
                      <td>{value.candidate_id}</td>
                      <td>{value.employee1_decision}</td>
                      <td>{value.employee2_decision}</td>
                      <td>{value.employee3_decision}</td>
                      <td>{value.candidate_decision}</td>
                      <td>{value.status}</td>
                      <td className="d-flex justify-content-around">
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteInterview(value.interview_id)}
                        >
                          Delete
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={() => lockInterview(value.interview_id)}
                        >
                          Lock
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={() => pendingInterview(value.interview_id)}
                        >
                          pending
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab
            className="ml-10"
            eventKey="schedule"
            title={
              <Button className="m-2 btn-primary">Shedule Interview</Button>
            }
          >
            <ScheduleNew />
          </Tab>
          <Tab title={<hr></hr>} disabled></Tab>
          <Tab
            eventKey="candidates"
            title={<Button className="m-2 btn btn-info">Candidates</Button>}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((value, key) => {
                  return (
                    <tr>
                      <td>{value.candidate_id}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteCandidate(value.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab
            className="ml-10"
            eventKey="addCand"
            title={<Button className="m-2 btn-info">Add Candidates</Button>}
          >
            <h2 className="text-center m-4">Add New Candidates</h2>
            <form
              class="d-flex flex-column text-center mt-2"
              onSubmit={addCandidate}
            >
              <div className="">
                <label for="candName">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Name"
                  id="candName"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>
              <div className="">
                <label for="cadEmail">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Email"
                  id="candEmail"
                  value={candidateEmail}
                  required
                  onChange={(e) => setCandidateEmail(e.target.value)}
                />
              </div>
              <button type="submit" value="Submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Tab>
          <Tab title={<hr></hr>} disabled></Tab>

          <Tab
            eventKey="employees"
            title={<Button className="m-2 btn-secondary">Employees</Button>}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((value, key) => {
                  return (
                    <tr>
                      <td>{value.employee_id}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.department}</td>
                      <td>{value.role}</td>
                      <td>
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteEmployee(value.employee_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab
            eventKey="addEmp"
            title={<Button className="m-2 btn-secondary">Add Employees</Button>}
          >
            <AddEmployee />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;

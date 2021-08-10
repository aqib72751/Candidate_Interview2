import { React, useState, useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Axios from "axios";
import "./Interviewer.css";
function Interviewer() {
  const [interviews, setInterviews] = useState([]);
  const [myInterviews, setMyInterviews] = useState([]);
  const [decision1, setDecision1] = useState("");
  const [text1, setText1] = useState("Accept");
  const [text2, setText2] = useState("Reject");
  let [count, setCount] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3003/getInterviews/${id}`).then((res) => {
      setMyInterviews(res.data);
    });
    Axios.get(`http://localhost:3003/getInterviews`).then((res) => {
      setInterviews(res.data);
    });
  }, [count, id]);

  const handleAccept = (i) => {
    Axios.post("http://localhost:3003/acceptInterviewForEmp", {
      interview_id: i,
      id: id,
    }).then(() => {
      console.log(i + " ID has been sent");
    });

    setDecision1("Accepted");
    setCount((count) => count + 1);
  };

  const handleReject = (i) => {
    Axios.post("http://localhost:3003/rejectInterviewForEmp", {
      interview_id: i,
      id: id,
    }).then(() => {
      console.log(i + " ID has been sent");
    });

    setDecision1("Rejected");
    setCount((count) => count + 1);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Interviews for Employee_id {id}</h2>
        <div className="interviews_locked d-flex flex-column justify-content-center">
          <h4 className="">Interviews</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Interview ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
                <th>Decision</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myInterviews.map((i, v) => {
                return (
                  <tr>
                    <td>{i.interview_id}</td>
                    <td>{i.title}</td>
                    <td>{i.date}</td>
                    <td>{i.time}</td>
                    <td className="d-flex justify-content-around">
                      <Button onClick={() => handleAccept(i.interview_id)}>
                        Accept
                      </Button>
                      <Button onClick={() => handleReject(i.interview_id)}>
                        Reject
                      </Button>
                    </td>
                    <td>
                      {id == i.employee1_id
                        ? i.employee1_decision
                        : id == i.employee2_id
                          ? i.employee2_decision
                          : i.employee3_decision}
                    </td>
                    <td>{i.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Interviewer;

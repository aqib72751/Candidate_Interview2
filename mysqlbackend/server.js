const express = require("express");
const app = express();
var mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "candidate_interview_db",
});
//Signup
app.post("/create", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const department = req.body.department;
  const role = req.body.role;

  const query =
    "INSERT INTO employees (name, email, password, department, role) VALUES (?,?,?,?,?)";
  con.query(
    query,
    [name, email, password, department, role],
    function (err, result) {
      if (err) throw err;
      else {
        console.log("1 record inserted, ID: " + result.insertId);
        res.send("values inserted");
      }
    }
  );
});
//CreateSchedule
app.post("/createSchedule", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const employee1 = req.body.employee1;
  const employee2 = req.body.employee2;
  const employee3 = req.body.employee3;
  const candidate = req.body.candidate;
  const date = req.body.date;
  const time = req.body.time;

  const query =
    "INSERT INTO interviews (title, employee1_id, employee2_id,employee3_id,candidate_id, date, time) VALUES (?,?,?,?,?,?,?)";
  const vals = [title, employee1, employee2, employee3, candidate, date, time];
  con.query(query, vals, function (err, result) {
    if (err) throw err;
    else {
      console.log("1 record inserted, ID: " + result.insertId);
      res.send("values inserted");
    }
  });
});
//HOME GET INTERVIEWS
app.get("/getInterviews", (req, res) => {
  con.query("SELECT * FROM interviews", (err, result) => {
    if (err) throw err;
    else {
      console.log("interviews taken");
      res.send(result);
    }
  });
});
//GET INTERVIEWS
app.get("/getInterviews", (req, res) => {
  con.query("SELECT * FROM interviews", (err, result) => {
    if (err) throw err;
    else {
      console.log("Interviews taken");
      console.log(result);
      res.send(result);
    }
  });
});
//EMPLOYEE GET INTERVIEWS
app.get("/getInterviews/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT * FROM interviews as i join candidates as a on a.candidate_id = i.candidate_id where i.employee1_id =? || i.employee2_id = ? || i.employee3_id =?",
    [id, id, id],
    (err, result) => {
      if (err) throw err;
      else {
        console.log(`Emp ${id} interviews taken`);
        res.send(result);
      }
    }
  );
});

//GetEmployees
app.get("/getEmployees", (req, res) => {
  con.query("SELECT * FROM employees", (err, result) => {
    if (err) throw err;
    else {
      console.log("employees taken");
      res.send(result);
    }
  });
});
//GetCandidates
app.get("/getCandidates", (req, res) => {
  con.query("SELECT * FROM candidates", (err, result) => {
    if (err) throw err;
    else {
      console.log("candidates taken");
      res.send(result);
    }
  });
});

//add candidate
app.post("/addCandidate", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const sql = "insert into candidates (name, email) VALUES (?,?)";
  con.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    else {
      console.log("candidate added");
      res.send(result);
    }
  });
});

//delete candidate
app.delete("/deleteCandidate/:name", (req, res) => {
  const name = req.params.name;
  const sql = "delete from candidates where name = ?";
  con.query(sql, [name], (err, result) => {
    if (err) throw err;
    else {
      console.log("candidate deleted");
      res.send(result);
    }
  });
});
//delete interview
app.delete("/deleteInterview/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from interviews where interview_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    else {
      console.log("candidate deleted");
      res.send(result);
    }
  });
});
//delete employee
app.delete("/deleteEmployee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employees where employee_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    else {
      console.log("employee deleted");
      res.send(result);
    }
  });
});

//handle accept
app.post("/acceptInterviewForEmp", (req, res) => {
  console.log(req.body);
  const employee_id = req.body.id;
  const interview_id = req.body.interview_id;
  const sql =
    "update interviews set " +
    "employee1_decision = (case when  ? = employee1_id then 'Accepted' else employee1_decision end), " +
    "employee2_decision = (case when  ? =employee2_id then 'Accepted' else employee2_decision end)," +
    " employee3_decision = (case when ? = employee3_id  then 'Accepted' else employee3_decision end)" +
    " where interview_id =?";
  con.query(
    sql,
    [employee_id, employee_id, employee_id, interview_id],
    (err, result) => {
      if (err) throw err;
      else {
        console.log(
          `${employee_id} has accepted decision at interview ${interview_id}`
        );
      }
    }
  );
  // const sql2 = "select employee1_id from interviews where interview_id=? ";
  // con.query(sql2, [interview_id], (err, res, f) => {
  //   if (err) throw err;
  //   else {
  //     setEmp1_id(res[0].employee1_id);
  //   }
  // });
});
//handle reject
app.post("/rejectInterviewForEmp", (req, res) => {
  console.log(req.body);
  const employee_id = req.body.id;
  const interview_id = req.body.interview_id;
  const sql =
    "update interviews set employee1_decision = (case when  ? = employee1_id then 'Rejected' else employee1_decision end), employee2_decision = (case when  ? =employee2_id then 'Rejected' else employee2_decision end), employee3_decision = (case when ? = employee3_id  then 'Rejected' else employee3_decision end) where interview_id = ?";
  con.query(
    sql,
    [employee_id, employee_id, employee_id, interview_id],
    (err, result) => {
      if (err) throw err;
      else {
        console.log(
          `${employee_id} has rejected decision at interview ${interview_id}`
        );
        res.send(result);
      }
    }
  );
});
//lock interview
app.post("/lockInterview/:id", (req, res) => {
  const id = req.params.id;
  const sql = "update interviews set status = 'locked' where interview_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    else {
      console.log(`Interview locked for id ${id}`);
      res.send(result);
    }
  });
});
//pending interview
app.post("/pendingInterview/:id", (req, res) => {
  const id = req.params.id;
  const sql = "update interviews set status = 'pending' where interview_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    else {
      console.log(`Interview pending for id ${id}`);
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("server listening on port 3001");
});

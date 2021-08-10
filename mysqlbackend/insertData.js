var con = require("./db")

function candidates() {
    const name = "c";
    const email = "c";
    const sql = "insert into candidates (name, email) VALUES (?,?)";
    con.query(sql, [name, email], (error, result) => {
        if (error) console.log("candidates - error inserting data");
        else console.log("candidates - data inserted");
    });
}
function employees() {
    const name = "e";
    const email = "e";
    const password = "e";
    const department = "e";
    const role = "hr";
    const sql = "INSERT INTO employees (name, email, password, department, role) VALUES (?,?,?,?,?)";
    con.query(sql, [name, email, password, department, role], (error, result) => {
        if (error) console.log("employees - error inserting data");
        else console.log("employees - data inserted");
    })
}
function interviews() {
    const title = "";
    const employee1 = 1;
    const employee2 = 2;
    const employee3 = 3;
    const candidate = 1;
    const date = new Date();
    const time = new Date().getTime();

    const query =
        "INSERT INTO interviews (title, employee1_id, employee2_id,employee3_id,candidate_id, date, time) VALUES (?,?,?,?,?,?,?)";
    const vals = [title, employee1, employee2, employee3, candidate, date, time];
    con.query(query, vals, function (err, result) {
        if (error) console.log("interviews - error inserting data");
        else console.log("interviews - data inserted");
    });
}

module.exports = { candidates, employees, interviews }
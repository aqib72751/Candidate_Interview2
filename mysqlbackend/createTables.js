var con = require("./db")

function candidates() {
    const sql = "CREATE TABLE `candidates` (`candidate_id` int NOT NULL UNIQUE AUTO_INCREMENT,`name` varchar(45) NOT NULL,`email` varchar(45) NOT NULL,PRIMARY KEY (`candidate_id`));"
    con.query(sql, (error, result) => {
        if (error) console.log("error creating candidates table");
        else console.log("candidates table created");
    })
}
function employees() {
    const sql = "CREATE TABLE `employees` (`employee_id` int NOT NULL UNIQUE AUTO_INCREMENT,`name` varchar(45) NOT NULL,`department` varchar(45) DEFAULT NULL,`role` varchar(45) DEFAULT NULL,`email` varchar(45) NOT NULL,`password` varchar(45) NOT NULL,PRIMARY KEY (`employee_id`));"
    con.query(sql, (error, result) => {
        if (error) console.log("error creating employees table");
        else console.log("employees table created");
    })
}
function interviews() {
    const sql = "CREATE TABLE `interviews` (`interview_id` int NOT NULL UNIQUE AUTO_INCREMENT,`employee1_id` int NOT NULL,`employee2_id` int NOT NULL,`employee3_id` int NOT NULL,`candidate_id` int NOT NULL,`title` varchar(45) DEFAULT NULL,`date` date DEFAULT NULL,`time` time DEFAULT NULL,`employee1_decision` varchar(45) DEFAULT 'pending',`employee2_decision` varchar(45) DEFAULT 'pending',`employee3_decision` varchar(45) DEFAULT 'pending',`candidate_decision` varchar(45) DEFAULT 'pending',`status` varchar(45) DEFAULT 'pending',PRIMARY KEY (`interview_id`),KEY `employee1_id` (`employee1_id`),KEY `employee2_id` (`employee2_id`),KEY `employee3_id` (`employee3_id`),KEY `candidate_id` (`candidate_id`),CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`employee1_id`) REFERENCES `employees` (`employee_id`),CONSTRAINT `interviews_ibfk_2` FOREIGN KEY (`employee2_id`) REFERENCES `employees` (`employee_id`),CONSTRAINT `interviews_ibfk_3` FOREIGN KEY (`employee3_id`) REFERENCES `employees` (`employee_id`),CONSTRAINT `interviews_ibfk_4` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`candidate_id`));"
    con.query(sql, (error, result) => {
        if (error) console.log("error creating interviews table");
        else console.log("interviews table created");
    })
}

module.exports = { candidates, employees, interviews }
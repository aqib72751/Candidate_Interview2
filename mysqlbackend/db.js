var mysql = require("mysql2");

function con() {
    var con = mysql.createConnection({
        host: 'mysql-42074-0.cloudclusters.net',
        user: 'admin',
        password: 'ZZi1I06m',
        database: 'testDB',
        port: "15470"
    });
    con.connect((error) => {
        if (error) throw error;
        console.log("database connected");
    })
    return con
}

module.exports = con()
const con = require('../database/db')

con.connect(function (err) {
    const sql = `
    CREATE TABLE IF NOT EXISTS motoristas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(50)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Motoristas table created");
    });
});
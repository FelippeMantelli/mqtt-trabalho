const con = require('../database/db')

con.connect(function (err) {
    const sql = `
    CREATE TABLE IF NOT EXISTS dispositivos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      descricao VARCHAR(50)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dispositivo table created");
    });
});
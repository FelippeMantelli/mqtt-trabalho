const con = require('../database/db')

con.connect(function (err) {
    const sql = `
    CREATE TABLE IF NOT EXISTS veiculos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tipo VARCHAR(50) NOT NULL,
      dispositivo INT NOT NULL,
      motorista INT NOT NULL,
      FOREIGN KEY (dispositivo) REFERENCES dispositivos(id),
      FOREIGN KEY (motorista) REFERENCES motoristas(id)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Veiculos table created");
    });
});
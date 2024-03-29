const con = require('../database/db')

con.connect(function (err) {
    const sql = `
    CREATE TABLE IF NOT EXISTS localizacao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lat VARCHAR(25) NOT NULL,
      lon VARCHAR(25) NOT NULL,
      id_dispositivo INT NOT NULL,
      FOREIGN KEY (id_dispositivo) REFERENCES dispositivos(id)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Localizacao table created");
    });
});
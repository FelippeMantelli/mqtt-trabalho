const mysql = require('mysql2');

const con = mysql.createConnection({
  host: '127.0.0.1', // Remova a porta 3306 daqui
  user: 'root',
  password: '1234',
  database: 'mqtt_trabalho'
});
  
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = con;

const express = require('express');
const app = express();
const PORT = 3000;
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('./database/db')

const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('mqtt-trabalho', (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic "mqtt-trabalho"');
    }
  });
});

app.use(bodyParser.json());

app.use(cors());

app.get('/consulta', async (req, res) => {
    con.query('SELECT localizacao.*, dispositivos.descricao, dispositivos.id FROM localizacao INNER JOIN dispositivos ON localizacao.id_dispositivo = dispositivos.id ORDER BY localizacao.id', (err, localizacoes) => {
      res.json(localizacoes)
    });
})

app.post('/veiculo/cadastro', async (req, res) => {
  const { tipo, dispositivo, motorista } = req.body;
  await con.promise().query('INSERT INTO veiculos (tipo, dispositivo, motorista) VALUES (?, ?, ?)', [tipo, dispositivo, motorista]);
  res.json(`Veiculo cadastrado`);
});

app.post('/motorista/cadastro', async (req, res) => {
  const { nome } = req.body;
  await con.promise().query('INSERT INTO motoristas (nome) VALUES (?)', [nome]);
  res.json(`Motorista cadastrado`);
});

app.post('/dispositivo/cadastro', async (req, res) => {
    const { descricao } = req.body;
    await con.promise().query('INSERT INTO dispositivos (descricao) VALUES (?)', [descricao]);
    res.json(`Dispositivo cadastrado`);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

mqttClient.on('message', async (topic, message) => {
    if (topic === 'mqtt-trabalho') {
      try {
        const { lat, lon, id_dispositivo } = JSON.parse(message.toString());
        const location = await con.promise().query('INSERT INTO localizacao (lat, lon, id_dispositivo) VALUES (?, ?, ?)', [lat, lon, id_dispositivo]);
        console.log('Location saved:', location);
        io.emit('novaLocalizacao', {lat: location.lat, lon: location.lon});
      } catch (error) {
        console.error('Error saving location:', error);
      }
    }
});
const map = L.map('map').setView([-22.220341, -49.9482], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    async function fetchAndAddMarkers() {
        try {
          const response = await fetch('http://localhost:3000/consulta/'); 
          const localizacoes = await response.json();

          map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
          });

          localizacoes.forEach(local => {
            let marker = L.marker([local.lat, local.lon]);
            map.addLayer(marker);
            marker.bindPopup("<b>"+local.descricao+"</b>");
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    fetchAndAddMarkers();

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('SocketIo Conectado');
    });

    document.getElementById("atualizar").addEventListener("click", () => {
      fetchAndAddMarkers();
    })

    socket.on('novaLocalizacao', (local) => {
        fetchAndAddMarkers();
    });
    
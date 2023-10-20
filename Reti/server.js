const net = require('net');

// Definizione del parcheggio con 2 piani e 10 posti a piano
const parkingSpaces = {
  A: {
    floor1: 10, // Posti disponibili per automobili al piano 1
    floor2: 10, // Posti disponibili per automobili al piano 2
  },
  V: {
    floor1: 10, // Posti disponibili per veicoli commerciali al piano 1
  },
};

const server = net.createServer((socket) => {
  console.log('Client connesso');

  socket.on('data', (data) => {
    const clientData = data.toString().trim().split(' ');
    const name = clientData[0];
    const vehicleType = clientData[1];
  
    if (name === 'END') {
      
      socket.destroy();
      return;
    }
  

  

    if (vehicleType === 'A' || vehicleType === 'V') {
      if (parkingSpaces[vehicleType].floor1 > 0) {
        parkingSpaces[vehicleType].floor1--;
        socket.write('OK\n');
        console.log(`Client ${name} ha parcheggiato al piano 1. ${parkingSpaces[vehicleType].floor1}`);
      } else if (parkingSpaces[vehicleType].floor2 > 0) {
        parkingSpaces[vehicleType].floor2--;
        socket.write('OK\n');
        console.log(`Client ${name} ha parcheggiato al piano 2.`);
      } else {
        socket.write('KO\n');
        console.log(`Client ${name} non può parcheggiare.`);
      }
    } else {
      socket.write('KO\n');
      console.log(`Client ${name} ha specificato un tipo di veicolo non valido: ${vehicleType}`);
    }
  });



  socket.on('END', () => {
    console.log('Client disconnesso');
  });
});




const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

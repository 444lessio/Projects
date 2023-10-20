const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.connect(8080, 'localhost', () => {
  console.log('Connesso al server');

  rl.question('Inserisci il tuo nome: ', (name) => {
    rl.question('Inserisci il tipo di veicolo (A per Automobili, V per Veicoli Commerciali): ', (vehicleType) => {
      if (vehicleType === 'A' || vehicleType === 'V') {
        const input = `${name} ${vehicleType}`;
        client.write(input);
      } else {
        console.log('Tipo di veicolo non valido. Utilizzare "A" o "V".');
        rl.close();
        client.end();
      }
    });
  });
});


client.on('data', (data) => {
  const response = data.toString().trim();
  if (response === 'OK') {
    console.log('Veicolo parcheggiato con successo.');
    console.log('Per liberare il posto, inviare "END".');
  } else {
    console.log('Impossibile parcheggiare il veicolo.');
    rl.close();
  }
});



client.on('close', () => {
  console.log('Connessione chiusa');
  process.exit(0);
});

rl.on('line', (input) => {
  client.write(input);
});


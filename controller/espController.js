// controllers/espController.js
const axios = require('axios');

const ESP8266_IP = '192.168.16.91'; // Replace with your ESP8266's IP address

exports.sendCommand = async (req, res) => {
  const command = req.body.command;
  console.log(`Command received: ${command}`);
  
  try {
    const response = await axios.post(`http://${ESP8266_IP}/command`, { command });
    res.status(200).send('Command sent');
  } catch (error) {
    console.error('Failed to send command:', error);
    res.status(500).send('Failed to send command');
  }
};

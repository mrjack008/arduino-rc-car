// controllers/espController.js
const mqtt = require('mqtt');

const mqttBrokerUrl = 'mqtt://test.mosquitto.org'; // MQTT broker URL
const topic = 'razalcar/control'; // MQTT topic

// Connect to the MQTT broker
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker'); 
});

exports.sendCommand = (req, res) => {
  const command = req.body.command;
  console.log(`Command received: ${command}`);

  const message = JSON.stringify({ command });

  mqttClient.publish(topic, message, (err) => {
    if (err) {
      console.error('Failed to send command:', err);
      return res.status(500).send('Failed to send command');
    }
    res.status(200).send('Command sent');
  });
};

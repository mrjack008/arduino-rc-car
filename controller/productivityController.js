// controllers/reminderController.js

const axios = require("axios");
const { Reminder } = require("../config/db");
const cron = require('node-cron');

const ESP8266_IP = '192.168.16.91'; // Replace with your ESP8266's IP address

const moment = require('moment');

exports.addReminder = async (req, res) => {
  try { 
    const { title, time, date, recurrence, purpose, remindAgain, timePeriod } = req.body;

    // Combine time and timePeriod
    const formattedTime = moment(`${time} ${timePeriod}`, 'h:mm A').format('HH:mm');
    console.log(formattedTime);

    // Save reminder to the database
    const reminder = await Reminder.create({ 
      title,
      time: formattedTime, // Save the formatted time
      date,
      recurrence,
      purpose,
      remindAgain 
    });

    res.status(201).json({ message: 'Reminder added successfully', reminder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add reminder' });
  }
};

// Function to check for upcoming reminders and call API
const checkReminders = async () => {
  try {
    const now = moment(); // Use moment to handle time formatting
    const formattedDate = now.format('YYYY-MM-DD');
    const formattedTime = now.format('HH:mm');

    const reminders = await Reminder.findAll({
      where: {
        date: formattedDate, // Check reminders for today
        time: formattedTime // Check reminders for current time
      }
    });

    console.log(reminders[0].dataValues.title);

    for (const reminder of reminders) {
      // Call your API here using axios
      await axios.post(`http://${ESP8266_IP}/command`, { reminder:reminders[0].dataValues.title });

      console.log(`Calling API for reminder: ${reminder.title}`);
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

// Schedule the function to run every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  console.log('Checking reminders...');
  checkReminders();
});
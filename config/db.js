// Import required modules
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize instance using DATABASE_URL
console.log(process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Note: You may need to set this to true based on your security requirements
    },
  },
});

// Synchronize models with the database
sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Error syncing database:", err));

const db = {
  Reminder: require("../models/Reminder")(sequelize, Sequelize),
  sequelize,
};

module.exports = db;

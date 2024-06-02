// Import required modules
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    port: 5432,
  }
);




// Synchronize models with the database
sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Error syncing database:", err));



  
const db = {
  Reminder: require("../models/Reminder")(sequelize, Sequelize),

sequelize,
};



module.exports = db;

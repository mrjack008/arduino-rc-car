const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Reminder.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },      
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      recurrence: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remindAgain: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reminder", // Define model name
      tableName: "reminders", // Define table name
      timestamps: true, // Include timestamps in the table
    }
  );

  return Reminder;
};

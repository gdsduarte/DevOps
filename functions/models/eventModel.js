import { Sequelize } from "sequelize";
import connectDb from "../config/database.js";

// Create a new Sequelize model for the Event table in the database
const db = await connectDb();
const createEventModel = (db) => {
  const Event = db.define("event", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    createdByUserId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    backgroundColor: {
      type: Sequelize.STRING,
    },
  });

  return Event;
};

const Event = createEventModel(db);

export default Event;
import { Sequelize } from "sequelize";

// Change the server and localhost variables to your database credentials
// Server
const server = {
  database: "b2u6xsmd8kazhq1gjiic",
  username: "ugnknltlu8pwmf4a",
  password: "TywxSF4EvbflrkS8U7P6",
  host: "b2u6xsmd8kazhq1gjiic-mysql.services.clever-cloud.com",
  dialect: "mysql",
  uri: "mysql://ugnknltlu8pwmf4a:TywxSF4EvbflrkS8U7P6@b2u6xsmd8kazhq1gjiic-mysql.services.clever-cloud.com:3306/b2u6xsmd8kazhq1gjiic",
  define: {
    timestamps: false,
  },
};

// Localhost
const localhost = {
  database: "devops_calendar",
  username: "root", // Change this to your username
  password: "1234", // Change this to your password
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
};

// Connect to the database
const db1 = new Sequelize(server);
const db2 = new Sequelize(localhost);

// Try to connect to the server, if it fails, try to connect to localhost
const connectDb = async () => {

  // Try to connect to the server
  try {
    await db1.authenticate();
    console.log("Connected to server successfully");
    await db1.sync({ force: false });
    return db1;
  } catch (error) {
    console.error("Unable to connect to server:", error.message);

    // If the server connection fails, try to connect to localhost
    try {
      await db2.authenticate();
      console.log("Connected to localhost successfully");
      await db2.sync({ force: false });
      return db2;
    } catch (error) {
      console.error("Unable to connect to localhost:", error.message);
      return null;
    }
  }
};

export default connectDb;

import express from "express";
import connectDb from "./config/database.js";
import eventRoutes from "./routes/index.js";
import cors from "cors";
import functions from "firebase-functions";
import path from "path";

// Create a new Express app
const app = express();

// Connect to the database
(async () => {
  const db = await connectDb();

  if (db) {
    console.log("Database connected...");
  } else {
    console.error("Unable to connect to any database.");
  }
})();

// Set up CORS
const corsOptions = {
  origin: 'https://devops-dorset.web.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
};

// Enable CORS with custom options
app.use(cors(corsOptions));
app.use(express.json());
app.use(eventRoutes);

// Serve static files from the React app
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all to serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Exports the Express app as a Cloud Function
export const api = functions.https.onRequest(app);

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createConnection } = require('./src/database');
const middleware = require('./src/middleware/index');
const eventsRouter = require('./src/routes/events');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./src/router'));
app.use(middleware.decodeToken);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/api/events', eventsRouter);

// For development
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the React app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For production
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Launch server
createConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch(console.log)
const express = require("express"); // use Express
const app = express(); // create application
const port = process.env.PORT || 3001; // set port
const firebaseAdmin = require("firebase-admin"); // for authentication
const serviceAccount = require("./serviceAccount.json"); // for authentication
const path = require('path'); // for production
const cors = require('cors'); // for cross origin resource sharing
const bodyParser = require('body-parser'); // for parsing body of request
const { createConnection } = require('./src/database'); // for database connection

// firebaseAdmin is used for authentication
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://devopsproject-c4f6b-default-rtdb.firebaseio.com"
});

// For database connection
const db = firebaseAdmin.database();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./src/router'));

const eventsRouter = require('./src/routes/events');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/events', eventsRouter);

// For production
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// For production

// Launch server
createConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch(console.log)
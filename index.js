// Require the necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const firebaseAdmin = require("firebase-admin");
const ejs = require("ejs");
const opn = require("opn");
const serviceAccount = require("./serviceAccount.json");

// Create the Express application
const app = express();

// Add the csrf protection middleware, set cookie option
const csrfProtection = csrf({ cookie: true });
const port = process.env.PORT || 3000;

// Initialize the firebase admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://devops-dorset-default-rtdb.europe-west1.firebasedatabase.app",
});

// Use static assets and json body parser
app.use(express.static("assets"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfProtection);

// Set headers for CSS and PNG
app.use('/assets', express.static(__dirname + '/assets', {
    setHeaders: function (res, path) {
        if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        } else if (path.endsWith('.png')) {
            res.set('Content-Type', 'image/png');
        }
    }
}));

// Use EJS as rendering engine
app.engine("html", ejs.renderFile);

// Add cookie to response object
app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), { sameSite: "none", secure: true });
    next();
});

// Render login page
app.get("/", (req, res) => {
    res.render("login.html");
});

// Create a session cookie and send success response
app.post("/sessionLogin", async (req, res) => {
    const idToken = req.body.idToken.toString();

    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.json({ status: "success" });
    } catch (error) {
        res.status(401).send("UNAUTHORIZED REQUEST!");
    }
});

// Verify session cookie and render calendar page
app.get("/calendar", async (req, res) => {
    const sessionCookie = req.cookies.session;

    try {
        await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        res.render("calendar.html");
    } catch (error) {
        res.redirect("/login");
    }
});

// Clear session cookie and redirect to root page
app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/");
});

// Launch the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    opn(`http://localhost:${port}/`);
});

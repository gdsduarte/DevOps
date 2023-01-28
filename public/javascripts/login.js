// login script for the form in the index page

// Get the form
const form = document.getElementById('login-form');

// Get the error message
const error = document.getElementById('error');

// Get the username and password fields
const username = document.getElementById('username');
const password = document.getElementById('password');

// Get the submit button
const submit = document.getElementById('submit');

// Add an event listener to the form using Firebase authentication
form.addEventListener('submit', (e) => {
    // Prevent the form from submitting
    e.preventDefault();
    // Get the username and password
    const email = username.value;
    const pass = password.value;
    // Sign in the user
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        // Reset the form
        form.reset();
        // Close the modal
        $('#loginModal').modal('hide');
    }).catch(err => {
        // Display the error message
        error.innerHTML = err.message;
    });
});

// Add an event listener to the submit button
submit.addEventListener('click', (e) => {
    // Prevent the form from submitting
    e.preventDefault();
    // Get the username and password
    const email = username.value;
    const pass = password.value;
    // Sign in the user
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        // Reset the form
        form.reset();
        // Close the modal
        $('#loginModal').modal('hide');
    }).catch(err => {
        // Display the error message
        error.innerHTML = err.message;
    });
});

// Add an event listener to the logout button
logout.addEventListener('click', (e) => {
    // Prevent the form from submitting
    e.preventDefault();
    // Sign out the user
    auth.signOut();
});

// Add a realtime listener
auth.onAuthStateChanged(user => {
    if (user) {
        // Get the user's email
        const email = user.email;
        // Display the user's email
        userDisplay.innerHTML = email;
        // Display the logout button
        logout.style.display = 'block';
        // Hide the login button
        login.style.display = 'none';
    } else {
        // Hide the logout button
        logout.style.display = 'none';
        // Display the login button
        login.style.display = 'block';
    }
});

// Open the browser
open('http://localhost:' + port);





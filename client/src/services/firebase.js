import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs, doc, setDoc } from "firebase/firestore"
import "firebase/compat/auth";

// Firebase configuration object from the Firebase project settings 
const firebaseConfig = {
    apiKey: "AIzaSyCAXMmStTvj2pey8bo1MQ_UkAqts9One40",
    authDomain: "devops-dorset.firebaseapp.com",
    databaseURL: "https://devops-dorset-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "devops-dorset",
    storageBucket: "devops-dorset.appspot.com",
    messagingSenderId: "838804017334",
    appId: "1:838804017334:web:04fef0ae6cee2a56905617"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = getFirestore();

// Google authentication provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Assign a role to a user based on their email address
function assignRole(email) {
    if (email.endsWith('@student.dorset-college.ie')) {
        return 'student';
    } else if (email.endsWith('@faculty.dorset-college.ie')) {
        return 'teacher';
    } else if (email.endsWith('@dorset.ie')) {
        return 'admin';
    } else {
        // Handle other cases, e.g., throw an error or set a default role
    }
}

// Export the auth and database objects
export const auth = firebase.auth();
export default firebase;

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                role: assignRole(user.email),
            });
        }
    } catch (err) {
        alert(err.message);
    }
};

// Sign in with email and password
export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

// Register a new user with email and password
export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(name, email, password);
        const user = res.user;
        const userRef = doc(collection(db, "users"), user.uid);

        await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            authProvider: "email",
            email: user.email,
            role: assignRole(user.email),
        });
    } catch (err) {
        alert(err.message);
    }
};

// Send a password reset email
export const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Sign out
export const logout = () => {
    auth.signOut();
};

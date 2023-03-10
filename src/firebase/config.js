// import firebase from 'firebase/app';
// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyDT7gHSl1IaTQtt8jiT9G4cNKuxrk8unCk",
    authDomain: "chat-app-a9202.firebaseapp.com",
    projectId: "chat-app-a9202",
    storageBucket: "chat-app-a9202.appspot.com",
    messagingSenderId: "542134891807",
    appId: "1:542134891807:web:5bcc376428269a95a36c2a",
    measurementId: "G-Z79QFN97MF"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
    // auth.useEmulator('http://localhost:9099');
    // db.useEmulator('localhost', '8080');
}

export { auth,db };
export default firebase;
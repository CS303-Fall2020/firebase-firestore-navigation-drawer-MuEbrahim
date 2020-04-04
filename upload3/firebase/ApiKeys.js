 import * as firebase from 'firebase'
 import '@firebase/firestore'
//  import './shim.js'
//  import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAEQdvRGLVEKb3wS3YQHya-m2BgMEhzimw",
    authDomain: "todolist-3e8ab.firebaseapp.com",
    databaseURL: "https://todolist-3e8ab.firebaseio.com",
    projectId: "todolist-3e8ab",
    storageBucket: "todolist-3e8ab.appspot.com",
    messagingSenderId: "539159995216",
    appId: "1:539159995216:web:f38ac2521a0aa4dbcdc255",
    measurementId: "G-7WCL2C8PKH"
}

firebase.initializeApp(firebaseConfig);

//const database = firebase.auth()


//export const db = firebase.firestore()();
export default firebase;
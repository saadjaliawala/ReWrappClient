import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyA3_t4m78FVkgHSuojv9-SIj4zk9THGRFY",
    authDomain: "venturegame-18df9.firebaseapp.com",
    databaseURL: "https://venturegame-18df9.firebaseio.com",
    projectId: "venturegame-18df9",
    storageBucket: "venturegame-18df9.appspot.com",
    messagingSenderId: "544931461497",
    appId: "1:544931461497:web:f5d62468275f4d61a957a8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
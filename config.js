import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDxHMGyw6pGuaLueghzFf3jiud6ZLsxQ-o",
  authDomain: "barter-2.firebaseapp.com",
  databaseURL: "https://barter-2-default-rtdb.firebaseio.com",
  projectId: "barter-2",
  storageBucket: "barter-2.appspot.com",
  messagingSenderId: "522718231348",
  appId: "1:522718231348:web:b930bfce7983ee19ad8361"
};
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//   export default firebase.firestore();

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase.database()
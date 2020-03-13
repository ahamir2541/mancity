import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDpYGnoR6WD_drM-iJFjXx1JzYsboAa3Kw",
    authDomain: "mcity-568df.firebaseapp.com",
    databaseURL: "https://mcity-568df.firebaseio.com",
    projectId: "mcity-568df",
    storageBucket: "mcity-568df.appspot.com",
    messagingSenderId: "1017764203333",
    appId: "1:1017764203333:web:f5bb13bb55d95894544c2c",
    measurementId: "G-NZWKTX4BQC"
  };

  firebase.initializeApp(firebaseConfig)

const firebaseDB = firebase.database()

const firebaseMatches = firebaseDB.ref('matches')
const firebasePromotions = firebaseDB.ref('promotions')
const firebaseTeams = firebaseDB.ref('teams')
const firebasePlayers = firebaseDB.ref('players')

export{
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebaseDB,
    firebasePlayers,
}

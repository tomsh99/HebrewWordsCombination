import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBG2hONfPekU93Y8YHzlPp2bkZRp75kBRk",
  databaseURL: "https://console.firebase.google.com/u/0/project/levels-builder/database/firestore/data~2F",
  projectId: "levels-builder",
};
firebase.initializeApp(config);

firebase.firestore();

export default firebase;
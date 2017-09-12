import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBXyE-ag9zmsK3pnqmYoosuwJ7wSxk2am8",
	authDomain: "project6-4d9e5.firebaseapp.com",
	databaseURL: "https://project6-4d9e5.firebaseio.com",
	projectId: "project6-4d9e5",
	storageBucket: "project6-4d9e5.appspot.com",
	messagingSenderId: "408781103417"
};
firebase.initializeApp(config);

export default firebase;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAmj2R9WJrVz9IIoeTdCcTiRjflnrvwAY",
    authDomain: "trainschedule-ccfbf.firebaseapp.com",
    databaseURL: "https://trainschedule-ccfbf.firebaseio.com",
    projectId: "trainschedule-ccfbf",
    storageBucket: "trainschedule-ccfbf.appspot.com",
    messagingSenderId: "228202024647"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

// button for adding train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// gets user input
var trainName = $("#trainNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var trainTime = $("#trainTimeInput").val().trim();
var freq = $("#frequencyInput").val().trim();

// creates local temporary object for holding data
var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: freq,
};

// uploades data to database
database.ref().push(newTrain);

// log to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

// alert
alert ("New train added successfully.");

// clears input box
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#trainTimeInput").val("");
$("#frequencyInput").val("");

});
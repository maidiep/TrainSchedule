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

// firebase event for adding train schedule after user input
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

//stores everything into a variable
var trainName = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var freq = childSnapshot.val().frequency;


// train information
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(freq);

// prettify the next arrival time
var trainTime = moment.unix(trainTime).format('LT');

// calculate minutes away

// add train data to schedule table
$("#train-table > tbody").append("<tr><td>" + trainName + "<td><td>" + destination + "<td><td>" + trainTime + "<td><td>" + freq + "<td><td>" );

});
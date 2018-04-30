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


// calculate 
var trainTimePretty = moment.unix(trainTime).format("HH:mm");
console.log(moment.unix(trainTime));
console.log(moment.unix(trainTime).format("HH:mm"));


    // First Train (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = currentTime.diff(trainTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // add train data to schedule table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + trainTime + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
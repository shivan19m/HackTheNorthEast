var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/analytics");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCktGr6pX6KyzPaOtdfEZk9Cm2ANuNvcbM",
    authDomain: "jay1231.firebaseapp.com",
    databaseURL: "https://jay1231.firebaseio.com",
    projectId: "jay1231",
    storageBucket: "jay1231.appspot.com",
    messagingSenderId: "866756428884",
    appId: "1:866756428884:web:a721b4a466bd0572cb19c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db;
function createUser(inGameUserName)
{
    var userId = firebase.auth().currentUser.uid;
    db.collection("users").doc(userId).set({
        //set beginning attributes
        userName: inGameUserName,
        cashPoints: 100000,
        cityName: "Default City",
        cityAttributes: {
            road: 1, //Only one type of road
            building: {
                CityHall: 1, //City only starts with a city hall
                House: 0,
                Tower: 0,
                Hotel: 0,
                Apartment: 0
            },
            decor: {
                tree: 0,
                shrub: 0,
                pool: 0,
            }
        }
    })
        .then(function() {
            console.log("Username Created Successfully");
        })
        .catch(function(error)
        {
            console.error("Error creating account: ", error);
        })
}

function updateCash(newCashPoints)
{
    var userId = firebase.auth().currentUser.uid;
    var userDoc = db.collection("users").doc(userId)
    var previousCash = userDoc.get(cashPoints);
    if (previousCash + newCashPoints < 0)
    {
        throw "Do not have enough points";
    }
    userDoc.set({
        cashPoints: previousCash + newCashPoints
    })
        .then(function() {
            console.log("Cash Points Added");
        })
        .catch(function(error)
        {
            console.error("Error adding cash points: ", error);
        })
}

function updateCityName(newName)
{
    var userId = firebase.auth().currentUser.uid;
    var userDoc = db.collection("users").doc(userId)
    userDoc.set({
        cityName: newName
    })
        .then(function() {
            console.log("City Name is now ", newName);
        })
        .catch(function(error) {
            console.error("Error changing name: ", error);
        })
}

function addBuilding(newBuilding)
{
    var userId = firebase.auth().currentUser.uid;
    var cityAttr = db.collection("users").doc(userId).cityAttributes
    var building = cityAttr.get("building")
    switch(newBuilding)
    {
        case "City Hall":
            building.set({
                CityHall : building.get("CityHall") + 1
            })
                .then(function()
                {
                    var newBalance = updateCash(-100000);
                    console.log("New City Hall Added");
                    console.log("The update balance is " newBalance);
                })
                .catch(function(error){
                    console.error("Error adding a City Hall ", error);
                }
            break;
        case "House":
            building.set({
                House : building.get("House") + 1
            })
                .then(function() {
                    var newBalance = updateCash(-10000);
                    console.log("New House Added");
                    console.log("The updated balance is ", newBalance);
                })
                .catch(function(error) {
                    console.error("Error adding a house ", error);
                })
            break;
        case "Tower":
            building.set({
                Tower: building.get("Tower") + 1
            })
                .then(function() {
                    var newBalance = updateCash(-200000)
                    console.log("New Tower Added");
                    console.log("The updated balance is ", newBalance);
                })
                .catch(function(error) {
                    console.error("Error adding a tower ", error);
                })
        case "Hotel":
            building.set({
                Hotel: building.get("Hotel") + 1
            })
                .then(function() {
                    var newBalance = updateCash(-50000)
                    console.log("New Hotel added");
                    console.log("The updated balance is ", newBalance);
                })
                .catch(function(error) {
                    console.error("Error adding a hotel ", error);
                })
        case "Apartment":
            building.set({
                Apartment: building.get("Apartment") + 1
            })
                .then(function() {
                    var newBalance = updateCash(-75000)
                    console.log("New Apartment Added");
                    console.log("The updated balance is ", newBalance);
                })
                .catch(function(error) {
                    console.error("Error adding an apartment ", error);
                })
    }
}

function addDecor(newDecor)
{
    var userId = firebase.auth().currentUser.uid;
    var cityAttr = db.collection("users").doc(userId).cityAttributes
    var decor = cityAttr.get("decor")
    switch(newDecor)
    {

    }
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut.then(() => {
        console.log("User has signed out");
    })
})

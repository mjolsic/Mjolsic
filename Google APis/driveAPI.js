//Import google api library
var {google} = require('googleapis');
//import google drive module in google library
var drive = google.drive("v3");
//import private key
var key = require("./private_key.json");

//import path "directories calls"
var path = require("path");

//import fs "handle data in this file system"
const fs = require('fs');

//make request to retrieve an authorization allowing to work with
// google drive web service

//retrieve a JWT
var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/drive"],
  null,
);

jwToken.authorize((authErr) =>{
  if(authErr){
    console.log("erro : " + authErr);
    return;
  }
  else{
    console.log("Authorisation granted");
  }
})

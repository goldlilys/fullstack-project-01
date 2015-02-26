'use strict';
// spec/api/instructors.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/instructors/';
var initialRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas",
  "skills": "C++, Java"
};
var secondInstructor = {
  "firstName": "Tom",
  "lastName": "Shell",
  "skills": "Server, Scripting"
};
var thirdInstructor = {
  "firstName": "Emily",
  "lastName": "Row",
  "skills": "Scuba, Diving"
};
var changedRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas",
  "skills": "C++, Java"
};
var emptyRecord = {
  //no properties and values
};
var missingRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas"
};
var missingRecordTwo = {
  "firstName": "Jeff",
  "skills": "C++, Java"
};
var missingRecordThree = {
  "firstName": "Jeff",
  "lastName": "Thomas"
};
var emptyPropertyValues = {
  "firstName": "",
  "lastName": "",
  "skills": "C++, Java"
};


// Create a record
function postRecord(){
  frisby.create('Create an instructor with post')
    .post(url, initialRecord, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      getRecord(json.id);
    })
    .toss();
}

// Create a record
function whichRecord(record){
  frisby.create('Create an instructor with post')
    .post(url, record, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(record)
    .toss();
}

// Read a record
function getRecord(id){
  frisby.create('Get instructor using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      putRecord(json.id);
    })
    .toss();
}

// Update a record
function putRecord(id){
  frisby.create('Put instructor using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    /*.afterJSON(function(json){
      deleteRecord(json.id);
    })*/
    .toss();
}

// Delete a record
function deleteRecord(id) {
  frisby.create('Delete instructor using id')
    .delete(url + id, {json: false})
    .expectStatus(204)
    .toss();
}

// Send something that should trigger an error
function postBadRecord(record){
  frisby.create('Validation: Enforce mandatory fields when creating')
    .post(url, record, {json: true})
    .expectStatus(422)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
          }}}})
    .toss();
}

postRecord();
whichRecord(secondInstructor);
whichRecord(thirdInstructor);

postBadRecord(emptyRecord);
postBadRecord(missingRecord);
postBadRecord(missingRecordTwo);
postBadRecord(missingRecordThree);
postBadRecord(emptyPropertyValues);

'use strict';

// spec/api/courses.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/courses/';

var initialCourse = {
  "title": "Full Stack Dev I",
  "courseType": "video",
  "description": "Learn how to do single page apps advanced"
};
var changedCourse = {
  "title": "Front End Dev",
  "courseType": "instructor led",
  "description": "Learn front end dev"
};
var secondCourse = {
  "title": "Graphics",
  "courseType": "instructor led",
  "description": "Learn UX"
};
var thirdCourse = {
  "title": "Art Making",
  "courseType": "WBT",
  "description": "Learn painting"
};
var fourthCourse = {
  "title": "Videographer",
  "courseType": "video",
  "description": "Learn how to shoot videos"
};
var fiveCourse = {
  "title": "Piano",
  "courseType": "instructor led",
  "description": "Learn classical music"
};
var sixCourse = {
  "title": "Writing 101",
  "courseType": "video",
  "description": "Learn how to write stories"
};
var noCourse = {
};
var emptyCourse = {
  "title": "",
  "courseType": "",
  "description": ""
};
var noTitleCourse = {
  "courseType": "WBT",
  "description": "How to market business"
};
var noCourseType = {
  "title": "Marketing 101",
  "description": "How to market business"
};
var noDescription = {
  "title": "Front End Dev",
  "courseType": "WBT"
};
var marketCourse = {
  "title": "Marketing 101",
  "courseType": "marketing",
  "description": "Learn how to market"
};


// Create a course
function postCourse(){
  frisby.create('Create a course with post')
    .post(url, initialCourse, {json: true})

    //Assertions
    .expectStatus(200)  // 200 means success
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(initialCourse)
    .afterJSON(function(json){
      getCourse(json.id);
    })
    .toss();  // done
}

// Create a course
function whichCourse(course){
  frisby.create('Create a course with post')
    .post(url, course, {json: true})

    //Assertions
    .expectStatus(200)  // 200 means success
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(course)
    .toss();  // done
}

// Read a course
function getCourse(id){
  frisby.create('Get course using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialCourse)
    .afterJSON(function(json){
      putCourse(json.id);
    })
    .toss();
}

// Update a course
function putCourse(id){
  frisby.create('Get course using id')
    .put(url + id, changedCourse, {json: true})
    .expectStatus(200)
    .expectJSON(changedCourse)
    /*.afterJSON(function(json){
      deleteCourse(json.id);
    })*/
    .toss();
}


// Delete a course
function deleteCourse(id){
  frisby.create('Get course using id')
    .delete(url + id, {json: false})  // no need to check json file
    .expectStatus(204)  // no content available so return 204
    .toss();
}


// Send something that should trigger an error
function postBadCourse(badCourse){
  frisby.create('Enforce mandatory fields when creating')
    .post(url, badCourse, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            title: [
              'presence'
            ],
            courseType: [
              'presence'
            ],
            description: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadTitle(){
  frisby.create('Enforce mandatory title when creating')
    .post(url, noTitleCourse, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            title: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadType(){
  frisby.create('Enforce mandatory courseType when creating')
    .post(url, noCourseType, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            courseType: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadDescription(){
  frisby.create('Enforce mandatory description when creating')
    .post(url, noDescription, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            description: [
              'presence'
            ]
          }}}})
    .toss();
}

function postWrongType(wrongType){
  frisby.create('Enforce mandatory type when creating')
    .post(url, wrongType, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            courseType: [
              'inclusion'
            ]
          }}}})
    .toss();
}

function postDuplicateTitle(sameTitle){
  frisby.create('Enforce mandatory unique title when creating')
    .post(url, sameTitle, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            title: [
              'uniqueness'
            ]
          }}}})
    .toss();
}


/* Call tests */
postCourse();
whichCourse(secondCourse);
whichCourse(thirdCourse);
whichCourse(fourthCourse);
whichCourse(fiveCourse);
whichCourse(sixCourse);
//putCourse('id here');  // update
//deleteCourse('54bf63fb7af8cdc664992a53');

postBadCourse(noCourse);
postBadCourse(emptyCourse);
postBadTitle();
postBadType();
postBadDescription();
postWrongType(marketCourse);
postDuplicateTitle(secondCourse);

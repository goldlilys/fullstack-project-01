/**
 * Created by rauldablaing on 1/19/15.
 */

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
var url = 'http://localhost:3000/api/students/';
var initialStudent = {
  "firstName": "Jojo",
  "lastName": "Jones"
};
var newCourse = {
  "title": "Java",
  "courseType": "Programming",
  "description": "Basics"
};
// Set up variables for info you will use often
frisby.create('Create contact with post')
.post('http://localhost:3000/api/students',
    initialStudent,
  {json: true})
.expectStatus(200)
  .afterJSON(function(json){
    getRecord(json.id);
  }
)
.toss();


// Read a record
function getRecord(id){
  frisby.create('Get student using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialStudent)
    .afterJSON(function(json){
      putRecord(json.id);
    })
    .toss();
}

function putRecord(id){
  frisby.create('Put student using id')
    .put(url + id,{
    "firstName": "Chuck",
    "lastName": "Luck"
  }, {json:true})
    .expectStatus(200)
    .expectJSON({
      "firstName": "Chuck",
      "lastName": "Luck"
    })
    .afterJSON(function(json){
      testCourse(id);
    })
    .toss();
}

function testCourse(id){
  frisby.create('Create course to student')
    .post(url + id + '/courses', newCourse)
    .expectStatus(200)
    .expectJSON(newCourse)
    .afterJSON(function(json){
      deleteRecord(json.id);
    })
    .toss();
}

function deleteRecord(id){
  frisby.create('Delete student using id')
    .delete(url + id)
    .expectStatus(204)
    .toss();
}




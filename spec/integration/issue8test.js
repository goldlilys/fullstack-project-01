'use strict';

/*
 * Title: Casper Test Integration
 * By: Frances Go
 * Date: Jan 2015
 */

 /* global casper, __utils__ */

// casper.test.begin(testTitle, numberOfTests, callback)
casper.test.begin('Testing About the Courses page', 21, function(test){
  casper.start('http://localhost:3000/courses.html', function(){
    this.test.assertUrlMatch('/courses.html',
                             'currently in the courses page');
    test.assertTitle('About the Courses', 'about the courses title is good');
  });
  casper.then(function(){
    this.click('a[href="/"]');
  });
  casper.then(function() {
    this.test.assertUrlMatch('/', 'currently in the homepage');
    this.echo('Page title is: ' + this.getTitle());
    test.assertTitle(this.getTitle(), 'homepage title is good');
  });
  casper.then(function(){
    this.click('a[href="/courses.html"]');
  });
  casper.then(function(){
    this.test.assertUrlMatch('/courses.html',
                             'currently in the courses page');
    this.echo('Page title is: ' + this.getTitle());
    test.assertTitle(this.getTitle(), 'about the courses title is good');
  });
  casper.then(function(){
    this.test.assertExists('.breadcrumb li a', 'breadcrumbs found');
    this.test.assertEval(function() {
      return __utils__.findAll('.row .thumbnail img').length >= 6;
    }, 'there are at least 6 course images on the page');
  });
  casper.then(function(){
    this.click('a[href="/instructors.html"]');
  });
  casper.then(function(){
    this.test.assertUrlMatch('/instructors.html',
                             'currently in the instructors page');
    this.echo('Page title is: ' + this.getTitle());
    test.assertTitle(this.getTitle(), 'instructor title is good');
  });
  casper.then(function(){
    this.back();
  });
  casper.then(function(){
    this.test.assertUrlMatch('/courses.html',
                             'currently in the courses page');
    this.echo('Page title is: ' + this.getTitle());
    this.test.assertExists('footer div', 'footer information found');
  });
  casper.then(function(){
    this.test.assertEval(function() {
      return __utils__.findAll('.row h3 a').length >= 6;
    }, 'there are at least 6 course title links on the page');
  });
  casper.then(function(){
    this.click('a[href="/contactus.html"]');
  });
  casper.then(function(){
    this.test.assertUrlMatch('/contactus.html',
                             'currently in the contact us page');
    this.echo('Page title is: ' + this.getTitle());
    test.assertTitle('Contact Us', 'contact us title is good');
  });
  casper.then(function(){
    this.back();
  });
  casper.then(function(){
    this.test.assertUrlMatch('/courses.html',
                             'currently in the courses page');
    test.assertTitle('About the Courses',
     'about the courses title is good');
  });
  casper.then(function(){
    this.click('a[href="/aboutus.html"]');
  });
  casper.then(function(){
    this.test.assertUrlMatch('/aboutus.html',
                             'currently in the about us page');
    this.echo('Page title is: ' + this.getTitle());
    test.assertTitle('About Us', 'about us title is good');
  });
  casper.then(function(){
    this.back();
  });
  casper.then(function(){
    this.test.assertUrlMatch('/courses.html',
                             'currently in the courses page');
    test.assertTitle('About the Courses',
     'about the courses title is good');
  });
  casper.run(function(){
    test.done();
  });
});

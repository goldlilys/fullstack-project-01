'use strict';

//test-name.spec.js

/* global casper */

casper.test.begin('page 1 navigates to page 2', 6,
  function suite(test){
    casper.start('http://localhost:3000/instructors.html', function(){
      test.assertTitle('About Instructors', 'About Instructors title good');
      test.assertExists('a[href="/index.html"]', ' index link found');
      test.assertExists('a[href="/instructors.html"]',
                        ' instructors link found');
      test.assertExists('a[href="/contactus.html"]', ' contact link found');
      test.assertExists('a[href="/courses.html"]', ' link found');
      test.assertExists('a[href="/aboutus.html"]', ' index link found');
    });
    /*casper.then(function(){
      this.click('.testedlink');
    });
    casper.then(function(){
      test.assertTitle('Page 2', 'page 2 title good');
    });*/
    casper.run(function(){
      test.done();
    });
});

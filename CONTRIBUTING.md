Contributing
============

Types of Contributions
----------------------

- **Issues**: please submit issues in the [issue tracker][]
- **Bugs**: look for issues tagged with "bug"
- **Features**: look for issues tagged with "story"

Pull Request Guidelines
-----------------------

Please try to conform to our [JSHint][] rules for code contributions and ensure that the tests continue to function.

Please include any appropriate new tests with your pull requests.

Feel free to open pull requests before you've finished your code or tests.  Opening your pull request sooner will allow others to comment on it sooner.  Please note the status of your pull request when submitting it and update the status as appropriate.

Handling failing tests
----------------------

All identified test scenarios should be noted and tested.

What if either:
- you cannot figure out how to write a proper test
- you wrote a test but you couldn't write the code to make the test pass

Remember, we don't want:
- failing tests in master
- comment out code

Instead of leaving your test failing or commenting it out:

1. Make a commit that deletes the test
2. Open an issue noting the missing test and/or code so we know we'll need to fix it later
3. Reference the commit hash in the issue so you can easily find it later

[issue tracker]: https://github.com/startersacademy/fullstack-project-01/issues
[jshint]: http://jshint.com/docs/

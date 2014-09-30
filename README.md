angular-gcms
============

[![Build Status](https://secure.travis-ci.org/jlovison/angular-gcms.png?branch=master)](https://travis-ci.org/jlovison/angular-gcms)

Use a google spreadsheet as a backend content repository

[Full Instructions](http://jlovison.github.io/angular-gcms/)

### Quickstart ###

Install using:

    bower install jlovison/angular-gcms

Add to your project:

    angular.module('YourModule', ['OtherStuff', 'jlovison.gcms'])

Assuming you have a google spreadsheet being published with an id of '12345' and two columns ('title' and 'post' respectively), pull in the spreadsheet data as follows:

    angular.module('YourApp')
    .controller('YourController', function ($scope, GcmsService) {
        GcmsService.get(
            '12345', // Your sheet ID
            ['title', 'post'] // A list of your column fields in order
        ).then(function(data) { // Catch the fulfilled promise
            $scope.content = data;
        });
    });

The `content` variable in the scope will be a list of `{'tile': "Stuff", 'post': "More stuff"}` objects - one for each row.

See the full instructions above for more detailed info, including why you might want to use this.

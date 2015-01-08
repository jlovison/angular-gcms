angular.module('jlovison.gcms', [])
  .service('GcmsService', function GcmsService($http, $q, $log) {
    'use strict';
    // Setup a parser for data
    var parseData = function(data, columnList) { // the data object we got from Google
      var entries = (data.feed.entry);
      var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var content = [],
        columns = [];

      // Set up the columns based on list
      for(var i = 0; i < columnList.length; i++) {
        columns[i] = [];
      }

      // Process data items
      for(var j = 0; j < entries.length; j++) {
        // Check if the title matches a column and push if match
        for(var k = 0; k < columnList.length; k++) {
          if(entries[j].title.$t.indexOf(alphabet[k]) !== -1) {
            columns[k].push(entries[j].content.$t);
          }
        }
      }

      // Arrange rows into objects
      for(var a = 0; a < columns[0].length; a++) {
        content[a] = {};
        content[a].id = a;
        // Build object based on columnList
        for(var b = 0; b < columnList.length; b++) {
          content[a][columnList[b]] = columns[b][a];
        }

      }

      // Drop the first object (i.e. title row)
      content.shift();
      for (var index in content) {
        content[index].id -= 1;
      }

      return content;
    };

    // Define the spreadsheet getter function with promise return
    var getSpreadsheet = function(sheetId, columnList, worksheetId) {
      var deferred = $q.defer();
      // Load the data from the spreadsheet sheetId
      worksheetId = (typeof worksheetId === "undefined") ? "od6" : worksheetId; 
      $http({
        method: 'GET',
        url: 'https://spreadsheets.google.com/feeds/cells/' + sheetId + '/' + worksheetId + '/public/values?alt=json',
        options: { cache: true }
      })
      .success(function(data) {
          var parsed = parseData(data, columnList);
          deferred.resolve(parsed);
        })
      .error(function(data, status, headers, config) {
        $log.error('The request failed. Data: ' + data  + '; Status: '+ status);
      });

      return deferred.promise;
    };
    
    return {
      'get': getSpreadsheet
    };
  });

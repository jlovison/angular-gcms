describe('angular-gcms', function () {
  'use strict';
  
  // Setup initialization variables
  var GcmsService,
      httpBackend,
      log;

  // load the service's module
  beforeEach(module('jlovison.gcms'));
  
  // instantiate service
  beforeEach(inject(function (_GcmsService_, $httpBackend, $log) {
    log = $log;
    httpBackend = $httpBackend;
    GcmsService = _GcmsService_;
  }));

  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  // Setup testing constants
  var testKey = '123456';
  var url = 'https://spreadsheets.google.com/feeds/cells/' + testKey + '/od6/public/values?alt=json';

  it('should fetch from the server based on a key', function () {
    httpBackend.expectGET(url).respond(404);
    GcmsService.get(testKey);
    httpBackend.flush();
  });
  
  it('should parse and return data when fetched', function () {
    var resultData = {
      'feed': {
        'entry': [{
          'title': {
            '$t': 'A1'
          },
          'content': {
            '$t': 'Title Header'
          }
        }, {
          'title': {
            '$t': 'A2'
          },
          'content': {
            '$t': 'Title One'
          }
        }, {
          'title': {
            '$t': 'A3'
          },
          'content': {
            '$t': 'Title Two'
          }
        }, {
          'title': {
            '$t': 'B1'
          },
          'content': {
            '$t': 'Content Header'
          }
        }, {
          'title': {
            '$t': 'B2'
          },
          'content': {
            '$t': 'Content One'
          }
        }, {
          'title': {
            '$t': 'B3'
          },
          'content': {
            '$t': 'Content Two'
          }
        }]
      }
    };
    var expectedData = [{
      'id': 0,
      'title': 'Title One',
      'content': 'Content One'
    }, {
      'id': 1,
      'title': 'Title Two',
      'content': 'Content Two'
    }];
    var testData = [];

    httpBackend.expectGET(url).respond(200, resultData);
    GcmsService.get(testKey, ['title', 'content'])
      .then(function(data) {
        testData = data;
      });
    httpBackend.flush();
    expect(testData).toEqual(expectedData);
  });

  it('should log an error if request fails', function () {
    // An erronious request
    httpBackend.expectGET(url).respond(404, 'Page Not Found');
    GcmsService.get(testKey);
    httpBackend.flush();

    // Check error was properly logged
    expect(log.error.logs[0][0]).toBe('The request failed. Data: Page Not Found; Status: 404');
  });

  it('should do something', function () {
    expect(!!GcmsService).toBe(true);
  });
  
});

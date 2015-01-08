describe('angular-gcms', function () {
  'use strict';
  
  // Setup initialization variables
  var GcmsService,
      httpBackend,
      log,
      testKey,
      url;

  // load the service's module
  beforeEach(module('jlovison.gcms'));
  
  // instantiate service
  beforeEach(inject(function (_GcmsService_, $httpBackend, $log) {
    log = $log;
    httpBackend = $httpBackend;
    GcmsService = _GcmsService_;
    
    // Setup testing constants
    testKey = '123456';
    url = 'https://spreadsheets.google.com/feeds/cells/' + testKey + '/od6/public/values?alt=json';

  }));

  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!GcmsService).toBe(true);
  });

  it('should fetch from the server based on a key', function () {
    httpBackend.expectGET(url).respond(404);
    GcmsService.get(testKey);
    httpBackend.flush();
  });

  it('should fetch from the server based on a key and sheetId', function () {
    var testSheetId = "ab1"; 
    var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/' + testKey + '/' + testSheetId + '/public/values?alt=json';
    httpBackend.expectGET(sheetUrl).respond(404);
    GcmsService.get(testKey, ['column1', 'column2'], testSheetId);
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
      'headline': 'Title One',
      'article': 'Content One'
    }, {
      'id': 1,
      'headline': 'Title Two',
      'article': 'Content Two'
    }];
    var testData = [];

    httpBackend.expectGET(url).respond(200, resultData);
    GcmsService.get(testKey, ['headline', 'article'])
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
});

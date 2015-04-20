var searchConn = DDP.connect(process.env.SEARCH_SERVICE_URL);
var loggingConn = DDP.connect(process.env.LOGGING_SERVICE_URL);

SearchSource.defineSource('packages', function(searchText, options) {
  loggingConn.call('log', 'searching for package: ' + searchText);
  return searchConn.call('getPackages', searchText, options);
});

Meteor.publish('topPackages', function() {
  loggingConn.call('log', 'accessing top packages');
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});
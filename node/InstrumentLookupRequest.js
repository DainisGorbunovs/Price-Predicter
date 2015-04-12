// usage: node InstrumentLookupRequest.js [<host>]
var https = require('https');
var fs = require('fs');

var host = process.argv[2] || "http-api.openbloomberg.com";
var port = 443

var options = {
    host: host,
    port: port,
    path: '/request?ns=blp&service=instruments&type=instrumentListRequest',
    method: 'POST',
    key: fs.readFileSync('mlh_landing_spring_2015_006.key'),
    cert: fs.readFileSync('mlh_landing_spring_2015_006.crt'),
    ca: fs.readFileSync('bloomberg.crt')
};

var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
      process.stdout.write(d);
    });
});

req.write(JSON.stringify( {
    "query": "RBOB Gasoline",
    //"yellowKeyFilter": "YK_FILTER_CORP",
    "languageOverride": "LANG_OVERRIDE_NONE",
    "maxResults": 30
}));
req.end();

req.on('error', function(e) {
    console.error(e);
});

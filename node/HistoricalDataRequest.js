// usage: node HistoricalDataRequest.js [<host>]
var https = require('https');
var fs = require('fs');

var host = process.argv[2] || "http-api.openbloomberg.com";
var port = 443

var options = {
    host: host,
    port: port,
    path: '/request?ns=blp&service=refdata&type=HistoricalDataRequest',
    method: 'POST',
    key: fs.readFileSync('mlh_landing_spring_2015_006.key'),
    cert: fs.readFileSync('mlh_landing_spring_2015_006.crt'),
    ca: fs.readFileSync('bloomberg.crt')
};

var req = https.request(options, function(res) {
    var body = '';
    res.on('data', function(d) {
      //process.stdout.write(d);
      body += d;
    });

    res.on('end', function() {
        console.log("Length : "+body.length);
        json = JSON.parse(body).data[0].securityData.fieldData;

        json.forEach(function(entry) {
            
        });
        console.log(json[0].PX_LAST);
        console.log(json);
    });
});

var jsoncod = JSON.stringify( {
    "securities": ["XBA Comdty"],
    "fields": ["PX_LAST", "OPEN", "DS002", "DS004", "VWAP_VOLUME", "LAST_TRADE"],
    //"fields": ["LAST_PRICE","LAST_TRADE_ACTUAL"],
    "startDate": "20150214",
    "endDate": "20150314",
    "periodicitySelection": "DAILY"
});

req.write(jsoncod);
req.end();
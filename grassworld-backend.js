// var http = require('http');
var url = require('url');
var fs = require('fs');
var dbms = require('mysql');

const express = require('express');
const app=express();
const port = 81;

var events = require('events');
var eventEmitter = new events.EventEmitter();

var debugfile="/home/public/grassworld-debug.dat";

function nowIs() { 
	function pad(n) {
		return n<10 ? '0'+n : n
	}
	return new Date().getFullYear() + "-"+pad(+ new Date().getMonth()+1) + '-'+ pad(new Date().getDate()) + ' ' + pad(+ new Date().getHours() ) + ':' + pad(+ new Date().getMinutes() );
}
console.log("STARTED at " + nowIs());
var pw = require('./grassworld-pw.js');
// var sqlconnection = dbms.createConnection({
//   host: "127.0.0.1",
//   user: "grassman",
//   password: "ryegra55",
//   database: "grassworld_001"
// });
var sqlconnection = dbms.createConnection({
  host: "127.0.0.1",
  user: pw.user,
  password: pw.pass,
  database: "grassworld_001"
});
sqlconnection.connect(function(err) {
  if (err) throw err;
  console.log("DBMS Connected OK");
});

var x = require('./grassworld-library.js');
var pending=0;

app.use(express.static('/var/www/html/html_static/'));
app.get("/db/",(request, response) => db(request, response));

app.listen(port, () => console.log(`STARTED on port ${port}`));

function db(request, response) {
  var reply='';
    function finishOrNot() {
      pending--;
      if (pending == 0) {
        response.write(String(`</body></html>`));
        console.log("OK");
        fs.appendFile(debugfile, 'DIS-CONNECT\n', () => {});
        response.end();
      }
      else {
      }
    }
    
    function get_by_name(name) {
      pending++;
      var r;
      sqlconnection.query(
        "SELECT * FROM things WHERE Tname LIKE " + sqlconnection.escape(name), function (err, results, fields) {
          if(results.length != 1){
            r='error';
          }
          else {
            if ( results[0].Tid > 0 ) {
              r=results[0].Tcontent;
            }
            else {
              r='error';
            }
          }
          response.write(String(r));
          return r;
        }
      );
    }
	
  console.log('CONNECT -> DB -> '+request.method + ' ' + String(request.url));
  console.log( nowIs());
  fs.appendFile(debugfile, 'CONNECT\n', () => {});
  fs.appendFile(debugfile, nowIs() + "\n", () => {});
  fs.appendFile(debugfile, 'Method: ' + request.method + '\n', () => {});
  for (var key in request.headers) {
      fs.appendFile(debugfile,key + " -> " + request.headers[key] + "\n", () => {});
  }
  if (request.method || 'GET') {
    var cgi = url.parse(request.url, true).query;
    reply=get_by_name(cgi.name);
  }
  else {
    reply='DB: Not Found';
  }

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE html><html><head>" );
  response.write("</head><body>");
  
//   pending++;
//   sql.query ("SELECT * FROM subject ORDER BY name", function (err, results, fields) {
// 	var table=`<table id="maintable" class="w100">`;
// 	var line;
// 	for (i=0; i < results.length; i++) {
// 		line=`<tr ><td class="mid pr nob">${results[i].keyID}</td><td class="mid" onclick="inner_${results[i].keyID}()">${results[i].name}</td></tr>`;
// 		table += line;
// 		var outer_name="outer_"+results[i].keyID;
// 		line=`<tr ><td colspan="2" class="subsid hidden w100" id="outer_${results[i].keyID}"></td></tr>`;
// 		table+=line;
// 		line=getComponents(results[i].keyID);
// 	}
// 	table+= `
// 	<script> var dpath="https://fachtnaroe.net/node/";
//     function getMe(thing) { if (typeof window.AppInventor === 'undefined') { /* block for desktop access */ if ( (thing != 'xam') && (thing != 'dna') ) { window.open(dpath + "briefs/" + thing);} } else {
//           try { window.AppInventor.fachtnaSetWebViewString(thing); } catch { window.AppInventor.setWebViewString(thing); } } } </script>`;
//     console.log('SENDING: ', reply);
//     response.write(String(reply));
//     finishOrNot();
//   });
  
}


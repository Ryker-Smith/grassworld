// var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

const express = require('express');
const app=express();
const port = 81;

var events = require('events');
var eventEmitter = new events.EventEmitter();

var debugfile="/home/public/grassworld-debug.dat";
var pw = require('./grassworld-pw.js');
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    escape( thing ) {
        return this.connection.escape( String(thing));
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

var dbms=new Database({
  host: "127.0.0.1",
  user: pw.user,
  password: pw.pass,
  database: "grassworld_001"
});

function nowIs() { 
	function pad(n) {
		return n<10 ? '0'+n : n
	}
	return new Date().getFullYear() + "-"+pad(+ new Date().getMonth()+1) + '-'+ pad(new Date().getDate()) + ' ' + pad(+ new Date().getHours() ) + ':' + pad(+ new Date().getMinutes() );
}
console.log("STARTED at " + nowIs());

// var sqlconnection = dbms.createConnection({
//   host: "127.0.0.1",
//   user: "grassman",
//   password: "ryegra55",
//   database: "grassworld_001"
// });
// var sqlconnection = dbms.createConnection({
//   host: "127.0.0.1",
//   user: pw.user,
//   password: pw.pass,
//   database: "grassworld_001"
// });
// sqlconnection.connect(function(err) {
//   if (err) throw err;
//   console.log("DBMS Connected OK");
// });

var x = require('./grassworld-library.js');
var pending=0;

app.use(express.static('/var/www/html/html_static/'));
app.get("/db/",(request, response) => db(request, response));
app.listen(port, () => console.log(`STARTED on port ${port}`));

async function db(request, response) {
    var reply='';
    
    async function get_by_name(name) {
        var r;
        await dbms.query(
            "SELECT * FROM things WHERE Tname LIKE " + dbms.escape(name))
          .then( results => {
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
          return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
	
  console.log( nowIs());
  console.log('CONNECT -> DB -> '+request.method + ' ' + String(request.url));
  fs.appendFile(debugfile, 'CONNECT\n', () => {});
  fs.appendFile(debugfile, nowIs() + "\n", () => {});
  fs.appendFile(debugfile, 'Method: ' + request.method + '\n', () => {});
  for (var key in request.headers) {
      fs.appendFile(debugfile,key + " -> " + request.headers[key] + "\n", () => {});
  }
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE html><html><head>" );
  response.write("</head><body>");
  if (request.method || 'GET') {
    var cgi = url.parse(request.url, true).query;
     reply=await get_by_name(cgi.name);
     console.log('RESPONSE -> ' + reply);
     response.write(reply);
     response.end();
  }
  else {
    reply='DB: Not Found';
    console.log('RESPONSE -> ' + reply);
    response.write(reply);
    response.end();
  }
  
}

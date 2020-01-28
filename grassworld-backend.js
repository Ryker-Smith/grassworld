
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

const express = require('express');
const app=express();
const port = 81;

var events = require('events');
var eventEmitter = new events.EventEmitter();
var config = require('./grassworld-pw.js');
var debugfile=config.debugfile;

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
  host: config.dbhost,
  user: config.user,
  password: config.pass,
  database: config.dbname
});

function nowIs() { 
	function pad(n) {
		return n<10 ? '0'+n : n
	}
	return new Date().getFullYear() + "-"+pad(+ new Date().getMonth()+1) + '-'+ pad(new Date().getDate()) + ' ' + pad(+ new Date().getHours() ) + ':' + pad(+ new Date().getMinutes() );
}
console.log("STARTED at " + nowIs());

var lib = require('./grassworld-library.js');
var pending=0;

app.use(express.static('/var/www/grassworld/html/'));
app.get("/db/",(request, response) => db_get(request, response));
app.put("/db/",(request, response) => db_put(request, response));
app.post("/db/",(request, response) => db_post(request, response));
app.get("/debug/",(request, response) => db_dbg(request, response));
app.listen(port, () => console.log(`STARTED on port ${port}`));

//========================================================================================
async function db_get(request, response) {
    var reply='';
    
    async function get_by_name(name, Tz) {
        var r;
        await dbms.query(
            "SELECT * FROM things WHERE Tname LIKE " + dbms.escape(name) + " AND Tz="+(dbms.escape(Tz)))
          .then( results => {
          if(results.length != 1){
            r='error b90';
          }
          else {
            if ( results[0].Tid > 0 ) {
              r=results[0].Tcontent;
            }
            else {
              r='error b97';
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

    async function get_things(mobile, Tz) {
        var r;
        console.log("SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Gmobile="+ mobile);
        await dbms.query(
            "SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Gmobile="+ (dbms.escape(mobile)) + " AND Tz="+(dbms.escape(Tz)))
          .then( results => {
          if(results.length < 1){
            r='error b115';
          }
          else {
            r=JSON.stringify(results);
          }
          return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
	
    async function tget(mobile, Tz) {
        var r;
        console.log("SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Tid="+ Tid + " AND Tz=" +Tz);
        await dbms.query(
            "SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Tid="+ (dbms.escape(Tid)) + " AND Tz="+(dbms.escape(Tz)))
          .then( results => {
          if(results.length < 1){
            r='error b115';
          }
          else {
            r=JSON.stringify(results);
          }
          return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
    
    async function tgetimages(Tid) {
        var r;
        await dbms.query(
            "SELECT GimagesJSON FROM genus JOIN things ON Tgenus=Gid WHERE Tid="+ (dbms.escape(Tid)))
          .then( results => {
          if(results.length < 1){
            r=results;
            console.log('E '+r);
          }
          else {
            r=JSON.stringify(results);
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
  response.writeHead(200, {'Content-Type': 'text/html'});
  if (request.method || 'GET') { // unnecessary
    var cgi = url.parse(request.url, true).query;
    if (lib.isundefined(cgi.Tz)) {
        cgi.Tz=0;
    }
    if (lib.isdefined(cgi.name)) {
      reply=await get_by_name(cgi.name);
    }
    else if (lib.isdefined(cgi.cat)) {
      if (cgi.cat == 'fauna') {
        reply=await get_things(1,cgi.Tz);
      }
      else if (cgi.cat == 'flora') {
        reply=await get_things(0,cgi.Tz);
      }
      else if (cgi.cat == 'object') {
        reply='{}';
      }
      else {
        reply='error b160';
      }
    }
    else if (lib.isdefined(cgi.a)) {
      if (cgi.t == 'thing') {
        if(cgi.a == 'gij') {
          reply=await tgetimages(cgi.Tid);
        }
        else if (cgi.a =='get') {
          reply=await tget(cgi.Tid);
        }
      }
    }
    response.write(String(reply));
    response.end();
  }
  else {
    reply='DB: Not Found';
    response.write(String(reply));
    response.end();
  }
}
//========================================================================================
async function db_put(request, response) {
    var reply='';
    
    async function saveLocation(Tid, Tx, Ty, Tz) {
        var r;
        console.log("UPDATE things SET Tx=" +Tx+ ", Ty="+Ty+", Tz="+Tz+" WHERE Tid="+Tid);
        await dbms.query(
            "UPDATE things SET Tx=" +dbms.escape(Tx)+ ", Ty="+dbms.escape(Ty)+", Tz="+dbms.escape(Tz)+" WHERE Tid=" + dbms.escape(Tid))
          .then( results => {
            r=JSON.stringify(results);
            return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
    
    async function tsetimages(Tid, imagesJSON) {
        var r;
        
        await dbms.query(
            "UPDATE genus SET GimagesJSON="+(dbms.escape(imagesJSON))+" WHERE Gid=(SELECT Tgenus FROM genus WHERE Tid="+ (dbms.escape(Tid)))
          .then( results => {
          if(results.length < 1){
            r='error b226';
          }
          else {
            r=JSON.stringify(results);
          }
          return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }

    async function tgenuschange(Tid, newGenus) {
        var r;
        await dbms.query(
            "UPDATE things SET Tgenus="+(dbms.escape(newGenus))+" WHERE Tid="+ (dbms.escape(Tid)))
          .then( results => {
          if(results.length < 1){
            r='error b236';
          }
          else {
            r=JSON.stringify(results);
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
    var cgi = url.parse(request.url, true).query;
    if (lib.isdefined(cgi.a)) {
      if(cgi.a == 'sl') {
        reply=await saveLocation(cgi.Tid, cgi.Tx, cgi.Ty, cgi.Tz);
      }
      else if (cgi.a == 'sij'){
        reply=await tsetimages(cgi.Tid,cgi.j);
      }
      else if (cgi.a == 'gc'){
        reply=await tgenuschange(cgi.Tid,cgi.ng);
      }
    }
    response.write(String(reply));
    response.end();
}
//========================================================================================
async function db_post(request, response) {
    var reply='';
    
    async function conceive(Tname, Tgenus) {
        var r;
        var x=0,y=0,z=0;
        await dbms.query(
            "INSERT INTO things (Tname, Tgenus) VALUES ("+dbms.escape(Tname)+","+dbms.escape(Tgenus)+")")
          .then( results => {
            r=JSON.stringify(results);
            console.log(r.warningCount);
            if (r.insertId > 0) {
                r=r;
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
  var cgi = url.parse(request.url, true).query;
  if (lib.isdefined(cgi.a)) {
      if(cgi.a == 'mk') {
        if (cgi.t == 'thing') {
          reply=await conceive(cgi.name, cgi.g);
        }
      }
    }
    console.log('POST RESPONSE -> ' + reply);
    response.write(String(reply));
    response.end();
}

//========================================================================================
async function db_dbg(request, response) {
    var reply='';

  console.log( nowIs());
  console.log('CONNECT -> DBG -> '+request.method + ' ' + String(request.url));

  for (var key in request.headers) {
      fs.appendFile(debugfile,key + " -> " + request.headers[key] + "\n", () => {});
  }
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE html><html><head>" );
  response.write("</head><body>");
 
  response.write(String('-not implemented-'));
  response.end();
  response.write(String(reply));
  response.end();
}

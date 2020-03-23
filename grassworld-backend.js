
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const express = require('express');

const app=express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var port = 81;
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

app.post("/DB/",(request, response) => db_post(request, response));
app.put("/DB/",(request, response) => db_put(request, response));
app.get("/DB/",(request, response) => db_get(request, response));
app.delete("/DB/",(request, response) => db_del(request, response));

app.post("/SI/",(request, response) => si_post(request, response));
//app.post("/SI/NAME/:SCname/TK/:token",(request, response) => si_post(request, response));
// app.post("/SI/NAME/:SCname/TK/:token/C/:SCscript/",(request, response) => si_post(request, response));
app.put("/SI/",(request, response) => si_put(request, response));
app.get("/SI/ID/:SCid/TK/:token",(request, response) => si_get(request, response));
// app.delete("/SI/",(request, response) => si_post(request, response));

app.post("/U/",(request, response) => u_post(request, response));
app.put("/U/",(request, response) => u_put(request, response));

app.get("/debug/",(request, response) => db_dbg(request, response));
app.listen(port, () => console.log(`STARTED on port ${port}`));

//========================================================================================
async function db_get(request, response) {
    var reply='';
    
    async function tget_single_by_name(name, Tz) {
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

    async function tget_things_multiple(mobile, Tz) {
        var r;
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
	
	async function tget_all() {
        var r;
        await dbms.query(
            "SELECT * FROM things ORDER BY Tid" )
          .then( results => {
          if(results.length < 1){
            r='error b142';
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
	async function gget_all() {
        var r;
        await dbms.query(
            "SELECT * FROM genus ORDER BY Gid" )
          .then( results => {
          if(results.length < 1){
            r='error b161';
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
    async function tget_single_by_Tid(Tid, Tz) {
        var r;
        console.log("SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Tid="+ Tid + " AND Tz=" +Tz);
        await dbms.query(
            "SELECT * FROM things JOIN genus ON things.Tgenus=genus.Gid WHERE Tid="+ (dbms.escape(Tid)) + " AND Tz="+(dbms.escape(Tz)))
          .then( results => {
          if(results.length < 1){
            r='error b124';
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
    
    async function gget_single_by_gid(gid) {
        var r;
        await dbms.query(
            "SELECT * FROM genus WHERE Gid="+ (dbms.escape(gid)) )
          .then( results => {
          if(results.length < 1){
            r='error b159';
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
      reply=await tget_single_by_name(cgi.name,cgi.Tz);
    }
    else if (lib.isdefined(cgi.cat)) {
      if (cgi.cat == 'fauna') {
        reply=await tget_things_multiple(1,cgi.Tz);
      }
      else if (cgi.cat == 'flora') {
        reply=await tget_things_multiple(0,cgi.Tz);
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
          if (lib.isdefined(cgi.Tid)) {
            reply=await tget_single_by_Tid(cgi.Tid, cgi.Tz);
          }
          else {
            reply=await tget_all();
          }
        }
      }
      else if (cgi.t == 'genus') {
        if (cgi.a =='get') {
          if (lib.isdefined(cgi.gid)) {
            reply=await gget_single_by_gid(cgi.gid);
          }
          else {
            reply=await gget_all();
          }
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
    
    async function gsetimages(Gid, GimagesJSON) {
        var r;
        
        await dbms.query(
            "UPDATE genus SET GimagesJSON="+(dbms.escape(GimagesJSON))+" WHERE Gid="+ (dbms.escape(Gid)))
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

    async function gupdate(Gid, Gname, Gdescription, Gmobile, Ganimated, Ginteracts, Gcansleep, Gliving, GimagesJSON) {
        var r;
        await dbms.query(
            "UPDATE genus SET Gname="+(dbms.escape(Gname))+", Gdescription="+(dbms.escape(Gdescription))+", Gmobile="+(dbms.escape(Gmobile))+", Ginteracts="+(dbms.escape(Ginteracts))+", Ganimated="+(dbms.escape(Ganimated))+ ", Gcansleep="+(dbms.escape(Gcansleep))+", Gliving="+(dbms.escape(Gliving))+", GimagesJSON="+(dbms.escape(GimagesJSON))+ " WHERE Gid="+(dbms.escape(Gid)))
          .then( results => {
          if(results.length < 1){
            console.log(r);
            console.log(results);
            r='error b226';
          }
          else {
            console.log(results);
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
    async function tupdate(Tid, Tname, Tcreator, Tstatus, Tcontent, Tgenus, Tx, Ty, Tz, Tteam, Tkeypressfunc) {
        var r;
        await dbms.query(
            "UPDATE things SET Tname="+(dbms.escape(Tname))+", Tcreator="+(dbms.escape(Tcreator))+", Tstatus="+(dbms.escape(Tstatus))+", Tcontent="+(dbms.escape(Tcontent))+", Tgenus="+(dbms.escape(Tgenus))+ ", Tx="+(dbms.escape(Tx))+", Ty="+(dbms.escape(Ty))+", Tz="+(dbms.escape(Tz))+", Tteam="+(dbms.escape(Tteam))+", Tkeypressfunc="+(dbms.escape(Tkeypressfunc)) + " WHERE Tid="+(dbms.escape(Tid)) )
          .then( results => {
          if(results.length < 1){
            console.log(r);
            console.log(results);
            r='error b370';
          }
          else {
            console.log(results);
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
        reply=await gsetimages(cgi.Tid,cgi.j);
      }
      else if (cgi.a == 'gc'){
        reply=await tgenuschange(cgi.Tid,cgi.ng);
      }
      else if (cgi.a == 'sv'){
        reply=await gupdate(
          request.body.Gid,request.body.Gname, request.body.Gdescription, request.body.Gmobile, 
          request.body.Ganimated, request.body.Ginteracts, request.body.Gcansleep, request.body.Gliving, request.body.GimagesJSON);
      }
      else if (cgi.a == 'upd'){
        reply=await tupdate(
          request.body.Tid,request.body.Tname, request.body.Tcreator, request.body.Tstatus, 
          request.body.Tcontent, request.body.Tgenus, request.body.Tx, request.body.Ty, request.body.Tz, request.body.Tteam, request.body.Tkeypressfunc);
      }
    }
    response.write(String(reply));
    response.end();
}
//========================================================================================
async function db_post(request, response) {
    var reply='';
    
    async function newThing(Tname, Tgenus) {
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

    async function newGenus(Gname, Gmobile, Ganimated, Ginteracts, Gcansleep, Gliving, GimagesJSON) {
        var r;
        var x=0,y=0,z=0;
        await dbms.query(
            "INSERT INTO genus (Gname, Gmobile, Ganimated, Ginteracts, Gcansleep, Gliving, GimagesJSON) VALUES ("+dbms.escape(Gname)+","+dbms.escape(Gmobile)+","+dbms.escape(Ganimated)+","+dbms.escape(Ginteracts)+","+dbms.escape(Gcansleep)+","+dbms.escape(Gliving)+","+dbms.escape(GimagesJSON)+")")
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
          reply=await newThing(cgi.name, cgi.g);
        }
        else if (cgi.t == 'genus') {
          reply=await newGenus(cgi.Gname, cgi.Gmobile, cgi.Ganimated, cgi.Ginteracts, cgi.Gcansleep, cgi.Gliving, cgi.GimagesJSON);
        }
      }
  }
  console.log('POST RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}
//========================================================================================
async function db_del(request, response) {
    var reply='';
    
    async function tdelete(Tid) {
        var r;
        await dbms.query(
            "DELETE FROM things WHERE (Tid="+dbms.escape(Tid)+") ")
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

  console.log( nowIs());
  console.log('DELETE CONNECT -> DB -> '+request.method + ' ' + String(request.url));
  fs.appendFile(debugfile, 'CONNECT\n', () => {});
  fs.appendFile(debugfile, nowIs() + "\n", () => {});
  fs.appendFile(debugfile, 'Method: ' + request.method + '\n', () => {});
  for (var key in request.headers) {
      fs.appendFile(debugfile,key + " -> " + request.headers[key] + "\n", () => {});
  }
  response.writeHead(200, {'Content-Type': 'text/html'});
  var cgi = url.parse(request.url, true).query;
  if (lib.isdefined(cgi.t)) {
    if ((cgi.t == 'thing') && (lib.isdefined(cgi.Tid))) {
      reply=await tdelete(cgi.Tid);
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
//========================================================================================
async function si_post(request, response) {
    var reply='';
    
    async function SIcreate(SCname, SCscript) {
        var r;
        await dbms.query(
            "INSERT INTO scripts (SCname, SCscript) VALUES ("+dbms.escape(SCname)+","+dbms.escape(SCscript)+")")
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
  console.log( nowIs() );
  console.log('CONNECT -> SI -> '+request.method + ' ' + String(request.url));
  response.writeHead(200, {'Content-Type': 'text/html'});
  var cgi = url.parse(request.url, true).query;
  var TK=request.body.TK;
  var SIcode=unescape(request.body.SIcode) ;
  console.log('Code: '+unescape(SIcode) );
  var SIname=request.body.SIname;
  reply=await SIcreate(SIname, SIcode);
  console.log('POST RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}
//========================================================================================
async function si_put(request, response) {
    var reply='';

    async function SIwrite(SCid, SCscript) {
        var r;
        
        await dbms.query(
            "UPDATE scripts SET SCscript="+(dbms.escape(SCscript))+" WHERE SCid="+ (dbms.escape(SCid)))
          .then( results => {
          if(results.length < 1){
            r='error b226';
          }
          else {
            r=JSON.stringify(results.warningCount);
          }
          return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
    
  console.log( nowIs() );
  console.log('CONNECT -> SI -> '+request.method + ' ' + String(request.url));
  response.writeHead(200, {'Content-Type': 'text/html'});
  var TK=request.body.TK;
  var SCid=request.body.SIid;
  var SCscript=unescape(request.body.SIcode) ;
  console.log('ID: '+SCid);
  reply=await SIwrite(SCid, SCscript);
  console.log('PUT RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}
//========================================================================================
async function si_get(request, response) {
    var reply='';

    async function SIread(SCid) {
        var r;
        await dbms.query(
            "SELECT SCid, Scname, SCscript FROM scripts WHERE SCid="+ (dbms.escape(SCid)))
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
    
  console.log( nowIs() );
  console.log('CONNECT -> SI -> '+request.method + ' ' + String(request));
  response.writeHead(200, {'Content-Type': 'text/html'});
  var cgi = url.parse(request.url, true).query;
  var TK=request.params.token;
  console.log('TK: '+TK);
  var SCid=request.params.SCid;
  console.log('ID: '+SCid);
  console.log('B '+JSON.stringify(request.body));
  reply=await SIread(SCid);
  
  console.log('GET RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}

async function u_post(request, response) {
  var reply='';

  async function Ucreate(Uname, Uemail, Upassword) {
        var r;
        await dbms.query(
            "INSERT INTO users (Uname, Uemail, Upassword) VALUES ("+dbms.escape(Uname)+","+dbms.escape(Uemail)+","+dbms.escape(Upassword)+")")
          .then( results => {
            r=JSON.stringify(results);
            console.log(r.warningCount);
            if (r.insertId > 0) {
                r=JSON.stringify('Uid',r.insertId);
            }
            return r;
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
  console.log( nowIs() );
  console.log('CONNECT -> U -> '+request.method + ' ' + String(request.url));
  response.writeHead(200, {'Content-Type': 'text/html'});
  var cgi = url.parse(request.url, true).query;
  var Uname=request.body.Uname;
  var Uemail=unescape(request.body.Uemail) ;
  var Upassword=request.body.Upassword;
  reply=await Ucreate(Uname, Uemail, Upassword);
  
  console.log('U POST RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}
async function u_put(request, response) {
    var reply='';

  async function Ulogin(Uemail, Upassword) {
        var r;
        await dbms.query(
            "SELECT COUNT(*) AS `loginOK`,UToken FROM users WHERE Uemail="+dbms.escape(Uemail)+" AND Upassword="+dbms.escape(Upassword))
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
  console.log( nowIs() );
  console.log('CONNECT -> U -> '+request.method + ' ' + String(request.url));
  response.writeHead(200, {'Content-Type': 'text/html'});
  var Uemail=unescape(request.body.Uemail) ;
  var Upassword=request.body.Upassword;
  console.log('UL '+Uemail+' '+Upassword);
  reply=await Ulogin(Uemail, Upassword);
  
  console.log('U PUT RESPONSE -> ' + reply);
  response.write(String(reply));
  response.end();
}

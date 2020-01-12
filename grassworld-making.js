
var fs = require('fs');
var mysql = require('mysql');

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

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

var x = require('./grassworld-library.js');
var pending=0;


make();

async function make() {
    var reply='';
    
    async function new_schp(id, X, Y) {
        var r;
        console.log('MAKING -> ('+X+","+Y+")");
        await dbms.query(
            "INSERT INTO world (id, X,Y,Z,T,Status) VALUES("+id+","+X+","+Y+",0,0,'f')") 
          .then( results => {
          if(results.length != 1){
            r='error';
          }
        }
      )
      .catch( err => {
        console.log(err);
      });
      return r;
    }
  
  var id=1;

  for (i=-100;i<=+100;i++) {
    for (j=-100;j<=+100;j++) {
      reply=await new_schp(id, i,j);
      id++;
    }
  }
  
  
}

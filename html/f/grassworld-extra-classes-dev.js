var grassworld_si=grassworld_url+"SI/";

function SItoken() {
  return '/TK/a1b2c3d4/';
}
function tokenval() {
  return
}

class AccessToken {
  constructor() {
    this.id=undefined;
    this.value='a1b2c3d4'; // temporary
    this.granted=undefined;
    this.expires=undefined;
    this.tickslife=-1;
  }
  getnew() {
  }
  release() {
  }
  validate() {
  }
  revalidate() {
  }
}

class ScriptItem {
    constructor(name){
      this.id=-1;
      this.name=name;
      this.code='';
      this.url=grassworld_si;//+'NAME/'+this.name;
      this.dirty=false;
      this.lastresult='new';
    }
    SIdisplay() {
      console.log('ID '+this.id);
      console.log('NAME '+this.name);
      console.log('CODE '+this.code);
      console.log('URL '+this.url);
    }
    SIcreate(plf) {
      this.dirty=true;
      let xhr = new XMLHttpRequest();
      let t=this.url;
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIcode : escape (this.code),
          SIname : this.name
        });
      xhr.open('POST', t);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message); 
      let caller={};
      caller=this;
      this.id=xhr.onload = function() {
        if (xhr.status == 200) {
            console.log('RX '+ xhr.response );
            if (typeof plf === 'function' ) {
              plf(JSON.parse(xhr.response).insertId);
            }
            else {
                caller.id=JSON.parse(xhr.response).insertId;
            }
        }
        else { 
            return 'Error x26';
        }
      }
    }
    //===================================================
    SIread(plf){
      let xhr = new XMLHttpRequest();
      let t=this.url;
      let message=JSON.stringify({
          TK : 'a1b2c3d4',
          id : this.id,
          SIname : this.name
      });
      t += 'ID/' + this.id + SItoken();
      xhr.open('GET', t);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      
      xhr.send(message);
      xhr.onload = function() {
        if (xhr.status == 200) { 
          let r=xhr.response;
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          r=JSON.parse(r);
          if (typeof plf === 'function' ) {
           plf(r.SCid, r.Scname, r.SCscript);
          }
          else {
            console.log('feck');
          }
        }
        else { 
          console.log('Error x40');
        }
      };
    }
    //===================================================
    SIwrite(){
      this.dirty=true;
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIid : this.id,
          SIname : this.name,
          SIcode : this.code
        });
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', this.url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message);
      xhr.onload = function() {
        if (xhr.status == 200) {
          this.dirty=false;
        }
        else {
          console.log('Error x55');
        }
      };
    }
    SIerase(){
      this.dirty=true;
      let xhr = new XMLHttpRequest();
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIid : this.id
        });
      xhr.open('PUT', this.url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message);
      xhr.onload = function() {
        if (xhr.status == 200) {
            this.dirty=false;
        }
        else { 
            console.log('Error x70');
        }
      };
    }
}

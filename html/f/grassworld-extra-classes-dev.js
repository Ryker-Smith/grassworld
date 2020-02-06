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
      let t=this.url;// + SItoken();
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIcode : escape (this.code),
          SIname : this.name
        });
      console.log('SEND '+message);
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
//               caller.id=JSON.parse(xhr.response).insertId;
              console.log('1> '+caller.name+' '+caller.id);
            }
            else {
                caller.id=JSON.parse(xhr.response).insertId;
                console.log('2> '+caller.name+' '+caller.id);
            }
        }
        else { 
            console.log('E '+xhr.response);
            return 'Error x26';
        }
      }
    }
    SIread(plf){
      this.dirty=true;
      let caller={};
      caller=this;
      let xhr = new XMLHttpRequest();
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIid : this.id
        });
      xhr.open('GET', this.url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message);
      xhr.onload = function() {
        if (xhr.status == 200) { 
          let r=JSON.parse(xhr.response);
          console.log( 'J0 '+r.SCid+' '+r.SCname+' '+r.SCscript );
          if (typeof plf === 'function' ) {
            console.log( 'J1 '+r.SCid+' '+r.SCname+' '+r.SCscript );
            plf(r.SCid, r.SCname, r.SCscript);
          }
          else {
            console.log( 'J2 '+r.SCid+' '+r.SCname+' '+r.SCscript );
            caller.id=r.SCid;
            caller.name=r.SCname;
            caller.code=r.SCscript;
          }
          caller.dirty=false;
        }
        else { 
          console.log('Error x40');
        }
      };
    }
    SIwrite(plf){
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
          console.log('W '+xhr.response); 
//           plf(JSON.parse(xhr.reponse));
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
            console.log(); 
            this.dirty=false;
        }
        else { 
            console.log('Error x70');
        }
      };
    }
}

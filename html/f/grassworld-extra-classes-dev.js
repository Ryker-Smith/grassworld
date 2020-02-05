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
    constructor(id, name, code){
      this.id=-1;
      this.name=name;
      this.code=code;
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
    SIcreate() {
      this.dirty=true;
      let xhr = new XMLHttpRequest();
      let t=this.url;// + SItoken();
      xhr.method="POST";
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          SIcode : escape (this.code),
          SIname : this.name
        });
      console.log(message);
      xhr.open('POST', t);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message); 
      this.id=xhr.onload = function() {
        if (xhr.status == 200) {
            console.log('R '+ xhr.response );
            
            this.dirty=false;
        }
        else { 
            console.log('E '+xhr.response);
            return 'Error x26';
        }
      }
    }
//     SIBcreate() {
//       fetch(this.url, {
//         method : "POST",
//         body : JSON.stringify({
//           TK : 'a1b2c3d4',
//           C  : escape (this.content)
//         })
//       }).then(
//         response => response.text() // .json(), etc.
//         this.lastresult = response.text()
//         
//         same as function(response) {return response.text();}
//       )
//       .then(
//           html => console.log(html)
//       );
//     }
    SIread(){
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { 
          this.dirty=false;
        }
        else { 
          console.log('Error x40');
        }
      };
    }
    SIwrite(){
      this.dirty=true;
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', this.url + '/SI/' + escape(this.content));
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { 
          console.log(); 
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
      xhr.open('PUT', this.url);
      xhr.send();
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


var grassworld_url="https://grassworld.fachtnaroe.net/";
var grassworld_u=grassworld_url+"U/";

/*
var username = document.getElementById("rusername").textContent;
var email = document.getElementById("remail").textContent;
var password = document.getElementById("rpassword").textContent;*/


class Reg {
  constructor(u, e, p){
    this.username=u;
    this.email=e;
    this.password=p;
    this.url=grassworld_u;
  }

  register(){
    let xhr = new XMLHttpRequest();
    let message= JSON.stringify({
        Uname : this.username,
        Uemail : this.email,
        Upassword : this.password
    });
    xhr.open('POST', this.url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(message);
  }

  login() {
    let xhr = new XMLHttpRequest();
    let message= JSON.stringify({
        Uemail : this.email,
        Upassword : this.password
    });
    xhr.open('PUT', this.url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(message);
    xhr.onload = function() {
      if (xhr.status == 200) { // OK?
        let r=xhr.response;
        r=r.replace(/\[/g,'');
        r=r.replace(/\]/g,'');
        let result={};
        result=JSON.parse(r);
        if (result.loginOK == 1) {
          result.loginOK=true;
        }
        else {
          result.loginOK=false;
        }
        console.log("["+result.loginOK+"]");//Yoke.parentUpdate(myparent, xhr.response);
        if (result.loginOK) {
          location.assign("https://grassworld.fachtnaroe.net");
        }
      }
      else {
        //Yoke.parentUpdate(myparent, 'Error c60');
      }
    };
  }

}

function submit_tobackend (b){
  var n;
  if (b==1) {
      // new user
      n=new Reg(
        document.getElementById("rusername").value,
        document.getElementById("remail").value,
        document.getElementById("rpassword").value);
        console.log("registered");
        location.assign("https://grassworld.fachtnaroe.net");
      n.register();
  }
  else if(b==2) {
      //  normal login
      n=new Reg(
        '',
        document.getElementById("lemail").value,
        document.getElementById("lpassword").value);
        console.log('A '+document.getElementById("lemail").value);
      n.login();
  }
}

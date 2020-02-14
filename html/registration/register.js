
var grassworld_url="https://grassworld.fachtnaroe.net/";
var grassworld_db=grassworld_url+"DB/?";

/*
var username = document.getElementById("rusername").textContent;
var email = document.getElementById("remail").textContent;
var password = document.getElementById("rpassword").textContent;*/


class Reg {
  constructor(u, e, p){
    this.username=u;
    this.email=e;
    this.password=p;
    this.url=grassworld_db;
  }

  register(){
    let xhr = new XMLHttpRequest();
    let t=this.url;
    let message= JSON.stringify({//error with this function
        u,e,p
    });
    xhr.open('POST', t);
    xhr.send(message); 
  }

  login() {

  }
  
}

function submit_tobackend(b) {
var n;
  if (b==1) {
      n=new Reg(
        document.getElementById("rusername").textContent,
        document.getElementById("remail").textContent,
        document.getElementById("rpassword").textContent);
      n.register();
  }
  else if(b==2) {
      n=new Reg(
        document.getElementById("remail").textContent,
        document.getElementById("rpassword").textContent);
      n.login();
  }
}

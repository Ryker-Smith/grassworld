
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

  }

}

function submit_tobackend(b) {
  var n;
  if (b==1) {
      // new user
      n=new Reg(
        document.getElementById("rusername").value,
        document.getElementById("remail").value,
        document.getElementById("rpassword").value);
      n.register();
  }
  else if(b==2) {
      //  normal login
      n=new Reg(
        document.getElementById("lemail").value,
        document.getElementById("lpassword").value);
        console.log(lemail);
      n.login();
  }
}

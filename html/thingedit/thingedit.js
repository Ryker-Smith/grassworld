// https://grassworld.fachtnaroe.net/DB/?t=thing&cat=
// fauna
// flora
// object

window.onload=rThingstart();

function rThingstart() {
  getT();
}
class  thingRow {
  constructor(r,num) {
    this.id = r[num].Tid;
    this.name =r[num].Tname;
    this.creator = r[num].Tcreator;
    this.status = r[num].Tstatus;
    this.content = r[num].Tcontent;
    this.genus = r[num].Tgenus;
    this.x = r[num].Tx;
    this.y = r[num].Ty;
    this.z = r[num].Tz
    this.team = r[num].Tteam;
    this.keypressfunc = r[num].Tkeypressfunc;
    this.number = num;
  }
  thingCell(){
    console.log("poopy");
    return "<tr><td id =\"Tid"+this.number+"\">"+this.id+"</td><td id =\"Tname"+this.number+"\">"+this.name+"</td><td id =\"Tcreator"+this.number+"\">"+this.creator+"</td><td id=\"Tstatus"+this.number+"\">"+this.status+"</td><td id =\"Tcontent"+this.number+"\">"+this.content+
              "</td><td id =\"Tgenus"+this.number+"\">"+this.genus+"</td><td id =\"Tx"+this.number+"\">"+this.x+"</td><td id =\"Ty"+this.number+"\">"+this.y+
              "</td><td id =\"Tz"+this.number+"\">"+this.z+"</td><td id =\"Tteam"+this.number+"\">"+this.team+"</td><td id =\"Tkeypressfunc"+this.number+"\">"+this.keypressfunc+"</td></tr>";
  }
}
function rToken() {
  return '&TK=a1b2c3d4';
}
//to do-> call url above, parse json data and display, edit and save a Thing
// (1) Call url ->https://grassworld.fachtnaroe.net/DB/DB/?a=get&t=thing,and displayed
//(**This is for later**)(Remember)-> Post and Put in url to save a thing
function ThingDataToForm(){
  console.log("THis is working thats great huh " + this.id + " " + document.getElementById('Tname'+this.id).textContent);
  var cell = '#616247FF';
  // var darkercell = '#484935';
  document.getElementById('Tid').value = document.getElementById('Tid'+this.id).textContent;
  document.getElementById('Tname').value = document.getElementById('Tname'+this.id).textContent;
  document.getElementById('Tcreator').value = document.getElementById('Tcreator'+this.id).textContent;
  document.getElementById('Tstatus').value = document.getElementById('Tstatus'+this.id).textContent;
  document.getElementById('Tcontent').value = document.getElementById('Tcontent'+this.id).textContent;
  document.getElementById('Tgenus').value = document.getElementById('Tgenus'+this.id).textContent;
  document.getElementById('tx').value = document.getElementById('Tx'+this.id).textContent;
  document.getElementById('ty').value = document.getElementById('Ty'+this.id).textContent;
  document.getElementById('tz').value = document.getElementById('Tz'+this.id).textContent;
  // document.getElementById('ts').value = document.getElementById('Ts'+this.id).textContent;
  document.getElementById('Tteam').value = document.getElementById('Tteam'+this.id).textContent;
  document.getElementById('Tkeypressfunc').value = document.getElementById('Tkeypressfunc'+this.id).textContent;
  // document.getElementById('Tid').style.backgroundColor = cell;
  // document.getElementById('Tname').style.backgroundColor = cell;
  // document.getElementById('Tcreator').style.backgroundColor = cell;
  // document.getElementById('Tgenus').style.backgroundColor = cell;
  // document.getElementById('Tstatus').style.backgroundColor = cell;
  // document.getElementById('Tcontent').style.backgroundColor = cell;
  // document.getElementById('tx').style.backgroundColor = cell;
  // document.getElementById('ty').style.backgroundColor = cell;
  // document.getElementById('tz').style.backgroundColor = cell;
  // document.getElementById('ts').style.backgroundColor = cell;
  // document.getElementById('Tteam').style.backgroundColor = cell;
  // document.getElementById('Tkeypressfunc').style.backgroundColor = cell;
  document.getElementById('editThingform').style.visibility = 'visible';
  document.getElementById('editThingform').style.height = 'auto';
  document.getElementById('EditOrCreate').style.visibility = 'visible';
  document.getElementById('EditOrCreate').style.height = 'auto';
  document.getElementById('EditOrCreate').innerHTML = "Editing A Thing";
  document.getElementById('POSTorPUTflag').value='1';
  // console.log(document.getElementById('POSTorPUTflag').value);
  window.scrollTo(0, 0);
}
function newThingClick() {
  var darkercell = '#484935';
  document.getElementById('Tid').value = '';
  document.getElementById('Tname').value = '';
  document.getElementById('Tcreator').value = '';
  document.getElementById('Tstatus').value = '';
  document.getElementById('Tcontent').value = '';
  document.getElementById('Tgenus').value = '';
  document.getElementById('tx').value = '';
  document.getElementById('ty').value = '';
  document.getElementById('tz').value = '';
  // document.getElementById('ts').value = '';
  document.getElementById('Tteam').value = '';
  document.getElementById('Tkeypressfunc').value = '';
  document.getElementById('editThingform').style.visibility = 'visible';
  document.getElementById('Tid').style.backgroundColor = darkercell;
  document.getElementById('Tname').style.backgroundColor = darkercell;
  document.getElementById('Tcreator').style.backgroundColor = darkercell;
  document.getElementById('Tstatus').style.backgroundColor = darkercell;
  document.getElementById('Tcontent').style.backgroundColor = darkercell;
  document.getElementById('Tgenus').style.backgroundColor = darkercell;
  document.getElementById('tx').style.backgroundColor = darkercell;
  document.getElementById('ty').style.backgroundColor = darkercell;
  document.getElementById('tz').style.backgroundColor = darkercell;
  // document.getElementById('ts').style.backgroundColor = darkercell;
  document.getElementById('Tteam').style.backgroundColor = darkercell;
  document.getElementById('Tkeypressfunc').style.backgroundColor = darkercell;
  document.getElementById('editThingform').style.height = 'auto';
  document.getElementById('EditOrCreate').style.visibility = 'visible';
  document.getElementById('EditOrCreate').style.height = 'auto';
  document.getElementById('EditOrCreate').innerHTML = "Creating A Thing";
  document.getElementById('POSTorPUTflag').value='2';
  // console.log(document.getElementById('POSTorPUTflag').value);
}
// 10829
function saveButtonClick() {
  switch(document.getElementById('POSTorPUTflag').value){
    case '0':
      console.log("Nothing To Save");
      document.getElementById('EditOrCreate').style.visibility = 'visible';
      document.getElementById('EditOrCreate').style.height = 'auto';
      document.getElementById('EditOrCreate').innerHTML = "Nothing To Save";
    break;
    case '1':
      let Tid = document.getElementById('Tid').value ;
      let urlUpdate=grassworld_db+'t=thing&a=upd&Tid='+Tid + rToken();
      let UpdateRequest = new XMLHttpRequest();
      let message= JSON.stringify({
        Tid: Tid,
        Tname: document.getElementById('Tname').value,
        Tcreator: document.getElementById('Tcreator').value,
        Tstatus: document.getElementById('Tstatus').value,
        Tcontent: document.getElementById('Tcontent').value,
        Tgenus: document.getElementById('Tgenus').value,
        Tx: document.getElementById('tx').value,
        Ty: document.getElementById('ty').value,
        Tz: document.getElementById('tz').value,
        // Ts: document.getElementById('ts').value,
        Tteam: document.getElementById('Tteam').value,
        Tkeypressfunc: document.getElementById('Tkeypressfunc').value,
        });
      UpdateRequest.open('PUT', urlUpdate); // new
      UpdateRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      UpdateRequest.send(message);
     // console.log("UpdateThing Status: "+UpdateRequest.status);
     alert("Thing Edit Saved!");
     console.log("Thing Edit has been successful");
     // location.reload();
    break;
    case '2':
      let Tname = document.getElementById('Tname').value;
      let Tgenus = document.getElementById('Tgenus').value;
      let urlCreate=grassworld_db+'t=thing&a=mk&name='+Tname + '&g='+Tgenus + rToken();
      let CreateRequest = new XMLHttpRequest();
      CreateRequest.open('POST', urlCreate);
      CreateRequest.send();
      // console.log("CreateThing Status: "+CreateRequest.status);
      alert("New Thing Created!");
      location.reload();
    break;
  }
}
function getT() {
  let url = grassworld_db+'a=get&t=thing'+rToken();
  console.log("url: "+url);
  var req = new XMLHttpRequest();
  console.log("b");
  req.open('GET', url);
  req.send();
  req.onload = function() {
       if (req.status == 200) {
        let r=req.response;
        console.log("bean "+r);
        r=JSON.parse(r);
         console.log( r );
        var table = document.getElementById("listtable");
        for (var i=0; i< r.length; i++) {
            var n = new thingRow(r,i);
            var row = table.insertRow();
            row.innerHTML =  n.thingCell();
            row.id=i;
            document.getElementById(i).addEventListener("click", ThingDataToForm);
            }
      }
      else {
          console.log(req.response);
        console.log('Error c187');
      }
    };
}

// https://grassworld.fachtnaroe.net/DB/?t=thing&cat=
// fauna
// flora
// object
}
window.onload=rThingstart();

function rThingstart() {
  getT();
}
// class onerow {
//     constructor (tab,id) {
//       this.cells={}
//       this.row=document.getElementById(tab).insertRow();
//       this.rowId=id;
//     }
//     newcell(d, n){
//       let temp = this.row.insertCell();
//       temp.innerHTML=d
//       temp.id=n+'_'+this.rowId; // must get this
//       this.cells.push(temp);
//     }
// }
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
     location.reload();
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
  let url = grassworld_db+'a=get&t=thing'+rToken();;
  console.log("url: "+url);
  var req = new XMLHttpRequest();
  console.log("b");
  req.open('GET', url);
  req.send();
  req.onload = function() {
       if (req.status == 200) {
        let r=req.response;
        r=JSON.parse(r);
         console.log( r );
        var table = document.getElementById("listtable");
        for (var i=0; i< r.length; i++) {
            var row = table.insertRow();
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);
            var cell7 = row.insertCell(7);
            var cell8 = row.insertCell(8)
            var cell9 = row.insertCell(9)
            var cell10 = row.insertCell(10)
            row.id=i;
            cell0.innerHTML = r[i].Tid;
            cell0.id = 'Tid'+i;
            cell1.innerHTML = r[i].Tname;
            cell1.id = 'Tname'+i;
            cell2.innerHTML = r[i].Tcreator;
            cell2.id = 'Tcreator'+i;
            cell3.innerHTML = r[i].Tstatus;
            cell3.id = 'Tstatus'+i;
            cell4.innerHTML = r[i].Tcontent;
            cell4.id = 'Tcontent'+i;
            cell5.innerHTML = r[i].Tgenus;
            cell5.id = 'Tgenus'+i;
            cell6.innerHTML = r[i].Tx;
            cell6.id = 'Tx'+i;
            cell7.innerHTML = r[i].Ty;
            cell7.id = 'Ty'+i;
            cell8.innerHTML = r[i].Tz;
            cell8.id = 'Tz'+i;
            cell9.innerHTML = r[i].Tteam;
            cell9.id = 'Tteam'+i;
            cell10.innerHTML = r[i].Tkeypressfunc;
            cell10.id = 'Tkeypressfunc'+i;
            document.getElementById(i).addEventListener("click", ThingDataToForm);
            // m=new onerow('listtable', r[i].Tid);
            // m.newcell(r[i].Tid,'Tid');
            // m.newcell(r[i].Tname,'Tname');
            // m.newcell(r[i].Tcreator,'Tcreator');
            // m.newcell(r[i].Tstatus,'Tstatus');
            // m.newcell(r[i].Tcontent,'Tcontent');
            // m.newcell(r[i].Tgenus,'Tgenus');
            // m.newcell(r[i].Tx,'Tx');
            // m.newcell(r[i].Ty,'Ty');
            // m.newcell(r[i].Tx,'Tx');
            // m.newcell(r[i].Tz,'Tz');
            // m.newcell(r[i].Tkeypressfunc,'Tkeypressfunc');
            // }
      }
      else {
          console.log(req.response);
        console.log('Error c187');
      }
    };
}

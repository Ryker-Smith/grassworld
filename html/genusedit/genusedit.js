
function ThingDataToForm(){
  console.log("hm.");

//   document.getElementById('Gid').value = document.getElementById('Gid'+this.id).textContent;
  document.getElementById('Gname').value = document.getElementById('Gname'+this.id).textContent;
  document.getElementById('Gdescription').value = document.getElementById('Gdescription'+this.id).textContent;
  document.getElementById('Gmobile').value = document.getElementById('Gmobile'+this.id).textContent;
  document.getElementById('Ganimated').value = document.getElementById('Ganimated'+this.id).textContent;
  document.getElementById('Ginteracts').value = document.getElementById('Ginteracts'+this.id).textContent;
  document.getElementById('Gcansleep').value = document.getElementById('Gcansleep'+this.id).textContent;
  document.getElementById('Gliving').value = document.getElementById('Gliving'+this.id).textContent;
  document.getElementById('GimagesJSON').value = document.getElementById('GimagesJSON'+this.id).textContent;
  document.getElementById('editform').style.visibility = 'visible';
  document.getElementById('editform').style.height = 'auto';
  // document.getElementById('EditOrCreate').style.visibility = 'visible';
  // document.getElementById('EditOrCreate').style.height = 'auto';
  // document.getElementById('EditOrCreate').innerHTML = "Editing A Genus";
  document.getElementById('POSTorPUTflag').value='2';
  window.scrollTo(0, 0);
}

  window.onload=getg(); //was mystart

 // function mystart() {
 //   for (var x=1; x < 29; x++) {
  //    getg(x);
   //   console.log("kr.")
   function getg() {
   
    }
 
  function token() {
    return '&TK=a1b2c3d4';
  }
  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\รก/g, '&aacute;').replace(/\ร/g, '&Aacute;');
  }
  function getdata (Gid, l) {
    document.getElementById('Gid').value=Gid;
    document.getElementById('Gname').value=1;
    document.getElementById('Gdescription').value=document.getElementById('Gdescription'+Gid).innerHTML;
    document.getElementById('Gmobile').checked=(document.getElementById('Gmobile'+Gid).innerHTML == 'Y');
    document.getElementById('Ganimated').checked=(document.getElementById('Ganimated'+Gid).innerHTML == 'Y');
    document.getElementById('Ginteracts').checked=(document.getElementById('Ginteracts'+Gid).innerHTML == 'Y');
    document.getElementById('Gcansleep').checked=(document.getElementById('Gcansleep'+Gid).innerHTML == 'Y');
    document.getElementById('Gliving').checked=(document.getElementById('Gliving'+Gid).innerHTML == 'Y');
    document.getElementById('GimagesJSON').value=document.getElementById('GimagesJSON'+Gid).innerHTML;
    document.getElementById('editform').style.visibility='visible';
    document.getElementById('editform').style.height='auto';
  }
  function makelink(Gid, l) {
    document.getElementById('POSTorPUTflag').value=2;
    var h='<span onclick="getdata('+Gid+', \''+l+'\')">' + l + '</span>';
    return h;
  }
  function yesorno(v) {
    if (v==1) {
      return 'Y';
    }
    else {
      return 'N';
    }
  }
  function oneorzero(v) {
    if (v ==true) {
      return 1;
    }
    else {
      return 0;
    }
  }

  function yesornofromchecks(w, g) {
    if (document.getElementById(w).checked) {
      document.getElementById(w+'_'+g).innerHTML = 'Y';
    }
    else {
      document.getElementById(w+'_'+g).innerHTML = 'N';
    }
  }
  function newGenusClick() {
  document.getElementById('Gname').value = '';
  document.getElementById('Gmobile').value = '';  
  document.getElementById('Ganimated').value = '';
  document.getElementById('Ginteracts').value = '';
  document.getElementById('Gcansleep').value = '';
  document.getElementById('GimagesJSON').value = '';
  document.getElementById('Gdescription').value = '';
  document.getElementById('Gliving').value = '';
  document.getElementById('editform').style.visibility = 'visible';
  document.getElementById('editform').style.height = 'auto';
  document.getElementById('POSTorPUTflag').value='2';
  console.log("test");
}

  function savethis() {
    //let Gid = document.getElementById('Gid').value ;
    let url=grassworld_db+'t=genus&a=sv&' + token(); //toke out &gid=
    let xhr = new XMLHttpRequest();
    let message= JSON.stringify({
      //    Gid: Gid,
          Gname: document.getElementById('Gname').value,
          Gmobile: oneorzero(document.getElementById('Gmobile').checked),
          Ginteracts: oneorzero(document.getElementById('Ginteracts').checked),
          Ganimated: oneorzero(document.getElementById('Ganimated').checked),
          Gcansleep: oneorzero(document.getElementById('Gcansleep').checked),
          Gliving: oneorzero(document.getElementById('Gliving').checked),
          Gdescription: document.getElementById('Gdescription').value,
        });
    if ( document.getElementById('POSTorPUTflag').value==1 ) {
      xhr.open('POST', url); // new
    }
    else {
      xhr.open('PUT', url);
      yesornofromchecks('Gmobile'); // toke out ,Gid
      yesornofromchecks('Ginteracts');
      yesornofromchecks('Ganimated');
      yesornofromchecks('Gcansleep');
      yesornofromchecks('Gliving');
      document.getElementById('Gdescription_'+Gid).innerHTML=document.getElementById('Gdescription').value;
      document.getElementById('Gname_'+Gid).innerHTML=makelink(Gid, document.getElementById('Gname').value);

    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(message);
    document.getElementById('editform').style.visibility='hidden';
    document.getElementById('editform').style.height=0;
  }
  function getg() {
    let url=grassworld_db+'t=genus&a=get' + token();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
 //         r=r.replace(/\[/g,'');
 //         r=r.replace(/\]/g,'');
          r=JSON.parse(r);
          console.log(r)
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
          var cell8 = row.insertCell(8);
		      row.id=i;
          cell0.innerHTML = r[i].Gid;
          cell0.id='Gid'+i;
          cell1.innerHTML = r[i].Gname;
          cell1.id="Gname"+i;
          cell2.innerHTML = yesorno(r[i].Gmobile);
          cell2.id='Gmobile'+i;
          cell3.innerHTML = yesorno(r[i].Ganimated);
          cell3.id='Ganimated'+i;
          cell4.innerHTML = yesorno(r[i].Ginteracts);
          cell4.id='Ginteracts'+i;
          cell5.innerHTML = yesorno(r[i].Gcansleep);
          cell5.id='Gcansleep'+i;
          cell6.innerHTML = yesorno(r[i].Gliving);
          cell6.id='Gliving'+i;
          cell7.innerHTML = r[i].Gdescription;
          cell7.id='Gdescription'+i;
          cell8.innerHTML = r[i].GimagesJSON;
          cell8.id='GimagesJSON'+i;
          document.getElementById(i).addEventListener("click", ThingDataToForm);
        }
		}
        else {
          console.log(xhr.response);
          console.log('Error c187');
        }

      };

  }
 

var LeaderSchplagen;
// var cultFollower = [];
var cultFollower;
var followPoint;
var lsNames=["Jim Jones ","Charles Manson ","David Koresh ","Shoko Asahara ","Joseph Di Mambro ","Marshall Applewhite ","Bonnie Lu Nettles ","Bhagwan Shree Rajneesh "];
//Uses random function to pick a random name from name list and a random number thats not bigger than 1000
var lsnewname="Cultist-" + lsNames[ grandom(lsNames.length)-1 ] + grandom(1000);
var followPointName = "Pointer " + grandom(1000);
var lsId="";
var TheX = 0;
var TheY = 0;

function redToken() {
  return '&TK=a1b2c3d4';
}

class BelieverSchplágen extends Schplágen {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus, legs);
    this.genus = this.genus;
  }
 followMe(){
//     console.log("X position: "+thingmap.get(lsId).o.Tx + " Y position: "+thingmap.get(lsId).o.Ty);

    if(!((TheX == thingmap.get(lsId).o.Tx) && (TheY == thingmap.get(lsId).o.Ty))) {
      TheX = thingmap.get(lsId).o.Tx;
      TheY = thingmap.get(lsId).o.Ty;
      let poopi = placePointer();
      console.log(poopi);
    }
    else{
//       console.log("SamePositionMate");
    }
    let url = grassworld_db+'a=get&t=thing'+redToken();
    var req3 = new XMLHttpRequest();
    req3.open('GET', url);
    req3.send();

    req3.onload = function() {
         if (req3.status == 200) {
          let r=req3.response;
          r=JSON.parse(r);
//           console.log( r.length);
          for (var i=0; i< r.length; i++) {
            let  n = r[i];
            if(n.Tgenus==8){
//             thingmap.get(n.Tid).sprite.setdestination(n.Tid, TheX, TheY);
            }
          }
        }
        else {
//           console.log(req3.response);
          console.log('Error c187');
        }
      };
  }
}
// this whole function is not needed, just visualizing so i can see if code is working
function placePointer(){
  console.log("LS 38: :)");
  // check for pointers then delete
  let url = grassworld_db+'a=get&t=thing'+redToken();
  var req2 = new XMLHttpRequest();
  req2.open('GET', url);
  req2.send();
  var lscount = 0;
  var Pcount = 0;
  var pId = 2;
  req2.onload = function() {
       if (req2.status == 200) {
        let r=req2.response;
        r=JSON.parse(r);
        console.log( r.length);
        // var lscount = 0;
        // var Pcount = 0;
        // var pId = 0;
        for (var i=0; i< r.length; i++) {
          let  n = r[i];
          if(n.Tgenus==19){
            pId = n.Tid;
            console.log("A Pointer that must die "+Pcount+" "+n.Tname);
              //Remove any pointer
              // let url=grassworld_db+'t=thing&Tid='+n.Tid + redToken();
              // let xhr = new XMLHttpRequest();
              // xhr.open('DELETE', url);
              // xhr.send();

              Pcount++;
            }
          if(n.Tgenus==20){
            lscount++;
          }
        }
        if(lscount==0){
          console.log("Where is our Leader? :'(");
          // LeaderSchplagen.tcreate(RedClassFunc);
          return;
        }
        if(Pcount==0){
          let xp = thingmap.get(lsId).o.Tx;
          let yp = thingmap.get(lsId).o.Ty;
          followPoint = new MovingThing(null,followPointName,0,19,1);
          followPoint.tcreate(followPointFunc, xp, yp);
        }
        else{
          thingmap.get(pId).sprite.left_destination = thingmap.get(lsId).o.Tx;
          thingmap.get(pId).sprite.top_destination = thingmap.get(lsId).o.Ty;
          thingmap.get(pId).o.Gcanmove = false;
        }
      }
      else {
//         console.log(req2.response);
        console.log('Error c187');
      }
    };
  //place pointer

  // let xp = thingmap.get(lsId).o.Tx;
  // let yp = thingmap.get(lsId).o.Ty;
  // followPoint = new MovingThing(null,followPointName,0,19,1);
  // followPoint.tcreate(followPointFunc, xp, yp);
  return pId;
}

function replaceWithCultist(RedData,cultId,n) {
// console.log("*ls75");
  console.log('RED CLASS: LeaderSchplagen Demoted to cultist, with Tid ' + n.Tid + " " + n.Tname);
  var lsTid = RedData.insertId;
  var r = {};

  r.Tid = n.Tid;
  r.Tname = n.Tname;
  r.selected = false;
  r.o =  cultFollower;
  r.o.Tid =  n.Tid;


  //'moves' the Schplágen
  let lsSpriteDetail = {
          Tid:  n.Tid,
          Ganimated: true,
          //random x-axis location for Schplágen to spawn close to 250
          left: n.Tx,
          //random y-axis location for Schplágen to spawn close to 250
          top: n.Ty
  }
  //Instantiates charactersprite, new spritesheet for character
  r.sprite = new charactersprite(lsSpriteDetail);
  r.ready = 2;
  //gets the spritesheet
  thingmap.set(r.Tid, r);
  r.o.tget(thingmap.get(r.Tid));
  r.o.tgetimages(thingmap.get(r.Tid));
  thingmap.get(n.Tid).o.Tx =  cultFollower.left;
  thingmap.get(n.Tid).o.Ty =  cultFollower.top;
  //Sets a parameter that allows Schplágen to move
  thingmap.get(n.Tid).o.Gcanmove = true;
  //Sets a parameter that allows Schplágen to be animated from spritesheet
  thingmap.get(n.Tid).o.Ganimated = true;
  //Saves location
  thingmap.get(n.Tid).o.msaveLocation();
  //function to detect key presses
  thingmap.get(n.Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      switch (keychar) {
        //If S key is pressed Schplágen will 'sleep' with sleepnow() function
        case 'S':
          thingmap.get(n.Tid).o.sleepnow();
          console.log("RED CLASS: Demoted LeaderSchplagen- " + n.Tname + " Is Asleep");
          break;
        //If W key is pressed Schplágen will 'Awake' with wakenow() function
        case 'W':
          thingmap.get(n.Tid).o.wakenow();
          console.log("RED CLASS: Demoted LeaderSchplagen- " + n.Tname + " Is Awake");
          break;
        case 'K':
          console.log("K Press");
          break;
      }
  });
  // console.log("ls127");
}
function RedClassFunc(RedData) {
// console.log("*ls75");
  console.log('RED CLASS: New LeaderSchplagen with Tid ' + RedData.insertId + " " + lsnewname);

  var lsTid = RedData.insertId;
  //assign tid so i can access LeaderSchplagen tid later
  lsId = lsTid;
  console.log("Pp: "+lsId);
  var r = {};

  r.Tid = lsTid;
  r.Tname = lsnewname;
  r.selected = false;
  r.o =  LeaderSchplagen;
  r.o.Tid = lsTid;


  //'moves' the Schplágen
  let lsSpriteDetail = {
          Tid: lsTid,
          Ganimated: true,
          //random x-axis location for Schplágen to spawn close to 250
          left: 400 + grandomrange(50),
          //random y-axis location for Schplágen to spawn close to 250
          top: 400 + grandomrange(50)
  }
  //Instantiates charactersprite, new spritesheet for character
  r.sprite = new charactersprite(lsSpriteDetail);
  r.ready = 2;
  //gets the spritesheet
  thingmap.set(r.Tid, r);
  r.o.tget(thingmap.get(r.Tid));
  r.o.tgetimages(thingmap.get(r.Tid));
  thingmap.get(lsTid).o.Tx =  LeaderSchplagen.left;
  thingmap.get(lsTid).o.Ty =  LeaderSchplagen.top;
  //Sets a parameter that allows Schplágen to move
  thingmap.get(lsTid).o.Gcanmove = true;
  //Sets a parameter that allows Schplágen to be animated from spritesheet
  thingmap.get(lsTid).o.Ganimated = true;
  //Saves location
  thingmap.get(lsTid).o.msaveLocation();
  //function to detect key presses
  thingmap.get(lsTid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      switch (keychar) {
        //If S key is pressed Schplágen will 'sleep' with sleepnow() function
        case 'S':
          thingmap.get(lsTid).o.sleepnow();
          console.log("RED CLASS: LeaderSchplagen- " + lsnewname + " Is Asleep");
          break;
        //If W key is pressed Schplágen will 'Awake' with wakenow() function
        case 'W':
          thingmap.get(lsTid).o.wakenow();
          console.log("RED CLASS: LeaderSchplagen- " + lsnewname + " Is Awake");
          break;
        case 'K':
          console.log("K Press");
          break;
      }
  });
  // console.log("ls127");
}
//function for setting properties of Schplágen
function followPointFunc(RedOne,xPos,yPos) {
  console.log('followPoint: New followPoint with Tid ' + RedOne.insertId + " " + followPointName);
  //Getting Tid
  var followPointTid = RedOne.insertId;
  var r1 = {};
  //sets Tid
  r1.Tid = followPointTid;
  //sets Tname
  r1.Tname = followPointName;
  //sets selected
  r1.selected = false;
  //sets o
  r1.o =  MySchplágen_r1;
  //sets o.Tid
  r1.o.Tid = followPointTid;
  //'moves' the Schplágen
  let followPointSpriteDetail = {
          Tid: followPointTid,
          Ganimated: true,
          left: 400 + grandomrange(50),
          top: 400 + grandomrange(50)
  }
  //Instantiates charactersprite, new spritesheet for character
  r1.sprite = new charactersprite(followPointSpriteDetail);
  r1.ready = 2;
  //gets the spritesheet
  thingmap.set(r1.Tid, r1);
  r1.o.tget(thingmap.get(r1.Tid));
  r1.o.tgetimages(thingmap.get(r1.Tid));
  thingmap.get(followPointTid).o.Tx =  followPoint.left;
  thingmap.get(followPointTid).o.Ty =  followPoint.top;
  //Sets a parameter that allows Schplágen to move  **changed to false**
  thingmap.get(followPointTid).o.Gcanmove = false;
  //Sets a parameter that allows Schplágen to be animated from spritesheet
  thingmap.get(followPointTid).o.Ganimated = true;
  //Saves location
  thingmap.get(followPointTid).o.msaveLocation();
  //function to detect key presses
  thingmap.get(followPointTid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      switch (keychar) {
        //If S key is pressed Schplágen will 'sleep' with sleepnow() function
        case 'S':
          thingmap.get(followPointTid).o.sleepnow();
          console.log("r1: Bird- " + followPointName + " Is Asleep");
          break;
        //If W key is pressed Schplágen will 'Awake' with wakenow() function
        case 'W':
          thingmap.get(followPointTid).o.wakenow();
          console.log("r1: Bird- " + followPointName + " Is Awake");
          break;
      }
  });
}
function onload_red_classes() {
//     console.log("Red Team Classes loaded");
  // make 1 leader of cultists
    let url = grassworld_db+'a=get&t=thing'+redToken();
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();

    req.onload = function() {
         if (req.status == 200) {
          let r=req.response;
          r=JSON.parse(r);
          console.log( r.length);
          var leadercount = 0;
          for (var i=0; i< r.length; i++) {
            let  n = r[i];
            if(n.Tgenus==20){
                //save name position then delete and create same but with new genus
//                 console.log("ChIcky Check this out------>>>>> "+n.Tname+" //also this>> "+leadercount);
                //step 1 save data
                // let id = n.Tid ;
                // let name = n.Tname;
                // let creator = n.Tcreato;
                // let status = n.Tstatus;
                // let content = n.Tcontent;
                // // let Tgenus = 19;
                // let x = n.Tx;
                // let y = n.Ty;
                // let z = n.Tz;
                // let team = n.Tteam;
                // let keypressfunc = n.Tkeypressfunc;

                //step 2 delete  old LeaderSchplagen
                let url=grassworld_db+'t=thing&Tid='+n.Tid + redToken();
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', url);
                xhr.send();

                //step 3 create new cultistschplagen in same position with new genus
                cultFollower = new BelieverSchplágen(null,n.Tname,0, 8, 1);
                cultFollower.tcreate(replaceWithCultist,leadercount,n);
                leadercount++;
              }
              // genuspick = 20;
            }
          console.log("LS: "+ leadercount);

        }
        else {
//             console.log(req.response);
          console.log('Error c187');
          genuspick = 8;
        }
        // console.log("147 "+genuspick);
        LeaderSchplagen= new BelieverSchplágen(null,lsnewname,0, 20, 1);
        LeaderSchplagen.tcreate(RedClassFunc);

        // window.setInterval(LeaderSchplagen.testo, 1000);
        window.setInterval(LeaderSchplagen.followMe, 2500);
      };
  }

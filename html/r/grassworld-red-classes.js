var LeaderSchplagen;
// var cultFollower = [];
// var cultFollower;
// var followPoint;
var lsNames=["Jim Jones ","Charles Manson ","David Koresh ","Shoko Asahara ","Joseph Di Mambro ","Marshall Applewhite ","Bonnie Lu Nettles ","Bhagwan Shree Rajneesh "];
//Uses random function to pick a random name from name list and a random number thats not bigger than 1000
var lsnewname="Cultist-" + lsNames[ grandom(lsNames.length)-1 ] + grandom(1000);
var followPointName = "Pointer " + grandom(1000);
var lsId="";
var TheX = 0;
var TheY = 0;
var isNewSchplagen = false;
function redToken() {
  return '&TK=a1b2c3d4';
}

class BelieverSchplágen extends Schplágen {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus, legs);
    this.genus = this.genus;
  }
 followMe(){
   console.log("RT: FollowMe() function called");
    console.log("X position: "+thingmap.get(lsId).o.Tx + " Y position: "+thingmap.get(lsId).o.Ty);
  // if(!(lsId=="")){
  //     if(!((TheX == thingmap.get(lsId).o.Tx) && (TheY == thingmap.get(lsId).o.Ty))) {
  //       TheX = thingmap.get(lsId).o.Tx;
  //       TheY = thingmap.get(lsId).o.Ty;
  //     }
  //   }
  // else {
  //   break;
  // }
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
            // thingmap.get(n.Tid).sprite.setdestination(n.Tid, TheX, TheY); lots of errors
            if(!(lsId=="")){
              thingmap.get(n.Tid).sprite.left_destination = thingmap.get(lsId).o.Tx;
              thingmap.get(n.Tid).sprite.top_destination = thingmap.get(lsId).o.Ty;
            }
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
function RedClassFunc(RedData) {
// console.log("*ls75");
  console.log('RED CLASS: New LeaderSchplagen with Tid ' + RedData.insertId + " " + lsnewname);

  var lsTid = RedData.insertId;
  //assign tid so i can access LeaderSchplagen tid later
  if(isNewSchplagen){
    lsId = lsTid;
  }
  // console.log("Pp: "+lsId);
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

function onload_red_classes() {
  //do if statement then pick one- cj=change
    console.log("Red Team Classes loaded");
  // make 1 leader of cultists
  // console.log("Red Classes Loaded");
    var niceGenus = 8;
    var niceBool = false;
    let url = grassworld_db+'a=get&t=thing'+redToken();
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();

    req.onload = function() {
         if (req.status == 200) {
          let r=req.response;
          r=JSON.parse(r);
          // console.log( r.length);
          var leadercount = 0;
          for (var i=0; i< r.length; i++) {
            let  n = r[i];
            // console.log("RT:tid "+n.Tname);
            if(n.Tgenus==20){
              console.log("RT:Glorious Leader: "+n.Tid);
              niceBool = true;
              lsId = n.Tid;
            }
          }
          if(leadercount==0){
            niceGenus = 20;
          }
        }
        console.log("RT:Genus: "+ niceGenus+" "+leadercount);
        LeaderSchplagen= new BelieverSchplágen(null,lsnewname,0, 20, 1);
        LeaderSchplagen.tcreate(RedClassFunc);
      };


      // window.setInterval(LeaderSchplagen.testo, 1000);
      window.setInterval(LeaderSchplagen.followMe, 2500); //-breaks grassworld
  }

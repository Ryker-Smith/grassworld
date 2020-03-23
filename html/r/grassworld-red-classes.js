var LeaderSchplagen;
var cultFollower = [];
var followPoint;
var lsNames=["Jim Jones ","Charles Manson ","David Koresh ","Shoko Asahara ","Joseph Di Mambro ","Marshall Applewhite ","Bonnie Lu Nettles ","Bhagwan Shree Rajneesh "];
//Uses random function to pick a random name from name list and a random number thats not bigger than 1000
var lsnewname="Cultist-" + lsNames[ grandom(lsNames.length)-1 ]+ grandom(1000);

function redToken() {
  return '&TK=a1b2c3d4';
}

class BelieverSchplágen extends Schplágen {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus, legs);
    this.genus = this.genus;
  }
}
function replaceWithCultist(RedData,cultId,n) {
// console.log("*ls75");
  console.log('RED CLASS: LeaderSchplagen Demoted to cultist, with Tid ' + n.Tid + " " + n.Tname);

  var lsTid = RedData.insertId;
  var r = {};

  r.Tid = n.Tid;
  r.Tname = n.Tname;
  r.selected = false;
  r.o =  cultFollower[cultId];
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
  thingmap.get(n.Tid).o.Tx =  cultFollower[cultId].left;
  thingmap.get(n.Tid).o.Ty =  cultFollower[cultId].top;
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
          // this.followMe(lsTid,ChosenOne.Tx,ChosenOne.Ty);
          break;
      }
  });
  // console.log("ls127");
}
function RedClassFunc(RedData) {
// console.log("*ls75");
  console.log('RED CLASS: New LeaderSchplagen with Tid ' + RedData.insertId + " " + lsnewname);

  var lsTid = RedData.insertId;
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
          // this.followMe(lsTid,ChosenOne.Tx,ChosenOne.Ty);
          break;
      }
  });
  // console.log("ls127");
}

function onload_red_classes() {
    console.log("Red Team Classes loaded");
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
                console.log("ChIcky Check this out------>>>>> "+n.Tname+" //also this>> "+leadercount);
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
                cultFollower[leadercount] = new BelieverSchplágen(null,n.Tname,0, 8, 1);
                cultFollower[leadercount].tcreate(replaceWithCultist,leadercount,n);
                leadercount++;
              }
              // genuspick = 20;
            }
          console.log("LS: "+ leadercount);

        }
        else {
            console.log(req.response);
          console.log('Error c187');
          genuspick = 19;
        }
        // console.log("147 "+genuspick);
        LeaderSchplagen= new BelieverSchplágen(null,lsnewname,0, 20, 1);
        LeaderSchplagen.tcreate(RedClassFunc);
        // window.setInterval(LeaderSchplagen.testo, 1000);
      };
  }

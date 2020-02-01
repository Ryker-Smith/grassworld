var b3names=["Jordi ", "Robbo ","Kris ","Bobby ","Corona ","Virgil ","Epstein ","Alexander ","Jurgen ", "Ronnie O'Sullivan "]; //list of names
var b3newname=b3names[ grandom(b3names.length)-1 ]+ grandom(1000); //gets a random name from the list and random number
var b3thing; //variable name for object

function runNext(r) { // function for setting object parameters
  console.log('New b3 character with Tid ' + r.insertId);
  var Tid=r.insertId;
  var t={};
  
  t.Tid=Tid; // sets Tid
  t.Tname=b3newname; // sets Tname
  t.selected=false; // sets selected
  t.o=b3thing; // sets o
  t.o.Tid=Tid; // sets o.Tid
  
  let myspritedetail= {
          Tid: Tid,
          Ganimated: true,
          left: 501 + grandomrange(10), // object can spawn at random x coordinate from 491 to 511
          top: 502 + grandomrange(10) // object can spawn at random y coordinate from 492 to 512
  }
  // spritesheet settings
  t.sprite = new charactersprite(myspritedetail);
  console.log('b3 making');
  t.ready=2;
  thingmap.set(t.Tid, t);
  t.o.tget(thingmap.get(t.Tid));
  t.o.tgetimages(thingmap.get(t.Tid));
  thingmap.get(Tid).o.Tx=myspritedetail.left;
  thingmap.get(Tid).o.Ty=myspritedetail.top;
  thingmap.get(Tid).o.Gcanmove=true; // allows object to move
  thingmap.get(Tid).o.Ganimated=true; // allows object to be animated from spritesheet
  thingmap.get(Tid).o.msaveLocation();
  thingmap.get(Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      if (keychar=='S') {
          thingmap.get(thing_selected).o.sleepnow(); // When S key is pressed the selected schplagen will sleep
      }
      console.log(" b3 sleep ");
      if (keychar=='W') {
        thingmap.get(thing_selected).o.wakenow(); // When W key is pressed the selected schplagen will awaken
      }
      console.log(" b3 wake");
  });
  console.log('b3 made '+Tid);
}
function onload_b3() { //this function is called in the onload.js file
    console.log('from onload_b3');
    b3thing= new MovingThing(null,b3newname, null, 9, 1); //9 is the genus from the classes.js file which is my sprite sheet
    b3thing.tcreate(runNext); //
}

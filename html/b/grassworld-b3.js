var b3names=["Jordi ", "Robbo ","Kris ","Bobby ","Corona ","Virgil ","Epstein ","Alexander ","Jurgen ", "Ronnie O'Sullivan "]; //list of names
var b3newname=b3names[ grandom(b3names.length)-1 ]+ grandom(1000); //gets a random name from the list and random number
var b3thing; //variable name for object

function runNext(r) { // function for setting object parameters
  console.log('New b3 character with Tid ' + r.insertId);
  var myTid=r.insertId;
  var t={};
  
  t.Tid=myTid; // sets Tid
  t.Tname=b3newname; // sets Tname
  t.selected=false; // sets selected
  t.o=b3thing; // sets o
  t.o.Tid=myTid; // sets o.Tid
  
  let myspritedetail= {
          Tid: myTid,
          Ganimated: true,
          left: 300 + grandomrange(10), // object can spawn at random x coordinate from 491 to 511
          top: 300 + grandomrange(10) // object can spawn at random y coordinate from 492 to 512
  }
  // spritesheet settings
  t.sprite = new charactersprite(myspritedetail);

  t.ready=2;
  thingmap.set(t.Tid, t);
  t.o.tget(thingmap.get(t.Tid));
  t.o.tgetimages(thingmap.get(t.Tid));
  thingmap.get(myTid).o.Tx=thingmap.get(myTid).sprite.left;
  thingmap.get(myTid).o.Ty=thingmap.get(myTid).sprite.top;
  thingmap.get(myTid).o.Gcanmove=true; // allows object to move
  thingmap.get(myTid).o.Ganimated=true; // allows object to be animated from spritesheet
  thingmap.get(myTid).o.msaveLocation();
 // console.log('does it save???');
 //When in range of another thing in grass world the interact code below will handle the behaviour.
 //If the Id of the other thing is different from our the sprite sheet will be set to (or remain) default.
 //If the other thing Id does not match than the 'fight' spritesheet is introduced. 
  var b3interactcode=`
    if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){
      thingmap.get(myId).sprite.heading='default';
    }
    else {
      thingmap.get(myId).sprite.heading='fight';
    }
  `;
  console.log('b3interactioncode'); //making sure the code above is being run.
  thingmap.get(myTid).o.tinteract = new Function('myId', 'otherId', b3interactcode);
  thingmap.get(myTid).o.tsaveinteract(); //these lines saves our interact code which uses ticks ''.

}
function onload_b3() { //this function is called in the onload.js file
 //   console.log('onload_b3');
    b3thing= new MovingThing(null,b3newname, null, 9, 1); //9 is the genus from the classes.js file which is my sprite sheet
    b3thing.tcreate(runNext); //
}
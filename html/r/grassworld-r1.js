//List Of Names
var listOfBirdNames = ["Fun Uncle ", "Bad Uncle ","Tim From Spain ","Buff Mama ","Pigeon ","Beans ","Small Ostrich ","David(RIP) ","Jack(RIP) ", "Chris(RIP) "];
//Uses random function to pick a random name from name list and a random number thats not bigger than 1000
var newBirdName = listOfBirdNames[ grandom(listOfBirdNames.length) - 1 ] + grandom(1000);
//instantiate vaariable for Schplágen
var   MySchplágen_r1;
//function for setting properties of Schplágen
function runNextForBird(RedOne) {
  console.log('r1: New Bird with Tid ' + RedOne.insertId + " " + newBirdName);
  //Getting Tid
  var birdTid = RedOne.insertId;
  var r1 = {};
  //sets Tid
  r1.Tid = birdTid;
  //sets Tname
  r1.Tname = newBirdName;
  //sets selected
  r1.selected = false;
  //sets o
  r1.o =  MySchplágen_r1;
  //sets o.Tid
  r1.o.Tid = birdTid;
  //'moves' the Schplágen
  let BirdSpriteDetail = {
          Tid: birdTid,
          Ganimated: true,
          //random x-axis location for Schplágen to spawn close to 250
          left: 250 + grandomrange(10),
          //random y-axis location for Schplágen to spawn close to 250
          top: 250 + grandomrange(10)
  }
  //Instantiates charactersprite, new spritesheet for character
  r1.sprite = new charactersprite(BirdSpriteDetail);
  r1.ready = 2;
  //gets the spritesheet
  thingmap.set(r1.Tid, r1);
  r1.o.tget(thingmap.get(r1.Tid));
  r1.o.tgetimages(thingmap.get(r1.Tid));
  thingmap.get(birdTid).o.Tx =  MySchplágen_r1.left;
  thingmap.get(birdTid).o.Ty =  MySchplágen_r1.top;
  //Sets a parameter that allows Schplágen to move
  thingmap.get(birdTid).o.Gcanmove = true;
  //Sets a parameter that allows Schplágen to be animated from spritesheet
  thingmap.get(birdTid).o.Ganimated = true;
  //Saves location
  thingmap.get(birdTid).o.msaveLocation();
  //function to detect key presses
  thingmap.get(birdTid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      switch (keychar) {
        //If S key is pressed Schplágen will 'sleep' with sleepnow() function
        case 'S':
          thingmap.get(birdTid).o.sleepnow();
          console.log("r1: Bird- " + newBirdName + " Is Asleep");
          break;
        //If W key is pressed Schplágen will 'Awake' with wakenow() function
        case 'W':
          thingmap.get(birdTid).o.wakenow();
          console.log("r1: Bird- " + newBirdName + " Is Awake");
          break;
      }
  });
}
//function called in grassworld-onload.js
function onload_r1() {
  console.log("r1: Bird Onload function");
  //Instantiate   MySchplágen_r1 as MovingThing Schplágen, 15 is genus of my Schplágen
      // MySchplágen_r1= new MovingThing(null,newBirdName, null, 8, 1);
      MySchplágen_r1= new MovingThing(null,newBirdName, null, 15, 1);
       //calls tcreate method and passes runNextForBird
      MySchplágen_r1.tcreate(runNextForBird);
       // onload_red_classes();
}

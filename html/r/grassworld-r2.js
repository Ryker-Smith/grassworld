//function called in grassworld-onload.js
function onload_r2() {
console.log('This still works and Paddy hasnt broken it yet');
//Instantiate MySchplágen_R2 as MovingThing object
  MySchplágen_R2= new MovingThing(null,r2newname, null, 5, 1);
  MySchplágen_R2.tcreate(part2EB);}

var r2names=["Angus ", "Jersey ","Freisan ","S. Highland ","Belgian Blue ","[REDACTED] ","Peanut ","Shy Guy ","Jesus(RIP) "];
//Uses random function to pick a random name from name list and a random number thats not bigger than 1000
var r2newname=r2names[ grandom(r2names.length)-1 ]+ grandom(1000);
var MySchplágen_R2;
//function that produces a random number that isn't bigger than the value passed in the function
// function grandom(r2upper){
  // return Math.floor(Math.random() * r2upper) + 1;}
//
function grandomrange(r2upper){
  // Creates two random numbers
  let r= Math.floor(Math.random() * r2upper) + 1;
  let c= Math.floor(Math.random() * r2upper) + 1;
  //If the random number for the variable C is divisble ny zero then the random number for R will be negative
  if ((c % 2) == 0) {
    r *= -1;
  }
  return r;
}
//
function oneinNchance(P){
  // This creates a random chance depending on the number given, e.g if its 90, 89 times it will fail and once it will return positive
  if (grandom(P)%P==0) {
    return true;
  }
  else {
    return false;
  }
}
//
function part2EB(Frick) {
  // Displays the TID and the Name of the newest Schplágen
  console.log('#####LATEST SCHPLÁGEN####-- ' + Frick.insertId + '  '+ r2newname);
  // sets the variable r2TID to the Tid, menaing less typing later
  var r2Tid=Frick.insertId;
  var pc={};

  pc.Tid=r2Tid;
  pc.Tname=r2newname;
  pc.selected=false;
  pc.o=MySchplágen_R2;
  pc.o.Tid=r2Tid;

  let r2spritedetail= {
          Tid: r2Tid,
          Ganimated: true,
          // Finds the co-ordinate plus or minus ten from the current X co-ordinate
          left: 250 + grandomrange(10),
          // Finds the co-ordinate plus or minus ten from the current Y co-ordinate
          top: 251 + grandomrange(10)
  }

  pc.sprite = new charactersprite(r2spritedetail);
  // because there are two network retrievals to complete the process, the
  // ready flag starts with a value of 2 and as each step completes the flag
  // is decremented. Only when the ready flag is 0 does the charactersprite
  // class get to update and/or render. The gameloop won't call the charactersprite
  // methods on an object with non-zero ready flag.
  pc.ready=2;
  thingmap.set(pc.Tid, pc);
  pc.o.tget(thingmap.get(pc.Tid));
  pc.o.tgetimages(thingmap.get(pc.Tid));
  // Moves a Schplágen left or right to the coordinates found from the earlier function
  thingmap.get(r2Tid).o.Tx=MySchplágen_R2.left;
    // Moves a Schplágen up or down to the coordinates found from the earlier function
  thingmap.get(r2Tid).o.Ty=MySchplágen_R2.top;
  //allow the Schplágen to move
  thingmap.get(r2Tid).o.Gcanmove=true;
  //Animates the Scplágen so its not one frame
  thingmap.get(r2Tid).o.Ganimated=true;
  // Saves the location so that the schplágen should remain in the same spot on reloading the page
  thingmap.get(r2Tid).o.msaveLocation();
  thingmap.get(r2Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);

// This is for naking a selcleted Schplágen sleep
      if (keychar=='S') {
          thingmap.get(thing_selected).o.sleepnow();}
          // Displays WOKE in the console upon successfully making the most recent schplagen sleep
          console.log("SCHLEEP");

// This is for waking a selcleted Schplágen
      if (keychar=='W') {
          thingmap.get(thing_selected).o.wakenow();}
          // Displays WOKE in the console upon successfully making the most recent schplagen wake up
          console.log("WOKE")
        });
      }

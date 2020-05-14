
/*var SchplágenNames=["Fester ","Inky ","Pinky ","Stinky ","Brain ","WeeMan ","Jimmy ","SeeYouPal ","Gombeen ","Ted "]; // names for Schplágen

var newName=SchplágenNames[grandom(SchplágenNames.length)-1 ]+ grandom(1000); //Generates a random name from the list and adds a random number to the end.

var MySchplágen_b1;

/*
function randomNum(upper){ // random number generator
return Math.floor(Math.random() * upper) + 1;
}



// Produces random number 'r' which is positive when 'c' is even and negative when 'c' is odd.
function randomNumRange(upper){	
  let r= Math.floor(Math.random() * upper) + 1;
  let c= Math.floor(Math.random() * upper) + 1;
  if ((c % 2) == 0) {
    r *= -1; 
  }
  return r;
}


function placeOnScreen(r) {
  console.log('New character with Tid ' + r.insertId);
  var Tid=r.insertId;
  var fnt={};
  
  fnt.Tid=Tid;
  fnt.Tname=newName;
  fnt.selected=false;
  fnt.o=blueSamuari_b1;
  fnt.o.Tid=Tid;
  
  let spritedetail= {
          Tid: Tid,
          Ganimated: true,
          spLeft:5 + r,
          spTop: 510 + r
  }
  
  fnt.sprite = new charactersprite(spritedetail);
  // because there are two network retrievals to complete the process, the
  // ready flag starts with a value of 2 and as each step completes the flag
  // is decremented. Only when the ready flag is 0 does the charactersprite
  // class get to update and/or render. The gameloop won't call the charactersprite
  // methods on an object with non-zero ready flag.
  fnt.ready=2;
  thingmap.set(fnt.Tid, fnt);
  fnt.o.tget(thingmap.get(fnt.Tid));
  fnt.o.tgetimages(thingmap.get(fnt.Tid));
  thingmap.get(Tid).o.spLeft;
  thingmap.get(Tid).o.spTop;
  thingmap.get(Tid).o.Gcanmove=true;
  thingmap.get(Tid).o.Ganimated=true;
  thingmap.get(Tid).o.msaveLocation();
  thingmap.get(Tid).o.tkeypress = (function(keycode) {
      let keychar=String.fromCharCode(keycode);
      console.log("I'm new Schplágen. I don't do anything yet");
      if ((keychar=='S') || (keychar=='s')) {
          thingmap.get(thing_selected).o.sleepnow(); // activates Sleep function
      }
      console.log(" b1 sleeping ");
      if ((keychar=='W') || (keychar=='w')) {
        thingmap.get(thing_selected).o.wakenow(); // activates Wake function
      }
      console.log(" b1 wake up");
  });
  console.log('b1 created '+ Tid);
}


function onload_b1() {
  console.log('onLoad_b1');
//    MySchplágen_b1= new MovingThing(null,newname, null, 10, 1); //Genus = 10
//    MySchplágen_b1.tcreate(placeOnScreen);
	blueSamuari_b1= new MovingThing(null,newname, null, 25, 1); // 25 = blueSamuari genus from classes.js
	blueSamuari_b1.tcreate(placeOnScreen);
}
*/


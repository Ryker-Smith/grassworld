
class bluesamuaricharactersprite extends charactersprite {
  interact(){
    if (thingmap.get(this.Tid).o.Ginteracts) {
    switch (thingmap.get(this.Tid).o.Tgenus) {
      case blueSamuari : { 
              let somearbitraryvalue=51;
              for (key of thingmap.keys()) {
                  if (key == this.Tid) {
                    continue;
                  }
                  let dist = distance({
                    left: (thingmap.get(key).sprite.left + (thingmap.get(key).sprite.sprite_width / 2)),
                    top: (thingmap.get(key).sprite.top + (thingmap.get(key).sprite.sprite_height / 2))
                  }, {
                    left: this.left + Math.floor(this.sprite_width/2),
                    top: this.top + Math.floor(this.sprite_height/2)
                  });
                  if (dist < somearbitraryvalue) {
                    if (thingmap.get(key).o.Tstatus != 'p') {
                      charactersprite.pffft(key);
            }
          }
                }
    break;
          
    
        }
      }
    }
  }

  static pffft(Tid) {
      // unfinished
      // delete/explode the character
      // console.log('KR');
      // thingmap.get( thingmap.get(Tid).o.tdelete('shockperson.wav') );
      console.log('pfffttt: '+Tid);
      thingmap.delete(Tid);
    }
  }

  var list_of_names=["Samuari ", "Samuari ","Samuari ","Samuari ","Samuari ","Samuari ","Samuari "]; // array with list of names
  var addnames=list_of_names[ grandom(list_of_names.length)-1 ]+ grandom(1000); // gets a new random name from the list of names.
  var blueSamuari; // variable name for our Samuari schplagen.

function next_execute(r) {          // next executable to give schplagen properties and methods.
  console.log('b2' + r.insertId); // r.insertId gets the Tid. 
  var Tid=r.insertId;
  var kr={};
  
  kr.Tid=Tid; // adds random Tid for random names and resets onload.  
  kr.Tname=addnames;
  kr.selected=false;
  kr.o=blueSamuari;
  kr.o.Tid=Tid;
  
  let myspritedetail= {         // sprite info.
          Tidkey: "value", Tid,
          Ganimated: true, // animates your schplagen so its not 1 frame.
          left: 501 + grandomrange(10), // the schplagen can spawn at a random x-axis co-ordinate between 491 and 511.
          top: 502 + grandomrange(10) // the schplagen can spawna t a random y-axis co-ordinate between 492 and 512.
  }
   
  kr.sprite = new characterspritee(myspritedetail); // creates a new spritesheet.
  kr.ready=2;
  //gets a Tid and images from the objects.
  thingmap.set(kr.Tid, kr);
  kr.o.tget(thingmap.get(kr.Tid));
  kr.o.tgetimages(thingmap.get(kr.Tid));
  // gets the spritesheet
  thingmap.get(Tid).o.Tx=blueSamuari.left;
  thingmap.get(Tid).o.Ty=blueSamuari.top;
  // allows the schplagen to move with multple frames and save location.
  thingmap.get(Tid).o.Gcanmove=true;
  thingmap.get(Tid).o.Ganimated=true;
  thingmap.get(Tid).o.msaveLocation();
  //thingmap.get(Tid).o.delete();
  // gets the tkeypress from classes to be used as pressing keychars.
  thingmap.get(Tid).o.tkeypress = (function(keycode) { //keycode is used to get letters from numbers.
      keychar=String.fromCharCode(keycode); 
      if (keychar=='S') {
          thingmap.get(thing_selected).o.sleepnow();  // if "S" key is pressed, gets the function from classes, passes it on and then is called to run
                                                    //sleepnow.
        }
      console.log(" b2 sleep ");
      if (keychar=='W') {
        thingmap.get(thing_selected).o.wakenow(); // if "W" key is pressed, gets the function from classes, passes it on and then is called to run
                                                  // wakenow.
      }
      console.log(" b2 wake")
  });
}   
function onload_b2() { // When page reloads it creates a new schplagen.
        console.log('b2');
        blueSamuari= new MovingThing(null,addnames, null, 25, 1); // 12 = genus from classes.js which is my penguin.
      blueSamuari.tcreate(next_execute);
    }

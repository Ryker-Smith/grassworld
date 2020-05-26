var list_of_names=["Samurai ", "Samurai ","Samurai ","Samurai ","Samurai ","Samurai ","Samurai "]; // array with list of names
var addnames=list_of_names[ grandom(list_of_names.length)-1 ]+ grandom(1000); // gets a new random name from the list of names.
var blueSamurai; // variable name for our Samuari schplagen.

/* class bluesamuraicharactersprite extends charactersprite {
    fighting() {
      this.sleeping = false;
      let d='fight';
      let fightingspritesheet='bluesamurai.png';
      let newbehavior={
        d : {
        "spritesheet" : fightingspritesheet,
        "framecount" : "8",
        "rowcount" : "1",
        "w" : "1600",
        "h" : "200",
        "ticks" : "30",
        "scale" : "0.2"
        }
      }
      this.sprite.directions.set(d,JSON.parse(newbehavior)['fight']);
      this.sprite.directions.get(d).spritesheet=new Image();
      this.sprite.directions.get(d).spritesheet.src=imagewithfullpath(fightingspritesheet);
      this.sprite.directions.get(d).ticks=Math.floor(thething.sprite.directions.get(d).ticks/world_speed_multiplier);
      thingmap.get(this.Tid).sprite.frameIndex=0;
      thingmap.get(this.Tid).sprite.tickCount=0;
      thingmap.get(this.Tid).o.Gcanmove=false;
      thingmap.get(this.Tid).o.ismoving=false;
      thingmap.get(this.Tid).sprite.left_destination=thingmap.get(this.Tid).sprite.left;
      thingmap.get(this.Tid).sprite.top_destination=thingmap.get(this.Tid).sprite.top;
      thingmap.get(this.Tid).sprite.heading='fight';
    }
    peaceing() {
      this.sleeping=false;
      thingmap.get(this.Tid).sprite.heading='default';
      thingmap.get(this.Tid).sprite.frameIndex=0;
      thingmap.get(this.Tid).sprite.tickCount=0;
      thingmap.get(this.Tid).o.Gcanmove=true;
    }
    interact(){
    console.log("interacting blue");
    if (thingmap.get(this.Tid).o.Ginteracts) {
    switch (thingmap.get(this.Tid).o.Tgenus) {
      case genus_blueSamurai : { 
              let fightradius=51;
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
                  if (dist < fightradius) {
                    // do the fight with the first character in range
                    console.log("fight");
                    this.o.Gcanmove=true;  
                    this.o.fighting=true;
                    this.o.Tstatus='somethingidonttknowwhat';
                    break;
                  }
              }
              
        }
        default : {
           break;
        }
      }
    }
  }

  } */

function thisthingplf(r){
   for (var p in r.keys) {
    console.log('tput: '+ p + '=' + r[p]);
  }
  
}

function next_execute(r) {          // next executable to give schplagen properties and methods.
//   console.log('BLUE create 222');
  console.log('b2 [' + r.insertId+']'); // r.insertId gets the Tid. 
  var myTid=r.insertId;
  var kr={};
  
  kr.Tid=myTid; // adds random Tid for random names and resets onload.  
  kr.Tname=addnames;
  kr.selected=false;
  kr.o=blueSamurai;
  kr.o.Tid=myTid;
  
  let myspritedetail= {         // sprite info.
          Tid: myTid,
          Ganimated: true, // animates your schplagen so its not 1 frame.
          left: 501 + grandomrange(10), // the schplagen can spawn at a random x-axis co-ordinate between 491 and 511.
          top: 502 + grandomrange(10) // the schplagen can spawna t a random y-axis co-ordinate between 492 and 512.
  }
   
  //kr.sprite = new bluesamuraicharactersprite(myspritedetail); // creates a new spritesheet.
  kr.sprite = new charactersprite(myspritedetail); // creates a new spritesheet.
  kr.ready=2;
  //gets a Tid and images from the objects.
  thingmap.set(kr.Tid, kr);
  kr.o.tget(thingmap.get(kr.Tid));
  kr.o.tgetimages(thingmap.get(kr.Tid));
  // gets the spritesheet
  thingmap.get(myTid).o.Tx=thingmap.get(myTid).sprite.left
  thingmap.get(myTid).o.Ty=thingmap.get(myTid).sprite.top;;
  // allows the schplagen to move with multple frames and save location.
  thingmap.get(myTid).o.Gcanmove=true;
  thingmap.get(myTid).o.Ganimated=true;
  thingmap.get(myTid).o.msaveLocation();
  //thingmap.get(Tid).o.delete();
  // gets the tkeypress from classes to be used as pressing keychars.
/*   thingmap.get(myTid).o.tkeypress = (function(keycode) { //keycode is used to get letters from numbers.
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
  thingmap.get(myTid).o.tsavekeypress();  */

  var samuraiinteractioncode=`
    if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){
        console.log("NOT ONE OF US");
       thingmap.get(myId).sprite.heading='default';
    }
    else {
          if (!thingmap.get(myId).sprite.isfighting) {
              thingmap.get(myId).sprite.heading='fight';
              thingmap.get(myId).sprite.mycoin=grandom(100);
              thingmap.get(myId).sprite.isfighting=true;
          }
          else {
              if (thingmap.get(myId).sprite.mycoin==grandom(100)) {
                 // charactersprite.pffft(otherId);
                  thingmap.get(myId).sprite.heading='fight';
                  thingmap.get(otherId).o.Tgenus=27;
                  thingmap.get(otherId).o.tput(thisthingplf);
                  thingmap.get(myId).sprite.isfighting=false;
                  thingmap.get(otherId).o.tget();

              }
              else {
              }
          }
    }
  `;
  
/*                  Thing.tplfimages(thingmap.get(otherId).GimagesJSON, thingmap.get(otherId).sprite);
                  for (const d of activities) {
      try {
        thingmap.get(otherId).sprite.directions.set(d,JSON.parse(thingmap.get(otherId).GimagesJSON)[d]);
        thingmap.get(otherId).sprite.directions.get(d).spritesheet=new Image();
        thingmap.get(otherId).sprite.directions.get(d).spritesheet.src=imagewithfullpath(JSON.parse(response)[d].spritesheet);
        thingmap.get(otherId).sprite.directions.get(d).ticks=Math.floor(thingmap.get(otherId).sprite.directions.get(d).ticks/world_speed_multiplier);
      }
      catch(e){}
    }    
    */
    
  // or this:
//   myinteractcode="if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){\n  console.log('na na na na na batmaaan');\n}\nelse {\n  console.log('You\\'re not batman; I\\'m batman!');\n} ";
  console.log(samuraiinteractioncode);
  thingmap.get(myTid).o.tinteract = new Function('myId', 'otherId', samuraiinteractioncode);
  thingmap.get(myTid).o.tsaveinteract();
}

function onload_b2() { // When page reloads it creates a new schplagen.
        console.log('BLUE create');
        blueSamurai= new MovingThing(null,addnames, null, 25, 1); // 12 = genus from classes.js which is my penguin.
        blueSamurai.tcreate(next_execute);
    }

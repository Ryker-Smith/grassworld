var list_of_names=["Samurai ", "Samurai ","Samurai ","Samurai ","Samurai ","Samurai ","Samurai "]; // array with list of names
var addnames=list_of_names[ grandom(list_of_names.length)-1 ]+ grandom(1000); // gets a new random name from the list of names.
var blueSamurai; // variable name for our Samuari schplagen.

 class bluesamuraicharactersprite extends charactersprite {
  constructor (options) {
    this.Tid=options.Tid;
  }
    fighting() {
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
                   // console.log("fight");
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

  } 


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
   thingmap.get(myTid).o.tkeypress = (function(keycode) { //keycode is used to get letters from numbers.
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

  
//variable name given to my samurai interacting function.
  var samuraiinteractioncode=`
    if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){ 
    	// if we get myId of genus 25, this same genus is not equal to genus of otherId
//       console.log("NOT ONE OF US");
         // so keep myId of the same genus 'default' sprite.
       thingmap.get(myId).sprite.heading='default';
    }
    else {
    	// if myId of current genus, make a fighting function for the sprite.
          if (!thingmap.get(myId).sprite.isfighting) {
          	// change myId sprite to 'fight'.
              thingmap.get(myId).sprite.heading='fight';
              console.log("samuraii!!!");
              // myId of current genus gets a random number between 1-100
              thingmap.get(myId).sprite.mycoin=grandom(100);
              // if myId gets a random number between 1-100, make fighting true.
              thingmap.get(myId).sprite.isfighting=true;
          }
          else {
          	// if myId gets random number
              if (thingmap.get(myId).sprite.mycoin==grandom(100)) {
                 // charactersprite.pffft(otherId);
                 // change myId sprite to 'fight' heading.
                  thingmap.get(myId).sprite.heading='fight';
                  thingmap.get(otherId).sprite.heading='fight';
                  // otherId of same genus 25, is now being changed to genus 27 when attacked.
                  thingmap.get(otherId).o.Tgenus=27;
                  // calling a function from grassworld-classes "tput", making this schplágen post load function which loads its sprites after refresh.
                  thingmap.get(otherId).o.tput(thisthingplf);
                  // change myId genus of 25 to not being able to fight.
                  thingmap.get(myId).sprite.isfighting=false;
                  //
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
  // making a tinteract function that has 3 variable names.
  thingmap.get(myTid).o.tinteract = new Function('myId', 'otherId', samuraiinteractioncode);
  // calling a tsaveinteract function which isn't being used right now.
  thingmap.get(myTid).o.tsaveinteract();

// variable name for nearest to my samurai, 25.
    var nearestofmysamurais=nearest(myTid, 25);
    // if myTid and genus 25 are defined, call nearest of my samurai's
  if (isdefined(nearestofmysamurais)) {
    console.log('NEAREST '+nearestofmysamurais);
    console.log('Going: '+(thingmap.get(nearestofmysamurais).sprite.left)+', '+(thingmap.get(nearestofmysamurais).sprite.top));
// setting the destination of my schplágen 25.
     thingmap.get(myTid).sprite.setdestination(
       myTid,
       // getting the variable "nearestofmysamurais" to make the sprite go left
       // from a random number between 1-77 and subtract 35
       (thingmap.get(nearestofmysamurais).sprite.left + (grandomrange(77)-35)), //77 -35
       (thingmap.get(nearestofmysamurais).sprite.top + (grandomrange(60)-40)) //60 -40
       // (thingmap.get(nearestOfMyTribe).sprite + (interaction_decider(somearbitraryvalue=51)))
      //console.log('Arbitrary: '+(thingmap.get(nearestOfMyTribe).sprite+ (interaction_decider(somearbitraryvalue))))
    );

  }
  else {
    console.log('ALONE ');
  }
}

function onload_b2() { // When page reloads it creates a new schplagen.
        console.log('BLUE create');
        blueSamurai= new MovingThing(null,addnames, null, 25, 1); // 12 = genus from classes.js which is my penguin.
        blueSamurai.tcreate(next_execute);
    }

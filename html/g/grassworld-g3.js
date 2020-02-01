//list of names for the new Schplagen.
var names=["Mambo Jambo ", "Mob Barley ","Makaron ","Mahmud ","Laa-Laa ","Poh ","Dipsy  ","Stinky Shtinker ","Megalodong", "Misha Fisha "];
//gets a random name from the name list and a random number thats not bigger than 1000.
var g3newname=names[ random(names.length)-1 ]+ random(1000);
var MySchplágen_G3;
//picks a random name from the list of names.
function random(upper){
  return Math.floor(Math.random() * upper) + 1;
}
//creates two random numbers
function g3randomrange(upper){
     let r= Math.floor(Math.random() * upper) + 1;
     let c= Math.floor(Math.random() * upper) + 1;
     //if you can divide the variable "c" by 0 then the variable "r" will be a negative number.
     if ((c % 2) == 0) {
       r *= -1; 
     }
     return r;
   }
   //this creates a random chance depending on the number given, e.g if its 50, 49 times it will fail and once it will return true.
   function oneinNchance(G){
     if (random(G)%G==0) {
       return true;
     }
     else {
       return false; 
     }
   }
   //gives the Schplagen properties.
   function goNext(r) {
    console.log('New g3 character with Tid ' + r.insertId + '' + g3newname);
    //getting Tid
    var g3Tid=r.insertId;
    var t={};
    //sets the Tid.
    t.Tid=g3Tid;
    //sets the name
    t.Tname=g3newname;
    //marks the Schplagen as unselected.
    t.selected=false;
    //sets MySchplagen as an object.
    t.o=MySchplágen_G3;
    //gets objects Tid.
    t.o.Tid=g3Tid;
    //animates the Schplagen.
    let myspritedetail= {
            Tid: g3Tid,
            //declares that the Schplagen is animated.
            Ganimated: true,
            //this is the X axis where the Schplagen will be spawned on.
            left: 501 + grandomrange(10),
            //this is the Y axis where the Schplagen will also be spawned on.
            top: 502 + grandomrange(10)
    }
  //creates a new spritesheet for the new character.
  t.sprite = new charactersprite(myspritedetail);
  console.log('creating a new sprite');
  t.ready=2;
  //sets a Tid to the sprite.
  thingmap.set(t.Tid, t);
  //gets the thing Tid.
  t.o.tget(thingmap.get(t.Tid));
  //gets the spritesheet.
  t.o.tgetimages(thingmap.get(t.Tid));
  //sets where the Schplagen will spawn on the X axis.
  thingmap.get(g3Tid).o.Tx=MySchplágen_G3.left;
  //sets where the Schplagen will spawn on the y axis.
  thingmap.get(g3Tid).o.Ty=MySchplágen_G3.top;
  // allows the Schplagen to move.
  thingmap.get(g3Tid).o.Gcanmove=true;
  //animates the Schplagen.
  thingmap.get(g3Tid).o.Ganimated=true;
  //saves Schplagens location.
  thingmap.get(g3Tid).o.msaveLocation();
  //function that makes the Schplagen sleep or wake up.
  thingmap.get(g3Tid).o.tkeypress = (function(keycode) {
    keychar=String.fromCharCode(keycode);
// This is for naking a selcleted Schplagen sleep.(only works on one Schplagen right now)
    if (keychar=='S') {
        thingmap.get(g3Tid).o.sleepnow();}
        console.log(g3newname + " just fell asleep");

// This is for waking a selcleted Schplagen.(only works on one Schplagen right now)
    if (keychar=='W') {
        thingmap.get(g3Tid).o.wakenow();}
        console.log(g3newname + " has woken up")
      });
    }
  
//creates the Schplagen
//17 is my wizards genus.
function onload_g3() {
  console.log('Damo created a new Schplagen!!');
  //Instantiate mySchplagen as MovingThing object.
  MySchplágen_G3= new MovingThing(null,g3newname, null, 17, 1);
  //calls tcreate method and passes goNext.
  MySchplágen_G3.tcreate(goNext);
}




//List of names for the new Schplagen.
var names=["Sun ", "Venus ","Mercury ","Earth ","Mars","Saturn","Jupiter  ","Neptune","Uranus", "Pluto (RIP)"];
//Gets a random name from the name list and a random number thats not bigger than 1000.
var g1newname=names[ random(names.length)-1 ]+ random(1000);
var Greeny_G1;
//Picks a random name from the list of names.
function random(upper){
  return Math.floor(Math.random() * upper) + 1;
}
function g1randomrange(upper){
     let r= Math.floor(Math.random() * upper) + 1;
     let c= Math.floor(Math.random() * upper) + 1;
     if ((c % 2) == 0) {
       r *= -1;
     }
     return r;
   }

   function Nchance(N){
     if (random(N)%N==0) {
       return true;
     }
     else {
       return false;
     }
   }
   //Gives the Schplagen properties.
   function After(r) {
    console.log('New g1 character with Tid ' + r.insertId + '' + g1newname);
    //Getting Tid
    var g1Tid=r.insertId;
    var t={};
    //sSets the Tid.
    t.Tid=g1Tid;
    //sSets the name
    t.Tname=g1newname;
    //Marks the Schplagen as unselected.
    t.selected=false;
    t.o=Greeny_G1;
    //Gets objects Tid.
    t.o.Tid=g1Tid;
    //Animates the Schplagen.
    //Also gives the Schplagen
    let myspritedetail= {
            Tid: g1Tid,
            //Declares that the Schplagen is animated.
            Ganimated: true,
            //This is the X axis where the Schplagen will be spawned on.
            //Gets a raondom number between +10 and -10 X axis.
            left: 501 + grandomrange(10),
            //This is the Y axis where the Schplagen will also be spawned on.
            //Gets a raondom number between +10 and -10 on Y axis.
            top: 502 + grandomrange(10)
    }
  //Creates a new spritesheet for the new character.
  t.sprite = new charactersprite(myspritedetail);
  console.log('creating a new sprite');
  t.ready=2;
  thingmap.set(t.Tid, t);
  t.o.tget(thingmap.get(t.Tid));
  //Gets the spritesheet.
  t.o.tgetimages(thingmap.get(t.Tid));
  //Sets where the Schplagen will spawn on the X axis.
  thingmap.get(g1Tid).o.Tx=Greeny_G1.left;
  //Sets where the Schplagen will spawn on the y axis.
  thingmap.get(g1Tid).o.Ty=Greeny_G1.top;
  // Allows the Schplagen to move.
  thingmap.get(g1Tid).o.Gcanmove=true;
  //Animates the Schplagen.
  thingmap.get(g1Tid).o.Ganimated=true;
  //Saves Schplagens location.
  thingmap.get(g1Tid).o.msaveLocation();
  //Function that makes the Schplagen sleep or wake up.
//   thingmap.get(g1Tid).o.tkeypress = (function(keycode) {
//     keychar=String.fromCharCode(keycode);
// // Click 'S' to make Schplágen sleep.
//     if (keychar=='S') {
//         thingmap.get(g1Tid).o.sleepnow();}

//         console.log("I'm Asleep");

// // Click 'W' to make Schplágen wake up.
//     if (keychar=='W') {
//         thingmap.get(g1Tid).o.wakenow();}
//         console.log("I'm Awake")
//       });
//     }

//Creates the Schplágen.
// 7 is Greeny's Genus.
  }
function onload_g1() {
  console.log('He is Alive');
  //Instantiate Greeny as MovingThing object.
  Greeny_G1= new MovingThing(null,g1newname, null, 7, 1);
  //Calls tcreate method and passes it After.
  Greeny_G1.tcreate(After); 
}

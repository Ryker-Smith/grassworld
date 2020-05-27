//Names of the schplagens.
var g2names=["De Gea ", "AWB ","Fred ","Bruno ","McSauce ","SlabHead ","Rashy ","JLingz ","Tony ", "Dan "];
//Picks a random name from the list.
var g2newname=g2names[ grandom(g2names.length)-1 ]+ grandom(1000);
// gets the name for a newly created schplagen.
var g2schplágen;
function onload_g2() {
  console.log('g2');
//This is to get the Genus of my Schplagen.
  g2schplágen= new MovingThing(null,g2newname, null, 6, 1);
   g2schplágen.tcreate(DoThisNext);
}
//Gives the schplágen properties.
function DoThisNext(r) {
  console.log('New g2 creature with Tid ' + r.insertId);
  var Tid=r.insertId;
  var t={};
  var keychar
  t.Tid=Tid;
  t.Tname=g2newname;
  t.selected=false;
  t.o=g2schplágen;
  t.o.Tid=Tid;
//This is the spawn location for the schplagen.
  let myspriteinfo= {
          Tid: Tid,
          Ganimated: true,
//When a schplagen is spawning they can spawn on the x-axis at: 491-511.
          left: 501 + grandomrange(10),
// on the y-axis they can spawn at: 492-512.
          top: 502 + grandomrange(10)
  }
// creates a new spritesheet.
  t.sprite = new charactersprite(myspriteinfo);
  console.log('g2 creature making');
  t.ready=2;
// Gives the spritesheet a Tid.
  thingmap.set(t.Tid, t);
// Gets the spritesheet.
  t.o.tget(thingmap.get(t.Tid));
  t.o.tgetimages(thingmap.get(t.Tid));
//Gets current spritesheets coortinates.
  thingmap.get(Tid).o.Tx=myspriteinfo.left;
  thingmap.get(Tid).o.Ty=myspriteinfo.top;
//allowing the sprite to move and allows to animate it.
  thingmap.get(Tid).o.Gcanmove=true;
  thingmap.get(Tid).o.Ganimated=true;
//If browser is refreshed it will save to location of all the objects.
  thingmap.get(Tid).o.msaveLocation();
 // thingmap.get(Tid).o.tkeypress = (function(keycode) {
//       keychar=String.fromCharCode(keycode);
// // If 'S' is pressed on the keyboard the sphlagen will go to sleep and they turn into a bush.
//       if (keychar=='S') {
//           thingmap.get(Tid).o.sleepnow()
//       console.log("g2 I'm sleeping")}
// // If 'W' is pressed on the keyboard the schplagen will wake up and start moving again.
//       else if (keychar=='W'){
//             thingmap.get(Tid).o.wakenow()
//       console.log("g2 I'm awake")}
//   });
//   console.log('Newcreature made '+Tid+'g2');
}

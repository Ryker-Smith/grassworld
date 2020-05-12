//Names of the schplagens.
var g2names = ["El Sheriffo ", "Mr Steal Your Gun ", "Gunna ", "Glock ", "ZorroKiller ", "Muzzle ", "Rusty ", "Bo ", "Twin1 ", "Twin2 "];
//Picks a random name from the list.
var cbnewname = g2names[grandom(g2names.length) - 1] + grandom(1000);
// gets the name for a newly created schplagen.
var cbschplagen;
function onload_green_classes() {
  console.log('Cowboy!');
  //This is to get the Genus of my Schplagen.
  cbschplagen = new MovingThing(null, cbnewname, null, 17, 1);
  cbschplagen.tcreate(DoThisNext);
}
//Gives the schplágen properties.
function DoThisNext(r) {
  console.log('New Cowboy was created! ' + r.insertId);
  var Tid = r.insertId;
  var t = {};
  var keychar
  t.Tid = Tid;
  t.Tname = cbnewname;
  t.selected = false;
  t.o = cbschplagen;
  t.o.Tid = Tid;
  //This is the spawn location for the schplagen.
  let myspriteinfo = {
    Tid: Tid,
    Ganimated: true,
    //When a schplagen is spawning they can spawn on the x-axis at: 491-511.
    left: 501 + grandomrange(10),
    // on the y-axis they can spawn at: 492-512.
    top: 502 + grandomrange(10)
  }
  // creates a new spritesheet.
  t.sprite = new charactersprite(myspriteinfo);
  console.log('Cowboy created!');
  t.ready = 2;
  // Gives the spritesheet a Tid.
  thingmap.set(t.Tid, t);
  // Gets the spritesheet.
  t.o.tget(thingmap.get(t.Tid));
  t.o.tgetimages(thingmap.get(t.Tid));
  //Gets current spritesheets coortinates.
  thingmap.get(Tid).o.Tx = myspriteinfo.left;
  thingmap.get(Tid).o.Ty = myspriteinfo.top;
  //allowing the sprite to move and allows to animate it.
  thingmap.get(Tid).o.Gcanmove = true;
  thingmap.get(Tid).o.Ganimated = true;
  //If browser is refreshed it will save to location of all the objects.
  thingmap.get(Tid).o.msaveLocation();
  thingmap.get(Tid).o.tkeypress = (function (keycode) {
    keychar = String.fromCharCode(keycode);
    // If 'S' is pressed on the keyboard the sphlagen will go to sleep and they turn into a bush.
    if (keychar == 'S') {
      thingmap.get(Tid).o.sleepnow()
      console.log("*spits* imma take a nap now boys")
    }
    // If 'W' is pressed on the keyboard the schplagen will wake up and start moving again.
    else if (keychar == 'W') {
      thingmap.get(Tid).o.wakenow()
      console.log("I feel like a new man!")
    }
  });
  console.log('Newcreature made ' + Tid + 'cb');
}

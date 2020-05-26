//Names of the schplagens.
var cbnames = ["El Sheriffo ", "Mr Steal Your Gun ", "Choppa ", "Glock ", "ZorroKiller ", "Muzzle ", "Rusty ", "Bo ", "Twin1 ", "Twin2 "];
//Picks a random name from the list.
var cbnewname = cbnames[grandom(cbnames.length) - 1] + grandom(1000);
// gets the name for a newly created schplagen.
var cbschplagen;
var bullet;
var cbposX, cbposY;

function onload_g3() {
  console.log('Cowboy!');
  //This is to get the Genus of my Schplagen.
  cbschplagen = new MovingThing(null, cbnewname, null, 17, 1);
  cbschplagen.tcreate(DoThisNext);
}

function shoot() {
  cbposX = cbschplagen.Tx;
  cbposY = cbschplagen.Ty;

  bullet = new MovingThing(null, 'stevemcqueen', null, 29, 1);
  bullet.tcreate(FireBullet);
  console.log("I'm shooting!");
}
function FireBullet(r) {
  console.log('New bullet was created! ' + r.insertId);
  var Tid = r.insertId;
  var t = {};
  t.Tid = Tid;
  t.Tname = 'stevemcqueen';
  t.selected = false;
  t.o = bullet;
  t.o.Tid = Tid;
  //This is the spawn location for the schplagen.
  let myspriteinfo = {
    Tid: Tid,
    Ganimated: true,
    //
    left: cbposX,
    // 
    top: cbposY
  }
  // creates a new spritesheet.
  t.sprite = new charactersprite(myspriteinfo);
  console.log('bullet created!');
  t.ready = 2;
  // Gives the spritesheet a Tid.
  thingmap.set(t.Tid, t);
  // Gets the spritesheet.
  t.o.tget(thingmap.get(t.Tid));
  t.o.tgetimages(thingmap.get(t.Tid));
  //Gets current spritesheets coordinates.
  thingmap.get(Tid).o.Tx = myspriteinfo.left;
  thingmap.get(Tid).o.Ty = myspriteinfo.top;
  //allowing the sprite to move and allows to animate it.
  thingmap.get(Tid).o.Gcanmove = true;
  thingmap.get(Tid).o.Ganimated = true;
  //If browser is refreshed it will save the location of all the objects.
  thingmap.get(Tid).o.msaveLocation();
  console.log('New bullet made ' + Tid + 'cb');
}
//Gives the schplágen properties.
function DoThisNext(r) {
  console.log('New Cowboy was created! ' + r.insertId);
  var Tid = r.insertId;
  var t = {};
  var keychar;
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
  //Gets current spritesheets coordinates.
  thingmap.get(Tid).o.Tx = myspriteinfo.left;
  thingmap.get(Tid).o.Ty = myspriteinfo.top;
  //allowing the sprite to move and allows to animate it.
  thingmap.get(Tid).o.Gcanmove = true;
  thingmap.get(Tid).o.Ganimated = true;
  //If browser is refreshed it will save the location of all the objects.
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
    else if (keychar == 'K') {
      shoot()
      console.log("Pew Pew");
    }
  });
  console.log('New creature made ' + Tid + 'cb');
}

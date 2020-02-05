
var names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var newname=names[ grandom(names.length)-1 ]+ grandom(1000);
var thisschplágen;

function run_this_next(r) {
  console.log('New character with Tid ' + r.insertId);
  var myTid=r.insertId;
  var fnt={};
  
  fnt.Tid=myTid;
  fnt.Tname=newname;
  fnt.selected=false;
  fnt.o=thisschplágen;
  fnt.o.Tid=myTid;
  
  let spritedetail= {
          Tid: myTid,
          Ganimated: true,
          left: 501 + grandomrange(10),
          top: 502 + grandomrange(10)
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
  thingmap.get(myTid).o.Tx=thingmap.get(myTid).sprite.left
  thingmap.get(myTid).o.Ty=thingmap.get(myTid).sprite.top;;
  thingmap.get(myTid).o.Gcanmove=true;
  thingmap.get(myTid).o.Ganimated=true;
  thingmap.get(myTid).o.msaveLocation();
  thingmap.get(myTid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      if (keychar == 'S') {
        
      }
      else if (keychar == 'W') {
        
      }
      else {
        doTheDefaultFunction(keycode); 
      }
      console.log("I'm new schplágen. I don't do anything yet");
  });
}
function onload_f0() {
  console.log('onLoad');
  thisschplágen= new SamuraiSchplágen(null,newname, null, 1, 1);
  thisschplágen.tcreate(run_this_next);
}

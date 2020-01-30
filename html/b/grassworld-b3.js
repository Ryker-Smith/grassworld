
var b3names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var b3newnames=b3names[ b3random(b3names.length)-1 ]+ b3random(1000);
var b3schplágen;
function b3random(b3upper){
  return Math.floor(Math.random() * b3upper) + 1;
}
function b3randomrange(b3upper){
  let b3r= Math.floor(Math.random() * b3upper) + 1;
  let b3c= Math.floor(Math.random() * b3upper) + 1;
  if ((b3c % 2) == 0) {
    b3r *= -1; 
  }
  return b3r;
 }
 function b3oneinNchance(b3N){
  if (b3random(b3N)%b3N==0) {
    return true;
  }
  else {
    return false; 
  }
}
function runNext(b3r) {
  console.log('New b3 character with Tid ' + b3r.insertId);
  var b3Tid=b3r.insertId;
  var b3t={};
  
  b3t.Tid=b3Tid;
  b3t.Tname=b3newnames;
  b3t.selected=false;
  b3t.o=b3schplágen;
  b3t.o.Tid=b3Tid;
  
  let b3spritedetail= {
          Tid: b3Tid,
          Ganimated: true,
          left: 501 + b3randomrange(10),
          top: 502 + b3randomrange(10)
  }
  
  b3t.sprite = new charactersprite(b3spritedetail);

  b3t.ready=2;
  thingmap.set(b3t.Tid, b3t);
  b3t.o.tget(thingmap.get(b3t.Tid));
  b3t.o.tgetimages(thingmap.get(b3t.Tid));
  thingmap.get(b3Tid).o.Tx=500 + b3randomrange(10);
  thingmap.get(b3Tid).o.Ty=100 + b3randomrange(10);
  thingmap.get(b3Tid).o.Gcanmove=true;
  thingmap.get(b3Tid).o.Ganimated=true;
  thingmap.get(b3Tid).o.msaveLocation();
  thingmap.get(b3Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      console.log("I'm new schplágen. I don't do anything yet");
  });
}
function onload_b3() {
        console.log('from onload_b3');
        b3schplágen= new MovingThing(null,b3newnames, null, 1, 1);
    b3schplágen.tcreate(runNext);
}


var names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var newname=names[ grandom(names.length)-1 ]+ grandom(1000);
var thisschplágen;
function grandom(upper){
  return Math.floor(Math.random() * upper) + 1;
}
function grandomrange(upper){
  let r= Math.floor(Math.random() * upper) + 1;
  let c= Math.floor(Math.random() * upper) + 1;
  if ((c % 2) == 0) {
    r *= -1; 
  }
  return r;
}
function oneinNchance(N){
  if (grandom(N)%N==0) {
    return true;
  }
  else {
    return false; 
  }
}

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
          left: 501,
          top: 502
  }
  
  fnt.sprite = new charactersprite(spritedetail);
  fnt.ready=2;
  thingmap.set(fnt.Tid, fnt);
  fnt.o.tget(thingmap.get(fnt.Tid));
  fnt.o.tgetimages(thingmap.get(fnt.Tid));
  thingmap.get(myTid).o.Tx=500 + grandomrange(10);
  thingmap.get(myTid).o.Ty=100 + grandomrange(10);
  thingmap.get(myTid).o.Gcanmove=true;
  thingmap.get(myTid).o.Ganimated=true;
  thingmap.get(myTid).o.msaveLocation();
}
function onload_f0() {
  console.log('onLoad');
    thisschplágen= new MovingThing(null,newname, null, 1, 1);
    thisschplágen.tcreate(run_this_next);
}

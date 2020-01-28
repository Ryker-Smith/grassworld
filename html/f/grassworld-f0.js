
var names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var newname=names[ grandom(names.length)-1 ]+ grandom(1000);
var thisschplágen;
function grandom(upper){
  return Math.floor(Math.random() * upper) + 1;
}
function oneinNchance(N){
  if (grandom(N)%N==0) {
    return true;
  }
  else {
    return false; 
  }
}

function nowfeckinwhat(r) {
  console.log('f0 18 ' + r.insertId);
  var myTid=r.insertId;
  var fnt={};
  
  fnt.Tid=myTid;
  fnt.Tname=newname;
  let spritedetail= {
          Tid: myTid,
          Ganimated: true,
          spritesheet: new Image(),
          framecount: 0,
          rowcount: 0, // not presently used
          w: 0, //fnt.images.default.w,
          h: 0, //fnt.images.default.h,
          ticks: 0, //fnt.images.default.ticks,
          scale: 1, //fnt.images.default.scale
          left: 500,
          top: 500
  }

  fnt.sprite = new charactersprite(spritedetail);
  fnt.o=thisschplágen;
  fnt.o.Tid=myTid;
  thingmap.set(fnt.Tid, fnt);
  fnt.o.tgetimages(thingmap.get(fnt.Tid).o);
  fnt.o.Tx=500;
  fnt.o.Ty=500;
  fnt.o.msaveLocation();
}
function onload_f0() {
//   console.log('onLoad');
//     thisschplágen= new MovingThing(null,newname, null, 17,1);
//     thisschplágen.tcreate(nowfeckinwhat);
 }

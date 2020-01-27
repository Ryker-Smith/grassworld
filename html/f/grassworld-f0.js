
var names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var newname=names[ grandom(names.length)-1 ]+ grandom(1000);

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
//   console.log(r);
  var thisTid=r.insertId;
//   console.log('INS1 '+r);
//   console.log('new ID '+thisTid);
  lastcount=things.length;
  // there's about 34 million ways trhis can all be improved.
  things.push( sprite({
        thingnum: lastcount+1,
//         width: 2122,
//         height: 320,
        selected: false,
        Tid: thisTid,
        image: undefined,
//         numberOfFrames: 8,
//         ticksPerFrame: 200,
        left: 0,
        left_destination: Math.floor(Math.random() * screen.width),
        top: Math.floor(Math.random() * screen.height),
        top: 0,
//         Gscale: .17,
        Tname: newname,
        Tgenus: genus_Schplágen,
        Gcanmove: true,
        Ganimated: true,
        Ginteracts: false
    }));
  things[lastcount].image=new Image();
//   things[lastcount].image.src="assets/img/"+"anmhithe02-positioned.png";
  things[lastcount].o=new MovingThing(null,things[lastcount].Tname,'',genus_Schplágen,1);
  things[lastcount].o.Tid=thisTid;
  things[lastcount].o.tgetimages(things[lastcount]);

}
function onload_f0() {
  if (oneinNchance(100)) {
    thisschplágen= new Thing(null,newname,null, genus_Schplágen);
    thisschplágen.tcreate(nowfeckinwhat);
  }
}

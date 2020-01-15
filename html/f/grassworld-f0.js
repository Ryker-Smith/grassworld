let genus_Schplágen = 1;
var tst, t;
var names=["Urgle Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo","Mary ","Eva ","Pishnot Smilyface ","Boty MacBoatyface_"];
var newname=names[ grandom(3) ]+ grandom(1000);

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
  lastcount=things.length;
  // there's about 34 million ways trhis can all be improved.
  things.push( sprite({
//         context: canvas.getContext("2d"),
        thingnum: lastcount+1,
        width: 2122,
        height: 320,
        selected: false,
        tID: thisTid,
        image: undefined,
        numberOfFrames: 8,
        ticksPerFrame: 200,
        left: 0,
        left_destination: Math.floor(Math.random() * screen.width),
        top: Math.floor(Math.random() * screen.height),
        top: 0,
        scale: .25,
        name: newname,
        genus: genus_Schplágen,
        canmove: true
    }));
    things[lastcount].image=new Image();
    things[lastcount].image.src="assets/img/"+"anmhithe02-positioned.png";
    things[lastcount].o=new MovingThing(null,things[lastcount].name,'',0);
    things[lastcount].o.Tid=thisTid;

}
function onload_f0() {
  console.log('ge aimes me sangidges');
  thisschplágen= new Thing(null,newname,null, genus_Schplágen);
  thisschplágen.tcreate(nowfeckinwhat);
}

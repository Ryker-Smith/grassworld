
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
  var fnt={};
  
  fnt.Gcanmove= (field.all[j].Gmobile == 1);
      fnt.Ganimated= (field.all[j].Ganimated == 1);
      fnt.Ginteracts= (field.all[j].Ginteracts == 1);
      fnt.Tid=field.all[j].Tid;
      fnt.Tname= field.all[j].Tname;
      fnt.Tgenus= field.all[j].Tgenus;
      fnt.selected=false;
      fnt.Tx=field.all[j].Tx;
      fnt.Ty=field.all[j].Ty;

      if (fnt.Gcanmove) {
        fnt.o = new MovingThing(
          null,
          fnt.Tname,
          '',
          0,
          1 // legs
        );
      }
      else {
        fnt.o = new Thing(
          null,
          fnt.Tname,
          '',
          0
        );
      }
      let spritedetail= {
          Tid: thisTid,
          Ganimated: fnt.Ganimated,
          spritesheet: undefined,
          framecount: undefined,
          rowcount: undefined, // not presently used
          w: undefined, //fnt.images.default.w,
          h: undefined, //fnt.images.default.h,
          ticks: undefined, //fnt.images.default.ticks,
          scale: undefined, //fnt.images.default.scale
          left: fnt.Tx,
          top: fnt.Ty
      }
      fnt.sprite = new charactersprite(spritedetail);
      thingmap.set(fnt.Tid, fnt);
      Thing.tplfimages(field.all[j], thingmap.get(fnt.Tid));
//   console.log('INS1 '+r);
//   console.log('new ID '+thisTid);
  lastcount=things.length;

  things[lastcount].o=new MovingThing(null,things[lastcount].Tname,'',genus_Schplágen,1);
  things[lastcount].o.Tid=thisTid;
  things[lastcount].o.tgetimages(things[lastcount]);

}
function onload_f0() {
    thisschplágen= new MovingThing(null,newname,null, genus_Schplágen);
    thisschplágen.tcreate(nowfeckinwhat);
}

// names for the new Shplagens.
var names=["Mambo Jambo ", "Mob Barley ","Makaron ","Mahmud ","Laa-Laa ","P0 ","Dipsy  ","Stinky Shtinker ","MEgalodong", "Misha Fisha "];
var newname=names[ g3random(names.length)-1 ]+ g3random(1000);
var mahShplagen;
//picks a random name from the list of names.
function g3random(upper){
  return Math.floor(Math.random() * upper) + 1;
}
function g3randomrange(upper){
     let g3= Math.floor(Math.random() * upper) + 1;
     let G= Math.floor(Math.random() * upper) + 1;
     if ((G % 2) == 0) {
       g3 *= -1; 
     }
     return g3;
   }
   //picks a random name.
   function oneinNchance(G){
     if (g3random(G)%G==0) {
       return true;
     }
     else {
       return false; 
     }
   }
   //gives the Shplagen info such as name,Tid etc.
function next_step(g3) {
     console.log('Damo has created a new Shplagen! ' + g3.insertId);
     var mygTid=g3.insertId;
     var g3fnt={};
     
     g3fnt.Tid=mygTid;
     g3fnt.g3name=newname;
     g3fnt.selected=false;
     g3fnt.o=mahShplagen;
     g3fnt.o.Tid=mygTid;
     
     //animates the Shplagen using a sprite sheet.
     let spritedetail= {
             Tid: mygTid,
             Ganimated: true,
             left: 501 + g3randomrange(10),
             top: 502 + g3randomrange(10)
     }

     g3fnt.sprite = new charactersprite(spritedetail);
     g3fnt.ready=2;
     thingmap.set(g3fnt.Tid, g3fnt);
     g3fnt.o.tget(thingmap.get(g3fnt.Tid));
     g3fnt.o.tgetimages(thingmap.get(g3fnt.Tid));
     thingmap.get(mygTid).o.Tx=500 + g3randomrange(10);
     thingmap.get(mygTid).o.Ty=100 + g3randomrange(10);
     //moves the Shplagen.
     thingmap.get(mygTid).o.Gcanmove=true;
     //animates teh Shplagen.
     thingmap.get(mygTid).o.Ganimated=true;
     thingmap.get(mygTid).o.msaveLocation();
     thingmap.get(mygTid).o.tkeypress = (function(keycode) {
         keychar=String.fromCharCode(keycode);
         console.log("aye bruh am green maaaaanh");
     });
}
//creates the Shplagen
//17 is my wizards genus.
function onload_g3() {
     console.log('from onload_g3');
     mahShplagen= new MovingThing(null,newname, null, 17, 1);
     mahShplagen.tcreate(next_step);
}



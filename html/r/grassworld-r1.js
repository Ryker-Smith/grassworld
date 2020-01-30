

var r1names=["Fun Uncle ", "Bad Uncle ","Tim From Spain ","Buff Dude ","Snot ","Mammy ","Alien ","David(RIP) ","Jack(RIP) ", "Chris(RIP) "];
var r1newname=r1names[ r1random(r1names.length)-1 ]+ r1random(1000);
var r1schplágen;
function r1random(r1upper){
  return Math.floor(Math.random() * r1upper) + 1;
}
function r1randomrange(r1upper){
  let r1r= Math.floor(Math.random() * r1upper) + 1;
  let r1c= Math.floor(Math.random() * r1upper) + 1;
  if ((r1c % 2) == 0) {
    r1r *= -1;
  }
  return r1r;
}
function r1oneinNchance(r1N){
  if (r1random(r1N)%r1N==0) {
    return true;
  }
  else {
    return false;
  }
}

function r1run_this_next(r1r) {
  console.log('New r1 with Tid ' + r1r.insertId);
  var r1Tid=r1r.insertId;
  var r1fnt={};

  r1fnt.Tid=r1Tid;
  r1fnt.Tname=r1newname;
  r1fnt.selected=false;
  r1fnt.o=r1schplágen;
  r1fnt.o.Tid=r1Tid;

  let r1spritedetail= {
          Tid: r1Tid,
          Ganimated: true,
          left: 501 + r1randomrange(10),
          top: 502 + r1randomrange(10)
  }

  r1fnt.sprite = new charactersprite(r1spritedetail);
  // because there are two network retrievals to complete the process, the
  // ready flag starts with a value of 2 and as each step completes the flag
  // is decremented. Only when the ready flag is 0 does the charactersprite
  // class get to update and/or render. The gameloop won't call the charactersprite
  // methods on an object with non-zero ready flag.
  r1fnt.ready=2;
  thingmap.set(r1fnt.Tid, r1fnt);
  r1fnt.o.tget(thingmap.get(r1fnt.Tid));
  r1fnt.o.tgetimages(thingmap.get(r1fnt.Tid));
  thingmap.get(r1Tid).o.Tx=500 + r1randomrange(10);
  thingmap.get(r1Tid).o.Ty=100 + r1randomrange(10);
  thingmap.get(r1Tid).o.Gcanmove=true;
  thingmap.get(r1Tid).o.Ganimated=true;
  thingmap.get(r1Tid).o.msaveLocation();
  thingmap.get(r1Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      console.log("POOPY r1schplágen. I don't do anything yet");
  });
}
function onload_r1() {
  console.log('r1');
    r1schplágen= new MovingThing(null,r1newname, null, 15, 1);
    r1schplágen.tcreate(r1run_this_next);
}


    var list_of_names=["Richie ", "Shannon ","Jack ","John ","Lizz ","Margret ","Moira "];
	var addnames=list_of_names[ b2_random(list_of_names.length)-1 ]+ b2_random(1000);
	var b2_schplágen;
	function b2_random(upper){
  	return Math.floor(Math.random() * upper) + 1;
}
    function b2_randomrange(upper){
  let r= Math.floor(Math.random() * upper) + 1;
  let c= Math.floor(Math.random() * upper) + 1;
  if ((c % 2) == 0) {
    r *= -1; 
  }
  return r;
}
function chances(N){
  if (b2_schplágenrandom(N)%N==0) {
    return true;
  }
  else {
    return false; 
  }
}

function next_execute(r) {
  console.log('b2' + r.insertId);
  var b2Tid=r.insertId;
  var kr={};
  
  kr.Tid=b2Tid;
  kr.Tname=addnames;
  kr.selected=false;
  kr.o=b2_schplágen;
  kr.o.Tid=b2Tid;
  
  let spritefeature= {
          Tid:b2Tid,
          Ganimated: true,
          left: 501 + b2_randomrange(10),
          top: 502 + b2_randomrange(10)
  }
 	 
  kr.sprite = new charactersprite(spritefeature);
  kr.ready=2;
  thingmap.set(kr.Tid, kr);
  kr.o.tget(thingmap.get(kr.Tid));
  kr.o.tgetimages(thingmap.get(kr.Tid));
  thingmap.get(b2Tid).o.Tx=500 + b2_randomrange(10);
  thingmap.get(b2Tid).o.Ty=100 + b2_randomrange(10);
  thingmap.get(b2Tid).o.Gcanmove=true;
  thingmap.get(b2Tid).o.Ganimated=true;
  thingmap.get(b2Tid).o.msaveLocation();
  thingmap.get(b2Tid).o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      console.log("Kris has made a schplágen!.");
  });
}		
function onload_b2() {
        console.log('b2');
        b2_schplágen= new MovingThing(null,addnames, null, 12, 1); // 12 = genus from classes.js which is my penguin.
    	b2_schplágen.tcreate(next_execute);
    }

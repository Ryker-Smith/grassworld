
function onload_r2() {
  console.log('This still works and Paddy hasnt broken it yet.'); 
}
window.onload = function start() {
	roam();
}

function roam(){
	var num=0;
	for (num=0;num<=999999;num++){
		//Hopefully setting the characters roaming rather than sitting idle
		MovingThing.x =  + Math.random()*13;
		MovingThing.y =  + Math.random()*9;
	}
}
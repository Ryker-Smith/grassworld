let genus_CowboySchplágen = 23;

class CowboySchplágen extends Schplágen {
// the killing machine!!!
switch (genus_CowboySchplágen) {
			 let killzone=99;
			 for (key of thingmap.keys()) {
					 if (key == this.Tid) {
						 continue;
					 }
					 let dist = distance({
						 left: (thingmap.get(key).sprite.left + (thingmap.get(key).sprite.sprite_width / 2)),
						 top: (thingmap.get(key).sprite.top + (thingmap.get(key).sprite.sprite_height / 2))
					 }, {
						 left: this.left + Math.floor(this.sprite_width/2),
						 top: this.top + Math.floor(this.sprite_height/2)
					 });
					 if (dist < killzone) {
						 if (thingmap.get(key).o.Tstatus != 'p') {
							 charactersprite.pffft(key);
						 }
					 }
			 }
		 break;
	 }
	 	 killnow() {
		 this.sleeping = false;
		 thingmap.get(this.Tid).o.Gcanmove=false;
		 thingmap.get(this.Tid).o.ismoving=false;
		 thingmap.get(this.Tid).sprite.left_destination=thingmap.get(this.Tid).sprite.left;
		 thingmap.get(this.Tid).sprite.top_destination=thingmap.get(this.Tid).sprite.top;
	 }

}
    (function(keycode) {
		keychar=String.fromCharCode(keycode);
		if (keychar=='K') {
				thingmap.get(Tid).o.killnow()
		console.log("g I'm Dead")}
		});

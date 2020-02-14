
 
class bluesamuaricharactersprite extends charactersprite {
	interact(){
    if (thingmap.get(this.Tid).o.Ginteracts) {
		switch (thingmap.get(this.Tid).o.Tgenus) {
			case genus_blueSamuari : { 
              let somearbitraryvalue=50;
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
                  if (dist < somearbitraryvalue) {
                    if (thingmap.get(key).o.Tstatus != 'p') {
                      charactersprite.pffft(key);
					  }
					}
                }
		break;
          
		
				}
			}
		}
	}

}
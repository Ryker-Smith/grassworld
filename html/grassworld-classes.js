class Yoke {
    constructor(parent, name, genus){
      this.parent=parent;
      this.name=name;
      this.Tid=undefined;
      this.Tstatus=undefined;
    }
    ycreate() {
      let url=grassworld_db+'a=mk&t=yoke&name='+this.name + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      xhr.open('POST', url);
      xhr.send();
      this.Tid=xhr.onload = function() {
          if (xhr.status != 200) { // OK?
            return 'Error 16';
          }
          else { 
            return xhr.response;
          }
      }
      this.Tid=xhr.onerror = function() {
        return 'error 23';
      };
    };
    static parentUpdate(p, h) {
      document.getElementById(p).text=h;
    }
    getState(){
      let url=grassworld_db+'name='+this.name + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          Yoke.parentUpdate(myparent, 'Error 60');
        }
        else { 
          Yoke.parentUpdate(myparent, xhr.response); 
        }
      };
      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          Yoke.parentUpdate(myparent, 'Error 68');
        }
        else {
          Yoke.parentUpdate(myparent, xhr.response);
        }
      };
      xhr.onerror = function() {
        Yoke.parentUpdate(myparent, "error");
      };
    };
    enumerateProperties() {
      for(var propertyName in this) {
        // propertyName is what you want
        // you can get the value like this: myObject[propertyName]
      }
    }
}

class Thing extends Yoke {
  constructor(parent, name, content, genus) {
    super(parent, name);
    this.content=content;
    this.genus=genus;
    this.data=undefined;
    this.X=undefined;
    this.Y=undefined;
    this.Z=undefined;
  }
  tcreate(postloadfunc) {
      let url=grassworld_db+'t=thing&a=mk&name='+this.name + '&g='+this.genus + token();
      let xhr = new XMLHttpRequest();
      let dt=this.data;
      // the next function to develop should be for: ('POST',url)
      xhr.open('POST', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          postload('Error 64');
        }
        else { 
          postloadfunc(xhr.response);
        }
      };
    }
    tchangegenus(postloadfunc) {
    }
}

class LivingThing extends Thing {
    constructor (parent, name, content) {
      super (parent, name, content);
      this.living=true;
    }
}

class MovingThing extends LivingThing {
  constructor (parent, name, content, legs) {
    super (parent, name, content);
    this.legs=legs;
  }
  saveLocation() {
      let url=grassworld_db+'t=thing&a=sl&tid='+this.Tid;
      for (var c in [this.X, this.Y, this.Z]) {
      }
      url += '&X='+this.X + '&Y='+this.Y + '&Z='+this.Z;
      url += token();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          console.log("Error 78");
        }
        else { 
//           console.log("Location update: "+ xhr.response); 
        }
      };
    }
}

class Schplágen extends MovingThing {  
}

class World extends Thing {
  constructor (parent, name, content) {
    super(parent, name, content);
    this.flora=[];
    this.fauna=[];
    this.objects=[];
    this.grid=[];
  }
  populateArray(cat, data) {
    switch (cat) {
      case 'flora':
            // empty the array first
            this.flora=[];
            for (var m=0; m<data.length;m++) {
              this.flora.push(data[m]);
            }
            break;
      case 'fauna': 
            this.fauna=[];
            for (var m=0; m<data.length;m++) {
              this.fauna.push(data[m]);
            }
            break;
      case 'objects': 
            this.objects=[];
            for (var m=0; m<data.length;m++) {
              this.objects.push(data[m]);
            }
            break;
      default: break;
    }
  }
  getCategory(cat, self){
    // cat should be flora || fauna || object etc
      let url=grassworld_db+'world='+this.name + '&cat='+cat + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      let data=[];
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          Yoke.parentUpdate(myparent, 'Error 79');
        }
        else { 
          data=JSON.parse(xhr.response);
          self.populateArray(cat, data);
        }
      };
    };
}


class charactersprite {
	constructor (options) {
      //super (null, options.name, null, options.genus);
      var character = {};
			character.frameIndex = 0;
			character.tickCount = 0;
			character.ticksPerFrame = options.ticksPerFrame || 0;
			character.numberOfFrames = options.numberOfFrames || 1;
      character.context = options.context;
      character.width = options.width;
      character.height = options.height;
      character.image = undefined; // allocate value later; must fix this
      character.name = options.name;
      character.scale=options.scale;
      character.tID=options.tID;
      character.thingnum=options.thingnum;
      character.left=options.left;
      character.left_destination = character.left;
      character.top=options.top;
      character.top_destination=character.top;
      character.canmove=options.canmove;
      character.ismoving=0;
      character.select=options.selected;
      character.sprite_width=Math.floor((character.width/character.numberOfFrames)* character.scale);
      character.sprite_height=Math.floor(character.height*character.scale);
      this.character=character;
  }
  update(){
            if (!character.canmove) return;
            
            if (character.left != character.left_destination) {
                if (character.left < character.left_destination) {
                  character.left++;
                }
                else {
                  character.left--;
                }
            }
            if (character.top != character.top_destination) {
                if (character.top < character.top_destination) {
                  character.top++;
                }
                else {
                  character.top--;
                }
            }
            character.tickCount += 1;
            if (character.tickCount > character.ticksPerFrame) {
                character.tickCount = 0;
                // If the current frame index is in range
                if (character.frameIndex < character.numberOfFrames - 1) {	
                    // Go to the next frame
                    character.frameIndex += 1;
                } else {
                    character.frameIndex = 0;
                }
            }
//             We've arrived
//              if ((character.ismoving==1) && (character.left == character.left_destination) && (character.top == character.top_destination)) {
//                console.log('Arrival of thing '+character.thingnum+" (aka "+ things[character.thingnum].name+")");
//                things[character.thingnum].o.X=character.left;
//                things[character.thingnum].o.Y=character.top;
//                things[character.thingnum].o.Z=0;
//                things[character.thingnum].o.saveLocation();
//                character.ismoving=0;
//              }
             
    };
		
		render() {
		  // Clear the canvas
      // character.context.clearRect(0, 0, character.width, character.height);
		  // Draw the animation
      try {
        character.context.drawImage(
          character.image,
          character.frameIndex * character.width / character.numberOfFrames,
          0,
          character.width / character.numberOfFrames,
          character.height,
          character.left,
          character.top,
          (character.width / character.numberOfFrames)* character.scale,
          (character.height)*character.scale
        );
      }
      catch (e) {
        console.log(e);
      }
      if (character.selected) {
          ctx=canvas.getContext("2d");// ??? use character's own context?
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = "red";
          ctx.rect(things[i].left,things[i].top,things[i].sprite_width,things[i].sprite_height);
          ctx.stroke(); 
      }
		}
	}

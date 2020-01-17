let genus_Schplágen = 1;
let genus_Twig=2;
let genus_SchplágenAlso = 3;

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
      console.log(url);
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
  tgenuschange(postloadfunc) {
  }
  tcreate(postloadfunc) {
      let url=grassworld_db+'t=thing&a=mk&name='+this.name + '&g='+this.genus + token();
//       console.log(url);
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
    this.canmove=true;
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
          console.log("Location update OK"); 
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
  //
  // This isn't in use yet
  //
  	constructor (options) {
      //super (null, options.name, null, options.genus);
      var thisguy = {};
      this.canvas=options.canvas;
			thisguy.context = options.canvas.getContext("2d");
      thisguy.tID=options.tID;
      thisguy.thingnum=options.thingnum;
      thisguy.name = options.name;
      thisguy.frameIndex = 0;
			thisguy.tickCount = 0;
			thisguy.ticksPerFrame = options.ticksPerFrame || 0;
			thisguy.numberOfFrames = options.numberOfFrames || 1;
      thisguy.image = undefined; // allocate value later; must fix this
      thisguy.scale=options.scale;
      thisguy.left=options.left;
      thisguy.left_destination = thisguy.left;
      thisguy.top=options.top;
      thisguy.top_destination=thisguy.top;
      thisguy.canmove=options.canmove;
      thisguy.ismoving=0;
      thisguy.selected=false;
      this.character=thisguy;
    }
    setImage(imagename) {
      thisguy.width = options.width;
      thisguy.height = options.height;
      this.character.sprite_width=Math.floor((thisguy.width/thisguy.numberOfFrames)* thisguy.scale);
      this.character.sprite_height=Math.floor(thisguy.height*thisguy.scale);
    }
    update(){
            if (!thisguy.canmove) return;
            if (thisguy.left != thisguy.left_destination) {
                if (thisguy.left < thisguy.left_destination) {
                  thisguy.left++;
                }
                else {
                  thisguy.left--;
                }
            }
            if (thisguy.top != thisguy.top_destination) {
                if (thisguy.top < thisguy.top_destination) {
                  thisguy.top++;
                }
                else {
                  thisguy.top--;
                }
            }
            thisguy.tickCount += 1;
            if (thisguy.tickCount > thisguy.ticksPerFrame) {
                thisguy.tickCount = 0;
                // If the current frame index is in range
                if (thisguy.frameIndex < thisguy.numberOfFrames - 1) {	
                    // Go to the next frame
                    thisguy.frameIndex += 1;
                } else {
                    thisguy.frameIndex = 0;
                }
            }
//             We've arrived
//              if ((thisguy.ismoving==1) && (thisguy.left == thisguy.left_destination) && (thisguy.top == thisguy.top_destination)) {
//                console.log('Arrival of thing '+thisguy.thingnum+" (aka "+ things[thisguy.thingnum].name+")");
//                things[thisguy.thingnum].o.X=thisguy.left;
//                things[thisguy.thingnum].o.Y=thisguy.top;
//                things[thisguy.thingnum].o.Z=0;
//                things[thisguy.thingnum].o.saveLocation();
//                thisguy.ismoving=0;
//              }
             
    };
		
		render() {
      try {
          this.character.context.drawImage(
          this.character.image,
          this.character.frameIndex * this.character.width / this.character.numberOfFrames,
          0,
          this.character.width / this.character.numberOfFrames,
          this.character.height,
          this.character.left,
          this.character.top,
          (this.character.width / this.character.numberOfFrames)* this.character.scale,
          (this.character.height)*this.character.scale
        );
      }
      catch (e) {
        console.log(e);
      }
      if (this.character.selected) {
          ctx=this.canvas.getContext("2d");// ??? use thisguy's own context?
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = "red";
          ctx.rect(this.character.left, this.character.top, this.character.sprite_width, this.character.sprite_height);
          ctx.stroke(); 
      }
		}
}

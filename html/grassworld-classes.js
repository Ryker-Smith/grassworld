let genus_Schplágen_f0 = 0;
let genus_Schplágen = 1;
let genus_Twig=2;
let genus_SchplágenAlso = 3;
let genus_Schplágen_r1 = 8;
let genus_Schplágen_r2 = 5;
let genus_Schplágen_g1 = 7;
let genus_Schplágen_g2 = 6;
let genus_Schplágen_g3 = 11;
let genus_Schplágen_b1 = 10;
let genus_Schplágen_b2 = 12;
let genus_Schplágen_b3 = 9;
let genus_teleport = 16;
let emptyimage={
        "spritesheet" : "",
        "framecount" : 0,
        "rowcount" : 0,
        "w" : 0,
        "h" : 0,
        "ticks" : 0,
        "scale" : 0
      };
let activities=['default', 'left', 'right', 'up', 'down', 'hover','sleep'];
var canvas;
var thing_selected = -1;
var audioenabled = false;
var thingstep = 1;

function isdefined(thing){
  var r = true;
  if (typeof thing === 'undefined') {
    r=false;
  }
  return r;
}
function isundefined(thing){
  var r = false;
  if (typeof thing === 'undefined') {
    r=true;
  }
  return r;
}

class Yoke {
    constructor(parent, name, genus){
      this.parent=parent;
      this.Tname=name;
      this.Tid=undefined;
      this.Tstatus=undefined;
    }
    ycreate() {
      let url=grassworld_db+'a=mk&t=yoke&name='+this.Tname + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      xhr.open('POST', url);
      xhr.send();
      this.Tid=xhr.onload = function() {
          if (xhr.status == 200) {
            return xhr.response;
          }
          else { 
            console.log(xhr.response);
            return 'Error c16';
          }
      }
      this.Tid=xhr.onerror = function() {
        return 'Error c23';
      };
    };
    static parentUpdate(p, h) {
      document.getElementById(p).text=h;
    }
    ygetState(){
      let url=grassworld_db+'name='+this.Tname + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
          Yoke.parentUpdate(myparent, xhr.response); 
        }
        else { 
          Yoke.parentUpdate(myparent, 'Error c60');
        }
      };
      xhr.onerror = function() {
        Yoke.parentUpdate(myparent, "Error c71");
      };
    };
    saveState(){
      let url=grassworld_db+'name='+this.Tname + '&a=ss'+ token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
          Yoke.parentUpdate(myparent, xhr.response); 
        }
        else { 
          Yoke.parentUpdate(myparent, 'Error c60');
        }
      };
      xhr.onerror = function() {
        Yoke.parentUpdate(myparent, "Error c71");
      };
    };
}

class Thing extends Yoke {
  constructor(parent, name, content, genus) {
    super(parent, name);
    this.Tcreator=0; // 'TáSéMarTáSé'
    this.Tstatus=undefined;
    this.Tcontent=content;
    this.Tgenus=genus;
    this.Tx=undefined;
    this.Ty=undefined;
    this.Tz=0;
    this.Tteam=undefined;
    this.living=false;
  }
  tgenuschange(plf) {
    // should change the genus in the instantiated object first, then call this function
    // otherwise the genuschange is not saved
      let url=grassworld_db+'t=thing&a=gc&Tid='+this.Tid + '&ng='+this.Tgenus + token();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (!(undefined == plf)) {
          if (xhr.status == 200) {
            plf(JSON.parse(xhr.response));
          }
          else { 
            console.log(xhr.response);
            plf('Error c128');
          }
        }
      };
  }
  tcreate(postloadfunc) {
      let url=grassworld_db+'t=thing&a=mk&name='+this.Tname + '&g='+this.Tgenus + token();
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      xhr.open('POST', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
          postloadfunc(JSON.parse(xhr.response));  
        }
        else { 
          console.log(xhr.response);
          postloadfunc('Error c64');
        }
      };
    }
  static tplfimages(response, thething){
    // DO NOT CHANGE THIS, OR ANYTHING LEADING TO OR FROM THIS
    // I made very heavy going of this, so it's best to NOT NOT NOT
    // change anything here until 
//     console.log('D1 '+JSON.parse(response).default.spritesheet);
    for (const d of activities) {
      thething.sprite.directions.set(d,JSON.parse(response)[d]);
      thething.sprite.directions.get(d).spritesheet=new Image();
      thething.sprite.directions.get(d).spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response)[d].spritesheet;
      thething.sprite.directions.get(d).spritesheet.ticks=Math.floor(thething.sprite.directions.get(d).spritesheet.ticks/2);
    }
  };
  tgetimages(thething) {
      let url=grassworld_db+'t=thing&a=gij&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
          // there's probably a very good reason (that I don't know about)
          // why node is adding [ ... ] to the response, but I don't wan't them
          // so I'm getting rid of [ ]
          // the replace MUST be done here as that works on a string, and the string ...
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          // ... is about to be turned into a JSON object for the next stage
//           console.log('B1 '+r);
//           console.log('B2 '+JSON.parse(r).GimagesJSON);
          Thing.tplfimages(JSON.parse(r).GimagesJSON, thething);
        }
        else { 
          console.log(xhr.response);
          console.log('Error c187');
        }
      };
    }
  tget() {
    let url=grassworld_db+'t=thing&a=get&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
          // there's probably a very good reason (that I don't know about)
          // why node is adding [ ... ] to the response, but I don't wan't them
          // so I'm getting rid of [ ]
          // the replace MUST be done here as that works on a string, and the string ...
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          // ... is about to be turned into a JSON object for the next stage
          console.log('GET '+r);
//           Thing.tplfimages(JSON.parse(r), thething);
        }
        else { 
          console.log(xhr.response);
          console.log('Error c187');
        }
      };
  }
  
  tsetimages(plf, imagesJSON) {
    // not done
      let url=grassworld_db+'t=thing&a=sij&Tid='+this.Tid + '&j='+ imagesJSON + token();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
          plf(JSON.parse(xhr.response));
        }
        else { 
          console.log(xhr.response);
          plf('Error c64');
        }
      };
    }
    tkeypress(keycode) {
      response=1;
    }
}

class LivingThing extends Thing {
    constructor (parent, name, content, genus) {
      super (parent, name, content, genus);
      this.living=true;
      this.currentState='';
      this.sleeping=false;
      this.Gcansleep=false;
    }
    lsomething() {}
    get isasleep() {
      return this.sleeping;
    }
    sleepnow() {
      this.sleeping = true;
      thingmap.get(this.Tid).sprite.heading='sleep';
      thingmap.get(this.Tid).sprite.frameIndex=0;
      thingmap.get(this.Tid).sprite.tickCount=0;
      thingmap.get(this.Tid).o.Gcanmove=false;
    }
    wakenow() {
      this.sleeping=false;
      thingmap.get(this.Tid).sprite.heading='default';
      thingmap.get(this.Tid).sprite.frameIndex=0;
      thingmap.get(this.Tid).sprite.tickCount=0;
      thingmap.get(this.Tid).o.Gcanmove=true;
    }
}

class MovingThing extends LivingThing {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus);
    this.legs=legs;
    this.Gcanmove=true;
    this.ismoving=false;
  }
  msaveLocation() {
      let url=grassworld_db+'t=thing&a=sl&Tid='+this.Tid;
      this.Tx=thingmap.get(this.Tid).sprite.left;
      this.Ty=thingmap.get(this.Tid).sprite.top;
      url += '&Tx='+this.Tx + '&Ty='+this.Ty + '&Tz='+this.Tz;
      url += token();
//       console.log(url);
      let myTid=this.Tid;
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          console.log("Saved OK "+myTid);
        }
        else { 
          console.log("Error c232");
        }
      };
  }
  msavecanmove() {
      let url=grassworld_db+'t=thing&a=cm&tid='+this.Tid;
      url += '&Tx='+this.Tx + '&Ty='+this.Ty + '&Tz='+this.Tz;
      url += token();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { 
        }
        else { 
          console.log("Error c78");
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
    this.all=[];
  }
  populateArray(cat, data) {
    switch (cat) {
      case 'flora':
            // empty the array first
            this.flora=[];
            for (var m=0; m<data.length;m++) {
              this.flora.push(data[m]);
              this.all.push(data[m]);
            }
            break;
      case 'fauna': 
            this.fauna=[];
            for (var m=0; m<data.length;m++) {
              this.fauna.push(data[m]);
              this.all.push(data[m]);
            }
            break;
      case 'objects': 
            this.objects=[];
            for (var m=0; m<data.length;m++) {
              this.objects.push(data[m]);
              this.all.push(data[m]);
            }
            break;
      default: break;
    }
  }
  getCategory(cat, self){
    // cat should be flora || fauna || object etc
      let url=grassworld_db+'world='+this.Tname + '&cat='+cat + token();
      let xhr = new XMLHttpRequest();
      let myparent=this.parent;
      let data=[];
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          data=JSON.parse(xhr.response);
          self.populateArray(cat, data);          
        }
        else { 
          console.log(xhr.response);
          Yoke.parentUpdate(myparent, 'Error c312');
        }
      };
    };
}

class charactersprite {

  	constructor (options) {
      //super (null, options.name, null, options.genus);
      this.Tid=options.Tid;
      this.Ganimated=options.Ganimated;
      // 'canvas' must be changed to a parameter
      this.context = canvas.getContext('2d');
      this.ticks= options.ticks;
      // this instance
      this.left= options.left;
      this.left_destination= options.left;
      this.top_destination= options.top;
      this.top= options.top;
      this.frameIndex=0;
      this.tickCount=0;
      this.heading='default';
      this.directions=new Map();
      for (const i of activities) {
        this.directions.set(i,emptyimage);
      }
    }
    get sprite_width(){
      return (
        this.directions.get(this.heading).w /
        this.directions.get(this.heading).framecount) *
        this.directions.get(this.heading).scale;
    }
    get sprite_height(){
      return (
        this.directions.get(this.heading).h /
        this.directions.get(this.heading).rowcount)*
        this.directions.get(this.heading).scale;
    }
    setdestination(t, dx, dy) { // make this static?
//       console.log('SET DEST');
      if (!thingmap.get(t).o.Gcanmove) return;
      thingmap.get(t).o.ismoving = true;
      this.left_destination = Math.floor(dx - (this.sprite_width/2));
      if (thingmap.get(t).sprite.left_destination < 0) {
        thingmap.get(t).sprite.left_destination = 0;
      }
      else if (thingmap.get(t).sprite.left_destination > canvas.width) {
        thingmap.get(t).sprite.left_destination = canvas.width;
      }
      thingmap.get(t).sprite.top_destination = Math.floor(dy - (thingmap.get(t).sprite.sprite_height/2));
      if (thingmap.get(t).sprite.top_destination < 0) {
        thingmap.get(t).sprite.top_destination = 0;
      }
      else if (thingmap.get(t).sprite.top_destination > canvas.height) {
        thingmap.get(t).sprite.top_destination = canvas.height;
      }
//       console.log("Thing "+t+ " going to ("+thingmap.get(t).sprite.left_destination+","+thingmap.get(t).sprite.top_destination+")");
    }
    interact(){
      if (thingmap.get(this.Tid).o.Ginteracts) {
        switch (thingmap.get(this.Tid).o.Tgenus) {
          case 16 : {
            console.log('TELEPORT DEVICE');
            break;
          }
          default : {
            break;
          }
        }
      }
    }
    directionChange() {
//       character.sprite_width = Math.floor(
//           (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
//       );
//       character.sprite_height = Math.floor(things[character.thingnum].o.images.default.height * things[character.thingnum].o.images.default.scale);
    }
    update (){
      // if this not an animated sprite, return
      if (!thingmap.get(this.Tid).o.Ganimated) {
        return;
      }
      // are we moving on X axis
      if (this.left != this.left_destination) {
        if (this.left < this.left_destination) {
          this.left+=thingstep;
        }
        else {
          this.left-=thingstep;
        }
      }
      // are we moving on Y axis
      if (this.top != this.top_destination) {
        if (this.top < this.top_destination) {
          this.top+=thingstep;
        }
        else {
          this.top-=thingstep;
        }
      }
      // housekeeping ticks for sprite frames
      this.tickCount += 1;
      if (this.tickCount > thingmap.get(this.Tid).sprite.directions.get(this.heading).ticks) {
        // rotate the ticker(s)
        this.tickCount = 0;
        if (this.frameIndex < thingmap.get(this.Tid).sprite.directions.get(this.heading).framecount - 1) {
          this.frameIndex += 1;
        } 
        else {
          this.frameIndex = 0;
        }
        // some random actions
        if (thingmap.get(this.Tid).o.Gcansleep) {
          if (oneinNchance(2)) {
            if (thingmap.get(this.Tid).o.isasleep) {
              thingmap.get(this.Tid).o.wakenow();
            }
            else {
              thingmap.get(this.Tid).o.sleepnow();
            }
          }
        }
        if (thingmap.get(this.Tid).o.Gcanmove) {
          if (oneinNchance(10)) {
            if (oneinNchance(2)) {
              this.setdestination(
                this.Tid,
                this.left + grandom(screen.width),
                this.top + grandom(screen.height)
              );
            }
            else {
              this.setdestination(
                this.Tid,
                this.left - grandom(screen.width),
                this.top - grandom(screen.height)
              );
            }
          }
        }
        // end of random actions
      }
    
      if (
        thingmap.get(this.Tid).o.Gcanmove &&
        thingmap.get(this.Tid).o.ismoving &&
        (this.left == this.left_destination) &&
        (this.top == this.top_destination)
      ) {
        if (thingmap.get(this.Tid).o.Gcanmove) {
          thingmap.get(this.Tid).o.msaveLocation();
          thingmap.get(this.Tid).o.ismoving = false;
        }
        
      }

    }
    render() {
      if ( (typeof thingmap.get(this.Tid).sprite === 'undefined') ){
        return;
      }
      // for less typing, copy the relevant data to a local variable
      let spritedata=thingmap.get(this.Tid).sprite.directions.get(this.heading);
      try {
        this.context.drawImage(
          spritedata.spritesheet,
          (this.frameIndex * spritedata.w) / spritedata.framecount,
          0,
          spritedata.w / spritedata.framecount,
          spritedata.h,
          this.left,
          this.top,
          (spritedata.w / spritedata.framecount) * spritedata.scale,
          spritedata.h * spritedata.scale
        );
      }
      catch (e) {
        console.log('Render '+this.Tid+' error c488\n'+e);
        thingmap.delete(this.Tid);
//         console.log('WARNING! '+thingmap.get(this.Tid).o.Tname+' '+this.Tid+' removed from World map');
        console.log('WARNING! '+this.Tid+' removed from World map');
      }
      if (thing_selected == this.Tid) {
        ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(
          this.left,
          this.top,
          this.sprite_width,
          this.sprite_height
        );
        ctx.stroke();
      }
    }
    
}


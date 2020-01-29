// function sprite(options) {
//   var character = {};
//   character.Tid = options.Tid;
//   character.Ganimated = options.Ganimated;
//   character.Gcanmove = options.Gcanmove;
//   character.thingnum = options.thingnum;
//   character.left = options.left;
//   character.top = options.top;
//   character.frameIndex = 0;
//   character.tickCount = 0;
//   character.ticksPerFrame = options.ticksPerFrame || 0;
//   character.numberOfFrames = options.numberOfFrames || 1;
//   character.context = canvas.getContext('2d');
//   character.image = options.image;  
//   character.ismoving = 0;
//   character.sprite_width = Math.floor(
//     (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
//   );
//   character.sprite_height = Math.floor(character.height * character.Gscale);
//   character.interact = function() {
//     console.log('*****Interact '+character.Tgenus);
//     if (character.Ginteracts) {
//       switch (character.Tgenus) {
//         case 16 : {
//           console.log('TELEPORT DEVICE');
//           break;
//         }
//         default : {
//           break;
//         }
//       }
//     }
//   };
//   character.directionChange=function(d) {
//     console.log('DC');
//     must change this to respond to parameter d
//     character.sprite_width = Math.floor(
//         (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
//     );
//     character.sprite_height = Math.floor(things[character.thingnum].o.images.default.height * things[character.thingnum].o.images.default.scale);
//   }
//   character.update = function() {
//     if (!character.Ganimated) {
//       return;
//     }
//     if (character.left != character.left_destination) {
//       if (character.left < character.left_destination) {
//         character.left++;
//       } else {
//         character.left--;
//       }
//     }
//     if (character.top != character.top_destination) {
//       if (character.top < character.top_destination) {
//         character.top++;
//       } else {
//         character.top--;
//       }
//     }
//     character.tickCount += 1;
//     if (character.tickCount > character.ticksPerFrame) {
//       reset the TICK counter
//       character.tickCount = 0;
//       If the current frame index is in range
//       if (character.frameIndex < character.numberOfFrames - 1) {
//         increment the frame counter
//         character.frameIndex += 1;
//       } else {
//         rotate the FRAME counter
//         character.frameIndex = 0;
//         if (oneinNchance(10)) {
//           if (isasleep(character)) {
//             wakenow(character);
//           }
//           else {
//             character=sleepnow(character);
//           }
//         } else {
//           if (oneinNchance(10)) {
//             if (oneinNchance(2)) {
//                                       character.ticksPerFrame=character.ticksPerFrame/2;
//               setdestination(
//                 character.thingnum,
//                 character.left + grandom(screen.width),
//                 character.top + grandom(screen.height)
//               );
//             } else {
//               setdestination(
//                 character.thingnum,
//                 character.left - grandom(screen.width),
//                 character.top - grandom(screen.height)
//               );
//             }
//           }
//         }
//       }
//     }
//     try {
//       We've arrived
//       if (
//         character.Gcanmove &&
//         character.ismoving == 1 &&
//         character.left == character.left_destination &&
//         character.top == character.top_destination
//       ) {
//         things[character.thingnum].o.Tx = character.left;
//         things[character.thingnum].o.Ty = character.top;
//         things[character.thingnum].o.Tz = 0;
//         things[character.thingnum].o.Tid = character.Tid;
//         if (
//           isdefined(things[character.thingnum].o.Tx) &&
//           isdefined(things[character.thingnum].o.Ty)
//         ) {
//           things[character.thingnum].o.saveLocation();
//         }
//         character.ismoving = 0;
//       }
//     } catch (e) {}
//   };
// 
//   character.render = function(y) {
//     console.log(things[y].Tid);
//     Draw the animation
//     direction='default';
// 
//     let spritedata=things[y].o.images.default;
// 
//     try {
//         character.context.drawImage(
//         spritedata.spritesheet,
//         (character.frameIndex * spritedata.w) / spritedata.framecount,
//         0,
//         spritedata.w / spritedata.framecount,
//         spritedata.h,
//         character.left,
//         character.top,
//         (spritedata.w / spritedata.framecount) * spritedata.scale,
//         spritedata.h * spritedata.scale
//       );
// 
//     } catch (e) {
//       console.log('error a231\n'+e);
//     }
//     if (thing_selected == y) {
//       ctx = canvas.getContext('2d');
//       ctx.beginPath();
//       ctx.lineWidth = '1';
//       ctx.strokeStyle = 'red';
//       ctx.rect(
//         things[i].left,
//         things[i].top,
//         things[i].spriteW,
//         things[i].spriteH
//       );
//       ctx.stroke();
//     }
//   };
// 
//   return character;
// }

// function setdestination(t, tx, ty) {
//   
//       if (thing_selected < 0) return;
//   console.log('SETTING');
//   console.log('G '+things[t].Tgenus+' M '+things[t].Gcanmove);
//   if (!things[t].Gcanmove) return;
//   if ( (isNaN(things[t].left_destination)) || (isNaN(things[t].top_destination))) {
//     console.log('RETURNING') ;
//     return;
//   }
//   things[t].ismoving = 1;
//   things[t].left_destination = tx - Math.floor(things[t].sprite_width / 2);
//   if (things[t].left_destination < 0) {
//     things[t].left_destination = 0;
//   } else if (things[t].left_destination > canvas.width) {
//     things[t].left_destination = canvas.width;
//   }
//   things[t].top_destination = ty - Math.floor(things[t].sprite_height / 2);
//   if (things[t].top_destination < 0) {
//     things[t].top_destination = 0;
//   } else if (things[t].top_destination > canvas.height) {
//     things[t].top_destination = canvas.height;
//   }
//   console.log("Thing "+t+ " going to ("+things[t].left_destination+","+things[t].top_destination+")");
// }


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
var canvas;
var thing_selected = -1;
var audioenabled = false;
var thingstep = 2;

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
    getState(){
      let url=grassworld_db+'name='+this.name + token();
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
      let url=grassworld_db+'name='+this.name + '&a=ss'+ token();
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
    this.images={
      'default':emptyimage,
      'left':emptyimage,
      'right':emptyimage,
      'up':emptyimage,
      'down':emptyimage,
      'hover':emptyimage
    };
    this.images.default.spritesheet=new Image();
    this.images.left.spritesheet=new Image();
    this.images.right.spritesheet=new Image();
    this.images.up.spritesheet=new Image();
    this.images.down.spritesheet=new Image();
    this.images.hover.spritesheet=new Image();
    this.heading=0; // default
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
      let url=grassworld_db+'t=thing&a=mk&name='+this.name + '&g='+this.Tgenus + token();
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
//     thething.sprite={};
//     thething.sprite.default={};
    thething.sprite.directions=JSON.parse(response);
    thething.sprite.directions.default.spritesheet=new Image();
    thething.sprite.directions.default.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).default.spritesheet;
    thething.sprite.directions.left.spritesheet=new Image();
    thething.sprite.directions.left.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).left.spritesheet;
    thething.sprite.directions.right.spritesheet=new Image();
    thething.sprite.directions.right.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).right.spritesheet;
    thething.sprite.directions.up.spritesheet=new Image();
    thething.sprite.directions.up.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).up.spritesheet;
    thething.sprite.directions.down.spritesheet=new Image();
    thething.sprite.directions.down.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).down.spritesheet;
    thething.sprite.directions.hover.spritesheet=new Image();
    thething.sprite.directions.hover.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).hover.spritesheet;
//     console.log('D3 '+thething.sprite.directions.default.spritesheet.src);
//     thething.sprite.default.spritesheet=new Image();
//     console.log('D2 '+response);
//     thething.sprite.directions.default.spritesheet=grassworld_url+"assets/img/"+thething.sprite.directions.default.spritesheet;
//     console.log('D4 '+ thething.sprite.directions.default.framecount);
//     thething.sprite.rowcount=thething.images.default.rowcount;
//     thething.sprite.w=thething.images.default.w;
//     thething.sprite.h=thething.images.default.h;
//     thething.sprite.scale=thething.images.default.scale;
//     thething.sprite.ticks=thething.images.default.ticks;
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
      let url=grassworld_db+'t=thing&a=sij&Tid='+this.Tid + '&j='+ imagesJSON + token();
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      xhr.open('GET', url);
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
    }
    lsomething() {}
}

class MovingThing extends LivingThing {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus);
    this.legs=legs;
    this.canmove=true;
  }
  msaveLocation() {
      let url=grassworld_db+'t=thing&a=sl&Tid='+this.Tid;
      url += '&Tx='+this.Tx + '&Ty='+this.Ty + '&Tz='+this.Tz;
      url += token();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
        }
        else { 
          console.log("Error c232");
        }
      };
  }
  msavecanmove() {
      let url=grassworld_db+'t=thing&a=cm&tid='+this.Tid;
      for (var c in [this.Tx, this.Ty, this.Tz]) {
      }
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
      let url=grassworld_db+'world='+this.name + '&cat='+cat + token();
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
      // per-sprite
      this.spritesheet= options.spritesheet;
      this.framecount= options.framecount;
      this.rowcount= options.rowcount; // not presently used
      this.w= options.w;
      this.h= options.h;
      this.ticks= options.ticks;
      this.scale= options.scale;
      // this instance
      this.left= options.left;
      this.left_destination= options.left;
      this.top_destination= options.top;
      this.top= options.top;
      this.frameIndex=0;
      this.tickCount=0;
      this.directions={
        'default':emptyimage,
        'left':emptyimage,
        'right':emptyimage,
        'up':emptyimage,
        'down':emptyimage,
        'hover':emptyimage
      };
    }
    get sprite_width(){
      return (this.w / this.framecount)*this.scale;
    }
    get sprite_height(){
      return (this.h / this.rowcount)*this.scale;
    }
    setdestination(t, dx, dy) { // make this static?
      if (!thingmap.get(t).Gcanmove) return;
      if ( (isNaN(thingmap.get(t).sprite.left_destination)) 
        || (isNaN(thingmap.get(t).sprite.top_destination))) {
            console.log('RETURNING') ;
        return;
      }
      thingmap.get(t).ismoving = 1;
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
      if (thingmap.get(t).Ginteracts) {
        switch (thingmap.get(t).Tgenus) {
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
      if (!this.Ganimated) {
        return;
      }
      if (this.left != this.left_destination) {
        if (this.left < this.left_destination) {
          this.left+=thingstep;
        }
        else {
          this.left-=thingstep;
        }
      }
      if (this.top != this.top_destination) {
        if (this.top < this.top_destination) {
          this.top+=thingstep;
        }
        else {
          this.top-=thingstep;
        }
      }
      this.tickCount += 1;
      if (this.tickCount > this.ticks) {
        this.tickCount = 0;
        if (this.frameIndex < this.framecount - 1) {
          this.frameIndex += 1;
        } 
        else {
          this.frameIndex = 0;
        }
//         if (oneinNchance(10)) {
//           if (isasleep(character)) {
//             wakenow(character);
//           }
//           else {
//             character=sleepnow(character);
//           }
//         } 
//         else {
//           if (oneinNchance(10)) {
//             if (oneinNchance(2)) {
//                                       character.ticksPerFrame=character.ticksPerFrame/2;
//               setdestination(
//                 character.thingnum,
//                 this.left + grandom(screen.width),
//                 this.top + grandom(screen.height)
//               );
//             } else {
//               setdestination(
//                 character.thingnum,
//                 this.left - grandom(screen.width),
//                 this.top - grandom(screen.height)
//               );
//             }
//           }
//         }
      }
    
//       if (
//         thingmap.get(this.Tid).Gcanmove &&
//         thingmap.get(this.Tid).ismoving == 1 &&
//         this.left == this.left_destination &&
//         this.top == this.top_destination
//       ) {
//         
//         if (
//           isdefined(thingmap.get(t).Tx) &&
//           isdefined(thingmap.get(t).Ty)
//         ) {
//           thingmap.get(t).o.msaveLocation();
//         }
//         character.ismoving = 0;
//       }

    }
    render() {
      let direction='default';
//       return;
      if ( (typeof thingmap.get(this.Tid).sprite === 'undefined') ){
        console.log('T '+this.Tid);
        return;
      }
      let spritedata=thingmap.get(this.Tid).sprite.directions.default;
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
        console.log('error c488\n'+e);
//         console.log('V '+this.Tid);
//         console.log(spritedata.spritesheet);
//         console.log(spritedata.w);
//         console.log(spritedata.h);
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


//     thething.sprite.directions.set('default',JSON.parse(response).default);
//     thething.sprite.directions.get('default').spritesheet=new Image();
//     thething.sprite.directions.get('default').spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).default.spritesheet;
//     
//     thething.sprite.directions.set('left',JSON.parse(response).left);
//     thething.sprite.directions.get('left').spritesheet=new Image();
//     thething.sprite.directions.get('left').spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).left.spritesheet;
//     
//     thething.sprite.directions.set('default',JSON.parse(response).default);
//     thething.sprite.directions.right.spritesheet=new Image();
//     thething.sprite.directions.right.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).right.spritesheet;
//     
//     thething.sprite.directions.set('default',JSON.parse(response).default);
//     thething.sprite.directions.up.spritesheet=new Image();
//     thething.sprite.directions.up.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).up.spritesheet;
//     
//     thething.sprite.directions.set('default',JSON.parse(response).default);
//     thething.sprite.directions.down.spritesheet=new Image();
//     thething.sprite.directions.down.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).down.spritesheet;
//     
//     thething.sprite.directions.set('hover',JSON.parse(response).hover);
//     thething.sprite.directions.hover.spritesheet=new Image();
//     thething.sprite.directions.hover.spritesheet.src=grassworld_url+"assets/img/"+JSON.parse(response).hover.spritesheet;
//     console.log('D3 '+thething.sprite.directions.default.spritesheet.src);
//     thething.sprite.default.spritesheet=new Image();
//     console.log('D2 '+response);
//     thething.sprite.directions.default.spritesheet=grassworld_url+"assets/img/"+thething.sprite.directions.default.spritesheet;
//     console.log('D4 '+ thething.sprite.directions.default.framecount);
//     thething.sprite.rowcount=thething.images.default.rowcount;
//     thething.sprite.w=thething.images.default.w;
//     thething.sprite.h=thething.images.default.h;
//     thething.sprite.scale=thething.images.default.scale;
//     thething.sprite.ticks=thething.images.default.ticks;

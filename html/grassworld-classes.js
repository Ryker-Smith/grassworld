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
let genus_blueSamurai = 20;
let genus_teleport = 16;
let genus_Leader  = 20;
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
let sillydeletesounds=['cri-d-effroi-scream.wav','Ouche.wav','scream4.wav','scream6.wav','screamwhat.wav',
'shockperson.wav'];
var grassworld_url="https://grassworld.fachtnaroe.net/";
var grassworld_db=grassworld_url+"DB/?";
var grassworld_url_img=grassworld_url+"assets/img/";
var grassworld_url_audio=grassworld_url+"assets/audio/";
var canvas;
var thing_selected = -1;
var thing_designated = -1;
var audioenabled = false;
var thingstep = 1;
var world_speed_multiplier=5;
var explode=emptyimage;
explode={
        "spritesheet" : "explosions-20-t1.png",
        "framecount" : 20,
        "rowcount" : 1,
        "w" : 200,
        "h" : 200,
        "ticks" : 5,
        "scale" : .2  
};
function token() {
  return '&TK=a1b2c3d4';
}
function grandom(upper){
  return Math.floor(Math.random() * upper) + 1;
}
function grandomrange(upper){
  let r= Math.floor(Math.random() * upper) + 1;
  let c= Math.floor(Math.random() * upper) + 1;
  if ((c % 2) == 0) {
    r *= -1; 
  }
  return r;
}
function oneinNchance(N){
  if (grandom(N)%N==0) {
    return true;
  }
  else {
    return false; 
  }
}
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
function imagewithfullpath(img) {
  return grassworld_url_img + img;
}
function imageremovepath(img) {
  // untested
  return img.substring(img.lastIndexOf('/'), img.length-1);
}
class Yoke {
    constructor(parent, name){
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
        document.getElementById(p).innerHTML=h;
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
    this.Tkeypressfunc=escape("console.log('hello world');"); // for testing only
    this.tkeypress=function(){};
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
          try {
            postloadfunc(JSON.parse(xhr.response));  
            console.log(xhr.response);
          }
          catch(e){}
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
    
    for (const d of activities) {
      try {
        thething.sprite.directions.set(d,JSON.parse(response)[d]);
        thething.sprite.directions.get(d).spritesheet=new Image();
        thething.sprite.directions.get(d).spritesheet.src=imagewithfullpath(JSON.parse(response)[d].spritesheet);
        thething.sprite.directions.get(d).ticks=Math.floor(thething.sprite.directions.get(d).ticks/world_speed_multiplier);
      }
      catch(e){}
    }
    thingmap.get(thething.Tid).ready--;
  };
  tgetimages(thething) {
      let url=grassworld_db+'t=thing&a=gij&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
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
          Thing.tplfimages(JSON.parse(r).GimagesJSON, thething);
        }
        else { 
          console.log(xhr.response);
          console.log('Error c187');
        }
      };
    }
  static tplfget(response, thething){
    // DO NOT CHANGE THIS, OR ANYTHING LEADING TO OR FROM THIS
    // I made very heavy going of this, so it's best to NOT NOT NOT
    // change anything here until 
    console.log(response.Tname);
    this.Tx=response.Tx;
    this.Ty=response.Ty;
    this.Tz=response.Tz;
    this.Gcanmove=(response.Gcanmove == 1);
    this.Ganimated=(response.Ganimated == 1);
    //this.keypress=;
    Thing.tplfimages(response.GimagesJSON, thething);
  };

  tget(thething) {
    let url=grassworld_db+'t=thing&a=get&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          Thing.tplfget(JSON.parse(r), thething);
        }
        else { 
          console.log(xhr.response);
          console.log('Error c187');
        }
      };
  }

  square_get(thething) {
      let url=grassworld_db+'t=square&a=get&='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          Thing.tplfget(JSON.parse(r), thething);
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
    tdelete(af){
      if (thingmap.get(this.Tid).sprite.audioenabled) {
        var audio;
        if (isdefined(af)){
          audio = new Audio(grassworld_url_audio+af);
        }
        else {
          audio = new Audio(grassworld_url_audio+'Ouche.wav');
        }
        audio.play(); 
      }
      let url=grassworld_db+'t=thing&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
        }
        else { 
          console.log(xhr.response);
          console.log('Error c335');
        }
      };
    }
    tkeypress(keycode){}
    gkeypress(keycode){}
//     tsavekeys(){
//       let url=grassworld_db+'t=thing&a=upd&Tid='+this.Tid + token();
//       let xhr = new XMLHttpRequest();
//       let message= JSON.stringify({});
//     }
    tput(plf) {
      // not finished
      // uses optional post-load-function called plf
      let url=grassworld_db+'t=thing&a=upd&Tid='+this.Tid + token();
      let xhr = new XMLHttpRequest();
      let message= JSON.stringify({
          TK : 'a1b2c3d4',
          Tid : this.Tid,
          Tname : this.name,
          Tcreator : this.Tcreator,
          Tstatus : this.Tstatus,
          Tcontent : this.Tcontent,
          Tgenus : this.Tgenus,
          Tx :  this.Tx,
          Ty : this.Ty,
          Tz : 0,
          Tteam : this.Tteam,
          Tkeypressfunc: escape(this.o.tkeypress)
      });
      xhr.open('PUT', url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(message);
      xhr.onload = function() {
        if (xhr.status == 200) { 
          if (isdefined(plf)) {
            plf(JSON.parse(xhr.response));
          }
        }
        else { 
            console.log('Error c358: '+xhr.response);
        }
      };
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
      thingmap.get(this.Tid).o.ismoving=false;
      thingmap.get(this.Tid).sprite.left_destination=thingmap.get(this.Tid).sprite.left;
      thingmap.get(this.Tid).sprite.top_destination=thingmap.get(this.Tid).sprite.top;
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
//       console.log('SK '+thingmap.get(this.Tid).o.tkeypress);
      url += '&Tx='+this.Tx + '&Ty='+this.Ty + '&Tz='+this.Tz;
      url += token();
      let myTid=this.Tid;
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
      this.audioenabled=false;
      this.tempticks=0;
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
    get imagesJSON() {
      // NOT completed
      let t='{';
      let j=this.directions;

      for (const d of activities) {
        t+= '"'+d+'":'
        if (j.get(d) == 'spritesheet') {
          t+= 'spr';
        }
        else {
          t+= JSON.stringify(j.get(d));
        }
        t+= ',';
      }
      t += '}';
      console.log('J '+t);
      return t;
    }
    setdestination(t, dx, dy) { // make this static?
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
    }
    interact(){
      if (thingmap.get(this.Tid).o.Ginteracts) {
        switch (thingmap.get(this.Tid).o.Tgenus) {
          case genus_teleport : { // the teleport device
              let somearbitraryvalue=51;
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
          default : {
            break;
          }
        }
      }
    }
    static pffft(Tid) {
      // unfinished
      // delete/explode the character
      console.log('OUT');
      thingmap.get( thingmap.get(Tid).o.tdelete('shockperson.wav') );
      console.log('pffft: '+Tid);
      thingmap.delete(Tid);
    }
    directionChange() {
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
        if ((thingmap.get(this.Tid).o.Gcansleep) && (!thingmap.get(this.Tid).ismoving)){
          if (oneinNchance(20)) {
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
              this.heading='right';
            }
            else {
              this.setdestination(
                this.Tid,
                this.left - grandom(screen.width),
                this.top - grandom(screen.height)
              );
              this.heading='left';
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
    showid(ctx, l, t, w, h) {
      let msgh=14;
      ctx.font = msgh+'px Arial';
      // +thingmap.get(this.Tid).Tname
      let msg=thingmap.get(this.Tid).Tname;
      let msgw=Math.floor(ctx.measureText(msg).width /2);
      let tl=Math.floor(l + w/2 - msgw);
      let tt=(t+h+10);
      ctx.fillStyle = '#1b496d';
      ctx.fillRect(tl-2, tt-12, (msgw*2)+4, msgh+2);
      ctx.fillStyle = 'white';
      ctx.fillText(msg, tl, tt);
      ctx.stroke();
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
        console.log(key+' '+spritedata.spritesheet);
        console.log('WARNING! '+this.Tid+' removed from World map');
      }
      if (thing_selected == this.Tid) {
        ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(
          this.left,
          this.top,
          this.sprite_width,
          this.sprite_height
        );
        ctx.stroke();
        this.showid(canvas.getContext('2d'), this.left, this.top, this.sprite_width, this.sprite_height);
      }
    }
}

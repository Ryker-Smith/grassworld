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
let genus_Schplágen_f0 = 0;
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
            return 'Error 16';
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
        if (xhr.status == 200) { // OK?
          Yoke.parentUpdate(myparent, xhr.response); 
        }
        else { 
          Yoke.parentUpdate(myparent, 'Error 60');
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
//     this.images.default=emptyimage;
//     this.images.left={};
//     this.images.right={};
//     this.images.up={};
//     this.images.down={};
//         "spritesheet" : "",
//         "framecount" : 0,
//         "rowcount" : 0,
//         "w" : 0,
//         "h" : 0,
//         "ticks" : 0,
//         "scale" : 0
//       };
    this.heading=0; // default
  }
  tgenuschange(plf) {
    // should change the genus in the instantiated object first, then call this function
    // otherwise the genuschange is not saved
      let url=grassworld_db+'t=thing&a=gc&Tid='+this.Tid + '&ng='+this.Tgenus + token();
      console.log(url)
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (!(undefined == plf)) {
          if (xhr.status == 200) {
            plf(JSON.parse(xhr.response));
          }
          else { 
            plf('Error 64');
          }
        }
      };
  }
  tcreate(postloadfunc) {
      let url=grassworld_db+'t=thing&a=mk&name='+this.name + '&g='+this.Tgenus + token();
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      console.log(url);
      xhr.open('POST', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) { // OK?
          postloadfunc(JSON.parse(xhr.response));          
        }
        else { 
          postloadfunc('Error 64');
        }
      };
    }
  static tplfimages(response, thething){
    console.log('>> TPLF images '+response);
//     console.log('E '+typeof(response));
//     console.log('F '+Object.keys(response));
//     console.log('G '+Object.entries(response));
//     response=response.replace(/\\"/g,'"');
//     response=response.replace(/\[/g,'');
//     response=response.replace(/\]/g,'');
//     response=response.replace(/\"{/g,'{');
//     console.log('H '+response);
//     ;
//     for (var j in [i]){
//       console.log(i);
//     }
//     for (const key of Object.keys(response)) {
//       console.log('K: '+key)
//     }
    const keys = Object.keys(emptyimage);
    for (const key of keys) {
      console.log('K2: '+key)
      console.log(`${emptyimage.key}`);
    }
    response=JSON.parse(response.GimagesJSON);
    console.log('CC: '+response.default.spritesheet);
    thething.default=response.default;
    thething.left=response.feck;
    thething.hover=response.hover;
//     response=response.toString()
    console.log('DD: '+thething.Tid+' '+thething.default.spritesheet);
    //GimagesJSON
  };
  tgetimages(thething) {
      let url=grassworld_db+'t=thing&a=gij&Tid='+this.Tid + token();
      console.log('GETIMAGES '+url);
      let xhr = new XMLHttpRequest();
      // the next function to develop should be for: ('POST',url)
      xhr.open('GET', url);
      xhr.send();
      console.log('B: '+thething.o.Tid);
      xhr.onload = function() {
        if (xhr.status == 200) {
          let r=xhr.response;
          // there's probably a very good reason (that I don't know about)
          // why node is adding [ ... ] to the response, but I don't wan't them
          // so I'm getting rid of [ ]
          r=r.replace(/\[/g,'');
          r=r.replace(/\]/g,'');
          Thing.tplfimages(JSON.parse(r), thething);
        }
        else { 
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
          plf('Error 64');
        }
      };
    }
}

class LivingThing extends Thing {
    constructor (parent, name, content, genus) {
      super (parent, name, content, genus);
      this.living=true;
      this.currentState='';
    }
}

class MovingThing extends LivingThing {
  constructor (parent, name, content, genus, legs) {
    super (parent, name, content, genus);
    this.legs=legs;
    this.canmove=true;
  }
  saveLocation() {
      let url=grassworld_db+'t=thing&a=sl&Tid='+this.Tid;
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
          console.log("Error 78");
        }
      };
  }
  savecanmove() {
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
          console.log("Location update OK"); 
        }
        else { 
          console.log("Error 78");
        }
      };
    }
  changespritebasedondestination() {
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
        if (xhr.status == 200) {
          data=JSON.parse(xhr.response);
          self.populateArray(cat, data);          
        }
        else { 
          Yoke.parentUpdate(myparent, 'Error 79');
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
      
      this.character=thisguy;
    }

}

// [{"GimagesJSON":"'{\"spriteset\": {\"default\" : {\"spritesheet\":\"teleport01.png\", \"framecount\":\"9\", \"rowcount\":\"1\", \"w\":\"1800\",\"h\":\"200\",\"ticks\":\"20\",\"scale\":\"0.3\"},\"move_left\" : {\"spritesheet\":\"\", \"framecount\":\"\", \"rowcount\":\"1\", \"w\":\"\",\"h\":\"\",\"ticks\":\"\",\"scale\":\"\"},\"move_right\": {\"spritesheet\":\"\", \"framecount\":\"\", \"rowcount\":\"1\", \"w\":\"\",\"h\":\"\",\"ticks\":\"\",\"scale\":\"\"},\"move_up\": {\"spritesheet\":\"\", \"framecount\":\"\", \"rowcount\":\"1\", \"w\":\"\",\"h\":\"\",\"ticks\":\"\",\"scale\":\"\"},\"move_down\":{ \"spritesheet\":\"\", \"framecount\":\"\", \"rowcount\":\"1\", \"w\":\"\",\"h\":\"\",\"ticks\":\"\",\"scale\":\"\"},\"move_hover\" : {\"spritesheet\":\"someanimal_hovering.png\",\"framecount\":\"8\", \"rowcount\":\"1\", \"w\":\"1600\",\"h\":\"200\",\"ticks\":\"25\",\"scale\":\".2\"}}}'"}]

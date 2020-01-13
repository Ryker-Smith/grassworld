class Yoke {
    constructor(parent, name){
      this.parent=parent;
      this.name=name;
      this.Tid=undefined;
    }
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
  constructor(parent, name, content) {
    super(parent, name);
    this.content=content;
    this.X=undefined;
    this.Y=undefined;
    this.Z=undefined;
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
      let url=grassworld_db+'a=sl&tid='+this.Tid;
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
          console.log("Location update: "+ xhr.response); 
        }
      };
    }
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

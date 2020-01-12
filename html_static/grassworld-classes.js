class Yoke {
    constructor(parent, name){
      console.log(parent);
      this.parent=parent;
      this.name=name;
    }
    static parentUpdate(p, h) {
      console.log("P "+p);
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
}

class Thing extends Yoke {
  constructor(parent, name, content) {
    super(parent, name);
    this.content=content;
  }
}

class Livingthing extends Thing {
    constructor (parent, name, content) {
      super (parent, name, content);
      this.living=true;
    }
}

class Movingthing extends Livingthing {
  constructor (parent, name, content, legs) {
    super (parent, name, content);
    this.legs=legs;
  }
}

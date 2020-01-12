class Yoke {
    constructor(parent, name){
      console.log(parent);
      this.parent=parent;
      this.name=name;
    }
    static parentUpdate(p, h) {
      console.log("PUp "+p);
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

class World extends Thing {
  constructor (parent, name, content) {
    super(parent, name, content);
    this.flora=[];
    this.fauna=[];
    this.objects=[];
  }
  populateArray(cat, data) {
    console.log('POPULATING '+cat+' WITH: '+data);
    console.log(data.length);
    switch (cat) {
      case 'flora':
            // empty the array first
            this.flora=[];
            for (var m=0; m<data.length;m++) {
              this.flora.push(data);
            }
            break;
      case 'fauna': 
            this.fauna=[];
            for (var m=0; m<data.length;m++) {
              this.fauna.push(data[m]);
              console.log('Adding: '+data[m].Tname);
            }
            break;
      case 'objects': 
            this.objects=[];
            for (var m=0; m<data.length;m++) {
              this.objects.push(data[m]);
              console.log('Adding: '+data[m].Tname);
            }
            break;
      default: break;
    }
  }
  getCategory(cat,me){
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
          console.log(xhr.response); 
          data=JSON.parse(xhr.response);
          for (var i=0; i<data.length; i++) {
            console.log("GOT: "+i+" "+data[i].Tname);
          }
          me.populateArray(cat, data);
        }
      };
      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          Yoke.parentUpdate(myparent, 'Error 87');
        }
        else {
          Yoke.parentUpdate(myparent, xhr.response);
        }
      };
      xhr.onerror = function() {
        Yoke.parentUpdate(myparent, 'Error 94');
      };
    };
}

/*
        function listAllProperties(o) {
          var objectToInspect;     
          var result = [];
	
          for(objectToInspect = o; objectToInspect !== null; 
            objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
            result = result.concat(
              Object.getOwnPropertyNames(objectToInspect)
            );  
          }
	
      return result; 
      }*/

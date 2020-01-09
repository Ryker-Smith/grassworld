/* Based on ideas, research, code samples, etc from (among others):
 * William Malone (www.williammalone.com)
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 *	http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT
 * http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
 * https://javascript.info/xmlhttprequest
 */

function token() {
  return '&tk=a1b2c3d4';
}
function parentUpdate(p, h) {
  console.log("P "+p);
       document.getElementById(p).innerHTML=h;
       console.log(h);
}
grassworld_db="https://grassworld.fachtnaroe.net/db/?";

class Yoke {
    constructor(parent, name){
      this.parent=parent;
      this.name=name;
      this.url=grassworld_db+'name='+name + token();
      console.log(this.url);
    }
}

class Thing extends Yoke {
  constructor(parent, name, content) {
    super(parent, name);
//     this.name=name;
    this.content=content;
    
  }

  set content(url){
      //url=grassworld_db+'name='+obj.name + token();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      console.log("sent "+this.url);
      xhr.onload = function() {
        console.log("A "+xhr.status);
        console.log("D "+this.name);
        if (xhr.status != 200) { // OK?
          console.log("B "+this.name);
          parentUpdate(this.name, 'Error 60');
        }
        else { 
          console.log("C "+this.name);
          parentUpdate(this.name, xhr.response); 
        }
      };
//       xhr.onprogress = function(event) {
//         if (event.lengthComputable) {
//           parentUpdate(this.name, 'Error 68');
//         }
//         else {
//           parentUpdate(this.name, xhr.response);
//         }
// 
//       };
      xhr.onerror = function() {
        parentUpdate(this.name, "error");
      };
    };
}

(function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame =
        function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}()); 


grassworld();
/*
function thing(parent, name) {
  const obj={};
  obj.name=name;
  obj.parent=parent;
  obj.parentUpdate=(function(h) {
      document.getElementById(parent).innerHTML=h;
    });
  obj.data='';
  obj.getState=
    function(){
      url=grassworld_db+'name='+obj.name + token();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          obj.parentUpdate('Error 60');
        }
        else { 
          obj.parentUpdate(xhr.response); 
        }
      };
      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          obj.parentUpdate('Error 68');
        }
        else {
          obj.parentUpdate(xhr.response);
        }

      };
      xhr.onerror = function() {
        obj.parentUpdate("error");
      };
    };
  obj.save=
    function(){
      url=grassworld_db+'&act=put&Tname='+obj.name+obj.data;
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) { // OK?
          obj.parentUpdate(`Error ${xhr.status}: ${xhr.statusText}`);
        }
        else { 
          obj.parentUpdate(`${xhr.response}`); 
        }
      };
      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          obj.parentUpdate(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
          obj.parentUpdate(`Received ${event.loaded} bytes`);
        }

      };
      xhr.onerror = function() {
        obj.parentUpdate("error");
      };
    };
  return obj;
}*/

function grassworld() {
  let field=new Thing('grassworld-body','grassworld','');
//   field.getState();
}


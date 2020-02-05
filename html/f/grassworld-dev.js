/* Based on ideas, research, code samples, etc from (among others):
 * William Malone (www.williammalone.com)
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT
 * http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
 * https://javascript.info/xmlhttprequest
 */

var field;
let thingmap= new Map();

function token() {
  return '&tk=a1b2c3d4';
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function distance (p1, p2) {
	var
      dx = p2.left - p1.left,
      dy = p2.top - p1.top;
  return Math.floor(Math.sqrt(dx * dx + dy * dy));
}
isdefined=function (thing){
  var r = true;
  if (typeof thing === 'undefined') {
    r=false;
  }
  return r;
}
isundefined=function (thing){
  var r = false;
  if (typeof thing === 'undefined') {
    r=true;
  }
  return r;
}

(function() {
    // This function (c) 2013 William Malone (www.williammalone.com)
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
            var id = window.setTimeout(
                        function() { callback(currTime + timeToCall); }, 
                        timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}()); 

function grassworld_dev() {
  var si = new ScriptItem(null, 'first', 'console.log("Hello world")');
  console.log(si.id)
  si.SIdisplay();
  si.SIcreate();
  // solely to practice with promises...
  si.SIwrite();
}

grassworld_dev();

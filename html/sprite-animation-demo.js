// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
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

(function () {
			
	var animal,
		animalImage,
		canvas;					
  var theblob, theblobImage;
  var plant, plantImage;    

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);
    // clean up the display 
    ctx=canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // now do the characters
	  animal.update();
	  animal.render();
    theblob.update();
    theblob.render();
    plant.render();
	}
	
	function newlocation(event) {
    theblob.left_destination= event.clientX  - Math.floor(theblob.sprite_width/2);
    theblob.top_destination= event.clientY - Math.floor(theblob.sprite_height/2);
  }
  
  function locationchange(event) {
    switch (event.keyCode) {
      case 65: animal.left--;
    }
    animal.left--;
  }
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0;
			that.numberOfFrames = options.numberOfFrames || 1;
		
      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      that.scale=options.scale;
      that.left=options.left;
      that.left_destination = that.left;
      that.top=options.top;
      that.top_destination=that.top;
      that.sprite_width=Math.floor((that.width/that.numberOfFrames)* that.scale);
      that.sprite_height=Math.floor(that.height*that.scale);
		
		that.update = function () {

            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                // If the current frame index is in range
                if (frameIndex < that.numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
      // that.context.clearRect(0, 0, that.width, that.height);
		  if (that.left != that.left_destination) {
          if (that.left < that.left_destination) {
            that.left++;
          }
          else {
            that.left--;
          }
      }
      if (that.top != that.top_destination) {
          if (that.top < that.top_destination) {
            that.top++;
          }
          else {
            that.top--;
          }
      }
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / that.numberOfFrames,
		    0,
		    that.width / that.numberOfFrames,
		    that.height,
		    that.left,
		    that.top,
		    (that.width / that.numberOfFrames)* that.scale,
		    (that.height)*that.scale
      );
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("animalAnimation");
	canvas.width = screen.width;
	canvas.height = 600;
//   var ctx=canvas.getContext("2d");
//   ctx.fillStyle = "green";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// Create sprite sheet
	animalImage = new Image();	
  theblobImage = new Image();
  plantImage = new Image();	
	
	// Create sprite
	animal = sprite({
		context: canvas.getContext("2d"),
		width: 2122,
		height: 320,
		image: animalImage,
		numberOfFrames: 8,
		ticksPerFrame: 20,
		left: 100,
    top: 10,
    scale: .25,
    usable_width: 0
	});
  theblob = sprite({
		context: canvas.getContext("2d"),
		width: 2122,
		height: 320,
		image: theblobImage,
		numberOfFrames: 8,
		ticksPerFrame: 15,
    left: 20,
    top: 20,
    scale: .2
	});

  plant = sprite({
		context: canvas.getContext("2d"),
		width: 677,
		height: 692,
		image: plantImage,
		numberOfFrames: 1,
		ticksPerFrame: 15,
    left: 200,
    top: 50,
    scale: 1
	});
	// Load sprite sheet
	animalImage.addEventListener("load", gameLoop);
//   animalImage.addEventListener("click", newlocation);
	animalImage.src = "anmhithe02-positioned.png";
  theblobImage.addEventListener("load", gameLoop);
	theblobImage.src = "anmhithe02-positioned.png";
  plantImage.addEventListener("load", gameLoop);
	plantImage.src = "plant01.png";
  canvas.addEventListener("keypress",locationchange,true);
  canvas.addEventListener("click",newlocation);
  
} ());

// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

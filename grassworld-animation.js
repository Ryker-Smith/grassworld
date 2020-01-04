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
  var clickCount=0;
  var thing_selected=-1;
  var things=[];

	function gameLoop () {
	  window.requestAnimationFrame(gameLoop);
    // clean up the display 
    ctx=canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // now do the characters
    for (i=0; i< things.length; i++) {
      things[i].update(i);
      things[i].render(i);
    }

	}
	
	function movelocation(event) {
    if (thing_selected < 0) return;
    things[thing_selected].left_destination= event.clientX  - Math.floor(things[thing_selected].sprite_width/2);
    if (things[thing_selected].left_destination < 0) {
      things[thing_selected].left_destination=0;
    }
    else if (things[thing_selected].left_destination > canvas.width) {
      things[thing_selected].left_destination=canvas.width;
    }
    things[thing_selected].top_destination= event.clientY - Math.floor(things[thing_selected].sprite_height/2);
    if (things[thing_selected].top_destination < 0) {
      things[thing_selected].top_destination=0;
    }
    else if (things[thing_selected].top_destination > canvas.height) {
      things[thing_selected].top_destination=canvas.height;
    }
//     console.log("Going to (",things[thing_selected].left_destination,",",things[thing_selected].top_destination,")");
  }

  function me_selected(event) {
  }
  
  function locationchange(event) {
    var key_left=37,
        key_up=38,
        key_right=39,
        key_down=40;
        step=5;
        if (thing_selected < 0) return;
    switch (event.keyCode) {
      case key_left: 
        if (things[thing_selected].left > 0) {
          things[thing_selected].left_destination=things[thing_selected].left-step;
        }
        break;
      case key_right: 
        if (things[thing_selected].left < (canvas.width-things[thing_selected].sprite_width)) {
          things[thing_selected].left_destination=things[thing_selected].left+step;
        }
        break;
      case key_up: 
        if (things[thing_selected].top > 0) {
          things[thing_selected].top_destination=things[thing_selected].top-step;
        }
        break;
      case key_down: 
        if (things[thing_selected].top < (canvas.height-things[thing_selected].sprite_height)) {
          things[thing_selected].top_destination=things[thing_selected].top+step;
        }
        break;
      default: 
          console.log("Unknown: " + event.keyCode);
    }
  }
		function getElementPosition (element) {
	
       var parentOffset,
       	   pos = {
               left: element.offsetLeft,
               top: element.offsetTop 
           };
           
       if (element.offsetParent) {
           parentOffset = getElementPosition(element.offsetParent);
           pos.left += parentOffset.left;
           pos.top += parentOffset.top;
       }
       return pos;
    }
	
	function distance (p1, p2) {
		var
      dx = p2.left - p1.left,
      dy = p2.top - p1.top;
		return Math.floor(Math.sqrt(dx * dx + dy * dy));
	}
	
	function selection (event) {
		var 
      i,
			location = {},
			dist;
			
			pos = getElementPosition(canvas),
			tapX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX,
			tapY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;

		location.left = (tapX - pos.left) * canvasScaleRatio;
		location.top = (tapY - pos.top) * canvasScaleRatio;
			
    var matched=0;
		for (i = 0; i < things.length; i += 1) {
			// Distance between user screen tap and thing
			dist = distance({
          left: (things[i].left + (things[i].sprite_width)/2),
          top: (things[i].top + (things[i].sprite_height)/2)
        }, {
          left: location.left,
          top: location.top
        });
			
			// Check for tap on the thing
			if (dist < things[i].sprite_width) {
        if (thing_selected == i) {
          thing_selected=-1;
          matched=1;
        }
        else {
          thing_selected=i;
          matched=1;
        }
			}
			else {
        if ( !(thing_selected < 0)) {
          movelocation(event);
        }
      }
		}
		
	}

	function sprite (options) {
	
		var that = {};
			that.frameIndex = 0;
			that.tickCount = 0;
			that.ticksPerFrame = options.ticksPerFrame || 0;
			that.numberOfFrames = options.numberOfFrames || 1;
		
      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      that.name = options.name;
      that.scale=options.scale;
      that.left=options.left;
      that.left_destination = that.left;
      that.top=options.top;
      that.top_destination=that.top;
      that.canmove=options.canmove;
      that.sprite_width=Math.floor((that.width/that.numberOfFrames)* that.scale);
      that.sprite_height=Math.floor(that.height*that.scale);
		
      that.update = function () {
            if (!that.canmove) return;
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
            that.tickCount += 1;
            if (that.tickCount > that.ticksPerFrame) {
                that.tickCount = 0;
                // If the current frame index is in range
                if (that.frameIndex < that.numberOfFrames - 1) {	
                    // Go to the next frame
                    that.frameIndex += 1;
                } else {
                    that.frameIndex = 0;
                }
            }
        };
		
		that.render = function (y) {
		
		  // Clear the canvas
      // that.context.clearRect(0, 0, that.width, that.height);
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    that.frameIndex * that.width / that.numberOfFrames,
		    0,
		    that.width / that.numberOfFrames,
		    that.height,
		    that.left,
		    that.top,
		    (that.width / that.numberOfFrames)* that.scale,
		    (that.height)*that.scale
      );
      if (thing_selected == y) {
          ctx=canvas.getContext("2d");
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = "red";
          ctx.rect(things[i].left,things[i].top,things[i].sprite_width,things[i].sprite_height);
          ctx.stroke(); 
      }
		};
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("grassworld");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	animalImage = new Image();	
  plantImage = new Image();	
	
	// Create sprite
// 	things[0] = sprite({
// 		context: canvas.getContext("2d"),
// 		width: 2122,
// 		height: 320,
// 		image: animalImage,
// 		numberOfFrames: 8,
// 		ticksPerFrame: 20,
// 		left: 100,
//     top: 10,
//     scale: .25,
//     usable_width: 0,
//     name: "BigBlob",
//     canmove: true
// 	});
//   things[1] = sprite({
// 		context: canvas.getContext("2d"),
// 		width: 2122,
// 		height: 320,
// 		image: animalImage,
// 		numberOfFrames: 8,
// 		ticksPerFrame: 15,
//     left: 500,
//     top: 250,
//     scale: .25,
//     name: "LittlerBlob",
//     canmove: true
// 	});



  for (j=0;j<10;j++) {
      things[j] = sprite({
        context: canvas.getContext("2d"),
        width: 27,
        height: 42,
        image: plantImage,
        numberOfFrames: 1,
        ticksPerFrame: 15,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
        scale: 1.9,
        name: "Plant",
        canmove: false
      });
  }
  for (j=10;j<15;j++) {
      things[j] = sprite({
        context: canvas.getContext("2d"),
        width: 2122,
        height: 320,
        image: animalImage,
        numberOfFrames: 8,
        ticksPerFrame: 15,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
        scale: .25,
        name: "Blob",
        canmove: true
    });
  }
  // Load sprite sheet
	animalImage.addEventListener("load", gameLoop);
	animalImage.src = "anmhithe02-positioned.png";
  plantImage.addEventListener("load", gameLoop);
	plantImage.src = "plant02.png";
  document.addEventListener("keydown",locationchange);
//   canvas.addEventListener("touchstart",selection);
  canvas.addEventListener("mousedown",selection);

  //canvas.addEventListener("contextmenu",selection); //right click
  
  
} ());

// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

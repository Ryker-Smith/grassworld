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
 
function game(game_canvas) {
			
	var animal,
      animalImage,
      canvas;
  var clickCount=0;
  var thing_selected=-1;
  var things=[];

	function gameLoop () {
	  window.requestAnimationFrame(gameLoop);
    // clear the field 
    ctx=canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // display game entities on field
    for (i=0; i< things.length; i++) {
      // any movement calculations
      things[i].update(i);
      // display the changed character
      things[i].render(i);
    }
	}
	
	function movelocation(tx, ty) {
    if (thing_selected < 0) return;
    things[thing_selected].left_destination= tx  - Math.floor(things[thing_selected].sprite_width/2);
    if (things[thing_selected].left_destination < 0) {
      things[thing_selected].left_destination=0;
    }
    else if (things[thing_selected].left_destination > canvas.width) {
      things[thing_selected].left_destination=canvas.width;
    }
    things[thing_selected].top_destination= ty - Math.floor(things[thing_selected].sprite_height/2);
    if (things[thing_selected].top_destination < 0) {
      things[thing_selected].top_destination=0;
    }
    else if (things[thing_selected].top_destination > canvas.height) {
      things[thing_selected].top_destination=canvas.height;
    }
//     console.log("Going to (",things[thing_selected].left_destination,",",things[thing_selected].top_destination,")");
  }
  
  function keypress(event) {
    console.log(arguments.callee.name);
    var key_left=37,
        key_up=38,
        key_right=39,
        key_down=40,
        ESC=27;
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
      case ESC: 
        if (things[thing_selected].top < (canvas.height-things[thing_selected].sprite_height)) {
          things[thing_selected].selected=false;
          thing_selected=-1;
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
	
	function leftclick (event) {
    if(event.which != 1) return;
//     console.log(event.which);
    console.log(arguments.callee.name);
    event.preventDefault();
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
//     console.log("("+location.left+","+location.top+")");	
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
		}
	}
	
	function hoverinfo (event) {
    // intended to provide information about the character when we hover
    console.log(arguments.callee.name);
    event.preventDefault();
		var 
      i,
			location = {},
			dist;
			
			pos = getElementPosition(canvas),
			hoverX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX,
			hoverY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;

		location.left = (hoverX - pos.left) * canvasScaleRatio;
		location.top = (hoverY - pos.top) * canvasScaleRatio;
//     console.log("HOVER ("+location.left+","+location.top+")");	
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
		}
	}
	
	function rightclick (event) {
    console.log(arguments.callee.name);
    event.preventDefault();
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
// 		console.log("("+location.left+","+location.top+")");	
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
        if ( !(thing_selected < 0)) {
          movelocation(location.left,location.top);
        }
		}
	}
	
  function wheel (event) {
    console.log(arguments.callee.name);
    delta = event.wheelDelta / 60;
//     console.log(delta);
    if (delta > 0) {
      // up
      console.log('up');
    }
    else if (delta < 0) {
      // down
      console.log('down');
    }
  }

function sprite (options) {
	
      var character = {};
			character.frameIndex = 0;
			character.tickCount = 0;
			character.ticksPerFrame = options.ticksPerFrame || 0;
			character.numberOfFrames = options.numberOfFrames || 1;
      character.context = options.context;
      character.width = options.width;
      character.height = options.height;
      character.image = options.image;
      character.name = options.name;
      character.scale=options.scale;
      character.left=options.left;
      character.left_destination = character.left;
      character.top=options.top;
      character.top_destination=character.top;
      character.canmove=options.canmove;
      character.sprite_width=Math.floor((character.width/character.numberOfFrames)* character.scale);
      character.sprite_height=Math.floor(character.height*character.scale);
      
      character.update = function () {
            if (!character.canmove) return;
            if (character.left != character.left_destination) {
                if (character.left < character.left_destination) {
                  character.left++;
                }
                else {
                  character.left--;
                }
            }
            if (character.top != character.top_destination) {
                if (character.top < character.top_destination) {
                  character.top++;
                }
                else {
                  character.top--;
                }
            }
            character.tickCount += 1;
            if (character.tickCount > character.ticksPerFrame) {
                character.tickCount = 0;
                // If the current frame index is in range
                if (character.frameIndex < character.numberOfFrames - 1) {	
                    // Go to the next frame
                    character.frameIndex += 1;
                } else {
                    character.frameIndex = 0;
                }
            }
            // We've arrived
             if ((character.left == character.left_destination) && (character.top == character.top_destination)) {
//                console.log('arrival');
             }
        };
		
		character.render = function (y) {
		  // Clear the canvas
      // character.context.clearRect(0, 0, character.width, character.height);
		  // Draw the animation
      try {
		  character.context.drawImage(
		    character.image,
		    character.frameIndex * character.width / character.numberOfFrames,
		    0,
		    character.width / character.numberOfFrames,
		    character.height,
		    character.left,
		    character.top,
		    (character.width / character.numberOfFrames)* character.scale,
		    (character.height)*character.scale
      );
      }
      catch (e) {
        console.log(e);
      }
      if (thing_selected == y) {
          ctx=canvas.getContext("2d");
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = "red";
          ctx.rect(things[i].left,things[i].top,things[i].sprite_width,things[i].sprite_height);
          ctx.stroke(); 
      }
		};
		return character;
	}
	
	// Get canvas
	canvas = document.getElementById(game_canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
// 	animalImage = new Image();	
//   plantImage = new Image();
  // Load sprite sheets
// 	animalImage.src = "assets/img/anmhithe02-positioned.png";
// 	plantImage.src = "assets/img/plant02.png";
  count=0;
  for (j=0;j<field.flora.length;j++) {
//     console.log(count);
      things[count] = sprite({
        context: canvas.getContext("2d"),
        width: 27,
        height: 42,
        image: new Image(),
        tID: field.flora[j].Tid,
        numberOfFrames: 1,
        ticksPerFrame: 15,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
        scale: 1,
        name: field.flora[j].Tname,
        canmove: false
      });
      things[count].image.src="assets/img/"+field.flora[j].Gimage;
      console.log("IMG: "+things[j].image.src);
      count++;
  }
//   console.log(count,j,field.fauna.length);
  for (j=0;j<field.fauna.length;j++) {
//     console.log(count);
      things[count] = sprite({
        context: canvas.getContext("2d"),
        width: 2122,
        height: 320,
        selected: false,
        tID: field.fauna[j].Tid,
        image: new Image(),
        numberOfFrames: 8,
        ticksPerFrame: 20,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
        scale: .25,
        name: field.fauna[j].Tname,
        canmove: true
    });
    things[count].image.src="assets/img/"+field.fauna[j].Gimage;
//     console.log("IMG: "+things[j].image.src);
    count++;
  }

  // add listeners for events
// 	animalImage.addEventListener("load", gameLoop);
//   plantImage.addEventListener("load", gameLoop);
  for (d=0; d<things.length; d++) {
    things[d].image.addEventListener("load",gameLoop);
  }
  // key press
  document.addEventListener("keydown",keypress);
  // left click
  canvas.addEventListener("mousedown",leftclick);
  // right click
  canvas.addEventListener("contextmenu",rightclick);
  // hover
  canvas.addEventListener("mouseover",hoverinfo);
  canvas.addEventListener("wheel",wheel);
} 

// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

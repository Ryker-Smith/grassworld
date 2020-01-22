/* 
  
  Grassworld is evolved from ideas (eg treebeard.ie) that sample code from
  William Malone (www.williammalone.com) and many others helped to 
  show how to carry in to a Javascript implementation.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  
  No commercial re-use is permitted.
*/

var things=[];
var animal,
    animalImage,
    canvas;
var notclevercount=0;    
var thing_selected=-1;
var audioenabled=false;
	// Get canvas
	canvas = document.getElementById('grassworld');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

  function sleepnow(thisguy) {
    thisguy.image.src="assets/img/plant02.png";
    thisguy.canmove=false;
    thisguy.scale=1;
    thisguy.isasleep=1;
    if (audioenabled) {
      try {
        var audio = new Audio('/assets/audio/termites_and_ants-mike-koenig.wav');
        audio.play();
      }
      catch(e) {}
    }
    return thisguy;
  }
  function isasleep(thisguy) {
    return (thisguy.isasleep == 1);
  }
  function wakenow(thisguy) {
    thisguy.image.src="assets/img/anmhithe02-positioned.png";
    thisguy.canmove=true;
    thisguy.scale=0.17;
    thisguy.isasleep=0;
    console.log('WAKING');
    if(audioenabled) {
      try{
        var audio = new Audio('/assets/audio/schplágen-wakeup.wav');
        audio.play();
      }
      catch(e) {}
    }
    return thisguy;
  }
  function sprite (options) {
	
      var character = {};
      character.frameIndex = 0;
      character.tickCount = 0;
      character.ticksPerFrame = options.ticksPerFrame || 0;
      character.numberOfFrames = options.numberOfFrames || 1;
      character.context = canvas.getContext("2d");
      character.width = options.width;
      character.height = options.height;
      character.image = options.image;
      character.name = options.name;
      character.scale=options.scale;
      character.Tid=options.Tid;
      character.thingnum=options.thingnum;
      character.left=options.left;
      character.left_destination = options.left_destination || character.left;
      character.top=options.top;
      character.top_destination=options.top_destination || character.top;
      character.canmove=options.canmove;
      character.ismoving=0;
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
                // reset the TICK counter
                character.tickCount = 0;
                // If the current frame index is in range
                if (character.frameIndex < character.numberOfFrames - 1) {
                    // Go to the next frame
                  if (oneinNchance(3)) {
                    // increment the frame counter
                    character.frameIndex += 1;
                  }
                }
                else {
                  // rotate the FRAME counter
                  character.frameIndex = 0;
                  if (oneinNchance(100)) {
                    if (isasleep(character)) {
                      wakenow(character);
                    }
                    else {
                      character=sleepnow(character);                  
                    }
                  }
                  else {
                    if(oneinNchance(10)) {
                      if (oneinNchance(2)) {
                        character.ticksPerFrame=character.ticksPerFrame/2;
                        setdestination(character.thingnum, character.left + grandom(screen.width), character.top + grandom(screen.height));
                      }
                      else {
                        setdestination(character.thingnum, character.left - grandom(screen.width), character.top - grandom(screen.height));
                      }
                    }
                  }
                }
            }
            if ((character.canmove)&&(character.ismoving==1)) {
//               things[character.thingnum].o.Tx=character.left;
//               things[character.thingnum].o.Ty=character.top;
//               things[character.thingnum].o.Tid=character.Tid;
            }
            try {
            // We've arrived
             if ((character.canmove) &&(character.ismoving==1) && (character.left == character.left_destination) && (character.top == character.top_destination)) {
//                console.log('Arrival of thing '+character.thingnum+" (aka "+ things[character.thingnum].name+")");
               things[character.thingnum].o.Tx=character.left;
               things[character.thingnum].o.Ty=character.top;
               things[character.thingnum].o.Tz=0;
               things[character.thingnum].o.Tid=character.Tid;
               if ( (isdefined(things[character.thingnum].o.Tx)) && (isdefined(things[character.thingnum].o.Ty)) ) {
                  things[character.thingnum].o.saveLocation();
               }
               character.ismoving=0;
             }
            }
            catch (e) {}
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
	
	function setdestination(t, tx, ty) {
//     if (thing_selected < 0) return;
    if (!things[t].canmove) return;
    things[t].ismoving=1;
    things[t].left_destination= tx  - Math.floor(things[t].sprite_width/2);
    if (things[t].left_destination < 0) {
      things[t].left_destination=0;
    }
    else if (things[t].left_destination > canvas.width) {
      things[t].left_destination=canvas.width;
    }
    things[t].top_destination= ty - Math.floor(things[t].sprite_height/2);
    if (things[t].top_destination < 0) {
      things[t].top_destination=0;
    }
    else if (things[t].top_destination > canvas.height) {
      things[t].top_destination=canvas.height;
    }
//     console.log("Thing "+t+ " going to ("+things[t].left_destination+","+things[t].top_destination+")");
  }
  
function game(game_canvas) {

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
//         things[i].countnearby(i);
      }
      var ctx2 = canvas.getContext("2d");
      ctx2.font = "40px Verdana bold";
      ctx2.fillStyle="white";
      ctx2.background="black";
      ctx2.fillText(things.length+ " things",10,50);
  }
  
  function keypress(event) {
//     console.log(arguments.callee.name);
    var key_left=37,
        key_up=38,
        key_right=39,
        key_down=40,
        ESC=27;
        step=5;
        console.log(event.keyCode);
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
//     console.log(arguments.callee.name);
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
    var clickedonsprite=0;
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
          clickedonsprite=1;
        }
        else {
          thing_selected=i;
//           console.log("Thing "+things[thing_selected].thingnum+" (aka "+things[thing_selected].name+") selected");
          clickedonsprite=1;
        }
			}
		}
		if (clickedonsprite==0) {
        thing_selected=-1;
    }
	}
	
	function hoverinfo (event) {
    // intended to provide information about the character when we hover
//     console.log(arguments.callee.name);
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
    var clickedonsprite=0;
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
          clickedonsprite=1;
        }
        else {
          thing_selected=i;
          clickedonsprite=1;
        }
			}
		}
	}
	
	function rightclick (event) {
//     console.log(arguments.callee.name);
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
    var clickedonsprite=0;
		for (i = 0; i < things.length; i += 1) {
			// Distance between user screen tap and thing
			dist = distance({
          left: (things[i].left + (things[i].sprite_width)/2),
          top: (things[i].top + (things[i].sprite_height)/2)
        }, {
          left: location.left,
          top: location.top
        });
        if ( !(thing_selected < 0) && (things[thing_selected].canmove==1)) {
          setdestination(thing_selected, location.left,location.top);
        }
		}
	}
	
  function wheel (event) {
//     console.log(arguments.callee.name);
    delta = event.wheelDelta / 60;
    if (delta > 0) {
      // up
      console.log('up');
    }
    else if (delta < 0) {
      // down
      console.log('down');
    }
  }
  
function eventDispatcher(event,d) {
  /*   this is an unnecessary layer between the EventListener and the EventHandler.
   *  It is used to provide similarity of construct with the AppInventor JavaLibrary
   *  used for Android app development in Android Studio.
  */
  console.log(event.type);
  switch (event.type) {
    case 'load' :
          gameLoop(event);
//           notclevercount--;
//           if (notclevercount == 1) {
//             for (d=0; d<things.length; d++) {
//               things[d].image.removeEventListener("load", eventDispatcher);
//             }
//             console.log('removed');
//           }
//           console.log(notclevercount);
          break;
    case 'mousedown' :
          leftclick(event);
          break;
    case 'contextmenu' :
          rightclick(event);
          break;
    case 'keydown' :
          keypress(event);
          break;
    case 'wheel' :
          wheel(event);
          break;
    case 'mouseover' :
          hoverinfo(event);
          break;
    default:
          console.log('Event "'+event.type+'" not registered');
          break;
  }
}
  count=0;
  for (j=0;j<field.flora.length;j++) {
      var currentitemnum=things.push( sprite({
        context: canvas.getContext("2d"),
        thingnum: count,
        width: field.flora[j].GimageW,
        height: field.flora[j].GimageH,
        selected: false,
        image: undefined,
        Tid: field.flora[j].Tid,
        numberOfFrames: field.flora[j].Gframes,
        ticksPerFrame: field.flora[j].Gticks,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
        scale: 1,
        name: field.flora[j].Tname,
        Tgenus: field.flora[j].Tgenus,
        canmove: false
      }));
      currentitemnum--;
      things[currentitemnum].image=new Image();
      things[currentitemnum].image.src="assets/img/"+field.flora[j].Gimage;
      
      count++;
  }
  for (j=0;j<field.fauna.length;j++) {
      var currentitemnum=things.push( sprite({
        context: canvas.getContext("2d"),
        thingnum: count,
        width: field.fauna[j].GimageW,
        height: field.fauna[j].GimageH,
        selected: false,
        Tid: field.fauna[j].Tid,
        image: undefined,
        numberOfFrames: field.fauna[j].Gframes,
        ticksPerFrame: field.fauna[j].Gticks,
        left: field.fauna[j].Tx,
        top: field.fauna[j].Ty,
        scale: field.fauna[j].Gscale,
        name: field.fauna[j].Tname,
        Tgenus: field.fauna[j].Tgenus,
        canmove: true
    }));
    currentitemnum--;
    things[currentitemnum].image=new Image();
    things[currentitemnum].image.src="assets/img/"+field.fauna[j].Gimage;
    things[currentitemnum].o=new MovingThing(null,things[currentitemnum].name,'',0);
    things[currentitemnum].o.Tid=field.fauna[j].Tid;
//     console.log("<"+things[currentitemnum].o.Tid+">");
    things[currentitemnum].o.Tgenus=field.fauna[j].Tgenus;
//     console.log("["+things[currentitemnum].o.Tgenus+"]["+(things[currentitemnum].o.Tgenus)*2+"]");
    things[currentitemnum].o.Tgenus=(things[currentitemnum].o.Tgenus)*2;
    things[currentitemnum].o.tgenuschange(undefined);
    count++;
    
  }

  function future() {
   for (j=0;j<field.fauna.length;j++) {
     var options={
        canvasid: canvas,
        Tid: field.fauna[j].Tid,
        image: undefined,
        numberOfFrames: field.fauna[j].Gframes,
        ticksPerFrame: field.fauna[j].Gticks,
        left: field.fauna[j].Tx,
        top: field.fauna[j].Ty,
        scale: field.fauna[j].Gscale,
        name: field.fauna[j].Tname,
        genus: field.fauna[j].Tgenus,
        canmove: true
     }
     var c=new charactersprite(options);
     c.setimage("assets/img/"+field.fauna[j].Gimage);
     things.push(c);
   }
  }
  // add listeners for events
  for (d=0; d<things.length; d++) {
    if (oneinNchance(10)) {
      things[d].image.addEventListener("load",eventDispatcher);
    }
  }
//   things[1].image.addEventListener("load",eventDispatcher);
  notclevercount=d;
  document.addEventListener("keydown",eventDispatcher);
  document.addEventListener("keyup",eventDispatcher);
  document.addEventListener("mousedown",eventDispatcher);
  document.addEventListener("contextmenu",eventDispatcher);
  document.addEventListener("mouseover",eventDispatcher);
  document.addEventListener("wheel",eventDispatcher);
} 
document.title='grassworld';
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

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

var things = [];
var canvas;
var thing_selected = -1;
var audioenabled = false;
// Get canvas
canvas = document.getElementById('grassworld');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function sleepnow(thisguy) {
  return thisguy;
  thisguy.savedImage=thisguy.image.src;
//   console.log('SAVED: '+thisguy.savedImage+' ['+thisguy.Tid+']');
  thisguy.image.src = 'assets/img/plant02.png';
  thisguy.Gcanmove = false;
  thisguy.ismoving=0;
  thisguy.isasleep = 1;
//   console.log('SLEEPING');
  if (audioenabled) {
    try {
      var audio = new Audio('/assets/audio/termites_and_ants-mike-koenig.wav');
      audio.play();
    } catch (e) {}
  }
  return thisguy;
}
function isasleep(thisguy) {
  return thisguy.isasleep == 1;
}
function wakenow(thisguy) {
  return thisguy;
  thisguy.image.src = thisguy.savedImage; //'assets/img/anmhithe02-positioned.png';
//   console.log('RESTORED: '+thisguy.savedImage+' ['+thisguy.Tid+']');
  thisguy.Gcanmove = true;
  thisguy.ismoving=0;
  thisguy.isasleep = 0;
//   console.log('WAKING');
  if (audioenabled) {
    try {
      var audio = new Audio('/assets/audio/schplágen-wakeup.wav');
      audio.play();
    } catch (e) {}
  }
  return thisguy;
}
function sprite(options) {
  var character = {};
  console.log('K');
  character.Tid = options.Tid;
  character.Tgenus = options.Tgenus;
  character.Tname = options.Tname;
  
  character.Ganimated = options.Ganimated;
//   character.Gscale = options.Gscale;
//   character.Ginteracts
  character.Gcanmove = options.Gcanmove;
  
  character.thingnum = options.thingnum;
  character.left = options.left;
//   character.left_destination = options.left_destination || character.left;
  character.top = options.top;
//   character.top_destination = options.top_destination || character.top;
  character.frameIndex = 0;
  character.tickCount = 0;
  character.ticksPerFrame = options.ticksPerFrame || 0;
  character.numberOfFrames = options.numberOfFrames || 1;
  character.context = canvas.getContext('2d');
//   character.width = options.width;
//   character.height = options.height;
  character.image = options.image;  
  character.ismoving = 0;
  console.log('L');
//   character.sprite_width = Math.floor(
//     (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
//   );
//   character.sprite_height = Math.floor(character.height * character.Gscale);
//   character.interact = function() {
//     console.log('*****Interact '+character.Tgenus);
//     if (character.Ginteracts) {
//       switch (character.Tgenus) {
//         case 16 : {
//           console.log('TELEPORT DEVICE');
//           break;
//         }
//         default : {
//           break;
//         }
//       }
//     }
//   };
  character.directionChange=function(d) {
    console.log('DC');
    // must change this to respond to parameter d
    character.sprite_width = Math.floor(
        (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
    );
    character.sprite_height = Math.floor(things[character.thingnum].o.images.default.height * things[character.thingnum].o.images.default.scale);
  }
  character.update = function() {
//     console.log('UPD');
    if (!character.Ganimated) {
      //               console.log('returning genus: '+character.Tgenus);
      return;
    }

    if (character.left != character.left_destination) {
      if (character.left < character.left_destination) {
        character.left++;
      } else {
        character.left--;
      }
    }
    if (character.top != character.top_destination) {
      if (character.top < character.top_destination) {
        character.top++;
      } else {
        character.top--;
      }
    }
    character.tickCount += 1;
    if (character.tickCount > character.ticksPerFrame) {
      // reset the TICK counter
      character.tickCount = 0;
      // If the current frame index is in range
      if (character.frameIndex < character.numberOfFrames - 1) {
        // increment the frame counter
        character.frameIndex += 1;
      } else {
        // rotate the FRAME counter
        character.frameIndex = 0;
        if (oneinNchance(10)) {
          if (isasleep(character)) {
            wakenow(character);
          }
          else {
            character=sleepnow(character);
          }
        } else {
          if (oneinNchance(10)) {
            if (oneinNchance(2)) {
              //                         character.ticksPerFrame=character.ticksPerFrame/2;
              setdestination(
                character.thingnum,
                character.left + grandom(screen.width),
                character.top + grandom(screen.height)
              );
            } else {
              setdestination(
                character.thingnum,
                character.left - grandom(screen.width),
                character.top - grandom(screen.height)
              );
            }
          }
        }
      }
    }
    try {
      // We've arrived
      if (
        character.Gcanmove &&
        character.ismoving == 1 &&
        character.left == character.left_destination &&
        character.top == character.top_destination
      ) {
        things[character.thingnum].o.Tx = character.left;
        things[character.thingnum].o.Ty = character.top;
        things[character.thingnum].o.Tz = 0;
        things[character.thingnum].o.Tid = character.Tid;
        if (
          isdefined(things[character.thingnum].o.Tx) &&
          isdefined(things[character.thingnum].o.Ty)
        ) {
          things[character.thingnum].o.saveLocation();
        }
        character.ismoving = 0;
      }
    } catch (e) {}
  };

  character.render = function(y) {
    console.log('RND');
//     console.log(things[y].Tid);
    // Draw the animation
    direction='default';

    let spritedata=things[y].o.images.default;

    try {
        character.context.drawImage(
        spritedata.spritesheet,
        (character.frameIndex * spritedata.w) / spritedata.framecount,
        0,
        spritedata.w / spritedata.framecount,
        spritedata.h,
        character.left,
        character.top,
        (spritedata.w / spritedata.framecount) * spritedata.scale,
        spritedata.h * spritedata.scale
      );

    } catch (e) {
      console.log('error a231\n'+e);
    }
    if (thing_selected == y) {
      ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'red';
      ctx.rect(
        things[i].left,
        things[i].top,
        things[i].spriteW,
        things[i].spriteH
      );
      ctx.stroke();
    }
  };

  return character;
}

function setdestination(t, tx, ty) {
  
  //     if (thing_selected < 0) return;
  console.log('SETTING');
//   console.log('G '+things[t].Tgenus+' M '+things[t].Gcanmove);
  if (!things[t].Gcanmove) return;
  if ( (isNaN(things[t].left_destination)) || (isNaN(things[t].top_destination))) {
    console.log('RETURNING') ;
    return;
  }
  things[t].ismoving = 1;
  things[t].left_destination = tx - Math.floor(things[t].sprite_width / 2);
  if (things[t].left_destination < 0) {
    things[t].left_destination = 0;
  } else if (things[t].left_destination > canvas.width) {
    things[t].left_destination = canvas.width;
  }
  things[t].top_destination = ty - Math.floor(things[t].sprite_height / 2);
  if (things[t].top_destination < 0) {
    things[t].top_destination = 0;
  } else if (things[t].top_destination > canvas.height) {
    things[t].top_destination = canvas.height;
  }
  console.log("Thing "+t+ " going to ("+things[t].left_destination+","+things[t].top_destination+")");
}

function game(game_canvas) {
  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
//     console.log('GL1');
    // clear the field
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // display game entities on field
    for (i = 0; i < things.length; i++) {
      // any movement calculations
      things[i].update(i);
      // display the changed character
      things[i].render(i);
//       if (things[i].Ginteracts) {
//           things[i].interact();
//       }
//       console.log('GL');
      sleep(500);
    }
    var ctx2 = canvas.getContext('2d');
    ctx2.font = '40px Courier';
    ctx2.fillStyle = 'black';
    ctx2.background = 'black';
    ctx2.fillRect(5,12,250,50);
    ctx2.fillStyle = 'white';
    var howmany=things.length;
    if (things.length < 10) {
      howmany= '0'+howmany;
    }
    if (things.length < 100) {
      howmany= '0'+howmany;
    }
    ctx2.fillText(howmany + ' things', 10, 50);
    ctx2.fillStyle = 'red';
    ctx2.beginPath();
    ctx2.lineWidth='1';
    ctx2.strokeStyle = 'white';
    ctx2.rect(5,12,250,50);
    ctx2.stroke();
  }

  function keypress(event) {
    var key_left = 37,
      key_up = 38,
      key_right = 39,
      key_down = 40,
      ESC = 27;
    step = 5;
    console.log(event.keyCode);
    if (thing_selected < 0) return;
    switch (event.keyCode) {
      case key_left:
        if (things[thing_selected].left > 0) {
          things[thing_selected].left_destination =
            things[thing_selected].left - step;
        }
        break;
      case key_right:
        if (
          things[thing_selected].left <
          canvas.width - things[thing_selected].sprite_width
        ) {
          things[thing_selected].left_destination =
            things[thing_selected].left + step;
        }
        break;
      case key_up:
        if (things[thing_selected].top > 0) {
          things[thing_selected].top_destination =
            things[thing_selected].top - step;
        }
        break;
      case key_down:
        if (
          things[thing_selected].top <
          canvas.height - things[thing_selected].sprite_height
        ) {
          things[thing_selected].top_destination =
            things[thing_selected].top + step;
        }
        break;
      case ESC:
        if (
          things[thing_selected].top <
          canvas.height - things[thing_selected].sprite_height
        ) {
          things[thing_selected].selected = false;
          thing_selected = -1;
        }
        break;
      default:
        console.log('Unknown: ' + event.keyCode);
    }
  }
  function getElementPosition(element) {
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

  function leftclick(event) {
    if (event.which != 1) return;
    event.preventDefault();
    var i,
      location = {},
      dist;
    (pos = getElementPosition(canvas)),
      (tapX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX),
      (tapY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY),
      (canvasScaleRatio = canvas.width / canvas.offsetWidth);

    location.left = (tapX - pos.left) * canvasScaleRatio;
    location.top = (tapY - pos.top) * canvasScaleRatio;
    var clickedonsprite = 0;
    for (i = 0; i < things.length; i += 1) {
      // Distance between user screen tap and thing
      dist = distance(
        {
          left: things[i].left + things[i].sprite_width / 2,
          top: things[i].top + things[i].sprite_height / 2
        },
        {
          left: location.left,
          top: location.top
        }
      );
      // Check for tap on the thing
      if (dist < things[i].sprite_width) {
        if (thing_selected == i) {
          thing_selected = -1;
          clickedonsprite = 1;
        } else {
          thing_selected = i;
          clickedonsprite = 1;
        }
      }
    }
    if (clickedonsprite == 0) {
      thing_selected = -1;
    }
  }

  function hoverinfo(event) {
    // intended to provide information about the character when we hover
    //     console.log(arguments.callee.name);
    event.preventDefault();
    var i,
      location = {},
      dist;

    (pos = getElementPosition(canvas)),
      (hoverX = event.targetTouches
        ? event.targetTouches[0].pageX
        : event.pageX),
      (hoverY = event.targetTouches
        ? event.targetTouches[0].pageY
        : event.pageY),
      (canvasScaleRatio = canvas.width / canvas.offsetWidth);

    location.left = (hoverX - pos.left) * canvasScaleRatio;
    location.top = (hoverY - pos.top) * canvasScaleRatio;
    var clickedonsprite = 0;
    for (i = 0; i < things.length; i += 1) {
      // Distance between user screen tap and thing
      dist = distance(
        {
          left: things[i].left + things[i].sprite_width / 2,
          top: things[i].top + things[i].sprite_height / 2
        },
        {
          left: location.left,
          top: location.top
        }
      );

      if (dist < things[i].sprite_width) {
        if (thing_selected == i) {
          thing_selected = -1;
          clickedonsprite = 1;
        } else {
          thing_selected = i;
          clickedonsprite = 1;
        }
      }
    }
  }

  function rightclick(event) {
    //     console.log(arguments.callee.name);
    event.preventDefault();
    var i,
      location = {},
      dist;

    (pos = getElementPosition(canvas)),
      (tapX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX),
      (tapY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY),
      (canvasScaleRatio = canvas.width / canvas.offsetWidth);

    location.left = (tapX - pos.left) * canvasScaleRatio;
    location.top = (tapY - pos.top) * canvasScaleRatio;
    // 		console.log("("+location.left+","+location.top+")");
    var clickedonsprite = 0;
    for (i = 0; i < things.length; i += 1) {
      // Distance between user screen tap and thing
      dist = distance(
        {
          left: things[i].left + things[i].sprite_width / 2,
          top: things[i].top + things[i].sprite_height / 2
        },
        {
          left: location.left,
          top: location.top
        }
      );
      if (!(thing_selected < 0) && things[thing_selected].Gcanmove == 1) {
        setdestination(thing_selected, location.left, location.top);
      }
    }
  }

  function wheel(event) {
    //     console.log(arguments.callee.name);
    delta = event.wheelDelta / 60;
    if (delta > 0) {
      // up
      console.log('up');
    } else if (delta < 0) {
      // down
      console.log('down');
    }
  }

  function eventDispatcher(event, d) {
    /*   this is an unnecessary layer between the EventListener and the EventHandler.
     *  It is used to provide similarity of construct with the AppInventor JavaLibrary
     *  used for Android app development in Android Studio, which in turn is used to provide
     *  continuity from the AppInventor web methodology.
     */
    console.log(event.type);
    switch (event.type) {
      case 'load':
        gameLoop(event);
        break;
      case 'mousedown':
        leftclick(event);
        break;
      case 'contextmenu':
        rightclick(event);
        break;
      case 'keydown':
        keypress(event);
        break;
      case 'wheel':
        wheel(event);
        break;
      case 'mouseover':
        hoverinfo(event);
        break;
      default:
        console.log('Event "' + event.type + '" not registered');
        break;
    }
  }
  count = 0;
  console.log('G');
  // being worked on as replacement for current:
    for (j = 0; j < field.all.length; j++) {
      var fting={};
      fting.thingnum= count;
      fting.Gcanmove= (field.all[j].Gmobile == 1);
      fting.Ganimated= (field.all[j].Ganimated == 1);
      fting.Ginteracts= (field.all[j].Ginteracts == 1);
      fting.Tid=field.all[j].Tid;
      fting.Tname= field.all[j].Tname;
      fting.Tgenus= field.all[j].Tgenus;
      fting.spriteScale= 1;
      fting.spriteW=1;
      fting.spriteH=1;
      fting.selected=false;
      fting.spriteFrames=1;
      fting.spriteTicksPerFrame=100;
//image: undefined,
      if (fting.GcanMove) {
        console.log('Adding animal '+fting.Tid+' '+fting.Tname);
        fting.o = new MovingThing(
          null,
          fting.Tname,
          '',
          0,
          1 // legs
        );
        MovingThing.tplfimages(field.all[j],things[currentitemnum].o);
      }
      else {
        console.log('Adding plant '+fting.Tid+' '+fting.Tname);
        fting.o = new Thing(
          null,
          fting.Tname,
          '',
          0
        );
        Thing.tplfimages(field.all[j],fting.o);
      }
      fting.sprite = new charactersprite();
      
//     var currentitemnum = things.push(
//       sprite({
//         left: Math.floor(Math.random() * canvas.width),
//         top: Math.floor(Math.random() * canvas.height),
//       })
//     );
//     currentitemnum--;
//     things[currentitemnum].image = new Image();
//     count++;
  }
  
  // in effect at present:
  for (j = 0; j < field.flora.length; j++) {
    var currentitemnum = things.push(
      sprite({
        Tid: field.flora[j].Tid,
        Tname: field.flora[j].Tname,
        Tgenus: field.flora[j].Tgenus,

        spriteScale: 1,
        Gcanmove: (field.flora[j].Gmobile == 1),
        Ganimated: (field.flora[j].Ganimated == 1),
        Ginteracts: (field.flora[j].Ginteracts == 1),

        thingnum: count,
        spriteW: 1,
        spriteH: 1,
        selected: false,
        image: undefined,
        spriteFrames: 1,
        spriteTicksPerFrame: 100,
        left: Math.floor(Math.random() * canvas.width),
        top: Math.floor(Math.random() * canvas.height),
      })
    );
    currentitemnum--;
    things[currentitemnum].image = new Image();
    things[currentitemnum].o = new Thing(
      null,
      things[currentitemnum].name,
      '',
      0
    );
    things[currentitemnum].o.Tid = field.flora[j].Tid;
    things[currentitemnum].o.Tgenus = field.flora[j].Tgenus;
    Thing.tplfimages(field.flora[j],things[currentitemnum].o);
//     console.log('Adding plant '+field.flora[j].Tid+' '+field.flora[j].Gimage);
    count++;
  }
  console.log('H');
  for (j = 0; j < field.fauna.length; j++) {
    var currentitemnum = things.push(
      sprite({
        Tid: field.fauna[j].Tid,
        Tname: field.fauna[j].Tname,
        Tgenus: field.fauna[j].Tgenus,

//         Gscale: field.fauna[j].Gscale,
        Gcanmove: (field.fauna[j].Gmobile == 1),
        Ganimated: (field.fauna[j].Ganimated == 1),
        Ginteracts: (field.fauna[j].Ginteracts == 1),

        thingnum: count,
        width: field.fauna[j].GimageW,
        height: field.fauna[j].GimageH,
        selected: false,
        image: undefined,
//         numberOfFrames: field.fauna[j].Gframes,
//         ticksPerFrame: field.fauna[j].Gticks,
        left: field.fauna[j].Tx,
        top: field.fauna[j].Ty,
      })
    );
    currentitemnum--;
    things[currentitemnum].image = new Image();
//     console.log('Adding animal '+field.fauna[j].Tid+' '+field.fauna[j].Gimage);
//     things[currentitemnum].image.src = 'assets/img/' + field.fauna[j].Gimage;
    things[currentitemnum].o = new MovingThing(
      null,
      things[currentitemnum].name,
      '',
      0,
      1 // legs
    );
    things[currentitemnum].o.Tid = field.fauna[j].Tid;
    things[currentitemnum].o.Tgenus = field.fauna[j].Tgenus;
    // because tplfimages is declared as 'static' it must be called using 
    // the class name, rather than the instantiated object name
    // tplfimages is aka: t-postloadfunction-images
    MovingThing.tplfimages(field.fauna[j],things[currentitemnum].o);
    count++;
    console.log('I');
  }
  
  console.log('JK');

  // add listeners for events
  for (var d = 0; d < things.length; d++) {
    if (oneinNchance(10)) {
      things[d].image.addEventListener('load', eventDispatcher);
    }
  }

  document.addEventListener('keydown', eventDispatcher);
  document.addEventListener('keyup', eventDispatcher);
  document.addEventListener('mousedown', eventDispatcher);
  document.addEventListener('contextmenu', eventDispatcher);
  document.addEventListener('mouseover', eventDispatcher);
  document.addEventListener('wheel', eventDispatcher);
  
  gameLoop();
}
document.title = 'grassworld';
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

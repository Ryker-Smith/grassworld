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

// Get canvas
canvas = document.getElementById('grassworld');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function spriteInfoDump(t) {
  let txt = '==================\nSprite Data Dump\n';
  txt += 'ID: '+thingmap.get(t).Tid + '\n';
  txt += 'Genus: '+thingmap.get(t).Tid +'('+thingmap.get(t).o.Gname+')\n';
  txt += 'Name: '+thingmap.get(t).Tname +'\n';
  txt += 'Tx: '+thingmap.get(t).o.Tx +'\n';
  txt += 'Ty: '+thingmap.get(t).o.Ty +'\n';
  txt += 'Tz: '+thingmap.get(t).o.Tz +'\n';
  txt += 'Sprites:\n';
  for (const a of activities) {
      txt += 'Img: '+thingmap.get(t).sprite.directions.get(a).spritesheet.src+'\n';
      txt += 'framecount: '+thingmap.get(t).sprite.directions.get(a).framecount+'\n';
      txt += 'ticks: '+thingmap.get(t).sprite.directions.get(a).ticks+'\n';
      txt += 'w: '+thingmap.get(t).sprite.directions.get(a).h+'\n';
      txt += 'h: '+thingmap.get(t).sprite.directions.get(a).w+'\n';
      txt += 'scale: '+thingmap.get(t).sprite.directions.get(a).scale+'\n';
  }
  txt += 'Gcanmove: '+thingmap.get(t).o.Gcanmove +'\n';
  txt += 'Gsleep: '+thingmap.get(t).o.Gcansleep +'\n';
  txt += 'Ganimated: '+thingmap.get(t).o.Ganimated +'\n';
  txt += 'Ginteracts: '+thingmap.get(t).o.Ginteracts +'\n';
  txt += 'Team: '+thingmap.get(t).o.Tteam +'\n';
  txt += 'Status: '+thingmap.get(t).o.Tstatus +'\n';
  if (thingmap.get(t).o.ismoving) {
      txt += 'Heading for: ('+thingmap.get(t).sprite.left_destination+','+thingmap.get(t).sprite.top_destination+')\n';
  }
  if (thingmap.get(t).o.isasleep) {
      txt += '**Sleeping**\n';
  }
  txt += 'WSM: '+world_speed_multiplier+'\n';
  txt += '==================\n';
  return txt;
}
function keypress(event) {
  var key_left = 37,
    key_up = 38,
    key_right = 39,
    key_down = 40,
    ESC = 27;

  if (thing_selected < 0) return;
  switch (event.keyCode) {
    case key_left:
      if (thingmap.get(thing_selected).o.Gcanmove) {
        if (thingmap.get(thing_selected).sprite.left > 0) {
          thingmap.get(thing_selected).sprite.left_destination =
            thingmap.get(thing_selected).sprite.left - thingstep;
        }
      }
      break;
    case key_right:
      if (thingmap.get(thing_selected).o.Gcanmove) {
        if (
          thingmap.get(thing_selected).sprite.left <
          canvas.width - thingmap.get(thing_selected).sprite.sprite_width
        ) {
          thingmap.get(thing_selected).sprite.left_destination =
            thingmap.get(thing_selected).sprite.left + thingstep;
        }
      }
      break;
    case key_up:
      if (thingmap.get(thing_selected).o.Gcanmove) {
        if (thingmap.get(thing_selected).sprite.top > 0) {
          thingmap.get(thing_selected).sprite.top_destination =
            thingmap.get(thing_selected).sprite.top - thingstep;
        }
      }
      break;
    case key_down:
      if (thingmap.get(thing_selected).o.Gcanmove) {
        if (
          thingmap.get(thing_selected).sprite.top <
          canvas.height - thingmap.get(thing_selected).sprite.sprite_height
        ) {
          thingmap.get(thing_selected).sprite.top_destination =
            thingmap.get(thing_selected).sprite.top + thingstep;
        }
      }
      break;
    case ESC:
      if (
        thingmap.get(thing_selected).sprite.top <
        canvas.height - thingmap.get(thing_selected).sprite.sprite_height
      ) {
        thingmap.get(thing_selected).selected = false;
        thing_selected = -1;
      }
      break;
    default:
      if (!thingmap.get(thing_selected).o.gkeypress(event.keyCode)) {
        if (!thingmap.get(thing_selected).o.tkeypress(event.keyCode)) {
            console.log('Unknown key: ' + event.keyCode);
        }
    }
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
  let lowest = 99999999;
  var location = {},
    dist,
    count = 0;
  (pos = getElementPosition(canvas)),
  (tapX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX),
  (tapY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY),
  (canvasScaleRatio = canvas.width / canvas.offsetWidth);

  location.left = Math.floor((tapX - pos.left) * canvasScaleRatio);
  location.top = Math.floor((tapY - pos.top) * canvasScaleRatio);
  //     console.log('Clk '+location.left+','+location.top);
  var clickedonsprite = 0;
  for (key of thingmap.keys()) {
    // Distance between user screen tap and thing
    dist = distance({
      left: (thingmap.get(key).sprite.left + (thingmap.get(key).sprite.sprite_width / 2)),
      top: (thingmap.get(key).sprite.top + (thingmap.get(key).sprite.sprite_height / 2))
    }, {
      left: location.left,
      top: location.top
    });
    //       console.log('Dist '+thingmap.get(key).sprite.left+','+thingmap.get(key).sprite.top+' '+key+'->'+dist);
    //       console.log(' Count '+count);
    if (dist < thingmap.get(key).sprite.sprite_width) {
      // Check for tap on the thing
      if (thing_selected == key) {
        thing_selected = -1;
        clickedonsprite = 1;
      }
      else {
        thing_selected = key;
        clickedonsprite = 1;
      }
    }
    count++;
  }
  //     console.log('D '+ thingmap.size);
  if (clickedonsprite == 0) {
    thing_selected = -1;
  }
  if (thing_selected > 0) {
      console.log('Selected '+thing_selected+'\nTgenus='+thingmap.get(thing_selected).o.Tgenus);
  }
}

function hoverinfo(event) {
  // intended to provide information about the character when we hover
  //     console.log(arguments.callee.name);
  event.preventDefault();
  // needs to be re-done
}

function rightclick(event) {
  event.preventDefault();
  var
    location = {},
    dist;

  (pos = getElementPosition(canvas)),
  (tapX = event.targetTouches ? event.targetTouches[0].pageX : event.pageX),
  (tapY = event.targetTouches ? event.targetTouches[0].pageY : event.pageY),
  (canvasScaleRatio = canvas.width / canvas.offsetWidth);

  location.left = Math.floor((tapX - pos.left) * canvasScaleRatio);
  location.top = Math.floor((tapY - pos.top) * canvasScaleRatio);
  var clickedonsprite = 0;
  for (key of thingmap.keys()) {
    // Distance between user screen tap and thing
    dist = distance({
      left: (thingmap.get(key).sprite.left + (thingmap.get(key).sprite.sprite_width / 2)),
      top: (thingmap.get(key).sprite.top + (thingmap.get(key).sprite.sprite_height / 2))
    }, {
      left: location.left,
      top: location.top
    });
    if (!(thing_selected < 0) && thingmap.get(thing_selected).o.Gcanmove) {
      thingmap.get(thing_selected).sprite.setdestination(thing_selected, location.left, location.top);
    }
  }
}

function wheel(event) {
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

function eventDispatcher(event, d) {
  /*   this is an unnecessary layer between the EventListener and the EventHandler.
   *  It is used to provide similarity of construct with the AppInventor JavaLibrary
   *  used for Android app development in Android Studio, which in turn is used to provide
   *  continuity from the AppInventor web methodology.
   */
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
    case 'keyup':
      break;
    default:
      console.log('Event "' + event.type + '" not registered');
      break;
  }
}

function gameStatus(totalready) {
  var ctx2 = canvas.getContext('2d');
  ctx2.font = '40px Courier';
  ctx2.fillStyle = 'black';
  ctx2.background = 'black';
  ctx2.fillRect(5, 12, 250, 50);
  ctx2.fillStyle = 'white';
  var howmany = totalready;
  if (totalready < 10) {
    howmany = '0' + howmany;
  }
  if (thingmap.totalready < 100) {
    howmany = '0' + howmany;
  }
  ctx2.fillText(howmany + ' things', 10, 50);
  ctx2.beginPath();
  ctx2.lineWidth = '1';
  ctx2.strokeStyle = 'white';
  ctx2.rect(5, 12, 250, 50);
  ctx2.stroke();
}

function game(game_canvas) {

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    // clear the field
    ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'green';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var img = new Image();
    img.src='https://grassworld.fachtnaroe.net/assets/img/grass_txtr1.png';
    var pat = ctx.createPattern(img, 'repeat');
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = pat;
    ctx.fill();
    
    let treadycount=0;
    for (key of thingmap.keys()) {
      if (thingmap.get(key).ready == 0) {
        thingmap.get(key).sprite.update()
        thingmap.get(key).sprite.render()
        try {
          if (thingmap.get(key).o.Ginteracts) {
            thingmap.get(key).sprite.interact();
          }
        }
        catch(e) {
          console.log('ERR: '+key);
        }
        sleep(1);
        treadycount++;
      }
      else {
          console.log('Not ready '+key+ ' ('+thingmap.get(key).ready+')');
      }
    }
    gameStatus(treadycount);

  }

  //========================================Starts here ======================
  count = 0;
//   console.clear();
  for (j = 0; j < field.all.length; j++) {
    var fting = {};
    fting.Tid = field.all[j].Tid;
    fting.Tname = field.all[j].Tname;
    fting.selected = false;
    if ((field.all[j].Gmobile == 1)) {
      fting.o = new MovingThing(
        null,
        fting.Tname,
        '',
        0,
        1 // legs
      );
    }
    else {
      if ((field.all[j].Gliving == 1)) {
        fting.o = new LivingThing(
          null,
          fting.Tname,
          '',
          0
        );
      }
      else {
        fting.o = new Thing(
          null,
          fting.Tname,
          '',
          0
        );
      }
    }
    fting.o.Tid = fting.Tid;
    fting.tkeypress=field.all[j].tkeypress;
    
    fting.o.Gcanmove = (field.all[j].Gmobile == 1);
    fting.o.Ganimated = (field.all[j].Ganimated == 1);
    fting.o.Ginteracts = (field.all[j].Ginteracts == 1);
    fting.o.Gcansleep = (field.all[j].Gcansleep == 1);
    fting.o.Tgenus = field.all[j].Tgenus;
    fting.o.Tteam = field.all[j].Tteam;
    fting.o.Gname = field.all[j].Gname;
    fting.o.Tstatus=field.all[j].Tstatus;
    fting.o.Tx = field.all[j].Tx;
    fting.o.Ty = field.all[j].Ty;
    let spritedetail = {
      Tid: fting.Tid,
      Ganimated: fting.o.Ganimated,
      left: fting.o.Tx,
      top: fting.o.Ty
    }
    // 'ready' is a flag to prevent attempts at update/render by the character sprite until
    // the back-end data has been fully processed
    fting.ready=1;
    fting.sprite = new charactersprite(spritedetail);
    thingmap.set(fting.Tid, fting);
    Thing.tplfimages((field.all[j]).GimagesJSON, thingmap.get(fting.Tid));
    fting.o.tkeypress = (function(keycode) {
      keychar=String.fromCharCode(keycode);
      if (keychar =='V') {
        let thisthingtype=thingmap.get(this.Tid).o.constructor.name;
        if (thisthingtype == 'MovingThing') {
          console.log('Saving');
          thingmap.get(this.Tid).o.msaveLocation();
        }
        else {
          console.log('NOT MOVING THING ');
        }
      }
      else if (keychar =='I') {
        console.log( spriteInfoDump(thing_selected) );
      }
      else if (keychar =='J') {
        thingmap.get(thing_selected).sprite.imagesJSON ;
      }
      else if (keychar =='S') {
        thingmap.get(thing_selected).o.sleepnow();
      }
      else if (keychar =='W') {
        thingmap.get(thing_selected).o.wakenow();  
      }
      else if (keychar =='.') {
        console.log('DELETE');
        if (thingmap.get(thing_selected).o.Tstatus != 'p') {
          thingmap.get(thing_selected).o.tdelete();
          thingmap.delete(thing_selected);
        }
        else {
          console.log('PERMANENT');
        }
      }
      else {
        console.log('*>f0 KeyCode handler got: ' + keychar + ' but presently does nothing with it');
      }
    })
    //  thingmap.image.addEventListener('load', eventDispatcher);
    count++;
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

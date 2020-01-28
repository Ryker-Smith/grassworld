// function sprite(options) {
//   var character = {};
//   character.Tid = options.Tid;
//   character.Ganimated = options.Ganimated;
//   character.Gcanmove = options.Gcanmove;
//   character.thingnum = options.thingnum;
//   character.left = options.left;
//   character.top = options.top;
//   character.frameIndex = 0;
//   character.tickCount = 0;
//   character.ticksPerFrame = options.ticksPerFrame || 0;
//   character.numberOfFrames = options.numberOfFrames || 1;
//   character.context = canvas.getContext('2d');
//   character.image = options.image;  
//   character.ismoving = 0;
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
//   character.directionChange=function(d) {
//     console.log('DC');
//     must change this to respond to parameter d
//     character.sprite_width = Math.floor(
//         (things[character.thingnum].o.images.default.w / things[character.thingnum].o.numberOfFrames) * things[character.thingnum].o.images.default.scale
//     );
//     character.sprite_height = Math.floor(things[character.thingnum].o.images.default.height * things[character.thingnum].o.images.default.scale);
//   }
//   character.update = function() {
//     if (!character.Ganimated) {
//       return;
//     }
//     if (character.left != character.left_destination) {
//       if (character.left < character.left_destination) {
//         character.left++;
//       } else {
//         character.left--;
//       }
//     }
//     if (character.top != character.top_destination) {
//       if (character.top < character.top_destination) {
//         character.top++;
//       } else {
//         character.top--;
//       }
//     }
//     character.tickCount += 1;
//     if (character.tickCount > character.ticksPerFrame) {
//       reset the TICK counter
//       character.tickCount = 0;
//       If the current frame index is in range
//       if (character.frameIndex < character.numberOfFrames - 1) {
//         increment the frame counter
//         character.frameIndex += 1;
//       } else {
//         rotate the FRAME counter
//         character.frameIndex = 0;
//         if (oneinNchance(10)) {
//           if (isasleep(character)) {
//             wakenow(character);
//           }
//           else {
//             character=sleepnow(character);
//           }
//         } else {
//           if (oneinNchance(10)) {
//             if (oneinNchance(2)) {
//                                       character.ticksPerFrame=character.ticksPerFrame/2;
//               setdestination(
//                 character.thingnum,
//                 character.left + grandom(screen.width),
//                 character.top + grandom(screen.height)
//               );
//             } else {
//               setdestination(
//                 character.thingnum,
//                 character.left - grandom(screen.width),
//                 character.top - grandom(screen.height)
//               );
//             }
//           }
//         }
//       }
//     }
//     try {
//       We've arrived
//       if (
//         character.Gcanmove &&
//         character.ismoving == 1 &&
//         character.left == character.left_destination &&
//         character.top == character.top_destination
//       ) {
//         things[character.thingnum].o.Tx = character.left;
//         things[character.thingnum].o.Ty = character.top;
//         things[character.thingnum].o.Tz = 0;
//         things[character.thingnum].o.Tid = character.Tid;
//         if (
//           isdefined(things[character.thingnum].o.Tx) &&
//           isdefined(things[character.thingnum].o.Ty)
//         ) {
//           things[character.thingnum].o.saveLocation();
//         }
//         character.ismoving = 0;
//       }
//     } catch (e) {}
//   };
// 
//   character.render = function(y) {
//     console.log(things[y].Tid);
//     Draw the animation
//     direction='default';
// 
//     let spritedata=things[y].o.images.default;
// 
//     try {
//         character.context.drawImage(
//         spritedata.spritesheet,
//         (character.frameIndex * spritedata.w) / spritedata.framecount,
//         0,
//         spritedata.w / spritedata.framecount,
//         spritedata.h,
//         character.left,
//         character.top,
//         (spritedata.w / spritedata.framecount) * spritedata.scale,
//         spritedata.h * spritedata.scale
//       );
// 
//     } catch (e) {
//       console.log('error a231\n'+e);
//     }
//     if (thing_selected == y) {
//       ctx = canvas.getContext('2d');
//       ctx.beginPath();
//       ctx.lineWidth = '1';
//       ctx.strokeStyle = 'red';
//       ctx.rect(
//         things[i].left,
//         things[i].top,
//         things[i].spriteW,
//         things[i].spriteH
//       );
//       ctx.stroke();
//     }
//   };
// 
//   return character;
// }

// function setdestination(t, tx, ty) {
//   
//       if (thing_selected < 0) return;
//   console.log('SETTING');
//   console.log('G '+things[t].Tgenus+' M '+things[t].Gcanmove);
//   if (!things[t].Gcanmove) return;
//   if ( (isNaN(things[t].left_destination)) || (isNaN(things[t].top_destination))) {
//     console.log('RETURNING') ;
//     return;
//   }
//   things[t].ismoving = 1;
//   things[t].left_destination = tx - Math.floor(things[t].sprite_width / 2);
//   if (things[t].left_destination < 0) {
//     things[t].left_destination = 0;
//   } else if (things[t].left_destination > canvas.width) {
//     things[t].left_destination = canvas.width;
//   }
//   things[t].top_destination = ty - Math.floor(things[t].sprite_height / 2);
//   if (things[t].top_destination < 0) {
//     things[t].top_destination = 0;
//   } else if (things[t].top_destination > canvas.height) {
//     things[t].top_destination = canvas.height;
//   }
//   console.log("Thing "+t+ " going to ("+things[t].left_destination+","+things[t].top_destination+")");
// }

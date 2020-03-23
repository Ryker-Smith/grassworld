
//   var list_of_names=["Richie ", "Shannon ","Jack ","John ","Lizz ","Margret ","Moira "]; // array with list of names
//   var samurai_name=["Ping"];
// 	var addnames=list_of_names[ grandom(list_of_names.length)-1 ]+ grandom(1000); // gets a new random name from the list of names.
// 	var MySchplágen_B2; // variable name for my character schplagen.
//   var blueSamuari; // variable name for our Samuari schplagen.

// function next_execute(r) {          // next executable to give schplagen properties and methods.
//   console.log('b2' + r.insertId); // r.insertId gets the Tid. 
//   var Tid=r.insertId;
//   var kr={};
  
//   kr.Tid=Tid; // adds random Tid for random names and resets onload.  
//   kr.Tname=addnames;
//   kr.selected=false;
//   kr.o=MySchplágen_B2;
//   kr.o.Tid=Tid;
  
//   let myspritedetail= {         // sprite info.
//           Tidkey: "value", Tid,
//           Ganimated: true, // animates your schplagen so its not 1 frame.
//           left: 501 + grandomrange(10), // the schplagen can spawn at a random x-axis co-ordinate between 491 and 511.
//           top: 502 + grandomrange(10) // the schplagen can spawna t a random y-axis co-ordinate between 492 and 512.
//   }
 	 
//   kr.sprite = new charactersprite(myspritedetail); // creates a new spritesheet.
//   kr.ready=2;
//   //gets a Tid and images from the objects.
//   thingmap.set(kr.Tid, kr);
//   kr.o.tget(thingmap.get(kr.Tid));
//   kr.o.tgetimages(thingmap.get(kr.Tid));
//   // gets the spritesheet
//   thingmap.get(Tid).o.Tx=MySchplágen_B2.left;
//   thingmap.get(Tid).o.Ty=MySchplágen_B2.top;
//   // allows the schplagen to move with multple frames and save location.
//   thingmap.get(Tid).o.Gcanmove=true;
//   thingmap.get(Tid).o.Ganimated=true;
//   thingmap.get(Tid).o.msaveLocation();
//   // gets the tkeypress from classes to be used as pressing keychars.
//   thingmap.get(Tid).o.tkeypress = (function(keycode) { //keycode is used to get letters from numbers.
//       keychar=String.fromCharCode(keycode); 
//       if (keychar=='S') {
//           thingmap.get(thing_selected).o.sleepnow();  // if "S" key is pressed, gets the function from classes, passes it on and then is called to run
//                                                     //sleepnow.
//         }
//       console.log(" b2 sleep ");
//       if (keychar=='W') {
//         thingmap.get(thing_selected).o.wakenow(); // if "W" key is pressed, gets the function from classes, passes it on and then is called to run
//                                                   // wakenow.
//       }
//       console.log(" b2 wake")
//   });
// }		
// function onload_b2() { // When page reloads it creates a new schplagen.
//         console.log('b2');
//         MySchplágen_B2= new MovingThing(null,addnames, null, 25, 1); // 12 = genus from classes.js which is my penguin.
//     	MySchplágen_B2.tcreate(next_execute);
//     }

function nearest(myId, otherGenus){
  /* takes thing Id of the requesting schplágen and a 
     +ve or -ve integer representing a genus. Positive means 'find what is this genus'
     and negative means 'find what isn't this genus'.
     
     Examples: if thing 72 which was of genus 33 wanted to find the nearest
     schplágen of it's own type it would use nearest(72, 33) or if it wanted
     to find the nearest other schplágen that wasn't of genus 42 it would use
     nearest(72, -42).  You're expected to use variables instead of the literals
     of course.
  */
//   console.log('FIND NEAREST TO '+myId + ' of '+otherGenus);
  var nearestKey=undefined;
  var nearestDistance=undefined;
  myLeft=(thingmap.get(myId).sprite.left + Math.floor(thingmap.get(myId).sprite.sprite_width/2));
  myTop=(thingmap.get(myId).sprite.top + Math.floor(thingmap.get(myId).sprite.sprite_height/2));
  if (Number.isNaN(myLeft) || Number.isNaN(myTop)) {
    myLeft=grandomrange(200);
    myTop=grandomrange(200);
  }
//   console.log('COUNT '+thingmap.size);
  for (var otherkey of thingmap.keys()) {
    if (otherkey != myId) {  // no sense testing against self
//       console.log(thingmap.get(otherkey).o.Tgenus + ' opposite '+ otherGenus);
      if ((thingmap.get(otherkey).o.Tgenus == otherGenus) || (thingmap.get(otherkey).o.Tgenus == (otherGenus*-1))) { // is this the sought type?
//         console.log('MATCH');
//         console.log ('L '+(thingmap.get(otherkey).sprite.left + (thingmap.get(otherkey).sprite.sprite_width / 2)));
//         console.log('T '+(thingmap.get(otherkey).sprite.top + (thingmap.get(otherkey).sprite.sprite_height / 2)));
//         console.log('L '+ myLeft);
//         console.log('T '+ myTop);
        var dist = distance(
          {
            left: (thingmap.get(otherkey).sprite.left + (thingmap.get(otherkey).sprite.sprite_width / 2)),
            top: (thingmap.get(otherkey).sprite.top + (thingmap.get(otherkey).sprite.sprite_height / 2))
          },
          {
            left: myLeft,
            top: myTop
          });
//         console.log('A '+dist);
        // we have the distance, is it the nearest?
        if ((dist < nearestDistance) || (nearestDistance == undefined)) {
//           console.log('SET '+otherkey+' '+nearestDistance+' '+dist);
          nearestDistance=dist;
          nearestKey=otherkey;
//           console.log('SET '+otherkey+' '+nearestDistance);
        }
      }
    }
  }
//   console.log('FOUND '+ nearestKey);
  /* it's up to the calling code to check whether the key 
        returned is defined or not. If it is, the key can be used 
        to access all the other data, including the Tx and Ty of 
        the other character.    */
  return nearestKey;
}

function furthest(myId, otherGenus){
 /* As with nearest(), but ... furthest  
  */ 
  var furthestKey=undefined;
  var furthestDistance=undefined;
  myLeft=(thingmap.get(myId).sprite.left + Math.floor(thingmap.get(myId).sprite.sprite_width/2));
  myTop=(thingmap.get(myId).sprite.top + Math.floor(thingmap.get(myId).sprite.sprite_height/2));
  if (Number.isNaN(myLeft) || Number.isNaN(myTop)) {
    myLeft=grandomrange(200);
    myTop=grandomrange(200);
  }
  for (var otherkey of thingmap.keys()) {
    if (otherkey != myId) {  // no sense testing against self
      if ((thingmap.get(otherkey).o.Tgenus == otherGenus) || (thingmap.get(otherkey).o.Tgenus == (otherGenus*-1))) { // is this the sought type?
        var dist = distance(
          {
            left: (thingmap.get(otherkey).sprite.left + (thingmap.get(otherkey).sprite.sprite_width / 2)),
            top: (thingmap.get(otherkey).sprite.top + (thingmap.get(otherkey).sprite.sprite_height / 2))
          },
          {
            left: myLeft,
            top: myTop
          });
        // we have the distance, is it the furthest?
        if ((dist > furthestDistance) || (furthestDistance == undefined)) {
          furthestDistance=dist;
          furthestKey=otherkey;
        }
      }
    }
  }
  return furthestKey;
}

function genusCount(genusWotIWant){
  // utility type function to get population of a single genus
  var gcount=0;
  for (var mapkey of thingmap.keys()) {
    if (thingmap.get(mapkey).o.Tgenus == genusWotIWant) { // is this the sought type?
       gcount++;
    }
  }
  return gcount;
}

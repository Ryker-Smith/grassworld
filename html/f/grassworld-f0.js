
var names=["Urgle Burglenaut ", "Urgle von Burglenaut ","Efraim ","Boffy ","Snotsy Mac Boogletoo ","Mary ","Eva ","Pishnot Smileyface ","Boaty MacBoatyface_", "Ailish Owly "];
var newname=names[ grandom(names.length)-1 ]+ grandom(10);
var thisschplágen;

function aftersavinginteract (r) {
  // this was used for debugging, therefore isn't necessary
//   for (var p in r) {
//     console.log('SAVE: '+ p + '=' + r[p]);
//   }
}

function run_this_next(r) {
//   console.log('New FR character with Tid ' + r.insertId);
  var myTid=r.insertId;
  var fnt={};
  
  fnt.Tid=myTid;
  fnt.Tname=newname;
  fnt.selected=false;
  fnt.o=thisschplágen;
  fnt.o.Tid=myTid;
  
  let spritedetail= {
          Tid: myTid,
          Ganimated: true,
          left: 501 + grandomrange(10),
          top: 502 + grandomrange(10)
  }
  
  fnt.sprite = new charactersprite(spritedetail);
  // because there are two network retrievals to complete the process, the
  // ready flag starts with a value of 2 and as each step completes the flag
  // is decremented. Only when the ready flag is 0 does the charactersprite
  // class get to update and/or render. The gameloop won't call the charactersprite
  // methods on an object with non-zero ready flag.
  fnt.ready=2;
  thingmap.set(fnt.Tid, fnt);
  fnt.o.tget(thingmap.get(fnt.Tid));
  fnt.o.tgetimages(thingmap.get(fnt.Tid));
  thingmap.get(myTid).o.Tx=thingmap.get(myTid).sprite.left
  thingmap.get(myTid).o.Ty=thingmap.get(myTid).sprite.top;;
  thingmap.get(myTid).o.Gcanmove=true;
  thingmap.get(myTid).o.Ganimated=true;
  thingmap.get(myTid).o.msaveLocation();
  // do this:
  
  /* USE THIS METHOD FOR ALLOCATING YOUR INTERACTION CODE
   1) Assign the body of your tinteract function to a variable using ticks as shown
        (ticks are at the top left of the keyboard, below the ESC key)
   2) Create a new Function as shown below, specify the two parameters 'myId', 'otherId' and the variable
      with your code from 1)
   3) Call tsaveinteract as shown.
   
   NOTE:  The Scplágen will only exhibit this interaction behaviour when it's got from the back-end. It won't exhibit
          the behaviour immediately. I have yet to work out why that is.
   NOTE:  If you don't want to use ticks, there's an example shown also of that
  */
  
   var experimental_interactcode=`
    if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){
       thingmap.get(myId).sprite.heading='default';
    }
    else {
          if (!thingmap.get(myId).sprite.isfighting) {
              thingmap.get(myId).sprite.heading='fight';
              thingmap.get(myId).sprite.mycoin=grandom(100);
              thingmap.get(myId).sprite.isfighting=true;
          }
          else {
              if (thingmap.get(myId).sprite.mycoin==grandom(100)) {
                 // charactersprite.pffft(otherId);
                  thingmap.get(myId).sprite.heading='fight';
                  thingmap.get(otherId).o.Tgenus=27;
                  thingmap.get(otherId).o.tput(thisthingplf);
                  thingmap.get(myId).sprite.isfighting=false;
                  thingmap.get(otherId).o.tget();

              }
              else {
              }
          }
    }
  `;
  
  var myinteractcode=`
    if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){
      thingmap.get(myId).sprite.heading='default';
    }
    else {
      thingmap.get(myId).sprite.heading='fight';
    }
  `;
  // or this:
//   myinteractcode="if (thingmap.get(myId).o.Tgenus != thingmap.get(otherId).o.Tgenus){\n  console.log('na na na na na batmaaan');\n}\nelse {\n  console.log('You\\'re not batman; I\\'m batman!');\n} ";

  thingmap.get(myTid).o.tinteract = new Function('myId', 'otherId', experimental_interactcode);
  thingmap.get(myTid).o.tsaveinteract(aftersavinginteract);
  // experiments with the 'nearest' function
  /* using a line like this:
   *    thingmap.get(nearestOfMyTribe).sprite.left + (grandomrange(40)-20),
   * means get a random number from 0 to 40; then subtract 20 from that number.
   * Randoms less than 20 will therefore be -ve, so
   * (grandomrange(40)-20)  really means get a random number between -20 and 19.
   * 
   * Thsi should stop characters from standing on top of each other!
   */
  var nearestOfMyTribe=nearest(myTid, 28);
  if (isdefined(nearestOfMyTribe)) {
//     console.log('Going: '+(thingmap.get(nearestOfMyTribe).sprite.left)+', '+(thingmap.get(nearestOfMyTribe).sprite.top));
//     let x =(grandomrange(60)-30);
//     if (abs(
//       (thingmap.get(nearestOfMyTribe).sprite.left)) - (thingmap.get(nearestOfMyTribe).sprite.left + x)
//        < 51)
//     {
//       x=x+51;
//     }
     thingmap.get(myTid).sprite.setdestination(
       myTid,
       (thingmap.get(nearestOfMyTribe).sprite.left + (grandomrange(60)-30)),
       (thingmap.get(nearestOfMyTribe).sprite.top + (grandomrange(60)-30))
//        (thingmap.get(nearestOfMyTribe).sprite.left + x),
//        (thingmap.get(nearestOfMyTribe).sprite.top + (grandomrange(60)-30))
    );
  }
  else {
  }
}

function onload_f0() {
//   console.log('onLoad');
  thisschplágen= new Schplágen(null,newname, null, 28, 1);
  thisschplágen.tcreate(run_this_next);
}

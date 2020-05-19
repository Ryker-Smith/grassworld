console.log(escape("function(keycode) {\
        keychar=String.fromCharCode(keycode);\
        if (keychar =='V') {\
          let thisthingtype=thingmap.get(this.Tid).o.constructor.name;\
          if (thisthingtype == 'MovingThing') {\
            console.log('Saving');\
            thingmap.get(this.Tid).o.msaveLocation();\
          }\
          else {\
            console.log('NOT MOVING THING ');\
          }\
        }\
        else if (keychar =='I') {\
          console.log('Info dump');\
          console.log( spriteInfoDump(thing_selected) );\
        }\
        else if (keychar =='J') {\
          console.log('JSON sprite data dump');\
          thingmap.get(thing_selected).sprite.imagesJSON ;\
        }\
        else if (keychar =='S') {\
          console.log('Sleep');\
          thingmap.get(thing_selected).o.sleepnow();\
        }\
        else if (keychar =='W') {\
          console.log('Waking');\
          thingmap.get(thing_selected).o.wakenow();  \
        }\
        else if (keychar =='X') {\
          console.log('DELETE');\
          if (thingmap.get(thing_selected).o.Tstatus != 'p') {\
            thingmap.get(thing_selected).o.tdelete();\
            thingmap.delete(thing_selected);\
          }\
          else {\
            console.log('PERMTHING');\
          }\
        }\
        else {\
          console.log('<KeyCode: ' + keychar + ' does nothing>');\
        }\
      }"
));

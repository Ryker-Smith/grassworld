// class Yoke {
//     constructor(parent, name){
//       this.parent=parent;
//       this.name=name;
//     }
//     parentUpdate(h) {
//       document.getElementById(this.parent).innerHTML=h;
//     }
//     getState(url){
//       url=grassworld_db+'name='+obj.name + token();
//       let xhr = new XMLHttpRequest();
//       xhr.open('GET', url);
//       xhr.send();
//       xhr.onload = function() {
//         if (xhr.status != 200) { // OK?
//           parentUpdate('Error 60');
//         }
//         else { 
//           parentUpdate(xhr.response); 
//         }
//       };
//       xhr.onprogress = function(event) {
//         if (event.lengthComputable) {
//           parentUpdate('Error 68');
//         }
//         else {
//           parentUpdate(xhr.response);
//         }
// 
//       };
//       xhr.onerror = function() {
//         parentUpdate("error");
//       };
//     };
// }
// 
// class Thing extends Yoke {
//   constructor(parent, name, content) {
//     super(parent, name);
//     this.content=content;
//   }
// }
// 
// class Livingthing extends Thing {
//     constructor (parent, name, content) {
//       super (parent, name, content);
//       this.living=true;
//     }
// }
// 
// class Movingthing extends Livingthing {
//   constructor (parent, name, content, legs) {
//     super (parent, name, content);
//     this.legs=legs;
//   }
// }

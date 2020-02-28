
class onerow {
    constructor (tab,id) {
      this.cells={} 
      this.row=document.getElementById(tab).insertRow();
      this.rowId=id;
    }
    newcell(d, n){
      let temp = this.row.insertCell();
      temp.innerHTML=d
      temp.id=n+'_'+this.rowId; // must get this
      this.cells.push(temp);
    }
}


for (var i=0; i< r.length; i++) {
  m=new onerow('listtable', r[i].Tid);
  m.newcell(r[i].Tid,'Tid');
  m.newcell(r[i].Tname,'Tname');
 //
 //
}

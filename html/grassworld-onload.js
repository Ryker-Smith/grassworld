
window.onload=(async function(){
  // this is a messy way to do things, but it works
  await grassworld();
  
//   onload_r2();
  await onload_g1();
  await onload_g2();
  await onload_g3();
//   onload_b1();
  await onload_b2();
  await onload_b3();
  await onload_f0();
  await onload_r1();
  await onload_red_classes();
});

window.onresize=(function(){
  let resizecanvas = document.getElementById('grassworld');
  resizecanvas.width = window.innerWidth;
  resizecanvas.height = window.innerHeight;  
});

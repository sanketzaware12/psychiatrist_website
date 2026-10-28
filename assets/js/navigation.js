(function(){
  var b=document.getElementById("burger"),n=document.getElementById("nav"),h=document.getElementById("hd");
  function set(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Close menu":"Open menu")}
  b.addEventListener("click",function(){set(b.getAttribute("aria-expanded")!=="true")});
  n.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){set(false);b.focus()}});
  function sc(){h.classList.toggle("sc",window.scrollY>20)}sc();window.addEventListener("scroll",sc,{passive:true});
})();

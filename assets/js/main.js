(function(){
  document.documentElement.classList.add("js");
  var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
  var els=document.querySelectorAll(".sec h2,.sv,.why>div,.steps li,.svp");
  els.forEach(function(e,i){e.classList.add("rv");e.style.setProperty("--i",i%4)});
  if("IntersectionObserver"in window){var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}})},{threshold:.1});els.forEach(function(e){o.observe(e)})}else els.forEach(function(e){e.classList.add("in")});
  document.querySelectorAll(".fq button").forEach(function(btn){btn.addEventListener("click",function(){
    var open=btn.getAttribute("aria-expanded")==="true";btn.setAttribute("aria-expanded",!open);
    document.getElementById(btn.getAttribute("aria-controls")).hidden=open})});
})();
(function(){
  var rm=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(!rm)document.querySelectorAll(".hero h1,.phero h1").forEach(function(h){
    var t=h.textContent.trim().split(/\s+/);h.setAttribute("aria-label",t.join(" "));
    h.innerHTML=t.map(function(w,i){return '<span class="w" aria-hidden="true" style="--k:'+i+'">'+w+'</span>'}).join(" ")});
  if(window.matchMedia("(hover:hover)").matches)document.addEventListener("pointermove",function(e){
    var c=e.target.closest&&e.target.closest(".sv,.svp,.mt blockquote");if(!c)return;
    var r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")});
  if(!rm){var p=document.createElement("div");p.className="prog";p.setAttribute("aria-hidden","true");document.body.appendChild(p);
    function u(){var m=document.documentElement.scrollHeight-innerHeight;p.style.transform="scaleX("+(m>0?scrollY/m:0)+")"}u();addEventListener("scroll",u,{passive:true})}
})();

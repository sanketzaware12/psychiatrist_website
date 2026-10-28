/* Overlay system: Book a Consultation, Self-Check quiz/result and Calm Corner open as popups instead of new pages. */
(function(){
var stack=[],inerted=[];
var XI='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
function sbw(){return window.innerWidth-document.documentElement.clientWidth}
function lock(on){
  if(on){document.body.style.paddingRight=sbw()+"px";document.documentElement.classList.add("mdl-lock");
    inerted=[].slice.call(document.body.children).filter(function(n){return !n.classList.contains("mdl")&&n.tagName!=="SCRIPT"});
    inerted.forEach(function(n){n.setAttribute("inert","")})}
  else{document.documentElement.classList.remove("mdl-lock");document.body.style.paddingRight="";
    inerted.forEach(function(n){n.removeAttribute("inert")});inerted=[]}}
function focusables(el){return [].slice.call(el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(function(n){return !n.hidden&&n.offsetParent!==null||n.type==="radio"})}

function open(o){
  var prev=stack[stack.length-1];
  if(prev){prev.el.classList.add("is-under");prev.el.setAttribute("inert","")}
  var opener=document.activeElement;
  var el=document.createElement("div");el.className="mdl";
  el.innerHTML='<div class="mdl-dlg '+(o.cls||"")+'" role="dialog" aria-modal="true" tabindex="-1"'+(o.labelledby?' aria-labelledby="'+o.labelledby+'"':' aria-label="'+(o.label||"Dialog")+'"')+'><button class="mdl-x" type="button" aria-label="Close">'+XI+'</button><div class="mdl-body"></div></div>';
  var dlg=el.firstChild,body=dlg.querySelector(".mdl-body");body.innerHTML=o.html||"";
  if(!stack.length)lock(true);
  document.body.appendChild(el);
  var m={el:el,dlg:dlg,body:body,guard:o.guard,closed:false};
  m.setBody=function(h){body.innerHTML=h;body.scrollTop=0};
  m.wide=function(w){dlg.classList.toggle("wide",!!w)};
  m.close=function(){
    if(m.closed)return;m.closed=true;
    var i=stack.indexOf(m);if(i>-1)stack.splice(i,1);
    el.classList.remove("is-in");el.classList.add("is-out");
    var top=stack[stack.length-1];
    if(top){top.el.classList.remove("is-under");top.el.removeAttribute("inert")}
    else lock(false);
    if(o.onClose)o.onClose();
    setTimeout(function(){el.remove()},300);
    if(top){var f=focusables(top.dlg)[0];(f||top.dlg).focus()}
    else if(opener&&opener.focus&&document.contains(opener))opener.focus()};
  dlg.querySelector(".mdl-x").onclick=m.close;
  el.addEventListener("mousedown",function(e){
    if(e.target!==el||el.classList.contains("is-under"))return;
    if(m.guard&&m.guard()){dlg.classList.remove("nudge");void dlg.offsetWidth;dlg.classList.add("nudge");return}
    m.close()});
  stack.push(m);
  void el.offsetWidth;el.classList.add("is-in");
  var first=o.focus?dlg.querySelector(o.focus):null;
  setTimeout(function(){(first||dlg).focus({preventScroll:true})},60);
  return m}

document.addEventListener("keydown",function(e){
  var m=stack[stack.length-1];if(!m)return;
  if(e.key==="Escape"){e.preventDefault();m.close();return}
  if(e.key==="Tab"){
    var f=focusables(m.dlg);if(!f.length){e.preventDefault();return}
    var a=document.activeElement,fi=f[0],la=f[f.length-1];
    if(!m.dlg.contains(a)){e.preventDefault();fi.focus()}
    else if(e.shiftKey&&(a===fi||a===m.dlg)){e.preventDefault();la.focus()}
    else if(!e.shiftKey&&a===la){e.preventDefault();fi.focus()}}});

/* ---- Booking ---- */
var I=function(p){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+p+'"/></svg>'};
function bookingHTML(){
return '<div class="bk"><aside class="bk-side"><div class="bk-brand">'+I("M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z")+'<span>Serenova Mind Clinic</span></div>'
+'<h2 id="bk-title">Book a consultation</h2><p>Tell us a little about you and when suits you. The clinic will contact you to confirm.</p>'
+'<ul class="bk-pts"><li>'+I("M6 11V8a6 6 0 1112 0v3M5 11h14v9H5z")+'<div><b>Private and respectful</b><span>Your details are used only to reach you.</span></div></li>'
+'<li>'+I("M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z")+'<div><b>Clinic hours</b><span>Mon–Sat, 10am–7pm</span></div></li>'
+'<li>'+I("M5 12.5l4.5 4.5L19 7.5")+'<div><b>A request, not a booking</b><span>Your slot is final once the clinic replies.</span></div></li></ul></aside>'
+'<div class="bk-main"><form class="bk-form" id="bk-form" novalidate data-endpoint="appointment">'
+'<div class="note" data-demo hidden>Development demo: no backend is connected, so nothing has been sent or saved.</div>'
+'<div class="bk-g">'
+'<div class="bk-f"><label for="bk-fullName">Full name</label><input id="bk-fullName" name="fullName" type="text" required autocomplete="name" placeholder="Your name"><p class="err" id="bk-fullName-e" role="alert"></p></div>'
+'<div class="bk-f"><label for="bk-mobile">Mobile number</label><input id="bk-mobile" name="mobile" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+91"><p class="err" id="bk-mobile-e" role="alert"></p></div>'
+'<div class="bk-f"><label for="bk-email">Email <em>(optional)</em></label><input id="bk-email" name="email" type="email" autocomplete="email" placeholder="you@example.com"><p class="err" id="bk-email-e" role="alert"></p></div>'
+'<div class="bk-f"><label for="bk-date">Preferred date</label><input id="bk-date" name="date" type="date" required><p class="err" id="bk-date-e" role="alert"></p></div>'
+'<div class="bk-f"><label for="bk-slot">Preferred time</label><select id="bk-slot" name="slot" required><option value="">Select a slot</option><option>Morning (9am–12pm)</option><option>Afternoon (12pm–4pm)</option><option>Evening (4pm–7pm)</option></select><p class="err" id="bk-slot-e" role="alert"></p></div>'
+'<div class="bk-f"><label for="bk-type">Consultation type</label><select id="bk-type" name="type" required><option value="">Select a type</option><option>Psychiatric Consultation</option><option>Follow-up Consultation</option></select><p class="err" id="bk-type-e" role="alert"></p></div>'
+'<div class="bk-f bk-w"><label for="bk-message">Brief message <em>(optional)</em></label><textarea id="bk-message" name="message" rows="2" maxlength="500" placeholder="Please do not include sensitive medical details here."></textarea></div>'
+'</div><div class="bk-chk"><label><input type="checkbox" id="bk-consent" name="consent" required><span>I have read the <a href="privacy.html">Privacy Policy</a> and agree to be contacted.</span></label><p class="err" id="bk-consent-e" role="alert"></p></div>'
+'<button class="btn bk-submit" type="submit">Request consultation</button><p class="status" id="bk-status" role="status" aria-live="polite"></p></form></div></div>'}

function openBooking(){
  if(document.querySelector(".bk"))return;
  var m=open({cls:"book",labelledby:"bk-title",html:bookingHTML(),focus:"#bk-fullName",
    guard:function(){var f=m.body.querySelector("#bk-form");return !f.hidden&&[].some.call(f.querySelectorAll("input:not([type=checkbox]),textarea,select"),function(i){return i.value&&i.type!=="date"||false})}});
  var f=m.body.querySelector("#bk-form");if(window.bindForm)window.bindForm(f)}

/* ---- Calm ---- */
function openCalm(){
  if(document.querySelector(".mdl .cm"))return;
  var off=null;
  var m=open({cls:"calm dark",labelledby:"cm-title",html:window.Calm?window.Calm.html("h2"):"",onClose:function(){if(off)off()}});
  if(window.Calm)off=window.Calm.init(m.body)}

document.addEventListener("click",function(e){
  if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  var a=e.target.closest&&e.target.closest("a[href]");if(!a||a.target==="_blank")return;
  var h=a.getAttribute("href").split("#")[0].split("?")[0];
  if(/(^|\/)book-consultation\.html$/.test(h)&&!document.getElementById("book")){e.preventDefault();openBooking()}
  else if(/(^|\/)calm\.html$/.test(h)&&!document.getElementById("cm-c")&&window.Calm){e.preventDefault();openCalm()}});

window.Modal={open:open,openBooking:openBooking,openCalm:openCalm};
})();

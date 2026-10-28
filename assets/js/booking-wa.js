/* After a booking request is submitted, offer a one-tap WhatsApp confirmation to the clinic. Number comes from whatsapp.js */
window.showWaConfirm=function(f,d){
var old=document.getElementById("waBox");if(old)old.remove();
var dt=d.date?new Date(d.date+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"";
var L=["Hello Doctor,","","I have just requested a consultation on your website. Please confirm my appointment.","","Name: "+d.fullName,"Mobile: "+d.mobile];
if(d.email)L.push("Email: "+d.email);
L.push("Consultation type: "+d.type,"Preferred date: "+dt,"Preferred time: "+d.slot);
if(d.message)L.push("","Note: "+d.message);
L.push("","Thank you.");
var u="https://wa.me/"+window.WA_NUMBER+"?text="+encodeURIComponent(L.join("\n"));
var e=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var row=function(k,v){return '<li><span>'+k+'</span><b>'+e(v)+'</b></li>'};
var b=document.createElement("div");b.id="waBox";b.className="wab-card";b.setAttribute("role","region");b.setAttribute("aria-label","Confirm on WhatsApp");
b.innerHTML='<div class="wab-h"><span class="wab-ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div><h3>Request received. One more step</h3><p>Send this on WhatsApp so the clinic sees your details instantly and can confirm your slot.</p></div></div><ul class="wab-s">'+row("Name",d.fullName)+row("Type",d.type)+row("Date",dt)+row("Time",d.slot)+'</ul><a class="btn wab-go" href="'+u+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z"/></svg>Confirm on WhatsApp</a><p class="wab-n">This is a request, not a confirmed appointment, until the clinic replies.</p>';
if(f.closest(".mdl")){f.hidden=true;b.insertAdjacentHTML("beforeend",'<button type="button" class="btn ghost wab-done">Done</button>');f.parentNode.appendChild(b);b.querySelector(".wab-done").onclick=function(){var x=f.closest(".mdl").querySelector(".mdl-x");if(x)x.click()};var h=b.querySelector("a");if(h)h.focus()}
else{f.parentNode.insertBefore(b,f.nextSibling);b.scrollIntoView({behavior:"smooth",block:"center"})}};

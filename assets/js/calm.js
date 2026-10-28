(function(){
function initCalm(root){
var $=function(i){return root.querySelector("#"+i)};
var circle=$("cm-c"),lab=$("cm-l"),num=$("cm-n"),tm=$("cm-tm"),go=$("cm-go"),rs=$("cm-rs"),IN=4,OUT=6,mins=2,left=120,sec=0,tick=null,run=false;
function fmt(s){return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
function paint(){tm.firstChild.textContent=fmt(left)}
function phase(){
 if(sec<IN){if(sec===0){circle.style.transitionDuration=IN+"s";circle.classList.add("in");lab.textContent="Breathe in"}num.textContent=IN-sec}
 else{if(sec===IN){circle.style.transitionDuration=OUT+"s";circle.classList.remove("in");lab.textContent="Breathe out"}num.textContent=IN+OUT-sec}}
function step(){left--;paint();if(left<=0){finish();return}sec=(sec+1)%(IN+OUT);phase()}
function start(){if(run)return;run=true;go.textContent="Pause";$("cm-lens").hidden=true;$("cm-live").hidden=false;$("cm-done").hidden=true;paint();sec=0;phase();tick=setInterval(step,1000)}
function pause(){run=false;clearInterval(tick);go.textContent="Resume";circle.style.transitionDuration="1.2s";circle.classList.remove("in");lab.textContent="Paused";num.textContent=""}
function finish(){run=false;clearInterval(tick);circle.style.transitionDuration="2s";circle.classList.remove("in");lab.textContent="Well done";num.textContent="";go.textContent="Start again";left=mins*60;paint();$("cm-lens").hidden=false;$("cm-live").hidden=true;$("cm-done").hidden=false}
function reset(){run=false;clearInterval(tick);circle.style.transitionDuration="1.2s";circle.classList.remove("in");lab.textContent="Ready";num.textContent="";go.textContent="Start";left=mins*60;sec=0;paint();$("cm-lens").hidden=false;$("cm-live").hidden=false;$("cm-done").hidden=true}
go.onclick=function(){run?pause():start()};rs.onclick=reset;$("cm-again").onclick=function(){reset();start()};
root.querySelectorAll("#cm-lens button").forEach(function(b){b.onclick=function(){mins=+b.dataset.m;root.querySelectorAll("#cm-lens button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});reset()}});
function vis(){if(document.hidden&&run)pause()}
document.addEventListener("visibilitychange",vis);
reset();
return function destroy(){clearInterval(tick);document.removeEventListener("visibilitychange",vis)}
}
function html(tag){return '<div class="cm"><div class="cm-top"><'+tag+' id="cm-title">Calm Corner</'+tag+'><p class="cm-sub">Sit comfortably, relax your shoulders. Breathe in for 4, out for 6.</p><div class="cm-len" id="cm-lens" role="group" aria-label="Duration"><button type="button" data-m="1" aria-pressed="false">1 min</button><button type="button" data-m="2" aria-pressed="true">2 min</button><button type="button" data-m="5" aria-pressed="false">5 min</button></div></div><div class="cm-st" aria-live="polite"><div class="cm-sq"><div class="cm-rg"></div><div class="cm-c" id="cm-c"></div><div class="cm-t"><b id="cm-l">Ready</b><i id="cm-n"></i></div></div></div><div class="cm-bot"><div id="cm-live"><div class="cm-tm" id="cm-tm">0:00<small>remaining</small></div><div class="cm-act"><button class="btn" id="cm-go" type="button">Start</button><button class="btn ghost" id="cm-rs" type="button">Reset</button></div></div><div class="cm-done" id="cm-done" hidden><p>Well done. Notice how you feel now. If worries keep returning, a doctor can help.</p><div class="cm-act"><a class="btn" href="book-consultation.html">Book a consultation</a><button class="btn ghost" id="cm-again" type="button">Again</button></div></div><p class="cm-note">General relaxation exercise, not medical treatment. In a crisis, call Tele-MANAS 14416 or 112.</p></div></div>'}
window.Calm={html:html,init:initCalm};
if(document.getElementById("cm-c"))initCalm(document);
})();

var WA_NUMBER=window.WA_NUMBER||"919699938110";
(function(){
var $=function(i){return document.getElementById(i)};
var OPT=["Not at all","Several days","More than half the days","Nearly every day"];
var D={phq:{t:"Mood check (PHQ-9)",max:27,q:["Little interest or pleasure in doing things","Feeling down, depressed or hopeless","Trouble falling or staying asleep, or sleeping too much","Feeling tired or having little energy","Poor appetite or overeating","Feeling bad about yourself, or that you are a failure","Trouble concentrating on things","Moving or speaking very slowly, or being fidgety and restless","Thoughts that you would be better off dead, or of hurting yourself"],
b:[[4,"Minimal"],[9,"Mild"],[14,"Moderate"],[19,"Moderately severe"],[27,"Severe"]],c:["#8fbf9a","#c5d27c","#e6c75f","#e1a05f","#d1805a"]},
gad:{t:"Anxiety check (GAD-7)",max:21,q:["Feeling nervous, anxious or on edge","Not being able to stop or control worrying","Worrying too much about different things","Trouble relaxing","Being so restless that it is hard to sit still","Becoming easily annoyed or irritable","Feeling afraid, as if something awful might happen"],
b:[[4,"Minimal"],[9,"Mild"],[14,"Moderate"],[21,"Severe"]],c:["#8fbf9a","#e6c75f","#e1a05f","#d1805a"]}};
var M=["Your answers suggest very few difficulties right now. That is good to see. Keep up the habits that support you.","You may be feeling some strain. Small steps can help, and it is okay to talk to someone.","It may be a good time to look after yourself and consider speaking with a professional. You deserve support.","Your answers suggest you have been carrying a lot. Speaking with a psychiatrist soon could really help.","Your answers suggest you have been carrying a lot. Speaking with a psychiatrist soon could really help."];
var TP=[["Keep a steady sleep routine","Take a short walk daily","Stay connected with people you trust"],["Try slow breathing: in 4 counts, out 6, for 5 minutes","Go for a 20-minute walk outdoors","Keep a regular sleep time","Share how you feel with a friend or family member"],["Try slow breathing for 5 minutes, twice a day","Walk daily and reduce late-night screen time","Talk to someone you trust about how you feel","Consider booking a consultation"],["Please talk to someone you trust today","Keep a simple routine: sleep, food, light walk","Avoid facing this alone","Book a consultation soon"]];
var s={k:null,i:0,a:[]};
var md=null;
function skel(k){var d=D[k],ic=k==="phq"?'<circle cx="12" cy="12" r="9"/><path d="M8 14.5c1 1.5 2.4 2.2 4 2.2s3-.7 4-2.2M9 9.5h.01M15 9.5h.01"/>':'<path d="M3 9c3-3 5 3 9 0s6-3 9 0M3 15c3-3 5 3 9 0s6-3 9 0"/>';
return '<div id="quiz"><div class="sc-mh"><div class="sc-ib"><svg viewBox="0 0 24 24">'+ic+'</svg></div><div><h2 id="mdl-t">'+d.t.split(" (")[0]+'</h2><p>'+d.t.split("(")[1].replace(")","")+' · Private, nothing is saved</p></div></div><div class="sc-qh"><span id="qn"></span><button class="sc-x" id="qx" type="button">Exit</button></div>\n<div class="sc-bar" id="pg" role="progressbar" aria-valuemin="1"><i id="bar"></i></div>\n<div class="sc-q" id="qs"></div>\n<div class="sc-nv"><button class="btn ghost" id="bk" type="button">Back</button><button class="btn" id="nx" type="button" disabled>Next</button></div></div><div id="res" hidden></div>'}
function show(id){["quiz","res"].forEach(function(x){$(x).hidden=x!==id});md.wide(id==="res");md.body.scrollTop=0}
function wire(){
$("nx").onclick=function(){var n=D[s.k].q.length;if(s.i<n-1){s.i++;q()}else{$("bar").style.width="100%";result()}};
$("bk").onclick=function(){if(s.i){s.i--;q(true)}};
$("qx").onclick=function(){md.close()}}
function start(k){s={k:k,i:0,a:[]};
if(!md){md=Modal.open({cls:"pad quiz",labelledby:"mdl-t",html:skel(k),onClose:function(){md=null}})}else{md.setBody(skel(k));md.wide(false)}
wire();q()}
function q(back){var d=D[k()],i=s.i,n=d.q.length;$("qn").textContent="Question "+(i+1)+" of "+n;$("bar").style.width=(i/n*100)+"%";
$("pg").setAttribute("aria-valuenow",i+1);$("pg").setAttribute("aria-valuemax",n);
var h='<h2 id="qq">'+d.q[i]+'</h2><p>Over the last 2 weeks, how often has this bothered you?</p><div class="sc-opts" role="radiogroup" aria-labelledby="qq">'+OPT.map(function(o,v){return '<label class="sc-o"><input type="radio" name="o" value="'+v+'"'+(s.a[i]===v?" checked":"")+'><span>'+o+'</span></label>'}).join("")+"</div>";
var e=$("qs");e.className="sc-q";e.innerHTML=h;void e.offsetWidth;e.className="sc-q in"+(back?" back":"");
$("bk").style.visibility=i?"visible":"hidden";$("nx").textContent=i===n-1?"See my result":"Next";$("nx").disabled=s.a[i]===undefined;
e.querySelectorAll("input").forEach(function(r){r.onchange=function(){s.a[i]=+r.value;$("nx").disabled=false}})}
function k(){return s.k}
function arc(c,r,a,b){var p=function(t){return[150-r*Math.cos(t),150-r*Math.sin(t)]},A=p(a),B=p(b);return"M"+A[0].toFixed(1)+" "+A[1].toFixed(1)+" A"+r+" "+r+" 0 0 1 "+B[0].toFixed(1)+" "+B[1].toFixed(1)}
function result(){var d=D[s.k],sc=s.a.reduce(function(x,y){return x+y},0),bi=0;
for(var j=0;j<d.b.length;j++){if(sc<=d.b[j][0]){bi=j;break}}
var lv=d.b[bi][1],col=d.c[bi],risk=s.k==="phq"&&s.a[8]>0,seg="",prev=0;
d.b.forEach(function(b,j){var e=j===d.b.length-1?d.max:b[0]+1;seg+='<path d="'+arc(0,110,prev/d.max*Math.PI+.012,e/d.max*Math.PI-.012)+'" stroke="'+d.c[j]+'" stroke-width="24" fill="none" stroke-linecap="round"/>';prev=e});
var tp=TP[Math.min(bi,3)],mi=Math.min(bi,M.length-1);
var wm=["Hello Doctor,","","I completed the "+d.t+" self-check on your website.","","Score: "+sc+" out of "+d.max,"Level: "+lv,"","I would like to book a consultation.","","Name:","Preferred date and time:","","Thank you."].join("\n");
var wa="https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(wm);
var other=s.k==="phq"?"gad":"phq";
var ic=function(p){return '<svg viewBox="0 0 24 24"><path d="'+p+'"/></svg>'};
var care=risk?'<div class="sc-care" role="alert"><div><h3>You are not alone. Help is available right now.</h3><p>You mentioned thoughts of harming yourself. Please talk to someone today. It is free and confidential.</p></div><div><a class="btn" href="tel:14416">Tele-MANAS 14416</a><a class="btn ghost" href="tel:112">Emergency 112</a></div></div>':"";
$("res").innerHTML=care+'<div class="sc-rs"><div class="sc-g"><p class="sc-pr"><b>Serenova Mind Clinic</b> · '+d.t+' · '+new Date().toLocaleDateString()+'</p><svg viewBox="0 0 300 165" role="img" aria-label="Score '+sc+' of '+d.max+', '+lv+'"><path d="'+arc(0,110,0,Math.PI)+'" stroke="#eee8dd" stroke-width="28" fill="none" stroke-linecap="round"/>'+seg+'<g class="sc-nd" id="nd"><line x1="150" y1="150" x2="150" y2="60" stroke="#344A5E" stroke-width="4" stroke-linecap="round"/></g><circle cx="150" cy="150" r="9" fill="#344A5E"/></svg><div class="sc-num"><span id="cn">0</span><small> / '+d.max+'</small></div><span class="sc-lv" style="background:'+col+'">'+lv+'</span></div><div><p class="sc-t">'+d.t+'</p><p class="sc-msg">'+M[mi]+'</p><ul class="sc-tips">'+tp.slice(0,3).map(function(t){return"<li>"+t+"</li>"}).join("")+'</ul><div class="sc-cta"><a class="btn" href="book-consultation.html">Book a consultation</a><a class="sc-ic wa" href="'+wa+'" target="_blank" rel="noopener">'+ic("M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z")+'Share on WhatsApp</a><button class="sc-ic" type="button" onclick="window.print()">'+ic("M7 9V3h10v6M7 17H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v7H7z")+'Save PDF</button></div><a class="sc-br" href="calm.html"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>Try a 2-minute breathing exercise<i>&rsaquo;</i></a></div></div><div class="sc-ft"><p>Screening tool, not a diagnosis. Your answers stay on this device.</p><p><button type="button" id="oth">Try the '+D[other].t+'</button><button type="button" id="again">Close</button></p></div>';
show("res");
$("oth").onclick=function(){start(other)};$("again").onclick=function(){md.close()};
setTimeout(function(){$("nd").style.transform="rotate("+(-90+sc/d.max*180)+"deg)"},120);
var n=0,st=Math.max(1,Math.ceil(sc/30)),tm=setInterval(function(){n=Math.min(sc,n+st);$("cn").textContent=n;if(n>=sc)clearInterval(tm)},40)}
$("p-phq").onclick=function(){start("phq")};$("p-gad").onclick=function(){start("gad")};
})();

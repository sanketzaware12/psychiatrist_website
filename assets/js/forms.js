(function(){
  var EM=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function msg(f,key,t){
    var i=f.querySelector("#"+key)||f.querySelector('[name="'+key+'"]');if(!i||!i.id)return;
    var e=f.querySelector("#"+i.id+"-e");if(!e)return;
    e.textContent=t||"";t?i.setAttribute("aria-invalid","true"):i.removeAttribute("aria-invalid")}
  function check(f){
    var ok=true,bad=null;
    f.querySelectorAll("input,select,textarea").forEach(function(i){
      if(!i.id||!f.querySelector("#"+i.id+"-e"))return;
      var t="",v=i.value.trim();
      if(i.type==="checkbox"){if(i.required&&!i.checked)t="Please tick this box to continue."}
      else if(i.required&&!v)t="This field is required.";
      else if(i.type==="tel"&&v&&!/^\+?[0-9 ()-]{7,15}$/.test(v))t="Enter a valid mobile number.";
      else if(i.type==="email"&&v&&!EM.test(v))t="Enter a valid email address.";
      else if(i.type==="date"&&v&&v<new Date().toISOString().slice(0,10))t="Choose today or a future date.";
      msg(f,i.id,t);if(t){ok=false;bad=bad||i}});
    if(bad)bad.focus();return ok}
  function bind(f){
    var s=f.querySelector("#status,.status"),btn=f.querySelector("button[type=submit]"),busy=false,d=f.querySelector("#demo,[data-demo]");
    if(d&&typeof API_BASE_URL!=="undefined"&&!API_BASE_URL)d.hidden=false;
    var di=f.querySelector("input[type=date]");if(di)di.min=new Date().toISOString().slice(0,10);
    f.addEventListener("submit",async function(e){
      e.preventDefault();if(busy||!check(f))return;
      busy=true;btn.disabled=true;s.textContent="Sending…";
      var data={};f.querySelectorAll("input,select,textarea").forEach(function(i){data[i.name||i.id]=i.type==="checkbox"?i.checked:i.value.trim()});
      var r=await apiSubmit(f.dataset.endpoint,data);if(f.dataset.endpoint==="appointment"&&(r.demo||r.ok)&&window.showWaConfirm)window.showWaConfirm(f,data);
      if(r.demo)s.textContent="Demo mode: your details were checked but not sent or saved. Backend not connected.";
      else if(r.ok){s.textContent=f.dataset.endpoint==="appointment"?"Request received. The clinic will contact you to confirm. This is not yet a confirmed appointment.":"Message received. The clinic will reply soon.";f.reset()}
      else if(r.validation){Object.keys(r.validation).forEach(function(k){msg(f,k,r.validation[k])});s.textContent=r.message||"Please correct the highlighted fields."}
      else s.textContent=r.error==="network"?"Could not reach the server. Check your connection and try again. Your details are kept.":"Something went wrong on our side. Please try again later or call the clinic.";
      busy=false;btn.disabled=false});
  }
  window.bindForm=bind;
  document.querySelectorAll("form[data-endpoint]").forEach(bind);
})();

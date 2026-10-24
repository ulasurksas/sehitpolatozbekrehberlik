(function(){
  var css=`
html{scroll-behavior:smooth;scroll-padding-top:84px}
:focus-visible{outline:3px solid #f5b818;outline-offset:2px;border-radius:4px}
.et{background:#0b7a9f!important}
.et.s{background:#f5b818!important;color:#1d2b3a!important}
.et.v{background:#b03a2e!important}
.et.p{background:#c0392b!important}
.btn.w{background:#128c4a!important}
.kart{transition:transform .18s,box-shadow .18s}
.kart:hover{transform:translateY(-3px);box-shadow:0 8px 22px #0003}
.btn,button{transition:transform .1s,filter .15s}
.btn:active,button:active{transform:scale(.97)}
.btn:hover{filter:brightness(1.08)}
@keyframes gir{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#ana,#detay,main,.wrap{animation:gir .35s ease both}
.sk{height:300px;border-radius:14px;background:linear-gradient(90deg,#8881 25%,#8883 50%,#8881 75%);background-size:200% 100%;animation:skk 1.2s infinite}
@keyframes skk{to{background-position:-200% 0}}
.yazi-boyu{display:flex;gap:4px}
.yazi-boyu button{background:#ffffff26;color:#fff;border:1px solid #ffffff66;border-radius:8px;padding:4px 10px;font-weight:700;cursor:pointer;font:inherit;font-weight:700}
.hz{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:12px}
.hz button{border:0;border-radius:14px;padding:16px 8px;color:#fff;font:inherit;font-weight:700;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;box-shadow:0 3px 10px #0002}
.hz button span{font-size:2rem}
.hz button:hover{transform:translateY(-3px)}
.hz button:nth-child(7n+1){background:linear-gradient(135deg,#1f5fa8,#2f80c9)}
.hz button:nth-child(7n+2){background:linear-gradient(135deg,#c0580a,#e07b1f)}
.hz button:nth-child(7n+3){background:linear-gradient(135deg,#0b7a9f,#1fa5a0)}
.hz button:nth-child(7n+4){background:linear-gradient(135deg,#6a3fa0,#8a5cc4)}
.hz button:nth-child(7n+5){background:linear-gradient(135deg,#1e8449,#34a56b)}
.hz button:nth-child(7n+6){background:linear-gradient(135deg,#b03a5e,#d9577f)}
.hz button:nth-child(7n+7){background:linear-gradient(135deg,#1f5fa8,#12a0d0)}
footer .ft{display:flex;gap:28px;justify-content:center;flex-wrap:wrap;text-align:left;max-width:900px;margin:0 auto;line-height:1.7}
footer a{color:#fff}
footer .telif{margin-top:12px;opacity:.85;font-size:.85rem}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`;
  var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
  var K="rehberlikYaziBoyu",b=100;
  try{b=parseInt(localStorage.getItem(K))||100}catch(e){}
  function uygula(){document.documentElement.style.fontSize=b+"%"}
  uygula();
  var bar=document.querySelector("header .bar");
  if(bar){
    var kutu=document.createElement("div");kutu.className="yazi-boyu";
    kutu.innerHTML='<button type="button" aria-label="Yazıyı küçült">A−</button><button type="button" aria-label="Yazıyı büyüt">A+</button>';
    function kaydet(){try{localStorage.setItem(K,b)}catch(e){}uygula()}
    kutu.children[0].onclick=function(){b=Math.max(85,b-10);kaydet()};
    kutu.children[1].onclick=function(){b=Math.min(140,b+10);kaydet()};
    bar.appendChild(kutu);
  }
})();

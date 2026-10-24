const OZ=window.KUTUPHANE||{},KOL=OZ.koleksiyon||"icerikler";
const firebaseConfig = {
  apiKey: "AIzaSyCMWLEXorOncOjfVP6z8PQ0qu6zm49gNWw",
  authDomain: "polatozbekrehberlik.firebaseapp.com",
  projectId: "polatozbekrehberlik",
  storageBucket: "polatozbekrehberlik.firebasestorage.app",
  messagingSenderId: "260630742799",
  appId: "1:260630742799:web:a8282da6bbe215e14f607a"
};

const ORNEK=[
 {id:"o1",baslik:"Okula Uyum Süreci",kategori:"Broşür",seviye:"Veliler",aciklama:"Yeni başlayan öğrenciler için uyum rehberi.",link:"#",tarih:"2026-10-01"},
 {id:"o2",baslik:"Sınıf İçi Davranış Yönetimi",kategori:"Doküman",seviye:"Öğretmenler",aciklama:"Sınıfta uygulanabilecek pratik stratejiler.",link:"#",tarih:"2026-09-15"},
 {id:"o3",baslik:"Haftalık Etkinlik Planı",kategori:"Etkinlik",seviye:"Anasınıfı",aciklama:"Okul öncesi için rehberlik etkinlikleri.",link:"#",tarih:"2026-09-10"}
];
const $=id=>document.getElementById(id);
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const guv=u=>/^https?:\/\//.test(u||"")?u:"#";
const dID=u=>{const m=(u||"").match(/\/d\/([\w-]+)|[?&]id=([\w-]+)/);return m?(m[1]||m[2]):null};
const GRAD=[["#1f5fa8","#12a0d0"],["#f5b818","#f08a24"],["#12a0d0","#5bd1b5"],["#7b4fb5","#1f5fa8"],["#e86a8a","#f5b818"]];
const IKON={"Broşür":"📄","Etkinlik":"🎯","Form":"📝","Sunum":"🖥️","Doküman":"📚","Duyuru":"📢","Modüler Pano":"🧩","Görsel İçerik":"🖼️","Video":"🎬","Fotoğraf":"📷"};
const SAYFA_BOY=9;
let hepsi=[],sev="Tümü",kat="Tümü",sf=1;

const kO=i=>i.kategoriler||(i.kategori?[i.kategori]:[]);
const sO=i=>i.seviyeler||(i.seviye?[i.seviye]:[]);
const yt=u=>{const m=(u||"").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:null};
function kapak(i){
  const k0=kO(i)[0]||"x",g=GRAD[[...k0].reduce((a,c)=>a+c.charCodeAt(0),0)%GRAD.length];
  const kd=dID(i.kapak),fd=dID((i.fotolar||[])[0]),y=yt(i.video),ld=dID(i.link);
  const src=kd?`https://drive.google.com/thumbnail?id=${kd}&sz=w700`:fd?`https://drive.google.com/thumbnail?id=${fd}&sz=w700`:y?`https://img.youtube.com/vi/${y}/hqdefault.jpg`:ld?`https://drive.google.com/thumbnail?id=${ld}&sz=w700`:"";
  const img=src?`<img loading="lazy" alt="" src="${src}" onerror="this.remove()">`:"";
  return `<div class="kv" style="background:linear-gradient(135deg,${g[0]},${g[1]})"><span>${IKON[k0]||"✨"}</span>${img}</div>`;
}
function etk(i){
  return kO(i).map(c=>`<span class="et">${esc(c)}</span>`).join(" ")+" "+
    sO(i).filter(x=>x!=="Tüm Düzeyler").map(c=>`<span class="et s">${esc(c)}</span>`).join(" ")+(i.video?` <span class="et v">🎬 Video</span>`:"")+(i.onecikan?` <span class="et p">📌 Öne çıkan</span>`:"");
}
function gal(i){
  const f=(i.fotolar||[]).map(dID).filter(Boolean);
  return f.length?`<div class="gal">${f.map(d=>`<a href="https://drive.google.com/file/d/${d}/view"><img loading="lazy" alt="" src="https://drive.google.com/thumbnail?id=${d}&sz=w800"></a>`).join("")}</div>`:"";
}
function vid(u){
  const y=yt(u),d=dID(u),s=y?`https://www.youtube-nocookie.com/embed/${y}`:d?`https://drive.google.com/file/d/${d}/preview`:"";
  return s?`<div class="vd"><iframe src="${s}" allowfullscreen loading="lazy"></iframe></div>`:"";
}
function kart(i){
  return `<article class="kart"><a href="#i=${esc(i.id)}">${kapak(i)}</a><div class="ic"><div>${etk(i)}</div>
  <h3><a href="#i=${esc(i.id)}">${esc(i.baslik)}</a></h3><small>📅 ${esc(i.tarih)}</small><p>${esc(i.aciklama)}</p>
  <a class="btn" href="#i=${esc(i.id)}">Devamını Oku</a></div></article>`;
}

function ciz(){
  const q=$("ara").value.toLowerCase();
  const s=hepsi.filter(i=>(sev==="Tümü"||sO(i).includes(sev)||sO(i).includes("Tüm Düzeyler"))&&(kat==="Tümü"||kO(i).includes(kat))&&
    (i.baslik+" "+(i.aciklama||"")).toLowerCase().includes(q));
  const top=Math.max(1,Math.ceil(s.length/SAYFA_BOY)); if(sf>top)sf=top;
  $("liste").innerHTML=s.slice((sf-1)*SAYFA_BOY,sf*SAYFA_BOY).map(kart).join("");
  $("durum").textContent=s.length?"":"Bu aramaya uygun içerik bulunamadı.";
  const p=$("sayfa");p.innerHTML="";
  if(top>1)for(let n=1;n<=top;n++){const b=document.createElement("button");b.className="chip"+(n===sf?" on":"");b.textContent=n;b.onclick=()=>{sf=n;ciz();$("icerikler").scrollIntoView()};p.appendChild(b)}
}
function filtreler(){
  const sevL=["Tümü",...new Set(["Anasınıfı","İlkokul",...hepsi.flatMap(sO).filter(x=>x&&x!=="Tüm Düzeyler")])];
  const katL=["Tümü",...new Set([...hepsi.flatMap(kO).filter(Boolean),...(OZ.ekKat||["Modüler Pano","Veli e-Bülteni"])])];
  const sc=$("seviyeler");sc.innerHTML="";
  sevL.forEach(c=>{const b=document.createElement("button");b.className="chip"+(c===sev?" on":"");b.textContent=c;b.onclick=()=>{sev=c;sf=1;filtreler();ciz()};sc.appendChild(b)});
  $("katSec").innerHTML=katL.map(c=>`<option value="${esc(c)}"${c===kat?" selected":""}>${c==="Tümü"?"Tüm kategoriler":esc(c)}</option>`).join("");
  const mn=$("menu");mn.innerHTML="";
  const bas=t=>{const d=document.createElement("div");d.className="mb";d.textContent=t;mn.appendChild(d)};
  const dugme=(t,fn)=>{const b=document.createElement("button");b.textContent=t;
    b.onclick=()=>{location.hash="";fn();sf=1;filtreler();ciz();document.activeElement.blur();$("icerikler").scrollIntoView()};mn.appendChild(b)};
  bas("Okul düzeyi");
  dugme("Tüm içerikler",()=>{sev="Tümü";kat="Tümü"});
  sevL.slice(1).forEach(c=>dugme(c,()=>{sev=c;kat="Tümü"}));
  bas("İçerik türü");
  katL.slice(1).forEach(c=>dugme(c,()=>{kat=c;sev="Tümü"}));
}
function detay(i){
  const l=guv(i.link),id=dID(i.link),pu=location.origin+location.pathname+"#i="+i.id;
  const ind=id?`https://drive.google.com/uc?export=download&id=${id}`:l;
  $("detay").innerHTML=`<p><button class="btn g" onclick="geri()">← Geri dön</button></p>
  <div class="detay">${kapak(i)}<div class="ic"><div>${etk(i)}</div><h1>${esc(i.baslik)}</h1><small>📅 ${esc(i.tarih)}</small>${vid(i.video)}${gal(i)}
  <p style="white-space:pre-wrap;flex:none">${esc(i.aciklama)}</p>
  ${i.link?`<div><a class="btn" href="${esc(l)}">İncele</a><a class="btn s" href="${esc(ind)}">İndir</a></div>`:""}
  <div style="margin-top:8px"><a class="btn w" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(i.baslik+" "+pu)}">WhatsApp'ta paylaş</a><button class="btn g" onclick="kopyala()">Bağlantıyı kopyala</button></div></div></div>`;
}
function kopyala(){const u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>alert("Bağlantı kopyalandı."),()=>prompt("Bağlantıyı kopyalayın:",u))}
function geri(){history.length>1?history.back():(location.hash="")}
function yonlendir(){
  const m=location.hash.match(/^#i=(.+)$/),i=m&&hepsi.find(x=>x.id===m[1]);
  $("detay").hidden=!i;$("ana").hidden=!!i;
  if(i){detay(i);scrollTo(0,0);if(OZ.populer!==false)say(i)}
}
function hizli(t,v){if(t==="s"){sev=v;kat="Tümü"}else{kat=v;sev="Tümü"}sf=1;filtreler();ciz();$("icerikler").scrollIntoView()}
function kose(v){sev=v;kat="Tümü";sf=1;filtreler();ciz();$("icerikler").scrollIntoView()}
function popCiz(){
  const l=hepsi.filter(i=>i.goruntulenme>0).sort((a,b)=>b.goruntulenme-a.goruntulenme).slice(0,5);
  if(!l.length)return;
  $("popListe").innerHTML=l.map((i,n)=>`<a href="#i=${esc(i.id)}">${n+1}. ${esc(i.baslik)}<br><small>👁 ${i.goruntulenme} görüntülenme</small></a>`).join("");
  $("popKutu").hidden=false;$("ekPano").hidden=false;
}
function say(i){
  try{
    if(!firebase.apps.length||i.id.length<10||sessionStorage.getItem("g"+i.id))return;
    sessionStorage.setItem("g"+i.id,"1");
    firebase.firestore().collection("icerikler").doc(i.id).update({goruntulenme:firebase.firestore.FieldValue.increment(1)}).catch(()=>{});
  }catch(e){}
}
async function etkYukle(){
  try{
    const b=new Date().toISOString().slice(0,10),ay=["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
    const sn=await firebase.firestore().collection("etkinlikler").where("tarih",">=",b).orderBy("tarih").limit(5).get();
    if(sn.empty)return;
    $("etkListe").innerHTML=sn.docs.map(x=>{
      const d=x.data(),t=new Date(d.tarih+"T00:00"),alt=[d.saat&&"🕘 "+esc(d.saat),d.yer&&"📍 "+esc(d.yer)].filter(Boolean).join(" · ");
      return `<div class="etk"><div class="tg"><b>${t.getDate()}</b><br><small>${ay[t.getMonth()]}</small></div><div><b>${esc(d.baslik)}</b>${alt?`<br><small>${alt}</small>`:""}${d.aciklama?`<br><small>${esc(d.aciklama)}</small>`:""}</div></div>`}).join("");
    $("etkKutu").hidden=false;$("ekPano").hidden=false;
  }catch(e){}
}
async function duyuruYukle(){
  try{
    const bugun=new Date().toISOString().slice(0,10);
    const sn=await firebase.firestore().collection("duyurular").orderBy("tarih","desc").limit(8).get();
    const l=sn.docs.map(d=>d.data()).filter(d=>!d.bitis||d.bitis>=bugun).slice(0,3);
    if(!l.length)return;
    $("duyuru").innerHTML=l.map(d=>{const u=guv(d.link);return `<div>📢 ${u!=="#"?`<a href="${esc(u)}">${esc(d.metin)}</a>`:esc(d.metin)}</div>`}).join("");
    $("duyuru").hidden=false;
  }catch(e){}
}
async function yukle(){
  if(OZ.hazir)await OZ.hazir;
  try{
    if(!firebaseConfig.apiKey)throw 0;
    if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);
    const snap=await firebase.firestore().collection(KOL).orderBy("tarih","desc").get();
    hepsi=snap.docs.map(d=>({id:d.id,...d.data()}));
  }catch(e){hepsi=OZ.ornek===false?[]:ORNEK}
  $("vitrinKutu").hidden=!hepsi.length;
  $("vitrin").innerHTML=[...hepsi].sort((a,b)=>(b.onecikan?1:0)-(a.onecikan?1:0)).slice(0,3).map(kart).join("");
  filtreler();ciz();yonlendir();
  if(OZ.populer!==false)popCiz();if(firebase.apps.length&&OZ.duyuru!==false){duyuruYukle();etkYukle()}
}
$("ara").oninput=()=>{sf=1;ciz()};
$("katSec").onchange=e=>{kat=e.target.value;sf=1;filtreler();ciz()};
window.onhashchange=yonlendir;
try{$("liste").innerHTML='<div class="sk"></div>'.repeat(6);$("durum").textContent=""}catch(e){}
yukle();

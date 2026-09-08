// Регресія CELLS (ph=1): підбір батарейки працює; фрупі досі перекидає на початок рівня
const fs=require('fs');
const noop=()=>{};
const ctxStub=new Proxy({},{get:(t,k)=>{
 if(k=='canvas')return CV;
 if(k=='measureText')return()=>({width:50});
 if(k=='createLinearGradient')return()=>({addColorStop:noop});
 return noop;}});
const CV={width:0,height:0,getContext:()=>ctxStub,addEventListener:noop,getBoundingClientRect:()=>({left:0,top:0,width:360,height:740}),style:{}};
global.window={addEventListener:noop,innerWidth:360,innerHeight:740,devicePixelRatio:1};
global.document={documentElement:{clientWidth:360,clientHeight:740},getElementById:()=>CV,addEventListener:noop,hidden:false};
global.devicePixelRatio=1;global.performance={now:()=>SIMT*1000};global.requestAnimationFrame=()=>0;global.location={reload:noop};
global.AudioContext=class{constructor(){this.currentTime=0;this.destination={}}createOscillator(){return{type:'',frequency:{setValueAtTime:noop,linearRampToValueAtTime:noop,exponentialRampToValueAtTime:noop},connect:noop,start:noop,stop:noop}}createGain(){return{gain:{setValueAtTime:noop,exponentialRampToValueAtTime:noop},connect:noop}}};
global.window.AudioContext=global.AudioContext;global.window.webkitAudioContext=global.AudioContext;
let SIMT=2000;
let src=fs.readFileSync('game.js','utf8');
src+=`;
global.__G={get ph(){return ph},get B(){return B},get U(){return U},get CELLS(){return CELLS},get got(){return got},get CR(){return CR},
 initCells,initL3,update:(t,dt)=>update(t,dt),setDQ:()=>{DQ.length=0},get DQ(){return DQ}};
`;
eval(src);
const G=global.__G;
let fail=0;

// 1) підбір батарейки
G.initCells();G.setDQ();
const B=G.B,C=G.CELLS;
C[0].f=B.f;C[0].x=B.x+10;C[0].g=0;
for(let f=0;f<30;f++){G.update(SIMT,.016);SIMT+=.016}
if(G.got==1&&G.CR.on)console.log('✅ підбір батарейки працює (got='+G.got+')');
else{console.log('❌ підбір не спрацював: got='+G.got);fail=1}

// 2) фрупі ловить Бет → рестарт рівня, ph лишається 1
const U=G.U;
C[0].x=250;C[0].f=0; // повертаємо батарейку на спавн, щоб не впливала на тест ловильності
U[0].st=0;U[0].f=B.f;U[0].x=B.x+20;U[0].y=B.y;
for(let f=0;f<30;f++){G.update(SIMT,.016);SIMT+=.016}
if(G.ph==1&&G.got==0&&U[0].st>SIMT-0.5)console.log('✅ фрупі досі ловить → рестарт CELLS (ph='+G.ph+', got='+G.got+')');
else{console.log('❌ зловлення зламано: ph='+G.ph+' got='+G.got+' st='+U[0].st);fail=1}

// 3) DNA (ph=5) більше НЕ реагує на фрупі
G.initL3();G.setDQ();
const B2=G.B,U2=G.U;
U2[0].st=0;U2[0].f=B2.f;U2[0].x=B2.x+20;U2[0].y=B2.y;
for(let f=0;f<120;f++){G.update(SIMT,.016);SIMT+=.016}
if(G.ph==5)console.log('✅ під час DNA фрупі не перекидає (ph='+G.ph+')');
else{console.log('❌ DNA знову перекинуло: ph='+G.ph);fail=1}

process.exit(fail);

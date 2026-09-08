// Репродукція бага: під час DNA (ph=5) фрупі наздоганяє Бет і перекидає на CELLS (ph=1)
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
let SIMT=1000;
let src=fs.readFileSync('game.js','utf8');
src+=`;
global.__G={get ph(){return ph},get B(){return B},get U(){return U},get DN(){return DN},
 initL3,initCells,update:(t,dt)=>update(t,dt),setDQ:()=>{DQ.length=0},get DQ(){return DQ},get win(){return win}};
`;
eval(src);
const G=global.__G;

// --- повний прохід до DNA: GAR→NEST→GATE→CELLS→TRACE→TOMMY імітуємо стрибками фаз,
//     але головне — входимо в DNA так само, як у грі: з фрупі, що блукає поруч
G.initL3();G.setDQ();
console.log('ph після initL3 =',G.ph);
// фрупі на тому ж поверху, за 20px від Бет (як після CELLS, де вони її переслідували)
const B=G.B,U=G.U;
U[0].f=B.f;U[0].x=B.x+20;U[0].y=B.y;U[0].st=0;
console.log('фрупі0: f='+U[0].f+' x='+U[0].x.toFixed(0)+' бет: f='+B.f+' x='+B.x.toFixed(0));
for(let f=0;f<60;f++){G.update(SIMT,.016);SIMT+=.016}
console.log('ph після 1с апдейту =',G.ph,G.ph==1?'❌ БАГ: перекинуло на CELLS':'✅ ok');
if(G.ph==1)process.exit(1);

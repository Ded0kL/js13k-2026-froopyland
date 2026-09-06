// Froopyland — visual prototype (js13k 2026). Theme: Unicorns and Rainbows.
const W=1600,H=1000,CV=document.getElementById('c'),X=CV.getContext('2d');
CV.width=W;CV.height=H;
const T=()=>performance.now()/1000;
const col=(r,g,b,a=1)=>`rgba(${r|0},${g|0},${b|0},${a})`;
const circ=(x,y,r,c)=>{X.fillStyle=c;X.beginPath();X.arc(x,y,r,0,7);X.fill()};
const ell=(x,y,rx,ry,c)=>{X.fillStyle=c;X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);X.fill()};
const rr=(x,y,w,h,r,c)=>{X.fillStyle=c;X.beginPath();X.roundRect(x-w/2,y-h/2,w,h,r);X.fill()};
const poly=(p,c)=>{X.fillStyle=c;X.beginPath();X.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)X.lineTo(p[i][0],p[i][1]);X.closePath();X.fill()};
const arc=(x,y,r,a0,a1,c,w)=>{X.strokeStyle=c;X.lineWidth=w;X.beginPath();X.arc(x,y,r,a0,a1);X.stroke()};
const shadow=(x,y,rx,ry)=>ell(x,y,rx,ry,col(30,20,40,.18));
const RAINBOW=['#ff6b81','#ffa94d','#ffe066','#8ce99a','#74c0fc','#b197fc'];

// deterministic scatter
let S=13;const rnd=()=>((S=(S*16807)%2147483647)/2147483647);
const DOTS=[];for(let i=0;i<110;i++)DOTS.push([rnd()*W,rnd()*H,rnd()*4+2,(0|(rnd()*5))]);
const DOTS_C=['#ffd1e8','#ffe3a8','#c9f0ff','#d9ffd9','#e6d9ff'];

function cloud(t,i,x,y,s){
  const dx=Math.sin(t*.06+i*1.7)*24;
  const c=col(255,255,255,.85);
  circ(x+dx,y,s,c);circ(x+dx+s*.8,y-s*.35,s*.7,c);circ(x+dx-s*.8,y-s*.3,s*.75,c);
}

function gumdropTree(x,y,s,t){
  shadow(x,y+6,s*.9,s*.35);
  rr(x,y+8,s*.28,s*1.15,4,col(139,92,60));
  circ(x,y,s,col(90,200,130));
  circ(x-s*.28,y-s*.28,s*.34,col(140,225,160));
  for(let i=0;i<3;i++)circ(x-s*.5+i*s*.5,y+s*.15,3,'#fff');
}

function bush(x,y,s){
  shadow(x,y+5,s,s*.3);
  circ(x-s*.45,y+s*.15,s*.5,col(80,190,120));circ(x+s*.45,y+s*.15,s*.5,col(80,190,120));
  circ(x,y-s*.15,s*.62,col(110,210,140));
  circ(x-s*.2,y-s*.25,3.5,'#fff');circ(x+s*.25,y-s*.05,3,'#fff');
}

function lollipop(x,y,s,t){
  shadow(x,y+6,s*.4,s*.2);
  rr(x,y+s*.45,s*.3,s*1.3,3,col(255,245,230));
  circ(x,y,s*1.15,col(250,120,150));
  circ(x,y,s*1.15,col(255,255,255,.25));
  arc(x,y,s*.75,t*.8, t*.8+4.6,col(255,120,140),s*.42);
  arc(x,y,s*.42,-t*.8,-t*.8+3.4,col(255,255,255,.9),s*.2);
  circ(x-s*.4,y-s*.4,s*.16,'#fff');
}

function chocolatePond(x,y,rx,ry,t){
  ell(x,y,rx+10,ry+10,col(120,70,40));
  ell(x,y,rx,ry,col(95,55,35));
  arc(x,y,rx*.55,-t*.2,-t*.2+4.2,col(140,90,55),8);
  arc(x-rx*.25,y+ry*.15,rx*.3,t*.3,t*.3+3,col(140,90,55),6);
  ell(x+rx*.28,y-ry*.4,rx*.16,ry*.2,col(255,235,225)); // marshmallow
  ell(x+rx*.28,y-ry*.4,rx*.12,ry*.15,col(255,245,238));
}

function house(x,y,s){
  shadow(x,y+s*.1,s*.95,s*.3);
  rr(x,y,s*1.7,s*1.2,8,col(190,130,90));          // body
  rr(x,y-s*.7,s*1.95,s*.65,8,col(255,250,240));   // icing roof
  for(let i=0;i<4;i++)circ(x-s*.7+i*s*.48,y-s*.62,5,col(255,160,180));
  rr(x,y-s*.1,s*.4,s*.5,4,col(150,95,60));        // door
  circ(x+s*.1,y-s*.1,2.5,col(255,230,150));
  rr(x-s*.45,y-s*.32,s*.28,s*.28,3,col(160,220,255));
  rr(x+s*.45,y-s*.32,s*.28,s*.28,3,col(160,220,255));
}

function gate(x,y,t){
  const p=.7+Math.sin(t*2)*.3;
  const cs=RAINBOW.map(c=>col(255,255,255,p*.35)+';'+c);
  X.save();X.globalAlpha=p*.5;circ(x,y+30,110,col(255,255,255,.12));X.restore();
  for(let i=0;i<6;i++){
    const r=58-i*7;
    X.strokeStyle=RAINBOW[i];X.lineWidth=9;X.globalAlpha=.85;
    X.beginPath();X.arc(x,y+30,r,Math.PI,0);X.stroke();
  }
  X.globalAlpha=1;
  rr(x,y+24,120,8,4,col(120,90,140));
  rr(x-60,y+18,8,14,3,col(120,90,140));rr(x+52,y+18,8,14,3,col(120,90,140));
}

function portal(x,y,t){
  shadow(x,y+40,95,24);
  rr(x,y+30,220,16,8,col(90,90,110));             // platform
  rr(x-100,y+18,14,34,4,col(110,110,130));rr(x+86,y+18,14,34,4,col(110,110,130));
  circ(x,y,66,col(40,35,55));
  for(let i=0;i<6;i++){                            // rotating rainbow swirl
    X.strokeStyle=RAINBOW[i];X.lineWidth=7;X.globalAlpha=.95;
    X.beginPath();X.arc(x,y,44,t*1.2+i*1.05,t*1.2+i*1.05+4.6);X.stroke();
  }
  X.globalAlpha=1;
  circ(x,y,26,col(255,245,230));
  for(let i=0;i<9;i++){                            // orbiting sparks
    const a=t*2+i*0.7,px=x+Math.cos(a)*72,py=y+18+Math.sin(a)*18;
    circ(px,py,3.5,RAINBOW[i%6]);
  }
}

const INK=col(55,45,70);

function rick(x,y,t){
  const bob=Math.sin(t*1.3)*1.2, lift=Math.sin(t*1.7)>.9?-16:0;
  shadow(x,y+26,36,13);
  // shoes
  rr(x-13,y+20+bob,10,6,3,col(70,70,85));rr(x+4,y+20+bob,10,6,3,col(70,70,85));
  // lab coat, open front
  poly([[x-27,y],[x-9,y-30],[x+9,y-30],[x+27,y],[x+19,y+24],[x-19,y+24]],col(244,244,252));
  poly([[x-31,y+2],[x-27,y],[x-19,y+24],[x-24,y+26]],col(228,228,240));
  poly([[x+31,y+2],[x+27,y],[x+19,y+24],[x+24,y+26]],col(228,228,240));
  // green shirt under
  poly([[x-9,y-28],[x+9,y-28],[x+5,y+20],[x-5,y+20]],col(38,112,78));
  poly([[x-6,y-28],[x-2,y-20],[x-8,y-20]],col(30,90,64)); // shirt wrinkle
  // arms
  rr(x-24,y-8+bob,9,24,5,col(244,244,252));rr(x+16,y-6+bob,9,22,5,col(244,244,252));
  circ(x-25,y+2+bob,5,col(240,214,186));circ(x+21,y+1+bob,5,col(240,214,186));
  // flask (periodic raise)
  rr(x+20,y-5+lift+bob,8,15,4,col(150,225,130));
  circ(x+24,y-5+lift+bob,5.5,col(185,240,165));
  // collar
  rr(x,y-30,17,8,3,col(238,238,248));
  // head: pale skin
  circ(x,y-38+bob,14,col(240,214,186));
  // iconic spiky blue hair
  poly([[x-16,y-33+bob],[x-19,y-48+bob],[x-12,y-43+bob],[x-7,y-57+bob],[x-1,y-45+bob],[x+6,y-57+bob],[x+12,y-43+bob],[x+19,y-46+bob],[x+15,y-31+bob],[x-16,y-33+bob]],col(96,158,225));
  poly([[x-15,y-34+bob],[x-18,y-44+bob],[x-11,y-41+bob]],col(120,180,240)); // highlight
  // squinty eyes
  X.strokeStyle=INK;X.lineWidth=2;X.lineCap='round';
  X.beginPath();X.moveTo(x-7,y-38+bob);X.lineTo(x-1.5,y-37+bob);X.stroke();
  X.beginPath();X.moveTo(x+1.5,y-37+bob);X.lineTo(x+7,y-38+bob);X.stroke();
  // nose + mouth
  circ(x+.5,y-32+bob,2.2,col(226,198,168));
  X.strokeStyle=col(120,90,100);X.lineWidth=1.6;
  X.beginPath();X.moveTo(x-4,y-26.5+bob);X.quadraticCurveTo(x,y-24.5+bob,x+4,y-26.5+bob);X.stroke();
  // occasional burp bubble
  if(Math.sin(t*.9)>.93){circ(x+16,y-64,7,col(255,255,255,.95));circ(x+12,y-60,3,col(255,255,255,.95));}
}

const BIMG=new Image();BIMG.src='icons8-beth-smith.svg';
function beth(x,y,t,talk=0){
  const bob=Math.sin(t*1.3)*1.2,s=1.55;
  shadow(x,y+25,31,12);
  if(BIMG.naturalWidth)X.drawImage(BIMG,x-24*s,y+27-48*s+bob,48*s,48*s);
  // mouth (drawn on canvas: talk=1 — Бет говорить)
  const mx=x-3.9,my=y+4.1+bob,o=2.3*talk*Math.abs(Math.sin(t*9));
  X.strokeStyle=col(20,15,25);X.lineWidth=2.4;X.lineCap='round';
  X.beginPath();X.moveTo(mx-5.4,my);X.quadraticCurveTo(mx,my+2.3+o,mx+5.4,my);X.stroke();
}

function unicorn(x,y,t,dir){
  shadow(x,y+18,30,10);
  rr(x,y+8,34,14,7,col(250,245,255));              // body
  for(let i=0;i<4;i++)rr(x-11+i*7,y+14,5,9,2,col(250,245,255)); // legs
  rr(x+dir*20,y-2,10,12,5,col(250,245,255));       // neck
  circ(x+dir*24,y-12,8.5,col(250,245,255));        // head
  const bob=Math.sin(t*2)*2;
  poly([[x+dir*24,y-20+bob],[x+dir*28,y-30+bob],[x+dir*20,y-20+bob]],col(255,200,80)); // horn
  for(let i=0;i<3;i++)arc(x+dir*18,y-8+i*4,7-i*1.5,0,6,RAINBOW[i*2],3.5); // mane
  arc(x-dir*16,y+4,9,1.2,5.2,RAINBOW[5],3.5);      // tail
  circ(x+dir*26,y-12,1.6,col(60,50,70));
}

function tommy(x,y,t){
  const br=1+Math.sin(t*2.2)*.025;                 // breathing
  X.save();X.translate(x,y);X.scale(br,br);X.translate(-x,-y);
  shadow(x,y+22,26,9);
  poly([[x-24,y+14],[x-18,y-6],[x-8,y+16],[x,y-10],[x+8,y+16],[x+18,y-6],[x+24,y+14],[x+26,y+18],[x-26,y+18]],col(215,180,160)); // skin cape
  rr(x,y+4,30,20,9,col(150,170,150));              // hunched body
  circ(x,y-14,11,col(190,205,185));                // head
  poly([[x-9,y-22],[x-3,y-12],[x-11,y-14]],col(90,110,95));
  circ(x-3.5,y-15,2.6,col(20,25,20));
  circ(x+3.5,y-15,2.6,col(20,25,20));
  const g=.5+Math.sin(t*2.2)*.5;                   // red eye glow
  circ(x-3.5,y-15,1.2,col(255,60,60,g));
  circ(x+3.5,y-15,1.2,col(255,60,60,g));
  poly([[x-4,y-8],[x,y-5],[x+4,y-8]],col(80,95,80)); // grim mouth
  X.restore();
}

function shard(x,y,c,t,i){
  const p=.7+Math.sin(t*3+i)*.3;
  X.globalAlpha=.35*p;circ(x,y,14,c);X.globalAlpha=1;
  X.save();X.translate(x,y);X.rotate(Math.sin(t*1.5+i)*.35);
  poly([[-8,0],[0,-9],[8,0],[0,9]],c);
  X.restore();
  circ(x-2.5,y-3,2.5,col(255,255,255,.9));
}

function draw(t){
  // sky
  const g=X.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#ffe3f2');g.addColorStop(.55,'#e3dcff');g.addColorStop(1,'#d8ecff');
  X.fillStyle=g;X.fillRect(0,0,W,H);
  // big rainbow
  for(let i=0;i<6;i++){X.strokeStyle=RAINBOW[i];X.lineWidth=24;X.globalAlpha=.8;X.beginPath();X.arc(W/2,-140,300+i*24,Math.PI*0.15,Math.PI*0.85);X.stroke();}
  X.globalAlpha=1;
  cloud(t,0,220,120,46);cloud(t,1,760,80,52);cloud(t,2,1350,140,42);
  // ground
  ell(W/2,H/2+40,760,470,col(190,235,185));
  ell(W/2,H/2+40,740,455,col(205,240,195));
  ell(W/2,H/2+10,560,330,col(220,245,205));
  // paths (cream)
  X.strokeStyle=col(255,245,225,.9);X.lineCap='round';
  X.lineWidth=56;X.beginPath();X.moveTo(800,560);X.lineTo(800,150);X.stroke();
  X.beginPath();X.moveTo(800,560);X.lineTo(1250,300);X.stroke();
  X.beginPath();X.moveTo(800,560);X.lineTo(1250,780);X.stroke();
  X.beginPath();X.moveTo(800,560);X.lineTo(350,780);X.stroke();
  X.beginPath();X.moveTo(800,560);X.lineTo(350,300);X.stroke();
  X.lineWidth=30;X.strokeStyle=col(255,248,232,.9);
  X.beginPath();X.arc(800,560,150,0,7);X.stroke();
  // zones
  chocolatePond(1250,780,190,130,t);
  house(320,830,46);house(430,800,40);house(360,900,36);
  for(let i=0;i<6;i++)gumdropTree(180+i*90,180+(i%2)*60,46,t);
  for(let i=0;i<5;i++)gumdropTree(560+i*70,120+(i%2)*50,40,t);
  for(let i=0;i<4;i++)bush(140+i*80,430+(i%2)*40,26);
  for(let i=0;i<5;i++){lollipop(1140+i*70,220+(i%2)*55,30,t);lollipop(1370,380,26,t);lollipop(1190,420,24,t);}
  bush(880,700,30);bush(700,760,28);bush(950,860,32);bush(620,640,26);
  // gates
  gate(800,150,t);gate(1280,660,t);gate(330,650,t);
  // portal + rick
  portal(800,560,t);rick(710,600,t);
  // unicorns
  unicorn(1160,690,t,1);unicorn(1320,230,t,-1);
  // tommy lurking at forest edge
  tommy(500,430,t);
  // beth near portal (talk=1 — репліка активна)
  beth(920,650,t,1);
  // shards (7 rainbow colors)
  const SH=[[400,200],[1300,180],[1250,880],[280,860],[900,430],[540,520],[1130,620]];
  for(let i=0;i<7;i++)shard(SH[i][0],SH[i][1],RAINBOW[i],t,i);
  // candy dots
  for(const d of DOTS){X.globalAlpha=.5;circ(d[0],d[1],d[2],DOTS_C[d[3]]);}
  X.globalAlpha=1;
  // vignette
  const v=X.createRadialGradient(W/2,H/2,300,W/2,H/2,1000);
  v.addColorStop(0,col(0,0,0,0));v.addColorStop(1,col(40,20,60,.28));
  X.fillStyle=v;X.fillRect(0,0,W,H);
  // title
  X.textAlign='center';X.textBaseline='middle';
  X.font='900 76px system-ui,sans-serif';
  X.lineWidth=10;X.strokeStyle=col(90,60,110,.55);X.strokeText('FROOPYLAND',W/2,58);
  X.fillStyle='#fff3fa';X.fillText('FROOPYLAND',W/2,58);
  X.font='600 22px system-ui,sans-serif';
  X.fillStyle=col(120,80,140,.85);X.fillText('BETH & RICK',W/2,104);
}

(function loop(){draw(T());requestAnimationFrame(loop)})();
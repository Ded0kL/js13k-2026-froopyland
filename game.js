const W=1600,H=1000,GH=848,CV=document.getElementById('c'),X=CV.getContext('2d');
let cw=0,chh=0,DPR=1,SS=1,OX=0,OY=0,PNH=132;
function resize(){const w=document.documentElement.clientWidth,h=document.documentElement.clientHeight;if(w==cw&&h==chh)return;cw=w;chh=h;DPR=M.min(2,devicePixelRatio||1);CV.width=M.round(cw*DPR);CV.height=M.round(chh*DPR);PNH=M.max(104,M.min(200,M.max(cw*.17,chh*.16)))}
const T=()=>performance.now()/1000,RB=['#ff6b81','#ffa502','#ffd32a','#2ed573','#18dcff','#a55eea'];
let AC=0;const initA=()=>{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)()};
const snd=(f,d,t,v,sl)=>{if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.linearRampToValueAtTime(f+sl,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)};
const burp=()=>{for(let i=0;i<7;i++)setTimeout(()=>snd(50+i*9,.1,'sawtooth',.4,-25),i*65)};
const ding=()=>{snd(880,.07,'square',.12);setTimeout(()=>snd(1318,.1,'square',.12),70)};
const neigh=()=>snd(650,.3,'square',.12,350),hurt=()=>snd(90,.4,'sawtooth',.3,-40),step=()=>snd(85+M.random()*40,.045,'triangle',.05);
const clock=()=>snd(1200,.05,'square',.1),okS=()=>{snd(660,.08,'square',.12);setTimeout(()=>snd(990,.12,'square',.12),80)};
const scratch=()=>snd(1600+M.random()*700,.03,'triangle',.05),tone=i=>snd([520,660,830][i],.28,'square',.12);
const floorY=f=>780-f*160,LAD=[300,800,1300],nl=x=>LAD.reduce((a,b)=>M.abs(b-x)<M.abs(a-x)?b:a);
const B={x:150,y:floorY(0),f:0,q:[]},R={x:1450,f:4};
const U=[];for(let i=0;i<3;i++)U.push({x:500+i*300,f:i+1,y:floorY(i+1),wx:0,wt:0,nc:0,st:0});
let ph=0,got=0,win=0,stepT=0,LOT=0,PZS=0,FNG=0,FLS=0,CR={on:0,x:0,y:0,f:0,p:0};
let MENU=1;const startGame=()=>{initA();MENU=0;initL0()};const menuBtn=()=>{const bw=M.min(340,cw*.62),bh=M.max(56,M.min(74,chh*.08));return[cw/2-bw/2,chh*.44-bh/2,bw,bh]};
const DBG=[['GAR',initL0],['NEST',initL1],['CELLS',initCells],['TRACE',initTr],['GATE',initGate],['TOMMY',initL2],['DNA',initL3]],dbgBtn=i=>[10+i*(cw-20)/DBG.length+3,chh-46,(cw-20)/DBG.length-6,34];
let TR=0,TRC=0;
const dlg={w:'RICK',s:''};const say=(w,s)=>{dlg.w=w;dlg.s=s};
let DQ=[],ST=0,after=0,DLT=0;
const setQ=(qs,cb)=>{DLT=T();DQ=qs.map(x=>x.slice());ST=0;after=cb||0;if(DQ[0])say(DQ[0][0],DQ[0][1])};
const nxt=()=>{DLT=T();ST++;if(DQ[ST])say(DQ[ST][0],DQ[ST][1]);else{DQ=[];ST=0;if(after){const f=after;after=0;f()}}};
const M=Math,bq="*burp* ",wu="Wubba lubba dub dub!",fl="flip it AND its neighbour",cd="chalk door",so="say sorry",wl="Walk it off. WALK IT OFF.",ht="hatchlings",zp="zap them";
const CS1=[['BETH',"Dad, the news says they're executing Tommy's father today! We have to go back to Froopyland and stop it!"],['RICK',bq+"Alright Beth. I drew the "+cd+" on the wall, but the quantum projector is completely fried!"],['RICK',"Some carbon lifeform compressed my system into a 13KB hackathon build! There's no memory left for auto-booting!"]];
const CS2=[['RICK',"W-welcome to Froopyland, sweetie! "+bq+"Built every leaf when you were nine! Child-proofed to hell — NOTHING here can go wrong!"],['BETH',"You built me a murder jungle, Dad."],['RICK',"A SAFE murder jungle! Relax and — hold on. Is that pony wearing WINGS? I did not install wings."]];
const GRABQ=[['RICK',"LET GO OF ME, YOU OVERGROWN PONY! "+bq+"It thinks I'm its BABY, Beth!"],['BETH',"Very cute. Taking pictures."],['RICK',ht+" incoming and they think I'm FOOD! TAP to "+zp+" — three bites and I'm dinner!"]];
const CSW=[['RICK',wu+" Mama-pony saw me zap her "+ht+" and made me pack leader! "+bq+"Nature is EASY."],['BETH',"Kidnapped by a unicorn mom — and proud."],['RICK',"Allegedly! Now: five memory cells — bring 'em to me ONE at a time, I'll stick 'em into the matrix. Rainbow ladders go UP. Froupies chase — RUN! MOVE IT!"]];
const CS3=[['BETH',"He wanted me to "+so+"?! Screw that! I'd rather slaughter this whole place than apologize!"],['RICK',"Whoa! You literally just murdered him! Total psychopath, just like your old man. Grab his severed finger!"],['RICK',"Get the finger to the top portal! We need his DNA code before his dad gets executed!"]];
const CS4=[['BETH',"The court execution starts in 30 seconds! Put the finger in the machine and clone him, Dad!"],['RICK',"I'm trying! The sequencer chokes on this mutated DNA on a 13KB budget!"]];
const TS_TAUNT=["STABBY STABBY!","Say "+so+"! SAY IT!","Froopyland-grade knives, Aunt Beth!"],TS_CATCH="You brought a KNIFE?! I'm ELEVEN! ...Ugh, FINE. En garde, aunt Beth!";
// L0: 3 pipes × 5 segments; click flips segment s and s+1 of active pipe
let PZ=[];
const pipeOK=i=>PZ[i].every(v=>!v);
const PTXT=['Froupie in the wires? CLICK the segment to '+fl+'! Every rainbow to 0°!','One down! '+fl+' — zero the pipe!','Half a projector left! Same trick: '+fl+'!','Last pipe! Zero it and the '+cd+' opens!'];
function initL0(){ph=0;PZS=0;PZ=[];for(let i=0;i<4;i++){const p=[0,0,0,0,0,0,0];for(let k=0;k<9;k++){const s=M.floor(M.random()*6);p[s]^=1;p[s+1]^=1}PZ.push(p)}setQ(CS1,()=>say('RICK',PTXT[0]))}
function clickSeg(s){const p=PZ[PZS];p[s]^=1;if(s+1<7)p[s+1]^=1;clock();if(pipeOK(PZS)){okS();PZS++;if(PZS>3)setQ([['RICK',"Power's linked! The "+cd+" is open — GO!"]],initL1);else say('RICK',PTXT[PZS])}}
// L1: 3 memory cells
const CELLS=[[250,0],[1300,2],[800,3],[400,4],[1150,4]].map(([x,f])=>({x,f,g:0}));
function initL1(){win=0;ph=6;got=0;NG={s:0,k:0,hp:3,t:0,sp:1,en:[],sh:[],mx:1650,my:140,rx:680,ry:floorY(0)};B.x=560;B.y=floorY(0);B.f=0;B.q=[];for(const c of CELLS)c.g=0;U.forEach((o,i)=>{o.f=i+1;o.y=floorY(i+1);o.x=500+i*300;o.st=0;o.wt=0});setQ(CS2,()=>{NG.s=1;NG.t=0;neigh()})}
function initCells(){win=0;ph=1;got=0;CR={on:0,x:0,y:0,f:0,p:0};B.x=150;B.y=floorY(0);B.f=0;B.q=[];for(const c of CELLS)c.g=0;U.forEach((o,i)=>{o.f=i+1;o.y=floorY(i+1);o.x=500+i*300;o.st=0;o.wt=0})}
function wuni(x,gy,s,t){const fl=M.sin(t*9+x);X.save();X.translate(x,gy-58*s);X.scale(s,s);for(const d of[-1,1]){X.save();X.scale(d,1);X.rotate(-.2-fl*.4);X.fillStyle='rgba(255,255,255,.9)';X.strokeStyle='#000';X.lineWidth=2.2;X.lineJoin='round';X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(30,-14,54,-4);X.quadraticCurveTo(38,0,42,8);X.quadraticCurveTo(22,8,12,5);X.quadraticCurveTo(5,5,0,0);X.closePath();X.fill();X.stroke();X.restore()}X.restore();uni(x,gy,s,t)}
function nestUpd(t,dt){if(NG.s!=1&&NG.s!=3&&NG.s!=4)return;NG.t+=dt;
 if(NG.s==1){let mx,my;
  if(NG.t<1.1){mx=1650-950*NG.t/1.1;my=140+590*NG.t/1.1;NG.rx=680;NG.ry=floorY(0)}
  else if(NG.t<1.35){mx=700;my=730}
  else{const p=M.min(1,(NG.t-1.35)/1.55);mx=700+100*p;my=730-490*p;NG.rx=mx;NG.ry=my+62;if(p>=1){NG.s=2;NG.t=0;NG.mx=1120;NG.my=190;NG.rx=800;NG.ry=222;setQ(GRABQ,()=>{NG.s=4;NG.t=0;NG.en=[];NG.sh=[]});return}NG.mx=mx;NG.my=my;return}}
 if(NG.s==4){NG.mx+=420*dt;NG.my-=240*dt;if(NG.t>2.2){NG.s=3;NG.t=0;NG.en=[];NG.sh=[]}return}
 if(NG.s==3&&NG.k>=10&&!NG.x2){NG.x2=1;NG.en=[];NG.sh=[];NG.t=0;setQ([['RICK',"Wait — "+bq+"— MORE of them?!"],['BETH',"Round two, Dad."],['RICK',"SECOND COURSE! Same drill: zap the "+ht+", protect the nest!"]],()=>{NG.s=3;NG.t=0})}
 if(NG.t>NG.sp&&NG.en.length<5){NG.t=0;NG.sp=M.max(.5,1.2-NG.k%10*.06);NG.en.push({x:M.random()<.5?-70:1670,y:170+M.random()*250})}
 for(const e of NG.en){const dx=800-e.x,dy=182-e.y,d=M.hypot(dx,dy)||1,v=2+NG.k*.13;e.x+=dx/d*v*dt*60;e.y+=dy/d*v*dt*60;
  if(d<48){e.g=1;NG.hp--;hurt();if(NG.hp>0)say('RICK',"OW! "+bq+"They're snacking on me! "+zp+"!")}}
 NG.en=NG.en.filter(e=>!e.g);
 if(NG.hp<=0){NG.hp=3;NG.en=[];NG.sp=1.5;say('RICK',"NOT dying in a horse's nest today! "+bq+"FIRE, Beth!")}
 for(const b of NG.sh){b.x+=b.dx*dt*60;b.y+=b.dy*dt*60;for(const e of NG.en)if(!e.g&&M.abs(b.x-e.x)<30&&M.abs(b.y-(e.y-36))<30){e.g=1;b.d=1;NG.k++;snd(180,.12,'sawtooth',.12,-120);break}}
 NG.sh=NG.sh.filter(b=>!b.d&&b.x>-90&&b.x<1690&&b.y>-90&&b.y<940);
 if(NG.k>=20){NG.s=5;FLS=t;NG.rx=620;NG.ry=floorY(0);ding();setQ(CSW,initCells)}}
function nestDraw(t){beth(B.x,B.y,1.6,dlg.w=='BETH',t);
 if(NG.s==1||NG.s==2||NG.s==4)wuni(NG.mx,NG.my,1.9,t);
 if(NG.s==3)for(const e of NG.en)wuni(e.x,e.y,.62,t+e.x*.01);
 X.strokeStyle='#7a4a20';X.lineWidth=6;X.beginPath();X.ellipse(800,252,88,26,0,0,7);X.stroke();
 X.lineWidth=3.5;X.beginPath();X.moveTo(724,250);X.quadraticCurveTo(800,276,876,250);X.moveTo(740,238);X.lineTo(856,262);X.moveTo(748,264);X.lineTo(850,236);X.stroke();
 rick(NG.rx,NG.ry,.8,DQ.length>0&&dlg.w=='RICK',t);
 X.strokeStyle='#7a4a20';X.lineWidth=6;X.beginPath();X.moveTo(726,252);X.quadraticCurveTo(800,278,874,252);X.stroke();
 for(const b of NG.sh){X.strokeStyle=RB[b.c%6];X.lineWidth=5;X.beginPath();X.moveTo(b.x,b.y);X.lineTo(b.x-b.dx*3,b.y-b.dy*3);X.stroke()}}
// ph2: trace the chalk counter-door; ph3: memory gate (Simon); ph4: Tommy fight
const DK=[[1280,340],[1280,270],[1292,215],[1325,180],[1368,170],[1408,192],[1425,235],[1425,340]],GDX=[140,260,380];
let TRP=[],GSEQ=[],GSTEP=0,GPL=0,GSHOW=0,GAT=0,GR=0,GERR=0,GLK=0,GOP=0,GT=0;
function initTr(){ph=2;TRP=[];B.x=150;B.y=floorY(2);B.f=2;B.q=[];setQ([['RICK',"Tommy sealed his arena with a "+cd+" lock! Hold and drag along the dots!"],['TOMMY',"You'll never draw it right! You failed drawing AND me, aunt Beth!"]])}
function trPt(m){for(const p of DK)if(M.hypot(m[0]-p[0],m[1]-p[1])<34)return p;return 0};
function trAdd(p){const l=TRP[TRP.length-1];if(l&&l[0]==p[0]&&l[1]==p[1])return;
 if(TRP.length<DK.length&&DK[TRP.length][0]==p[0]&&DK[TRP.length][1]==p[1]){TRP.push(p);scratch();
  if(TRP.length==DK.length){okS();setQ([['BETH',"Chalk beats chalk, kiddo."],['TOMMY',"MOM! She's abusing CAUSALITY!"]],initGate)}return}
 if(TRP.length&&DK[TRP.length-1][0]==p[0]&&DK[TRP.length-1][1]==p[1]){TRP.pop();return}
 if(TRP.length)TRP.length=0}
function initGate(){ph=3;GSEQ=[0,0,0].map(()=>M.floor(M.random()*3));GSTEP=0;GPL=0;GSHOW=0;GAT=0;GR=0;GERR=0;GOP=0;CELLS.forEach(c=>c.u=0);B.x=150;B.y=floorY(2);B.f=2;B.q=[];setQ([['TOMMY',"So you brought the cells? Cute. The gate eats wrong answers, girl!"],['RICK',"A memory gate! Click the cells in the SAME order it shows. Mess up — Tommy gets a good laugh."]])}
function gateClick(i){if(!GAT)return;tone(i);CELLS[i].u=1;
 if(i==GSEQ[GPL]){GPL++;if(GPL==3){GAT=0;ding();setQ([['TOMMY',"FINE! Come through. I'll carve that 'sorry' outta you myself!"]],()=>{GOP=1;route(700,floorY(2))})}}
 else{GERR=T();GR++;GPL=0;GSTEP=0;GAT=0;GSHOW=0;CELLS.forEach(c=>c.u=0);hurt()}}
// L2: Tommy fight
let TK={x:900,f:2,dead:0,cd:0},KNIVES=[];
let NG={s:0,k:0,hp:3,t:0,sp:1,en:[],sh:[],mx:1650,my:140,rx:680,ry:780};
function initL2(){ph=4;FNG=0;TK={x:1450,f:2,dead:0,cd:T()+1.2,wx:1300,wt:0,tc:0};KNIVES=[];B.x=120;B.y=floorY(0);B.f=0;B.q=[];setQ([['TOMMY',TS_CATCH],['RICK',"There he is! Cross the arena, dodge the knives!"]])}
function killScene(){TK.dead=1;hurt();KNIVES=[];snd(150,.5,'sawtooth',.3,-100);setQ(CS3,()=>{FNG=1;say('RICK',"Now grab the finger!")})}
function caught2(t){hurt();B.x=120;B.f=0;B.y=floorY(0);B.q=[];KNIVES=[];TK.x=1450;TK.f=2;TK.cd=t+1.5;TK.wx=1300;TK.wt=0;say('RICK',FNG?"Don't lose the finger! Again!":"You got stabbed?! "+wl)}
// L3: Lights Out DNA (generated solvable from all-green)
let LO=[],GS=[];
function initL3(){ph=5;LOT=30;LO=[[0,0,0,0],[0,0,0,0],[0,0,0,0]];GS=[];for(let k=0;k<6;k++){const r=1+M.floor(M.random()*2),c=M.floor(M.random()*4);GS.push([r,c]);loFlip(r,c,1)}if(loWon()){GS.push([1,0]);loFlip(1,0,1)}setQ(CS4,()=>say('RICK',"Click a node to "+fl+"! Clear each row by clicking the row BELOW it!"))}
function loFlip(r,c,silent){for(const[dr,dc]of[[0,0],[0,1],[0,-1],[1,0],[-1,0]]){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<3&&nc>=0&&nc<4)LO[nr][nc]^=1}if(!silent)clock()}
const loWon=()=>LO.every(row=>row.every(v=>!v));
function route(px,py){const tf=M.max(0,M.min(4,M.round((780-py)/160)));B.q=[];
 if(tf!=B.f){const l=nl(B.x);B.q.push([l,floorY(B.f)],[l,floorY(tf)])}
 B.q.push([M.max(30,M.min(W-30,px)),floorY(tf)])}
const K={};
onkeydown=e=>{initA();const k=e.key.toLowerCase();K[k]=1;if(k.includes('arrow')||k==' ')e.preventDefault();
 if(MENU){if(k=='enter'||k==' '||k=='e')startGame();return}
 if(DQ.length){if((k=='enter'||k==' '||k=='e')&&T()-DLT>.4)nxt();return}
 if(win&&k=='enter')location.reload()};
onkeyup=e=>K[e.key.toLowerCase()]=0;
function ptr(e){const r=CV.getBoundingClientRect();return[(e.clientX-r.left-OX)/SS,(e.clientY-r.top-OY)/SS]}
let J=0;
CV.onpointerdown=e=>{initA();
 if(MENU){const[mx,my]=ptr(e),[bx,by,bw,bh]=menuBtn();if(mx>bx&&mx<bx+bw&&my>by&&my<by+bh)startGame();else{for(let i=0;i<DBG.length;i++){const[dx,dy,dw,dh]=dbgBtn(i);if(mx>dx&&mx<dx+dw&&my>dy&&my<dy+dh){initA();MENU=0;DBG[i][1]();break}}return}}
 const r0=CV.getBoundingClientRect(),sy=e.clientY-r0.top;
 if(DQ.length){if(sy>chh-PNH&&T()-DLT>.4)nxt();return}
 if(win){location.reload();return}
 const[mx,my]=ptr(e);TR=0;
 if(ph==6){if(NG.s==3){const dx=mx-800,dy=my-185,d=M.hypot(dx,dy)||1;NG.sh.push({x:800,y:185,dx:dx/d*10,dy:dy/d*10,c:NG.k});snd(760,.06,'square',.07,-260)}return}  if(ph==0){if(mx>620&&mx<1200&&my>200&&my<560){const i=M.max(0,M.min(3,M.floor((my-225)/90))),s=M.max(0,M.min(6,M.floor((mx-760)/60)));clickSeg(s)}return}
 if(ph==2){const p=trPt([mx,my]);if(p){if(TRP.length==DK.length){TRP=[];TRC=0}trAdd(p);TR=1}return}
 if(ph==3){for(let i=0;i<3;i++)if(M.abs(mx-(GDX[i]+800))<55&&M.abs(my-(floorY(2)-70))<55){gateClick(i);return}
  if(e.pointerType=='touch'){J={id:e.pointerId,x:mx,y:my};B.q=[];return}route(mx,my);return}
 if(ph==5){if(mx>900&&mx<1400&&my>140&&my<600){const c=M.floor((mx-920)/110),r=M.floor((my-160)/150);if(r>=0&&r<3&&c>=0&&c<4){loFlip(r,c);if(loWon()){win=1;say('RICK',wu+" The clone is ready! We saved a life without having to "+so+". Grab a beer, kiddo — we are amoral geniuses.");burp()}}}return}
 if(e.pointerType=='touch'){if(M.hypot(mx-B.x,my-(B.y-40))<60){J=0;B.q=[];return}J={id:e.pointerId,x:mx,y:my};B.q=[];return}
 route(mx,my)};
CV.onpointermove=e=>{if(!e.buttons||DQ.length||win)return;const[mx,my]=ptr(e);
 if(ph==2){if(TR){const p=trPt([mx,my]);if(p)trAdd(p)}return}
 if(J&&e.pointerId==J.id){J.x=mx;J.y=my;return}
 if(ph!=1&&ph!=3&&ph!=4)return;route(mx,my)};
const jend=e=>{if(J&&e.pointerId==J.id)J=0};
CV.onpointerup=jend;CV.onpointercancel=jend;
function moveB(t,dt){const vx=(K.arrowright||K.d?1:0)-(K.arrowleft||K.a?1:0),vy=(K.arrowdown||K.s?1:0)-(K.arrowup||K.w?1:0);
 let ax=vx,ay=vy;
 if(!ax&&!ay&&J){const dx=J.x-B.x;if(M.abs(dx)>26)ax=M.sign(dx);const dy=J.y-40-B.y;if(M.abs(B.x-nl(B.x))<26&&M.abs(dy)>30)ay=M.sign(dy)}
 if(ax||ay){B.q=[];B.x=M.max(30,M.min(W-30,B.x+ax*3*dt*60));if(ay&&M.abs(B.x-nl(B.x))<26)B.y=M.max(floorY(4),M.min(floorY(0),B.y+ay*2.6*dt*60));else B.y+=(floorY(B.f)-B.y)*M.min(1,8*dt)}
 else if(B.q[0]){const p=B.q[0],dx=p[0]-B.x,dy=p[1]-B.y;if(M.abs(dx)<8&&M.abs(dy)<8)B.q.shift();else{B.x+=M.sign(dx)*M.min(3*dt*60,M.abs(dx));B.y+=M.sign(dy)*M.min(2.6*dt*60,M.abs(dy))}}
 B.f=M.max(0,M.min(4,M.round((780-B.y)/160)));
 if(vx||vy||B.q[0]&&t>stepT){stepT=t+.22;step()}}
let chSaid=0;
function update(t,dt){if(win||DQ.length)return;
 if(ph==0)return;
 if(ph==6){nestUpd(t,dt);return}
 if(ph==5){LOT-=dt;if(LOT<=0){initL3();say('RICK',"Time's up! The court granted ONE continuance. Move!")}return}
 moveB(t,dt);
 if(ph==2){if(TRP.length==DK.length){TRC+=dt;if(TRC>2.5){TRC=0;TRP=[]}}return}
 if(ph==3){if(GSHOW&&!GAT&&!GOP){if(t-GSHOW>2){GAT=1;GSHOW=0}else if(t-GT>.55){GT=t;const i=GSEQ[GSTEP];tone(i);CELLS[i].s=t}}
  else if(!GAT&&!GOP&&t-GERR>1){GSTEP=0;GPL=0;GSHOW=T()}
  if(GOP&&B.x>660)initL2();
  return}
 if(ph==4){if(!TK.dead){
   if(t>TK.wt){TK.wx=1150+M.random()*350;TK.wt=t+2+M.random()*2}
   TK.x+=M.sign(TK.wx-TK.x)*M.min(1.1*dt*60,M.abs(TK.wx-TK.x));
   if(t>TK.cd&&M.abs(TK.x-B.x)<980){TK.cd=t+1.6;if(M.random()<.3&&!DQ.length)say('TOMMY',TS_TAUNT[M.floor(M.random()*TS_TAUNT.length)]);const dx=B.x-TK.x,dy=B.y-46-(floorY(TK.f)-34),d=M.hypot(dx,dy)||1;KNIVES.push({x:TK.x,y:floorY(TK.f)-34,dx:dx/d*5.5,dy:dy/d*5.5-1.6,f:TK.f});snd(220,.09,'square',.1)}
   if(TK.f==B.f&&M.abs(TK.x-B.x)<44)killScene()}
  for(const kn of KNIVES){if(kn.s)continue;kn.x+=kn.dx;kn.y+=kn.dy;kn.dy+=.16;
   const fB=M.max(0,M.min(4,M.floor((780-kn.y)/160)));
   if(kn.dy>0&&kn.y>=floorY(fB)){kn.y=floorY(fB);kn.s=1}
   if(M.abs(kn.x-B.x)<24&&M.abs(kn.y-(B.y-30))<42){caught2(t);return}}
  if(FNG==1&&TK.dead&&B.f==TK.f&&M.abs(B.x-TK.x)<46){FNG=2;okS();say('BETH',"Ew. It's sticky.");say('RICK',"Get the finger to the TOP PORTAL before the 13KB buffer overflows! RUN!")}
  if(FNG==2&&B.f==4&&M.abs(B.x-1330)<110)initL3();
  return}
 // ph 1
 if(!CR.on)for(const c of CELLS)if(!c.g&&c.f==B.f&&M.abs(c.x-B.x)<32){c.g=1;got++;CR={on:1,x:B.x,y:B.y,f:B.f,p:0};FLS=t;ding();say('BETH',got<5?['Got one.','Ew. Sticky.','Three more to find.','Two more to find.','Last one.'][got-1]:"That's all five! Here you go, Dad.");break}
 if(CR.on){CR.p+=dt;const tf=CR.f>=2?2:CR.f,spd=CR.p<.7?0:1;
  if(spd){if(B.f!=tf){if(M.abs(B.x-800)<12){B.y+=M.sign(floorY(tf)-B.y)*2.6*dt*60;if(M.abs(B.y-floorY(tf))<5)B.f=tf}else B.x+=M.sign(800-B.x)*3*dt*60}
  else if(M.abs(B.x-740)>10)B.x+=M.sign(740-B.x)*3*dt*60;
  else{CR.on=0;okS();R.x=680;R.f=2;if(got==5)setQ([['RICK',"All five! Matrix online. Now find Tommy — and Beth? Do what you gotta do."]],initTr);else say('RICK',["One cell in! Four to go, sweetie!","Two cells! "+bq+"Keep 'em coming!","Three! You're a natural cell-smuggler!","Four! One more and I can hack it!"][got-1])}}
  B.q=[]}
 let chase=0;
 for(const o of U){if(t<o.st)continue;
  if(o.f==B.f&&M.abs(B.x-o.x)<32){if(CR.on){CELLS.push({x:CR.x,f:CR.f,g:0});CR.on=0;got--}B.x=120;B.f=0;B.y=floorY(0);B.q=[];hurt();say('RICK',"They got you?! "+wl);U.forEach(u=>u.st=t+3);return}
  let tx,tf;
  if(o.f==B.f&&M.abs(B.x-o.x)<380){tx=B.x;tf=B.f;chase=1;if(t>o.nc){o.nc=t+2.5;neigh()}}
  else{if(t>o.wt){o.wx=120+M.random()*1360;o.wt=t+3+M.random()*3}tx=o.wx;tf=o.f}
  if(o.f!=tf){if(M.abs(o.x-800)<12){const ty=floorY(tf);o.y+=M.sign(ty-o.y)*1.7*dt*60;if(M.abs(o.y-ty)<5){o.f=tf;o.y=ty}}else o.x+=M.sign(800-o.x)*1.7*dt*60}
  else{o.x+=M.sign(tx-o.x)*M.min(1.7*dt*60,M.abs(tx-o.x));o.y=floorY(o.f)}}
 if(chase&&!chSaid){chSaid=1;say('BETH',"They're chasing me!")}
 if(!chase)chSaid=0}
function beth(x,gy,s,tk,t){const b=M.sin(t*1.3)*1.2;X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(x,gy+4,26*s,9*s,0,0,7);X.fill();
 X.save();X.translate(x-25*s,gy-46*s+b);X.scale(s,s);X.strokeStyle=X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(25,1);const HB=[22,2,14,6,10,14,9,24,10,34,14,42,20,44,26,44,32,42,37,34,40,24,39,14,35,6,28,2];for(let i=0;i<HB.length;i+=2)X.lineTo(HB[i],HB[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(15,14);X.lineTo(15,30);X.quadraticCurveTo(15,38,24,38);X.quadraticCurveTo(33,38,33,30);X.lineTo(33,14);X.stroke();
 X.beginPath();X.arc(19,21,2.5,0,7);X.moveTo(30.5,21);X.arc(28,21,2.5,0,7);X.stroke();
 X.beginPath();X.arc(19,21,.6,0,7);X.moveTo(28.6,21);X.arc(28,21,.6,0,7);X.fill();
 X.beginPath();X.moveTo(21,38);X.lineTo(21,43);X.moveTo(27,38);X.lineTo(27,43);X.stroke();
 X.lineWidth=tk?1.6+M.abs(M.sin(t*9))*.8:1.6;X.beginPath();X.moveTo(21,31);X.quadraticCurveTo(24,tk?31+M.sin(t*9)*1.5:32,27,31);X.stroke();X.restore()}
function rick(x,gy,s,tk,t){const b=M.sin(t*1.3)*1.2;X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(x,gy+4,24*s,8*s,0,0,7);X.fill();
 X.save();X.translate(x-50*s,gy-84*s+b);X.scale(s,s);X.strokeStyle=X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(50,5);const HA=[50,6,38,26,16,31,31,48,29,71,50,62,71,71,69,48,84,31,62,26];for(let i=0;i<HA.length;i+=2)X.lineTo(HA[i],HA[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(38,35);X.lineTo(38,60);X.quadraticCurveTo(38,72,50,72);X.quadraticCurveTo(62,72,62,60);X.lineTo(62,35);X.stroke();
 X.lineWidth=2;X.beginPath();X.moveTo(36,28);X.quadraticCurveTo(50,24,64,28);X.stroke();
 X.lineWidth=1.6;X.beginPath();X.arc(43,38,6,0,7);X.moveTo(63,38);X.arc(57,38,6,0,7);X.stroke();
 X.beginPath();X.arc(43,38,1,0,7);X.moveTo(58,38);X.arc(57,38,1,0,7);X.fill();
 X.lineWidth=tk?1.6+M.abs(M.sin(t*9)):1.6;X.beginPath();X.moveTo(45,54);X.quadraticCurveTo(50,tk?54+M.sin(t*9)*2.5:55,55,54);X.stroke();X.restore()}
function uni(x,gy,s,t){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(x,gy+3,26*s,8*s,0,0,7);X.fill();
 X.save();X.translate(x,gy-29*s+M.sin(t*2+x)*2);X.scale(s,s);X.translate(-50,-56);X.lineWidth=2.5;X.strokeStyle=X.fillStyle='#000';X.lineJoin=X.lineCap='round';
 X.beginPath();X.roundRect(22,28,56,56,18);X.stroke();
 X.beginPath();X.moveTo(26,32);X.quadraticCurveTo(16,16,26,12);X.quadraticCurveTo(34,18,33,29);X.moveTo(74,32);X.quadraticCurveTo(84,16,74,12);X.quadraticCurveTo(66,18,67,29);X.stroke();
 X.beginPath();X.moveTo(44,29);X.lineTo(50,2);X.lineTo(56,29);X.stroke();
 X.beginPath();X.moveTo(46,21);X.lineTo(54,21);X.stroke();
 X.beginPath();X.arc(38,52,7.5,0,7);X.moveTo(69.5,52);X.arc(62,52,7.5,0,7);X.fill();
 X.fillStyle='#fff';X.beginPath();X.arc(39.5,49.5,2.2,0,7);X.moveTo(65.7,49.5);X.arc(63.5,49.5,2.2,0,7);X.fill();X.fillStyle='#000';
 X.beginPath();X.moveTo(23,68);X.quadraticCurveTo(50,58,77,68);X.stroke();
 X.restore()}
function tommy(x,gy,s,dead){X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(x,gy+4,24*s,8*s,0,0,7);X.fill();
 X.save();X.translate(x-50*s,gy-56*s);X.scale(s,s);X.lineWidth=1.6;X.strokeStyle=X.fillStyle=dead?'#777':'#000';X.lineJoin='round';
 X.beginPath();X.moveTo(35,23);X.quadraticCurveTo(20,30,26,52);X.lineTo(38,70);X.lineTo(50,85);X.lineTo(62,70);X.lineTo(74,52);X.quadraticCurveTo(80,30,65,23);X.quadraticCurveTo(50,15,35,23);X.stroke();
 X.beginPath();X.moveTo(37,23);X.lineTo(37,48);X.quadraticCurveTo(37,54,50,54);X.quadraticCurveTo(63,54,63,48);X.lineTo(63,23);X.stroke();
 X.beginPath();X.moveTo(35,24);X.lineTo(31,14);X.lineTo(39,18);X.lineTo(43,11);X.lineTo(47,18);X.lineTo(54,14);X.lineTo(50,25);X.stroke();
 X.beginPath();X.arc(44,33,5.5,0,7);X.moveTo(61.5,33);X.arc(56,33,5.5,0,7);X.stroke();
 X.beginPath();X.arc(44.8,33,.8,0,7);X.moveTo(dead?47.8:56.8,33);X.arc(dead?47:56,33,.8,0,7);X.fill();
 X.beginPath();X.moveTo(44,57);X.quadraticCurveTo(50,58,56,57);X.stroke();X.restore()}
function bgDecor(t){const d=ph==4;
 X.globalAlpha=d?.07:.16;for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=11;X.beginPath();X.arc(800,880,430+i*13,M.PI,0);X.stroke()}X.globalAlpha=1;
 X.fillStyle=d?'rgba(70,50,70,.6)':'rgba(255,255,255,.8)';
 for(let i=0;i<4;i++){const cx=((t*14+i*430)%(W+320))-160,cy=105+i*95;X.beginPath();X.arc(cx,cy,26,0,7);X.arc(cx+30,cy-11,19,0,7);X.arc(cx+58,cy+2,22,0,7);X.fill()}
 X.fillStyle=d?'#41513d':'#93df8f';X.beginPath();X.ellipse(280,858,280,120,0,0,7);X.fill();X.beginPath();X.ellipse(1180,858,320,140,0,0,7);X.fill();
 for(let i=0;i<3;i++){const tx=[700,480,1230][i],ty=floorY([0,2,3][i]);
  X.strokeStyle=d?'#4a4a4a':'#a97b50';X.lineWidth=8;X.beginPath();X.moveTo(tx,ty);X.lineTo(tx,ty-52);X.stroke();
  X.fillStyle=d?'#6a6a6a':['#ff8fa3','#ffd32a','#7bdff2'][i];X.beginPath();X.arc(tx,ty-64,24,0,7);X.fill();
  X.fillStyle='rgba(255,255,255,.35)';X.beginPath();X.arc(tx-8,ty-72,8,0,7);X.fill()}}
function cam(){const m=chh>cw,dvw=ph==2?420:ph==3?760:ph==6?(m?700:960):ph==0?(m?920:1600):ph==5?(m?1220:1600):m?900:1600;
 SS=M.min(cw/dvw,(chh-PNH)*W/(dvw*GH));
 const fx=ph==2?1355:ph==3?1085:ph==0?960:ph==5?740:ph==6?800:B.x,fy=ph==2?250:ph==3?430:ph==0?424:ph==5?390:ph==6?(NG.s==1?(NG.t<1.1?540:M.max(330,M.min(540,NG.my))):NG.s>1&&NG.s<5?330:640):B.y-60;
 const vw=cw/SS,vh=(chh-PNH)/SS,cx=M.max(vw/2,M.min(W-vw/2,fx)),cy=vh>=GH?GH/2:M.max(vh/2,M.min(GH-vh/2,fy));
 OX=cw/2-cx*SS;OY=(chh-PNH)/2-cy*SS}
function drawMenu(t){const gy=chh*.7,s=M.min(1.1,M.max(.55,M.min(cw/1150,chh/900)));
 const g=X.createLinearGradient(0,0,0,chh);g.addColorStop(0,'#a5e3ff');g.addColorStop(1,'#e6ffd9');X.fillStyle=g;X.fillRect(0,0,cw,chh);
 X.globalAlpha=.22;for(let i=0;i<3;i++){X.strokeStyle=RB[i*2];X.lineWidth=14;X.beginPath();X.arc(cw/2,chh*1.28,cw*.45+i*18,M.PI,0);X.stroke()}X.globalAlpha=1;
 X.textAlign='center';X.fillStyle='#111';
 X.font='900 '+M.round(M.min(84,cw*.11))+'px system-ui';X.fillText('FROOPYLAND',cw/2,chh*.2);
 X.fillStyle=RB[1];X.font='700 '+M.round(M.min(22,cw*.035))+'px system-ui';X.fillText('🦄 UNICORNS & RAINBOWS — js13k 2026',cw/2,chh*.2+M.min(42,cw*.055));
 const[bx,by,bw,bh]=menuBtn(),pu=1+M.sin(t*3)*.03;
 X.save();X.translate(cw/2,by+bh/2);X.scale(pu,pu);X.fillStyle='#2ed573';X.strokeStyle='#1a8f4a';X.lineWidth=4;X.beginPath();X.roundRect(-bw/2,-bh/2,bw,bh,16);X.fill();X.stroke();
 X.fillStyle='#fff';X.font='800 '+M.round(bh*.4)+'px system-ui';X.fillText('▶  PLAY',0,bh*.15);X.restore();
 const names=['RICK','BETH','UNICORN','TOMMY'],sp=M.min(170,cw/4.4),x0=cw/2-sp*1.5;
 rick(x0,gy,s*.9,0,t);beth(x0+sp,gy,s*.9,0,t);uni(x0+sp*2,gy,s*.9,t);tommy(x0+sp*3,gy,s*.9,0);
 X.font='700 12px system-ui';for(let i=0;i<DBG.length;i++){const[dx,dy,dw,dh]=dbgBtn(i);X.fillStyle='#1d2b22';X.strokeStyle='#2ed573';X.lineWidth=2;X.beginPath();X.roundRect(dx,dy,dw,dh,8);X.fill();X.stroke();X.fillStyle='#aaa';X.fillText(DBG[i][0],dx+dw/2,dy+21)}
 X.fillStyle='#333';X.font='700 '+M.round(M.max(11,M.min(15,cw*.026)))+'px system-ui';
 for(let i=0;i<4;i++)X.fillText(names[i],x0+i*sp,gy+26)}
function draw(t){resize();X.setTransform(DPR,0,0,DPR,0,0);if(MENU){drawMenu(t);return}cam();const GA=chh-PNH,tk=DQ.length>0;
 if(ph==0||ph==5)X.fillStyle='#161616';else{const d=ph==4,g=X.createLinearGradient(0,0,0,GA);g.addColorStop(0,d?'#6a4a5a':'#a5e3ff');g.addColorStop(1,d?'#40303f':'#e6ffd9');X.fillStyle=g}
 X.fillRect(0,0,cw,chh);
 X.setTransform(DPR*SS,0,0,DPR*SS,OX*DPR,OY*DPR);
 if(ph>0&&ph!=5)bgDecor(t);
 if(ph>0){for(const l of LAD)for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=5;X.beginPath();X.moveTo(l+(i-2.5)*5,floorY(4)-4);X.lineTo(l+(i-2.5)*5,floorY(0)+6);X.stroke()}
  for(let f=0;f<5;f++){X.fillStyle=ph==4?'#57724f':'#43a047';X.fillRect(0,floorY(f),W,14);X.fillStyle=ph==4?'#41563c':'#2e7d32';X.fillRect(0,floorY(f)+14,W,4)}
  const hot=ph==4&&FNG==2;X.fillStyle='#555';X.beginPath();X.arc(1330,floorY(4)-60,46,0,7);X.fill();
  if(hot)for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=7;X.beginPath();X.arc(1330,floorY(4)-60,52+i*6,t*2+i,t*2+i+4.4);X.stroke()}
  X.fillStyle=hot?'#fff':'#aaa';X.beginPath();X.arc(1330,floorY(4)-60,30,0,7);X.fill()}
 if(ph==2||ph==3){X.strokeStyle='#fff';X.lineWidth=3;X.setLineDash([9,7]);X.strokeRect(1255,150,200,220);X.setLineDash([])}
 if(ph==2){X.globalAlpha=.18;X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.moveTo(1280,340);for(const p of DK)X.lineTo(p[0],p[1]);X.stroke();X.globalAlpha=1;
  X.font='600 20px system-ui';X.textAlign='center';X.fillStyle='#ddd';X.fillText('chalk lock — hold & trace the dots',1355,135);
  X.fillStyle='#fff';for(const p of DK){X.beginPath();X.arc(p[0],p[1],5,0,7);X.fill()}
  X.lineCap='round';for(let i=0;i<TRP.length;i++){X.strokeStyle=RB[i%6];X.lineWidth=7;X.beginPath();X.moveTo(...TRP[i?i-1:i]);X.lineTo(...TRP[i]);X.stroke()}}
 if(ph==3){X.font='600 20px system-ui';X.textAlign='center';X.fillStyle='#ddd';X.fillText('memory gate — repeat the order',1085,110);
  for(let i=0;i<3;i++){const gx=GDX[i]+800,gy=floorY(2)-70,fl=GAT&&GSTEP<3&&CELLS[i].s&&T()-CELLS[i].s<.35;
   X.fillStyle=fl?RB[i*2]:'#244';X.strokeStyle='#000';X.lineWidth=3;X.beginPath();X.roundRect(gx-45,gy-45,90,90,12);X.fill();X.stroke();
   X.fillStyle='#ffd32a';X.beginPath();X.roundRect(gx-8,gy-34,16,32,3);X.fill();X.strokeRect(gx-3,gy-39,6,5);
   if(CELLS[i].u){X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.arc(gx,gy,54,0,7);X.stroke()}
   if(GERR&&T()-GERR<.6){X.strokeStyle='#ff6b81';X.lineWidth=6;X.beginPath();X.moveTo(gx-25,gy-25);X.lineTo(gx+25,gy+25);X.moveTo(gx+25,gy-25);X.lineTo(gx-25,gy+25);X.stroke()}}}
 if(ph==1)for(const c of CELLS)if(!c.g){const y=floorY(c.f)-26+M.sin(t*2+c.x)*3;X.fillStyle='#ffd32a';X.strokeStyle='#000';X.lineWidth=2;
  X.beginPath();X.roundRect(c.x-9,y-16,18,32,3);X.fill();X.stroke();X.strokeRect(c.x-4,y-21,8,5);
  X.fillStyle='#000';X.font='700 16px system-ui';X.textAlign='center';X.fillText('+',c.x,y+7)}
 if(ph==1&&CR.on){const y=floorY(B.f)-46+M.sin(t*4)*3;X.fillStyle='#ffd32a';X.strokeStyle='#000';X.lineWidth=2;
  X.beginPath();X.roundRect(B.x-9,y-16,18,32,3);X.fill();X.stroke();X.strokeRect(B.x-4,y-21,8,5);
  X.fillStyle='#000';X.font='700 16px system-ui';X.textAlign='center';X.fillText('+',B.x,y+7)}
 if(ph==0||ph==5){X.fillStyle='#1e1e1e';X.fillRect(0,0,W,848);X.strokeStyle='#2a2a2a';X.lineWidth=2;
  for(let x=80;x<W;x+=160){X.beginPath();X.moveTo(x,0);X.lineTo(x,828);X.stroke()}
  X.fillStyle='#161616';X.fillRect(0,828,W,20);X.fillStyle='#333';X.fillRect(0,828,W,3);
  X.fillStyle='#3a3a3a';for(let x=40;x<W;x+=160)for(let y=60;y<780;y+=180){X.beginPath();X.arc(x,y,3,0,7);X.fill()}}
 if(ph==0){X.strokeStyle='#3f3f3f';X.lineWidth=2;X.strokeRect(60,690,100,100);X.strokeRect(170,730,60,60);
  X.beginPath();X.moveTo(60,690);X.lineTo(160,790);X.moveTo(160,690);X.lineTo(60,790);X.stroke();
  X.strokeRect(50,330,130,8);X.fillStyle='#18dcff';X.globalAlpha=.5;X.fillRect(80,290,16,40);X.globalAlpha=1;
  X.strokeStyle='#3f3f3f';X.beginPath();X.moveTo(640,0);X.lineTo(640,86);X.stroke();X.fillStyle='#ffd32a';X.globalAlpha=.55;X.beginPath();X.arc(640,96,8,0,7);X.fill();X.globalAlpha=.07;X.beginPath();X.arc(640,96,64,0,7);X.fill();X.globalAlpha=1;
  X.strokeStyle='#fff';X.lineWidth=3;X.setLineDash([9,7]);X.strokeRect(1260,340,180,240);X.setLineDash([]);
  X.globalAlpha=.25;X.lineWidth=1;for(let y=360;y<570;y+=30){X.beginPath();X.moveTo(1275,y);X.lineTo(1425,y+14);X.stroke()}X.globalAlpha=1;
  X.fillStyle='#fff';X.beginPath();X.arc(1428,470,5,0,7);X.fill();
  X.font='600 20px system-ui';X.textAlign='center';X.fillText('chalk door',1350,325);
  X.strokeStyle=PZS>3?'#2ed573':'#4a4a4a';X.lineWidth=5;X.beginPath();X.moveTo(1200,430);X.quadraticCurveTo(1240,455,1258,468);X.stroke();
  if(PZS>3){X.globalAlpha=.8;for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=5;X.beginPath();X.arc(1350,460,40+i*8,t*2+i,t*2+i+4.4);X.stroke()}X.globalAlpha=1}
  X.fillStyle='#111';X.strokeStyle='#888';X.lineWidth=4;X.beginPath();X.roundRect(620,200,580,360,12);X.fill();X.stroke();
  X.fillStyle='#000';X.fillRect(640,220,540,320);
  for(let i=0;i<4;i++){const py=258+i*82,act=i==PZS;
   for(let s=0;s<7;s++){const px=760+s*60,on=PZ[i][s];
    X.save();X.translate(px,py);X.rotate(on*M.PI/2);
    X.strokeStyle=on?'#666':RB[(i*2+s)%6];X.lineWidth=act?8:6;X.beginPath();X.moveTo(-25,0);X.lineTo(25,0);X.stroke();X.restore()}
   X.fillStyle=RB[i];X.beginPath();X.arc(714,py,10,0,7);X.fill();
   if(act){X.fillStyle='#fff';X.font='700 17px system-ui';X.textAlign='left';X.fillText('▶ CLICK TO ROTATE → 0°',724,py-32)}}
  X.fillStyle='#777';X.font='600 18px system-ui';X.textAlign='center';X.fillText('QUANTUM PROJECTOR v13.0 — BOOT SECTOR STRIPPED (13KB LIMIT)',960,590)}
 if(ph==5){X.strokeStyle='#4a4a4a';X.lineWidth=4;X.beginPath();X.moveTo(335,300);X.quadraticCurveTo(440,330,540,225);X.stroke();
  X.beginPath();X.moveTo(685,225);X.quadraticCurveTo(790,400,880,575);X.stroke();
  X.strokeStyle='#888';X.lineWidth=4;X.strokeRect(150,180,180,320);
  X.fillStyle='#18dcff';X.globalAlpha=.22;X.fillRect(150,180,180,320);X.globalAlpha=1;
  X.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<3;i++){const by=460-((t*40+i*110)%280);X.beginPath();X.arc(195+i*40,by,3+i%2*2,0,7);X.fill()}
  X.fillStyle='#9aa';X.beginPath();X.ellipse(240,432,26,52,0,0,7);X.fill();
  X.fillStyle='#2b2b2b';X.fillRect(130,500,220,26);X.fillStyle='#111';X.fillRect(150,486,180,14);
  X.fillStyle='#888';X.font='600 18px system-ui';X.textAlign='center';X.fillText('CLONE CAPSULE',240,548);
  X.fillStyle='#222';X.strokeStyle='#666';X.lineWidth=3;X.beginPath();X.roundRect(540,170,140,92,8);X.fill();X.stroke();
  X.fillStyle='#111';X.fillRect(556,186,108,26);
  X.fillStyle='#0f0';X.globalAlpha=.5+.5*M.sin(t*7);X.beginPath();X.arc(662,182,4,0,7);X.fill();X.globalAlpha=1;
  X.fillStyle='#fce4d6';X.strokeStyle='#000';X.lineWidth=2;X.beginPath();X.roundRect(580,150,50,22,10);X.fill();X.stroke();
  X.fillStyle='#888';X.font='600 18px system-ui';X.fillText("Tommy's finger → sequencer",608,138);
  X.fillStyle='#2b2b2b';X.strokeStyle='#666';X.beginPath();X.roundRect(880,556,470,54,8);X.fill();X.stroke();
  for(let i=0;i<6;i++){X.fillStyle=RB[i];X.globalAlpha=.35+.65*M.abs(M.sin(t*3+i));X.beginPath();X.arc(916+i*70,583,7,0,7);X.fill()}X.globalAlpha=1;
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){const gx=920+c*110,gy=160+r*150;
   X.fillStyle=LO[r][c]?'#333':'#2ed573';X.strokeStyle='#888';X.lineWidth=3;
   X.beginPath();X.roundRect(gx,gy,90,90,10);X.fill();X.stroke();
   if(LO[r][c]){X.strokeStyle='#ff6b81';X.lineWidth=7;X.lineCap='round';X.beginPath();X.moveTo(gx+22,gy+22);X.lineTo(gx+68,gy+68);X.moveTo(gx+68,gy+22);X.lineTo(gx+22,gy+68);X.stroke()}}
  X.fillStyle='#888';X.font='600 18px system-ui';X.fillText('DNA MATRIX — flip every node to green',1160,140)}
 if(ph==4){for(const kn of KNIVES){X.save();X.translate(kn.x,kn.y);X.rotate(M.atan2(kn.dy,kn.dx)+M.PI/2);
   X.strokeStyle='#000';X.lineWidth=3;X.beginPath();X.moveTo(0,-11);X.lineTo(0,11);X.moveTo(0,-11);X.lineTo(4,-5);X.moveTo(0,-11);X.lineTo(-4,-5);X.stroke();X.restore()}
  const gy=floorY(TK.f);tommy(TK.x,gy,1,TK.dead);
  if(!TK.dead&&TK.f==B.f&&M.abs(TK.x-B.x)<400){X.fillStyle='#000';X.font='900 32px system-ui';X.textAlign='center';X.fillText('!',TK.x,gy-84)}
  if(TK.dead){X.fillStyle='#777';X.font='700 20px system-ui';X.fillText('RIP',TK.x-14,gy-70);
   if(FNG==1){const y=gy-14+M.sin(t*3)*3;X.fillStyle='#fce4d6';X.strokeStyle='#000';X.lineWidth=2;X.beginPath();X.roundRect(TK.x-18,y,36,15,7);X.fill();X.stroke()}}}
 if(ph>0&&ph<5){rick(ph==1?680:R.x,floorY(2),.62,dlg.w=='RICK'&&DQ.length>0,t);if(ph==1)for(const o of U)uni(o.x,o.y,1,t);beth(B.x,B.y,1.6,dlg.w=='BETH',t)}else if(ph==6)nestDraw(t);else{rick(430,830,1.6,dlg.w=='RICK'&&DQ.length>0,t);beth(700,830,1.6,dlg.w=='BETH',t)}

 X.setTransform(DPR,0,0,DPR,0,0);
 if(ph==4){X.fillStyle='rgba(255,60,60,'+(.05+.04*M.sin(t*5))+')';X.fillRect(0,0,cw,GA)}
 if(ph==1&&t-FLS<.3){X.fillStyle='rgba(255,255,255,'+((1-(t-FLS)/.3)*.4)+')';X.fillRect(0,0,cw,GA)}
 X.fillStyle=ph==0||ph==5?'#ddd':(ph==5&&LOT<10?'#ff6b6b':'#111');X.font='800 '+M.round(PNH*.15)+'px system-ui';X.textAlign='left';X.textBaseline='alphabetic';
 X.fillText(ph==0?'CABLES '+PZS+'/4':ph==1?'CELLS '+got+'/5'+(CR.on?' — BRING IT TO RICK':''):ph==2?'TRACE THE CHALK DOOR':ph==3?(GOP?'GO! → GATE':'MEMORY GATE'):ph==4?(FNG==2?'RUN ↑':FNG==1?'TAKE THE FINGER':'DODGE · REACH TOMMY'):ph==6?(NG.s==3?'HP '+NG.hp+' — ZAPPED '+NG.k+'/20':'FROOPYLAND'):'EXECUTION IN '+M.max(0,LOT).toFixed(1)+'s',16,M.round(PNH*.19));
 X.fillStyle='rgba(255,255,255,.95)';X.strokeStyle='#333';X.lineWidth=2;
 X.beginPath();X.roundRect(8,chh-PNH+8,cw-16,PNH-14,14);X.fill();X.stroke();
 if(DQ.length){X.strokeStyle='#2ed573';X.lineWidth=3.5+M.sin(t*7)*1.5;X.beginPath();X.roundRect(3,chh-PNH+3,cw-6,PNH-4,18);X.stroke()}
 const pb=PNH-30,px0=12+pb/2,py0=chh-10;
 if(dlg.w=='RICK')rick(px0,py0,pb/79,tk,t);else if(dlg.w=='BETH')beth(px0,py0,pb/50,tk,t);else if(dlg.w=='TOMMY')tommy(px0,py0-29*pb/83,pb/83,0);else uni(px0,py0-56*pb/85,pb/85,t);
 const tx0=8+pb+22,LW=cw-tx0-26;
 X.fillStyle='#111';X.font='800 '+M.round(PNH*.14)+'px system-ui';X.fillText(dlg.w,tx0,chh-PNH+PNH*.32);
 let fs=M.round(PNH*.19),lines;
 for(;;){X.font='500 '+fs+'px system-ui';lines=[];let ln='';
  for(const wd of dlg.s.split(' ')){if(X.measureText(ln+wd).width>LW){lines.push(ln);ln=''}ln+=wd+' '}
  if(ln)lines.push(ln);
  if(lines.length*fs*1.18<=PNH*.72||fs<=10)break;fs-=1}
 let yy=chh-PNH+PNH*.4+fs*1.1;X.font='500 '+fs+'px system-ui';
 for(const l of lines){X.fillText(l,tx0,yy);yy+=fs*1.18}
 if(DQ.length){X.fillStyle='#2a9d5c';X.font='800 '+M.round(PNH*.15)+'px system-ui';X.textAlign='right';X.fillText('tap ▸',cw-20,chh-14)}
 X.fillStyle=ph==0||ph==5?'#777':'rgba(0,0,0,.35)';X.font='600 11px monospace';X.textAlign='left';X.fillText('v4',cw-30,chh-PNH-8)
 if(win){X.fillStyle='rgba(255,255,255,.78)';X.fillRect(0,0,cw,chh);X.fillStyle='#111';X.font='900 '+M.round(M.min(84,cw*.08))+'px system-ui';X.textAlign='center';X.fillText('TOMMY LIVES. YOU MONSTER.',cw/2,chh/2);X.font='600 '+M.round(M.min(30,cw*.045))+'px system-ui';X.fillText('tap — once more',cw/2,chh/2+70)}}
let lt=T();(function L(){const t=T(),dt=M.min(t-lt,.05);lt=t;update(t,dt);draw(t);requestAnimationFrame(L)})();

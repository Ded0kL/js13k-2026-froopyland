const W=1600,H=1000,CV=document.getElementById('c'),X=CV.getContext('2d');CV.width=W;CV.height=H;
const T=()=>performance.now()/1000,RB=['#ff6b81','#ffa502','#ffd32a','#2ed573','#18dcff','#a55eea'];
let AC=0;const initA=()=>{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)()};
const snd=(f,d,t,v,sl)=>{if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.linearRampToValueAtTime(f+sl,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)};
const burp=()=>{for(let i=0;i<7;i++)setTimeout(()=>snd(50+i*9,.1,'sawtooth',.4,-25),i*65)};
const ding=()=>{snd(880,.07,'square',.12);setTimeout(()=>snd(1318,.1,'square',.12),70)};
const neigh=()=>snd(650,.3,'square',.12,350),hurt=()=>snd(90,.4,'sawtooth',.3,-40),step=()=>snd(85+Math.random()*40,.045,'triangle',.05);
const floorY=f=>780-f*160,LAD=[300,800,1300],nl=x=>LAD.reduce((a,b)=>Math.abs(b-x)<Math.abs(a-x)?b:a);
const B={x:150,y:floorY(0),f:0,q:[]},R={x:1450,f:4};
const BAT=[];for(const[x,f]of[[150,0],[1450,0],[250,1],[1350,1],[150,2],[1450,2],[450,3],[1150,3]])BAT.push({x,f,g:0});
const U=[];for(let i=0;i<3;i++)U.push({x:500+i*300,f:i+1,y:floorY(i+1),st:0,wx:0,wt:0,nc:0});
let got=0,win=0,story=0,stepT=0,chSaid=0;
const dlg={w:'RICK',s:''};
const say=(w,s)=>{dlg.w=w;dlg.s=s};
const ST=[['RICK',"Beth! The portal's dead. My gun needs power cells. Eight of 'em."],['BETH',"Eight?! Where am I supposed to find eight?!"],['RICK',"Scattered across Froopyland's floors. See the rainbows? They connect them. Climb."],['BETH',"Great. And the local unicorns look... angry."],['RICK',"Froupies LOVE batteries. Grab all eight and bring them to me and the portal up top. Don't get trampled!"]];
const nxt=()=>{story++;if(story<5)say(ST[story][0],ST[story][1])};
say(ST[0][0],ST[0][1]);
function route(px,py){const tf=Math.max(0,Math.min(4,Math.round((780-py)/160)));B.q=[];
 if(tf!=B.f){const l=nl(B.x);B.q.push([l,floorY(B.f)],[l,floorY(tf)])}
 B.q.push([Math.max(30,Math.min(W-30,px)),floorY(tf)])}
const K={};
onkeydown=e=>{initA();const k=e.key.toLowerCase();K[k]=1;if(k.includes('arrow')||k==' ')e.preventDefault();
 if(story<5){if(k=='enter'||k==' '||k=='e')nxt();return}
 if(win&&k=='enter')location.reload()};
onkeyup=e=>K[e.key.toLowerCase()]=0;
CV.onpointerdown=e=>{initA();if(story<5){nxt();return}if(win){location.reload();return}
 const r=CV.getBoundingClientRect();route((e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height)};
CV.onpointermove=e=>{if(!e.buttons||story<5||win)return;const r=CV.getBoundingClientRect();route((e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height)};
function caught(t){if(got>0){BAT.push({x:B.x,f:B.f,g:0});got--}B.x=120;B.f=0;B.y=floorY(0);B.q=[];hurt();say('RICK',"They got you?! Walk it off. WALK IT OFF.");for(const o of U)o.stun=t+3}
function update(t,dt){if(story<5||win)return;
 const vx=(K.arrowright||K.d?1:0)-(K.arrowleft||K.a?1:0),vy=(K.arrowdown||K.s?1:0)-(K.arrowup||K.w?1:0);
 if(vx||vy){B.q=[];B.x=Math.max(30,Math.min(W-30,B.x+vx*3*dt*60));if(vy&&Math.abs(B.x-nl(B.x))<20)B.y=Math.max(floorY(4),Math.min(floorY(0),B.y+vy*2.6*dt*60));else B.y+=(floorY(B.f)-B.y)*Math.min(1,8*dt)}
 else if(B.q[0]){const p=B.q[0],dx=p[0]-B.x,dy=p[1]-B.y;if(Math.abs(dx)<8&&Math.abs(dy)<8)B.q.shift();else{B.x+=Math.sign(dx)*Math.min(3*dt*60,Math.abs(dx));B.y+=Math.sign(dy)*Math.min(2.6*dt*60,Math.abs(dy))}}
 B.f=Math.max(0,Math.min(4,Math.round((780-B.y)/160)));
 if(vx||vy||B.q[0]&&t>stepT){stepT=t+.22;step()}
 for(const b of BAT)if(!b.g&&b.f==B.f&&Math.abs(b.x-B.x)<32){b.g=1;got++;ding();say('BETH',['Got one.','Ew. Sticky.','Still not eight.'][got%3]);if(got==8)say('RICK',"All eight! Get up here — to the portal!")}
 if(got==8&&B.f==4&&Math.abs(B.x-1380)<100){win=1;say('RICK',"WUBBA LUBBA DUB DUB! We're going *BUUUURP* home!");burp();return}
 let chase=0;
 for(const o of U){if(t<o.stun)continue;
  if(o.f==B.f&&Math.abs(B.x-o.x)<32){caught(t);continue}
  let tx,tf;
  if(o.f==B.f&&Math.abs(B.x-o.x)<380){tx=B.x;tf=B.f;chase=1;if(t>o.nc){o.nc=t+2.5;neigh()}}
  else{if(t>o.wt){o.wx=120+Math.random()*1360;o.wt=t+3+Math.random()*3}tx=o.wx;tf=o.f}
  if(o.f!=tf){if(Math.abs(o.x-tx)<10){const ty=floorY(tf);o.y+=Math.sign(ty-o.y)*1.7*dt*60;if(Math.abs(o.y-ty)<5){o.f=tf;o.y=ty}}else o.x+=Math.sign(tx-o.x)*1.7*dt*60}
  else{o.x+=Math.sign(tx-o.x)*Math.min(1.7*dt*60,Math.abs(tx-o.x));o.y=floorY(o.f)}}
 if(chase&&!chSaid){chSaid=1;say('BETH',"They're chasing me!")}
 if(!chase)chSaid=0}
function beth(x,gy,s,tk,t){const b=Math.sin(t*1.3)*1.2;X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(x,gy+4,26*s,9*s,0,0,7);X.fill();
 X.save();X.translate(x-25*s,gy-46*s+b);X.scale(s,s);X.strokeStyle=X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(25,1);const HB=[20,2,16,4,13,6,11,8,10,11,9,15,8,20,9,25,8,30,7,35,9,40,12,42,16,43,20,42,23,40,25,38,27,40,30,42,34,43,38,42,41,40,43,35,42,30,41,25,42,20,41,15,40,11,39,8,37,6,34,4,30,2];for(let i=0;i<HB.length;i+=2)X.lineTo(HB[i],HB[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(15,14);X.lineTo(15,30);X.quadraticCurveTo(15,38,24,38);X.quadraticCurveTo(33,38,33,30);X.lineTo(33,14);X.stroke();
 X.beginPath();X.arc(19,21,2.5,0,7);X.stroke();X.beginPath();X.arc(28,21,2.5,0,7);X.stroke();
 X.beginPath();X.arc(19,21,.6,0,7);X.fill();X.beginPath();X.arc(28,21,.6,0,7);X.fill();
 X.beginPath();X.moveTo(21,38);X.lineTo(21,43);X.moveTo(27,38);X.lineTo(27,43);X.moveTo(14,46);X.lineTo(21,43);X.lineTo(24,46);X.lineTo(27,43);X.lineTo(34,46);X.stroke();
 X.lineWidth=tk?1.6+Math.abs(Math.sin(t*9))*.8:1.6;X.beginPath();X.moveTo(21,31);X.quadraticCurveTo(24,tk?31+Math.sin(t*9)*1.5:32,27,31);X.stroke();X.restore()}
function rick(x,gy,s,tk,t){const b=Math.sin(t*1.3)*1.2;X.fillStyle='rgba(0,0,0,.18)';X.beginPath();X.ellipse(x,gy+4,24*s,8*s,0,0,7);X.fill();
 X.save();X.translate(x-50*s,gy-84*s+b);X.scale(s,s);X.strokeStyle=X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(50,5);const HA=[58,22,77,16,68,33,87,40,70,51,81,67,62,65,61,84,48,70,35,84,34,65,15,67,26,51,9,40,28,33,19,16,38,22];for(let i=0;i<HA.length;i+=2)X.lineTo(HA[i],HA[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(38,35);X.lineTo(38,60);X.quadraticCurveTo(38,72,50,72);X.quadraticCurveTo(62,72,62,60);X.lineTo(62,35);X.stroke();
 X.lineWidth=2;X.beginPath();X.moveTo(36,28);X.quadraticCurveTo(50,24,64,28);X.stroke();
 X.lineWidth=1.6;X.beginPath();X.arc(43,38,6,0,7);X.stroke();X.beginPath();X.arc(57,38,6,0,7);X.stroke();
 X.beginPath();X.arc(43,38,1,0,7);X.fill();X.beginPath();X.arc(57,38,1,0,7);X.fill();
 X.beginPath();X.moveTo(47,43);X.quadraticCurveTo(50,47,53,43);X.stroke();
 X.lineWidth=tk?1.6+Math.abs(Math.sin(t*9)):1.6;X.beginPath();X.moveTo(45,54);X.quadraticCurveTo(50,tk?54+Math.sin(t*9)*2.5:55,55,54);X.stroke();X.restore()}
function uni(x,gy,s,tk,t){X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(x,gy+3,26*s,8*s,0,0,7);X.fill();
 X.save();X.translate(x,gy-29*s+Math.sin(t*2+x)*2);X.scale(s,s);X.translate(-50,-56);X.lineWidth=2.5;X.strokeStyle=X.fillStyle='#000';X.lineJoin=X.lineCap='round';
 X.beginPath();X.roundRect(22,28,56,56,18);X.stroke();
 X.beginPath();X.moveTo(26,32);X.quadraticCurveTo(16,16,26,12);X.quadraticCurveTo(34,18,33,29);X.stroke();
 X.beginPath();X.moveTo(27,26);X.quadraticCurveTo(22,18,26,16);X.stroke();
 X.beginPath();X.moveTo(74,32);X.quadraticCurveTo(84,16,74,12);X.quadraticCurveTo(66,18,67,29);X.stroke();
 X.beginPath();X.moveTo(73,26);X.quadraticCurveTo(78,18,74,16);X.stroke();
 X.beginPath();X.moveTo(44,29);X.lineTo(50,2);X.lineTo(56,29);X.stroke();
 X.beginPath();X.moveTo(46,21);X.lineTo(54,21);X.moveTo(48,13);X.lineTo(52,13);X.stroke();
 X.beginPath();X.arc(38,52,7.5,0,7);X.fill();X.beginPath();X.arc(62,52,7.5,0,7);X.fill();
 X.fillStyle='#fff';X.beginPath();X.arc(39.5,49.5,2.2,0,7);X.fill();X.beginPath();X.arc(63.5,49.5,2.2,0,7);X.fill();
 X.beginPath();X.arc(35.5,55.5,1.1,0,7);X.fill();X.beginPath();X.arc(59.5,55.5,1.1,0,7);X.fill();X.fillStyle='#000';
 X.save();if(tk)X.translate(0,Math.sin(t*9)*1.5);
 X.beginPath();X.moveTo(23,68);X.quadraticCurveTo(50,58,77,68);X.stroke();
 X.beginPath();X.arc(41,74,1.5,0,7);X.fill();X.beginPath();X.arc(59,74,1.5,0,7);X.fill();X.restore();X.restore()}
function draw(t){X.fillStyle='#cfcfcf';X.fillRect(0,0,W,H);
 for(const l of LAD)for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=5;X.beginPath();X.moveTo(l+(i-2.5)*5,floorY(4)-4);X.lineTo(l+(i-2.5)*5,floorY(0)+6);X.stroke()}
 for(let f=0;f<5;f++){X.fillStyle='#43a047';X.fillRect(0,floorY(f),W,14);X.fillStyle='#2e7d32';X.fillRect(0,floorY(f)+14,W,4)}
 const hot=got==8||win;X.fillStyle='#555';X.beginPath();X.arc(1330,floorY(4)-60,46,0,7);X.fill();
 if(hot)for(let i=0;i<6;i++){X.strokeStyle=RB[i];X.lineWidth=7;X.beginPath();X.arc(1330,floorY(4)-60,52+i*6,t*2+i,t*2+i+4.4);X.stroke()}
 X.fillStyle=hot?'#fff':'#aaa';X.beginPath();X.arc(1330,floorY(4)-60,30,0,7);X.fill();
 for(const b of BAT)if(!b.g){const y=floorY(b.f)-26+Math.sin(t*2+b.x)*3;X.fillStyle='#ffd32a';X.strokeStyle='#000';X.lineWidth=2;
  X.beginPath();X.roundRect(b.x-9,y-16,18,32,3);X.fill();X.stroke();X.strokeRect(b.x-4,y-21,8,5);
  X.fillStyle='#000';X.font='700 16px system-ui';X.textAlign='center';X.fillText('+',b.x,y+7)}
 rick(R.x,floorY(4),.62,dlg.w=='RICK'&&story<5,t);
 for(const o of U)uni(o.x,o.y,1,0,t);
 beth(B.x,B.y,1.6,dlg.w=='BETH',t);
 X.fillStyle='#111';X.font='700 26px system-ui';X.textAlign='left';X.textBaseline='alphabetic';X.fillText('CELLS '+got+'/8',30,44);
 X.fillStyle='rgba(255,255,255,.95)';X.strokeStyle='#333';X.lineWidth=3;
 X.beginPath();X.roundRect(20,848,W-40,132,14);X.fill();X.stroke();
 X.beginPath();X.roundRect(34,860,108,108,10);X.stroke();
 if(dlg.w=='RICK')rick(88,960,1.1,1,t);else if(dlg.w=='BETH')beth(88,958,1.95,1,t);else uni(88,952,1.3,1,t);
 X.fillStyle='#111';X.font='800 22px system-ui';X.textAlign='left';X.fillText(dlg.w,156,886);
 X.font='500 25px system-ui';let ln='',yy=918;for(const wd of dlg.s.split(' ')){if(X.measureText(ln+wd).width>W-240){X.fillText(ln,156,yy);yy+=30;ln=''}ln+=wd+' '}X.fillText(ln,156,yy);
 if(story<5){X.fillStyle='#666';X.font='600 18px system-ui';X.textAlign='right';X.fillText('click / space ▸',W-40,962)}
 if(win){X.fillStyle='rgba(255,255,255,.78)';X.fillRect(0,0,W,H);X.fillStyle='#111';X.font='900 84px system-ui';X.textAlign='center';X.fillText('YOU ESCAPED FROOPYLAND',W/2,H/2);X.font='600 30px system-ui';X.fillText('Enter — once more',W/2,H/2+70)}}
let lt=T();(function L(){const t=T(),dt=Math.min(t-lt,.05);lt=t;update(t,dt);draw(t);requestAnimationFrame(L)})();

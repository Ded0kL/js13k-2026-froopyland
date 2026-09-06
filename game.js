const W=1600,H=1000,CV=document.getElementById('c'),X=CV.getContext('2d');CV.width=W;CV.height=H;
const T=()=>performance.now()/1000,col=(r,g,b,a=1)=>{const v=.3*r+.59*g+.11*b|0;return`rgba(${v},${v},${v},${a})`};
const circ=(x,y,r,c)=>{X.fillStyle=c;X.beginPath();X.arc(x,y,r,0,7);X.fill()};
const ell=(x,y,rx,ry,c)=>{X.fillStyle=c;X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);X.fill()};
const rr=(x,y,w,h,r,c)=>{X.fillStyle=c;X.beginPath();X.roundRect(x-w/2,y-h/2,w,h,r);X.fill()};
const poly=(p,c)=>{X.fillStyle=c;X.beginPath();X.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)X.lineTo(p[i][0],p[i][1]);X.closePath();X.fill()};
const RAINBOW=['#ff6b81','#ffa94d','#ffe066','#8ce99a','#74c0fc','#b197fc'];
const GR=['#ececec','#d8d8d8','#c2c2c2','#ababab','#949494','#7d7d7d'];
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
let AC=0;const initA=()=>{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)()};
const snd=(f,d,t,v,sl)=>{if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.linearRampToValueAtTime(f+sl,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)};
const burp=()=>{for(let i=0;i<7;i++)setTimeout(()=>snd(50+i*9,.1,'sawtooth',.4,-25),i*65)};
const ding=()=>{snd(880,.07,'square',.1);setTimeout(()=>snd(1318,.1,'square',.1),70)};
const growl=()=>snd(60,.4,'sawtooth',.32,-25);
const step=()=>snd(85+Math.random()*50,.045,'triangle',.05);
const hum=()=>snd(46,.9,'sine',.2);
const B={x:920,y:650},RICK={x:710,y:600};
const SHX=[400,1300,1250,280,900,540,1130],SHY=[200,180,880,860,430,520,620];
const SH=[];for(let i=0;i<7;i++)SH.push({x:SHX[i],y:SHY[i],g:0});
const BUSH=[[500,430],[620,640],[880,700],[700,760],[950,860],[1120,500]];
const WP=[[800,220],[1180,330],[1180,740],[420,740],[420,330]];
const Tm={x:420,y:330,st:0,tx:420,ty:330,wp:1,wa:0,lost:0};
let carry=-1,got=0,cand=3,bait=0,hid=0,win=0,msg=0,started=0,stepT=0,growlCd=0,hint=0,chSaid=0;
const say=(w,s,d)=>msg={w,s,u:T()+(d||3.2)};
const RICKS=["Toss it here! Portal's drinkin' it up.","Beautiful. One less thing to do.","Good. Keep 'em coming, Beth!","See? Kitty keeps the *evil* out."];
const BETHS=["Got one!","Ew. It's sticky.","Okay, okay, I'm moving."];
function throwBait(){if(cand&&!bait&&!win&&!hid){const dx=(K.arrowright||K.d?1:0)-(K.arrowleft||K.a?1:0),dy=(K.arrowdown||K.s?1:0)-(K.arrowup||K.w?1:0);bait={x:B.x+(dx||dy?dx*60:40),y:B.y+(dy||dx?dy*60:40),u:T()+6};cand--;Tm.st=3}}
function action(){if(win||hid)return;
 if(D(B,RICK)<80){if(carry>=0){SH[carry].g=1;carry=-1;got++;cand=Math.min(cand+1,5);ding();hum();say('RICK',RICKS[got%4]);if(got==7)say('RICK',"All seven! Portal's *hot*! Jump in!",4.5)}else say('RICK',["Whisper, Beth. Froupies have *big* ears.","See Tommy? Don't. Get. Caught.","Candy distracts him. Science."][Math.random()*3|0]);return}
 for(const b of BUSH)if(Math.hypot(B.x-b[0],B.y-b[1])<40){hid=1;if(!hint){hint=1;say('BETH',"I'll hide here. Dad, watch the portal.")}return}}
const K={};
onkeydown=e=>{initA();const k=e.key.toLowerCase();K[k]=1;
 if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();
 if(k==' ')throwBait();if(k=='e')action();if(k=='enter'&&win)location.reload()};
onkeyup=e=>K[e.key.toLowerCase()]=0;
function caught(){if(carry>=0){SH[carry].g=0;carry=-1}B.x=920;B.y=650;hid=0;Tm.st=0;Tm.wa=T()+1.6;growl();say('RICK',"He got you?! Walk it off. WALK IT OFF.")}
function update(t,dt){
 if(!started){started=1;say('RICK',"Beth! F-finally. The portal's dead. Seven shards, then we *burp* go home!",4.5)}
 const dx=(K.arrowright||K.d?1:0)-(K.arrowleft||K.a?1:0),dy=(K.arrowdown||K.s?1:0)-(K.arrowup||K.w?1:0),run=!(K.shift);
 if((dx||dy)&&!win&&!hid){const l=Math.hypot(dx,dy),sp=run?3:1.3;B.x+=dx/l*sp*dt*60;B.y+=dy/l*sp*dt*60;B.x=Math.max(60,Math.min(W-60,B.x));B.y=Math.max(60,Math.min(H-60,B.y));
  if(run&&t>stepT){stepT=t+.2;step();if(Tm.st<2&&D(B,Tm)<150){Tm.st=1;Tm.tx=B.x;Tm.ty=B.y}}}
 if(bait&&t>bait.u)bait=0;
 if(carry<0)for(let i=0;i<7;i++)if(!SH[i].g&&Math.hypot(B.x-SH[i].x,B.y-SH[i].y)<24){carry=i;SH[i].g=1;ding();say('BETH',BETHS[got%3])}
 if(got==7&&Math.hypot(B.x-800,B.y-560)<55){win=1;say('RICK',"WUBBA LUBBA DUB DUB! We're going *BUUUURP* home!",6);burp();return}
 const tvx=B.x-Tm.x,tvy=B.y-Tm.y,td=Math.hypot(tvx,tvy)||1;
 const go=(x,y,s)=>{const d=Math.hypot(x-Tm.x,y-Tm.y)||1;if(d>4){Tm.x+=(x-Tm.x)/d*s*dt*60;Tm.y+=(y-Tm.y)/d*s*dt*60}else return 1};
 if(win)return;
 if(Tm.wa>t)return;
 if(Tm.st==3&&bait){if(go(bait.x,bait.y,2.2)){Tm.wa=t+2;Tm.st=0;bait=0}}
 else if(Tm.st==2){if(hid||td>250){Tm.lost+=dt;if(Tm.lost>1.4){Tm.st=1;Tm.tx=B.x;Tm.ty=B.y;Tm.lost=0;chSaid=0}}else{Tm.lost=0;go(B.x,B.y,2.55);if(td<20)caught()}}
 else{if(!hid&&td<175){Tm.st=2;if(!chSaid){chSaid=1;say('RICK',"Tommy! Hide, Beth, HIDE!");growl()}}
  else if(Tm.st==1){if(go(Tm.tx,Tm.ty,1.9)){Tm.wa=t+1.1;Tm.st=0}}
  else{if(go(WP[Tm.wp][0],WP[Tm.wp][1],1.15))Tm.wp=(Tm.wp+1)%5}}
 if(td<120&&t>growlCd&&Tm.st!=2){growl();growlCd=t+1.7}}
function beth(x,y,t){const bob=Math.sin(t*1.3)*1.2,s=1.6;ell(x,y+25,31,12,col(30,20,40,hid?.08:.18));
 X.save();X.translate(x,y+27-46*s+bob);X.scale(s,s);X.globalAlpha=hid?.35:1;X.strokeStyle='#000';X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(25,1);const HB=[20,2,16,4,13,6,11,8,10,11,9,15,8,20,9,25,8,30,7,35,9,40,12,42,16,43,20,42,23,40,25,38,27,40,30,42,34,43,38,42,41,40,43,35,42,30,41,25,42,20,41,15,40,11,39,8,37,6,34,4,30,2];for(let i=0;i<HB.length;i+=2)X.lineTo(HB[i],HB[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(15,14);X.lineTo(15,30);X.quadraticCurveTo(15,38,24,38);X.quadraticCurveTo(33,38,33,30);X.lineTo(33,14);X.stroke();
 X.beginPath();X.arc(19,21,2.5,0,7);X.stroke();X.beginPath();X.arc(28,21,2.5,0,7);X.stroke();
 X.beginPath();X.arc(19,21,.6,0,7);X.fill();X.beginPath();X.arc(28,21,.6,0,7);X.fill();
 X.beginPath();X.moveTo(21,38);X.lineTo(21,43);X.moveTo(27,38);X.lineTo(27,43);X.moveTo(14,46);X.lineTo(21,43);X.lineTo(24,46);X.lineTo(27,43);X.lineTo(34,46);X.stroke();
 const tk=msg&&msg.w=='BETH'&&T()<msg.u;
 X.lineWidth=tk?1.6+Math.abs(Math.sin(t*9))*.8:1.6;X.beginPath();X.moveTo(21,31);X.quadraticCurveTo(24,tk?31+Math.sin(t*9)*1.5:32,27,31);X.stroke();X.restore()}
function rick(){const t=T(),b=Math.sin(t*1.3)*1.2,s=.62;ell(710,625,26,9,col(30,20,40,.18));
 X.save();X.translate(710,560+b);X.scale(s,s);X.strokeStyle='#000';X.fillStyle='#000';X.lineWidth=1.6;
 X.beginPath();X.moveTo(50,5);const HA=[58,22,77,16,68,33,87,40,70,51,81,67,62,65,61,84,48,70,35,84,34,65,15,67,26,51,9,40,28,33,19,16,38,22];for(let i=0;i<HA.length;i+=2)X.lineTo(HA[i],HA[i+1]);X.closePath();X.stroke();
 X.beginPath();X.moveTo(38,35);X.lineTo(38,60);X.quadraticCurveTo(38,72,50,72);X.quadraticCurveTo(62,72,62,60);X.lineTo(62,35);X.stroke();
 X.lineWidth=2;X.beginPath();X.moveTo(36,28);X.quadraticCurveTo(50,24,64,28);X.stroke();
 X.lineWidth=1.6;X.beginPath();X.arc(43,38,6,0,7);X.stroke();X.beginPath();X.arc(57,38,6,0,7);X.stroke();
 X.beginPath();X.arc(43,38,1,0,7);X.fill();X.beginPath();X.arc(57,38,1,0,7);X.fill();
 X.beginPath();X.moveTo(47,43);X.quadraticCurveTo(50,47,53,43);X.stroke();
 const tk=msg&&msg.w=='RICK'&&T()<msg.u;
 X.lineWidth=tk?1.6+Math.abs(Math.sin(t*9)):1.6;X.beginPath();X.moveTo(45,54);X.quadraticCurveTo(50,tk?54+Math.sin(t*9)*2.5:55,55,54);X.stroke();X.restore()}
function tommy(){const t=T(),x=Tm.x,y=Tm.y,sw=Math.sin(t*6)*2;
 ell(x,y+34,22,7,col(0,0,0,.2));ell(x,y+8,15,26,'#3c3c3c');
 circ(x,y-18,14,'#484848');circ(x-5+sw,-0+y-22,2.6,'#fff');circ(x+5+sw,y-22,2.6,'#fff');
 circ(x-5+sw,y-22,1.1,'#000');circ(x+5+sw,y-22,1.1,'#000');
 X.strokeStyle='#111';X.lineWidth=2;X.beginPath();X.moveTo(x-7,y-12);X.lineTo(x-2,y-10);X.lineTo(x+2,y-13);X.lineTo(x+7,y-10);X.stroke();
 X.strokeStyle='#3c3c3c';X.lineWidth=6;X.beginPath();X.moveTo(x-13,y);X.lineTo(x-22,y+8+sw);X.moveTo(x+13,y);X.lineTo(x+22,y+8-sw);X.stroke();
 if(Tm.st==2){X.strokeStyle='#000';X.lineWidth=3;X.beginPath();X.arc(x,y-18,22,3.4,6);X.stroke()}}
function draw(t){X.fillStyle='#dcdcdc';X.fillRect(0,0,W,H);
 for(let i=0;i<6;i++){X.strokeStyle=RAINBOW[i];X.lineWidth=56-i*9.4;X.lineCap='round';X.beginPath();X.moveTo(800,560);X.lineTo(800,220);X.stroke();X.beginPath();X.moveTo(800,560);X.lineTo(1180,330);X.stroke();X.beginPath();X.moveTo(800,560);X.lineTo(1180,740);X.stroke();X.beginPath();X.moveTo(800,560);X.lineTo(420,740);X.stroke();X.beginPath();X.moveTo(800,560);X.lineTo(420,330);X.stroke()}
 for(let i=0;i<6;i++){X.strokeStyle=RAINBOW[i];X.lineWidth=30-i*4.6;X.beginPath();X.arc(800,560,150,0,7);X.stroke()}
 ell(800,590,240,120,col(120,120,120,.25));ell(800,595,225,110,col(140,140,140,.3));
 for(const b of BUSH){circ(b[0],b[1]+4,30,col(60,60,60,.25));circ(b[0]-14,b[1],17,'#6e6e6e');circ(b[0]+12,b[1]+2,19,'#616161');circ(b[0],b[1]-8,16,'#7a7a7a')}
 rr(800,590,220,16,8,'#8a8a8a');circ(800,560,64,'#3a3a3a');
 const hot=got==7||win;
 for(let i=0;i<6;i++){X.strokeStyle=hot?RAINBOW[i]:GR[i];X.lineWidth=6;X.globalAlpha=.95;X.beginPath();X.arc(800,560,44,t*1.2+i*1.05,t*1.2+i*1.05+4.6);X.stroke()}
 X.globalAlpha=1;circ(800,560,26,hot?'#ffffff':'#cfcfcf');
 X.strokeStyle=RAINBOW[2];X.lineWidth=5;X.beginPath();X.arc(800,560,74,-Math.PI/2,-Math.PI/2+got/7*6.28);X.stroke();
 rick();tommy();
 if(carry>=0&&!win){X.save();X.translate(B.x,B.y-78);X.rotate(t*2);poly([[-7,0],[0,-8],[7,0],[0,8]],RAINBOW[carry]);X.restore()}
 beth(B.x,B.y,t)
 if(bait){circ(bait.x,bait.y,6,'#fff');circ(bait.x,bait.y,6,RAINBOW[1]);}
 for(let i=0;i<7;i++)if(!SH[i].g){X.save();X.translate(SH[i].x,SH[i].y);X.rotate(Math.sin(t*1.5+i)*.4);poly([[-8,0],[0,-9],[8,0],[0,9]],RAINBOW[i]);X.restore();circ(SH[i].x-2.5,SH[i].y-3,2.5,col(255,255,255,.9))}
 X.textAlign='left';X.textBaseline='middle';X.font='700 24px system-ui';
 X.fillStyle='#111';X.fillText(`SHARDS ${got}/7    CANDY ${cand}    ${hid?'HIDDEN':Tm.st==2?'!! RUN !!':''}`,30,40);
 X.textAlign='center';X.font='900 30px system-ui';X.fillStyle='#fff';X.strokeStyle='#333';X.lineWidth=6;
 X.strokeText('FROOPYLAND',W/2,42);X.fillText('FROOPYLAND',W/2,42);
 if(msg&&T()<msg.u){X.font='600 26px system-ui';const s=`${msg.w}: ${msg.s}`,w=X.measureText(s).width+70;
  rr(W/2,120,w,54,14,'rgba(255,255,255,.92)');X.strokeStyle='#333';X.lineWidth=2;X.beginPath();X.roundRect(W/2-w/2,93,w,54,14);X.stroke();
  X.fillStyle='#111';X.fillText(s,W/2,121)}
 if(win){X.fillStyle='rgba(255,255,255,.75)';X.fillRect(0,0,W,H);X.font='900 90px system-ui';X.fillStyle='#111';X.fillText('YOU ESCAPED FROOPYLAND',W/2,H/2);X.font='600 30px system-ui';X.fillText('Enter — once more',W/2,H/2+70)}}
let lt=T();(function L(){const t=T(),dt=Math.min(t-lt,.05);lt=t;update(t,dt);draw(t);requestAnimationFrame(L)})();

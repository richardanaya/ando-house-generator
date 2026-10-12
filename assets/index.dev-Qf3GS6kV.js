var Xc=Object.defineProperty;var Yc=(n,t,e)=>t in n?Xc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ie=(n,t,e)=>Yc(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function qc(n,t){return t==="px"||t==="nx"?{u:n.d,v:n.h}:{u:n.w,v:n.h}}function $c(n){switch(n){case"px":return{x:1,y:0,z:0};case"nx":return{x:-1,y:0,z:0};case"pz":return{x:0,y:0,z:1};case"nz":return{x:0,y:0,z:-1}}}function ws(n){if(n.kind!=="cruciform")return[{x:n.u,y:n.v,w:n.width,h:n.height}];const t=n.arm;return[{x:n.u+(n.width-t)/2,y:n.v,w:t,h:n.height},{x:n.u,y:n.v+(n.height-t)/2,w:n.width,h:t}]}function jc(n,t,e=1e-4){const i=Math.min(n.x+n.w,t.x+t.w)-Math.max(n.x,t.x),s=Math.min(n.y+n.h,t.y+t.h)-Math.max(n.y,t.y);return i>e&&s>e}function Ba(n,t,e=1e-4){return t.x>=n.x-e&&t.y>=n.y-e&&t.x+t.w<=n.x+n.w+e&&t.y+t.h<=n.y+n.h+e}const $e=1e-4;function Bi(n,t,e,i){return Math.min(t,i)-Math.max(n,e)}function He(n,t,e=$e){return Bi(n.x,n.x+n.w,t.x,t.x+t.w)>e&&Bi(n.y,n.y+n.h,t.y,t.y+t.h)>e&&Bi(n.z,n.z+n.d,t.z,t.z+t.d)>e}function Os(n){return[n.x,n.y,n.z,n.w,n.h,n.d].every(t=>Number.isFinite(t))}function Ln(n,t,e=.001){return n.x>=t.x-e&&n.z>=t.z-e&&n.x+n.w<=t.x+t.w+e&&n.z+n.d<=t.z+t.d+e}function Ri(n,t,e=$e){return Bi(n.x,n.x+n.w,t.x,t.x+t.w)>e&&Bi(n.z,n.z+n.d,t.z,t.z+t.d)>e}function zs(n){return{x:n.u,y:n.v,w:n.width,h:n.height}}function Zc(n,t,e,i){const s=n.y+n.h;return Math.abs(e-s)<=.001&&t>=n.x-.05&&t<=n.x+n.w+.05&&i>=n.z-.05&&i<=n.z+n.d+.05}function Kc(n){const t=[],{solids:e,openings:i,waters:s,circulation:r,site:a,story:o,levels:c}=n;e.length<5&&t.push(`expected a precinct of solids, found ${e.length}`),r.length!==1&&t.push(`expected one circulation run, found ${r.length}`),(c.length!==2||Math.abs(c[0])>1e-6||Math.abs(c[1]-o)>1e-6)&&t.push("levels must be ground and one story"),(n.designSun.z<.99||Math.abs(n.designSun.x)>1e-6)&&t.push("design sun must face +Z"),s.length>n.params.water&&t.push(`water features ${s.length} exceed slider ${n.params.water}`),n.params.water===0&&s.length!==0&&t.push("dry slider still produced water");const h=1+e.filter(l=>l.role==="wing"||l.role==="pavilion").length;h>n.params.volumes&&t.push(`logical volumes ${h} exceed slider ${n.params.volumes}`);const d=12*n.unit,f=6*n.unit;(Math.abs(n.panel.w-d)>1e-6||Math.abs(n.panel.h-f)>1e-6)&&t.push("panel size must be 12×6 grammar units"),Math.abs(n.panel.w/n.params.scale-1.8)>1e-6&&t.push("scale 1 panel width must be 1.8 m");for(const l of e){if(!Os(l)||l.w<=$e||l.h<=$e||l.d<=$e){t.push(`degenerate solid ${l.id}`);continue}l.y<-$e&&t.push(`${l.id} is below ground`),Ln(l,a)||t.push(`${l.id} leaves the site`)}for(let l=0;l<e.length;l++)for(let u=l+1;u<e.length;u++)He(e[l],e[u])&&t.push(`solids overlap: ${e[l].id} ∩ ${e[u].id}`);Ln(n.court,a)||t.push("court leaves the site");for(const l of e)l.role==="pavilion"?l.x>=n.court.x-.001&&l.z>=n.court.z-.001&&l.x+l.w<=n.court.x+n.court.w+.001&&l.z+l.d<=n.court.z+n.court.d+.001||t.push(`pavilion ${l.id} is not inside the court`):Ri(n.court,l)&&t.push(`court overlaps solid ${l.id}`);const p=new Map(e.map(l=>[l.id,l])),m=i.filter(l=>l.kind==="cruciform");m.length!==1&&t.push(`expected one cruciform, found ${m.length}`);const _=new Map;for(const l of i){if(![l.u,l.v,l.width,l.height,l.arm].every(w=>Number.isFinite(w)&&w>0)){t.push(`opening ${l.id} has a non-positive dimension`);continue}const u=p.get(l.hostId);if(!u){t.push(`opening ${l.id} has no host ${l.hostId}`);continue}const b=qc(u,l.face),E={x:0,y:0,w:b.u,h:b.v},S=zs(l);Ba(E,S)||t.push(`opening ${l.id} is not inside ${u.id} ${l.face}`),l.kind==="cruciform"&&((l.face!=="pz"||l.purpose!=="sun")&&t.push("cruciform must be a sun opening on +Z"),(l.arm>=l.width||l.arm>=l.height)&&t.push("cruciform arm does not fit its rectangle"),$c(l.face).z<.5&&t.push("cruciform face does not look south")),(l.kind==="slit"||l.kind==="glass-slot")&&Math.min(l.u,l.v,b.u-(l.u+l.width),b.v-(l.v+l.height))<.02&&t.push(`opening ${l.id} is not framed by its wall`);for(const w of ws(l))Ba(E,w)||t.push(`hole of ${l.id} leaves the wall`);const D=`${l.hostId}:${l.face}`,A=_.get(D)??[];A.push(l),_.set(D,A)}for(const[l,u]of _)for(let b=0;b<u.length;b++)for(let E=b+1;E<u.length;E++)jc(zs(u[b]),zs(u[E]))&&t.push(`openings overlap on ${l}: ${u[b].id} ∩ ${u[E].id}`);for(const l of r){if(!Os(l.bounds)||![l.x0,l.y0,l.z0,l.x1,l.y1,l.z1].every(Number.isFinite)){t.push("circulation is not finite");continue}const u=Math.min(l.y0,l.y1),b=Math.max(l.y0,l.y1);Math.abs(u)>.001&&t.push("circulation does not start at ground"),Math.abs(b-o)>.001&&t.push("circulation does not reach the upper level");const S=Math.hypot(l.x1-l.x0,l.z1-l.z0)/Math.max(b-u,$e);l.kind==="ramp"&&S<3.9&&t.push(`ramp is steeper than 1:4 (${S.toFixed(2)})`),l.kind==="stair"&&(S<1.5||S>2.2)&&t.push(`stair proportion is off (${S.toFixed(2)})`);const D=l.y0>=l.y1?{x:l.x0,y:l.y0,z:l.z0}:{x:l.x1,y:l.y1,z:l.z1};e.filter(w=>w.role==="landing").some(w=>Zc(w,D.x,D.y,D.z))||t.push("upper end of circulation does not meet a landing"),!Ln({x:l.x0-l.width/2,z:Math.min(l.z0,l.z1),w:l.width,d:Math.abs(l.z1-l.z0)},a)&&!Ln(l.bounds,a)&&t.push("circulation leaves the site"),Ln(l.bounds,a)||t.push("circulation bounds leave the site");for(const w of e)He(l.bounds,w)&&t.push(`circulation overlaps ${w.id}`)}for(const l of s){const u={x:l.x,y:l.y-l.depth,z:l.z,w:l.w,h:l.depth,d:l.d};if(!Os(u)||l.w<=$e||l.d<=$e||l.depth<=$e){t.push(`degenerate water ${l.id}`);continue}Ln(l,a)||t.push(`water ${l.id} leaves the site`);for(const b of e)He(u,b)&&t.push(`water ${l.id} overlaps ${b.id}`)}for(let l=0;l<s.length;l++)for(let u=l+1;u<s.length;u++)Ri(s[l],s[u])&&t.push(`waters overlap: ${s[l].id} ∩ ${s[u].id}`);if(n.garden){Ln(n.garden,a)||t.push("garden leaves the site");for(const l of e)Ri(n.garden,l)&&t.push(`garden overlaps ${l.id}`);for(const l of s)Ri(n.garden,l)&&t.push(`garden overlaps ${l.id}`);Ri(n.garden,n.court)&&t.push("garden overlaps the court")}return i.filter(l=>l.purpose==="sun").some(l=>l.kind==="cruciform")||t.push("sun rule did not place a cruciform"),t}const pe={scale:{min:.7,max:1.4,step:.05,default:1},volumes:{min:1,max:4,step:1,default:3},water:{min:0,max:3,step:1,default:2},sun:{min:6,max:18,step:.1,default:9.5}};function gs(n,t){return typeof n=="number"&&Number.isFinite(n)?n:t}function xs(n,t,e){return Math.min(e,Math.max(t,n))}function ha(n={}){const t=(n.seed??"ando").trim()||"ando",e=xs(gs(n.scale,pe.scale.default),pe.scale.min,pe.scale.max),i=xs(Math.round(gs(n.volumes,pe.volumes.default)),pe.volumes.min,pe.volumes.max),s=xs(Math.round(gs(n.water,pe.water.default)),pe.water.min,pe.water.max);return{seed:t,scale:e,volumes:i,water:s}}function Jc(n){const t=new URLSearchParams(n);return ha({seed:t.get("seed")??void 0,scale:t.has("scale")?Number(t.get("scale")):void 0,volumes:t.has("volumes")?Number(t.get("volumes")):void 0,water:t.has("water")?Number(t.get("water")):void 0})}function Qc(n){const t=new URLSearchParams(n),e=t.has("sun")?Number(t.get("sun")):pe.sun.default;return xs(gs(e,pe.sun.default),pe.sun.min,pe.sun.max)}function tl(n,t){const e=new URLSearchParams;return e.set("seed",n.seed),e.set("scale",String(el(n.scale,100))),e.set("volumes",String(n.volumes)),e.set("water",String(n.water)),e.set("sun",t.toFixed(1)),`?${e.toString()}`}function el(n,t){return Math.round(n*t)/t}function nl(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function ua(n){let t=n>>>0;t===0&&(t=1831565813);const e=()=>{t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296};return{next:e,int(i,s){const r=Math.ceil(i),a=Math.floor(s);return r+Math.floor(e()*(a-r+1))},bool(i=.5){return e()<i},pick(i){return i[Math.floor(e()*i.length)]}}}const il=12,Ni=6,ce=3,cn=24,gn=48,Ha=54,sl=90,rl=72,ka=42;function al(n){return{sw:252+n.int(0,6)*12,sd:240+n.int(0,5)*12,massW:72+n.int(0,3)*12,roomD:36+n.int(0,3)*6,courtD:36+n.int(0,3)*6,crossExtra:[0,6,12][n.int(0,2)],slotW:n.bool()?12:6,glassShift:n.int(-1,1),enclosureOpen:n.bool(.35),mirror:n.bool(),wantPavilion:n.bool(.6),pavilionRound:n.bool(.45),wingWestW:30+n.int(0,2)*6,wingWestD:24+n.int(0,2)*6,wingNorthD:24+n.int(0,2)*6,screenReturn:n.bool(.65),circulationRamp:n.bool(.6),roundWater:n.bool(.4),garden:n.bool(.75),slitCount:n.int(2,4)}}function ol(n,t,e){return Math.max(t,Math.min(e,n))}function Ga(n,t,e=0,i=1){const s={x:n.x,y:e,z:n.z,w:n.w,h:Math.max(i-e,1),d:n.d};return t.some(r=>He(s,r,0))}function Bs(n,t){return n.x>=t.x&&n.z>=t.z&&n.x+n.w<=t.x+t.w&&n.z+n.d<=t.z+t.d}function cl(n,t){const e={x:-n.sw/2,z:-n.sd/2,w:n.sw,d:n.sd},i=n.roomD+n.courtD+2*ce,s=n.sw-Ha-n.massW-sl,r=n.sd-ka-i-rl;if(s<0||r<0)throw new Error(`site cannot hold the mass (extra ${s}, ${r})`);const a=e.x+Ha+Math.floor(s/2),o=e.z+ka+Math.floor(r/2),c=n.massW,h=n.roomD,d=n.courtD,f=gn+n.crossExtra,p=c-n.slotW;let m=Math.round((Math.floor(p/2)+n.glassShift*6)/3)*3;m=ol(m,15,p-15);const _=n.slotW,g=c-_-m;if(g<15)throw new Error("view slot consumes the primary volume");const l=o+h,u=l+ce,b=u+d,E=a+c,S=[],D=[],A=(st,C=!1)=>{if(st.w<=0||st.h<=0||st.d<=0||!Bs(st,e)){if(C)return!1;throw new Error(`solid ${st.id} does not fit the site`)}if(S.some(Xt=>He(st,Xt,0))){if(C)return!1;const Xt=S.find(Rt=>He(st,Rt,0));throw new Error(`solid ${st.id} overlaps ${Xt==null?void 0:Xt.id}`)}return S.push(st),!0};A({id:"primary-west",role:"primary",shape:"box",x:a,y:0,z:o,w:m,h:gn,d:h}),A({id:"primary-east",role:"primary",shape:"box",x:a+m+_,y:0,z:o,w:g,h:gn,d:h}),A({id:"facade",role:"wall",shape:"box",x:a,y:0,z:l,w:c,h:gn,d:ce}),A({id:"sun-wall",role:"wall",shape:"box",x:a,y:0,z:b,w:c,h:f,d:ce}),A({id:"court-west",role:"wall",shape:"box",x:a,y:0,z:u,w:ce,h:gn,d}),n.enclosureOpen||A({id:"court-east",role:"wall",shape:"box",x:E-ce,y:0,z:u,w:ce,h:gn,d});const w={x:a+ce,z:u,w:c-2*ce,d};D.push({id:"cruciform",hostId:"sun-wall",face:"pz",kind:"cruciform",purpose:"sun",u:Ni,v:Ni,width:c-2*Ni,height:f-2*Ni,arm:2}),D.push({id:"court-glass",hostId:"facade",face:"pz",kind:"glass-slot",purpose:"sun",u:m,v:ce,width:_,height:gn-2*ce,arm:_});const P=12,y=16,M=2,R=E,H=o;A({id:"landing",role:"landing",shape:"box",x:R,y:cn-M,z:H,w:P,h:M,d:y}),D.push({id:"entry-door",hostId:"primary-east",face:"px",kind:"glass-slot",purpose:"entry",u:3,v:cn,width:10,height:14,arm:10});const F=cn,V=8,X=R+Math.floor((P-V)/2),W=H+y,Z=e.z+e.d-6-W;let k="stair",et=F*2;if(n.circulationRamp&&Z>=F*4&&(k="ramp",et=Math.floor(Math.min(Z,F*6)/3)*3),et<F*2||W+et>e.z+e.d-4)throw new Error(`circulation run ${et} does not fit (available ${Z})`);const lt={kind:k,x0:X+V/2,y0:cn,z0:W,x1:X+V/2,y1:0,z1:W+et,width:V,bounds:{x:X,y:0,z:W,w:V,h:cn,d:et}};if(S.some(st=>He(lt.bounds,st,0))){const st=S.find(C=>He(lt.bounds,C,0));throw new Error(`circulation overlaps ${st==null?void 0:st.id}`)}let mt=t.volumes-1;if(mt>0){const st=Math.min(n.wingWestD,h);if(A({id:"wing-west",role:"wing",shape:"box",x:a-n.wingWestW,y:0,z:o,w:n.wingWestW,h:cn,d:st},!0)){mt-=1;const Xt=n.slitCount,Rt=4,Ot=n.wingWestW-2*Rt,St=Math.floor(Ot/Xt);if(St>=3)for(let qt=0;qt<Xt;qt++){const T=Rt+qt*St+Math.floor((St-1)/2);D.push({id:`wing-slit-${qt}`,hostId:"wing-west",face:"pz",kind:"slit",purpose:"sun",u:T,v:6,width:1,height:12,arm:1})}}}if(mt>0){const st=Math.min(m,36);A({id:"wing-north",role:"wing",shape:"box",x:a,y:0,z:o-n.wingNorthD,w:st,h:cn,d:n.wingNorthD},!0)&&(mt-=1)}if(mt>0&&w.w>=28&&w.d>=28){const st=n.wantPavilion?18:15,C=n.wantPavilion?4:6;A({id:"pavilion",role:"pavilion",shape:n.pavilionRound?"cylinder":"box",x:w.x+Math.floor((w.w-st)/2),y:0,z:w.z+C,w:st,h:cn,d:st},!0)}const Pt=f,Bt={id:"screen-west",role:"screen",shape:"box",x:a-15-ce,y:0,z:b-9,w:ce,h:Pt,d:72};if(Bt.z+Bt.d>e.z+e.d-4&&(Bt.d=e.z+e.d-4-Bt.z),A(Bt),D.push({id:"screen-west-slit",hostId:"screen-west",face:"px",kind:"slit",purpose:"procession",u:Math.max(4,Math.floor(Bt.d*.35)),v:8,width:2,height:Math.min(18,Bt.h-12),arm:2}),n.screenReturn){const st=Bt.x+ce,C=Math.min(24,a-6-st);C>=9&&A({id:"screen-return",role:"screen",shape:"box",x:st,y:0,z:Bt.z+Bt.d-ce,w:C,h:Math.min(Pt,gn),d:ce},!0)}const Y=Math.max(e.z+4,o-12),Q=Math.min(e.z+e.d-4,W+et+8),pt={id:"screen-east",role:"screen",shape:"box",x:e.x+e.w-8-ce,y:0,z:Y,w:ce,h:Pt,d:Q-Y};A(pt),D.push({id:"screen-east-slit",hostId:"screen-east",face:"nx",kind:"slit",purpose:"procession",u:Math.max(4,Math.floor(pt.d*.45)),v:8,width:2,height:Math.min(18,pt.h-12),arm:2});const nt=[],yt=t.water,bt=(st,C,Xt)=>C.w<6||C.d<6||!Bs(C,e)||Ga(C,S,0,2)||nt.some(Rt=>He({...C,y:0,h:1},{...Rt,y:0,h:1},0))?!1:(nt.push({id:st,...C,shape:Xt}),!0);if(yt>=1){const st=S.find(Ot=>Ot.id==="pavilion"),C=st?st.z+st.d+3:w.z+4,Rt=w.z+w.d-4-C;Rt>=10&&bt("court-basin",{x:w.x+4,z:C,w:w.w-8,d:Rt},"rect")}if(nt.length<yt){const st={x:a+8,z:b+ce+8,w:c-16,d:20},C=n.roundWater?"circle":"rect";if(C==="circle"){const Xt=Math.min(st.w,st.d);st.x+=Math.floor((st.w-Xt)/2),st.z+=Math.floor((st.d-Xt)/2),st.w=Xt,st.d=Xt}bt("approach-pool",st,C)}if(nt.length<yt){const st={x:a-12,z:b+ce+6,w:8,d:28};if(!bt("side-channel",st,"rect")){const C={x:a+m+_+4,z:o-16,w:Math.max(8,g-8),d:10};bt("north-basin",C,"rect")}}let Dt=null;if(n.garden){const st={x:e.x+8,z:e.z+8,w:30,d:22};!(Ga(st,S,0,1)||nt.some(Xt=>He({...st,y:0,h:1},{...Xt,y:0,h:1},0))||He({...st,y:0,h:1},{...w,y:0,h:1},0))&&Bs(st,e)&&(Dt=st)}let te="east",Ht=n.enclosureOpen?"open-side":"closed";return n.mirror&&(ll(e,S,D,nt,lt,Dt,w),te="west"),{site:e,court:w,solids:S,openings:D,waters:nt,circulation:lt,garden:Dt,entrySide:te,enclosure:Ht}}function ll(n,t,e,i,s,r,a){const o=c=>{c.x=-c.x-c.w};o(n),o(a);for(const c of t)o(c);for(const c of i)o(c);r&&o(r),s.x0=-s.x0,s.x1=-s.x1,o(s.bounds);for(const c of e){const h=t.find(d=>d.id===c.hostId);if(!h)throw new Error(`mirror lost host ${c.hostId}`);c.face==="px"?c.face="nx":c.face==="nx"?c.face="px":c.u=h.w-c.u-c.width}}function Va(n,t){return{...n,x:n.x*t,y:n.y*t,z:n.z*t,w:n.w*t,h:n.h*t,d:n.d*t}}function Yi(n,t){return{x:n.x*t,z:n.z*t,w:n.w*t,d:n.d*t}}function hl(n={}){const t=ha(n),e=ua(nl(t.seed)),i=al(e),s=cl(i,t),r=.15*t.scale,a=cn*r,o=s.solids.map(l=>Va(l,r)),c=s.openings.map(l=>({...l,u:l.u*r,v:l.v*r,width:l.width*r,height:l.height*r,arm:l.arm*r})),h=s.waters.map(l=>({id:l.id,...Yi(l,r),y:.55*r,depth:.12*r,shape:l.shape})),d=[{id:"procession",kind:s.circulation.kind,x0:s.circulation.x0*r,y0:s.circulation.y0*r,z0:s.circulation.z0*r,x1:s.circulation.x1*r,y1:s.circulation.y1*r,z1:s.circulation.z1*r,width:s.circulation.width*r,bounds:Va(s.circulation.bounds,r)}],f=1+o.filter(l=>l.role==="wing"||l.role==="pavilion").length,m=`${s.enclosure==="closed"?"enclosed court":"court open to the entry"} · ${d[0].kind} · ${f} volume${f===1?"":"s"} · ${h.length} basin${h.length===1?"":"s"}`,_={seed:t.seed,params:t,unit:r,panel:{w:il*r,h:Ni*r},wallThickness:ce*r,story:a,levels:[0,a],site:Yi(s.site,r),designSun:{x:0,y:0,z:1},entrySide:s.entrySide,enclosure:s.enclosure,court:Yi(s.court,r),solids:o,openings:c,waters:h,circulation:d,garden:s.garden?Yi(s.garden,r):null,summary:m},g=Kc(_);if(g.length>0)throw new Error(`seed ${t.seed} broke the grammar: ${g.join("; ")}`);return _}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const da="170",di={ROTATE:0,DOLLY:1,PAN:2},hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ul=0,Wa=1,dl=2,Ko=1,Jo=2,ln=3,An=0,Me=1,Ie=2,bn=0,fi=1,Mr=2,Xa=3,Ya=4,fl=5,Hn=100,pl=101,ml=102,_l=103,gl=104,xl=200,vl=201,Ml=202,Sl=203,Sr=204,yr=205,yl=206,El=207,Tl=208,bl=209,wl=210,Al=211,Rl=212,Cl=213,Pl=214,Er=0,Tr=1,br=2,_i=3,wr=4,Ar=5,Rr=6,Cr=7,Qo=0,Dl=1,Ll=2,wn=0,Ul=1,Il=2,Nl=3,tc=4,Fl=5,Ol=6,zl=7,ec=300,gi=301,xi=302,Pr=303,Dr=304,Cs=306,Wn=1e3,Gn=1001,Lr=1002,Ve=1003,Bl=1004,qi=1005,Ze=1006,Hs=1007,Vn=1008,pn=1009,nc=1010,ic=1011,Hi=1012,fa=1013,Xn=1014,un=1015,Ei=1016,pa=1017,ma=1018,vi=1020,sc=35902,rc=1021,ac=1022,Ge=1023,oc=1024,cc=1025,pi=1026,Mi=1027,lc=1028,_a=1029,hc=1030,ga=1031,xa=1033,vs=33776,Ms=33777,Ss=33778,ys=33779,Ur=35840,Ir=35841,Nr=35842,Fr=35843,Or=36196,zr=37492,Br=37496,Hr=37808,kr=37809,Gr=37810,Vr=37811,Wr=37812,Xr=37813,Yr=37814,qr=37815,$r=37816,jr=37817,Zr=37818,Kr=37819,Jr=37820,Qr=37821,Es=36492,ta=36494,ea=36495,uc=36283,na=36284,ia=36285,sa=36286,Hl=3200,kl=3201,dc=0,Gl=1,Tn="",Ee="srgb",Ti="srgb-linear",Ps="linear",Jt="srgb",jn=7680,qa=519,Vl=512,Wl=513,Xl=514,fc=515,Yl=516,ql=517,$l=518,jl=519,$a=35044,ja="300 es",dn=2e3,As=2001;class qn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ts=Math.PI/180,ra=180/Math.PI;function ki(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]).toLowerCase()}function ve(n,t,e){return Math.max(t,Math.min(e,n))}function Zl(n,t){return(n%t+t)%t}function ks(n,t,e){return(1-e)*n+e*t}function Ci(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function we(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Kl={DEG2RAD:Ts};class At{constructor(t=0,e=0){At.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(t,e,i,s,r,a,o,c,h){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,h)}set(t,e,i,s,r,a,o,c,h){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],h=i[1],d=i[4],f=i[7],p=i[2],m=i[5],_=i[8],g=s[0],l=s[3],u=s[6],b=s[1],E=s[4],S=s[7],D=s[2],A=s[5],w=s[8];return r[0]=a*g+o*b+c*D,r[3]=a*l+o*E+c*A,r[6]=a*u+o*S+c*w,r[1]=h*g+d*b+f*D,r[4]=h*l+d*E+f*A,r[7]=h*u+d*S+f*w,r[2]=p*g+m*b+_*D,r[5]=p*l+m*E+_*A,r[8]=p*u+m*S+_*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],h=t[7],d=t[8];return e*a*d-e*o*h-i*r*d+i*o*c+s*r*h-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],h=t[7],d=t[8],f=d*a-o*h,p=o*c-d*r,m=h*r-a*c,_=e*f+i*p+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=f*g,t[1]=(s*h-d*i)*g,t[2]=(o*i-s*a)*g,t[3]=p*g,t[4]=(d*e-s*c)*g,t[5]=(s*r-o*e)*g,t[6]=m*g,t[7]=(i*c-h*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),h=Math.sin(r);return this.set(i*c,i*h,-i*(c*a+h*o)+a+t,-s*h,s*c,-s*(-h*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Gs.makeScale(t,e)),this}rotate(t){return this.premultiply(Gs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Gs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Gs=new It;function pc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Rs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Jl(){const n=Rs("canvas");return n.style.display="block",n}const Za={};function Fi(n){n in Za||(Za[n]=!0,console.warn(n))}function Ql(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function th(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function eh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Vt={enabled:!0,workingColorSpace:Ti,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Jt&&(n.r=fn(n.r),n.g=fn(n.g),n.b=fn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Jt&&(n.r=mi(n.r),n.g=mi(n.g),n.b=mi(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Tn?Ps:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function fn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function mi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Ka=[.64,.33,.3,.6,.15,.06],Ja=[.2126,.7152,.0722],Qa=[.3127,.329],to=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eo=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Vt.define({[Ti]:{primaries:Ka,whitePoint:Qa,transfer:Ps,toXYZ:to,fromXYZ:eo,luminanceCoefficients:Ja,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:Ka,whitePoint:Qa,transfer:Jt,toXYZ:to,fromXYZ:eo,luminanceCoefficients:Ja,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}});let Zn;class nh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zn===void 0&&(Zn=Rs("canvas")),Zn.width=t.width,Zn.height=t.height;const i=Zn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Zn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Rs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(fn(e[i]/255)*255):e[i]=fn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ih=0;class mc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vs(s[a].image)):r.push(Vs(s[a]))}else r=Vs(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Vs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?nh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sh=0;class Te extends qn{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,i=Gn,s=Gn,r=Ze,a=Vn,o=Ge,c=pn,h=Te.DEFAULT_ANISOTROPY,d=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=ki(),this.name="",this.source=new mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wn:t.x=t.x-Math.floor(t.x);break;case Gn:t.x=t.x<0?0:1;break;case Lr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wn:t.y=t.y-Math.floor(t.y);break;case Gn:t.y=t.y<0?0:1;break;case Lr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=ec;Te.DEFAULT_ANISOTROPY=1;class Zt{constructor(t=0,e=0,i=0,s=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,h=c[0],d=c[4],f=c[8],p=c[1],m=c[5],_=c[9],g=c[2],l=c[6],u=c[10];if(Math.abs(d-p)<.01&&Math.abs(f-g)<.01&&Math.abs(_-l)<.01){if(Math.abs(d+p)<.1&&Math.abs(f+g)<.1&&Math.abs(_+l)<.1&&Math.abs(h+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(h+1)/2,S=(m+1)/2,D=(u+1)/2,A=(d+p)/4,w=(f+g)/4,P=(_+l)/4;return E>S&&E>D?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=A/i,r=w/i):S>D?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=A/s,r=P/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=w/r,s=P/r),this.set(i,s,r,e),this}let b=Math.sqrt((l-_)*(l-_)+(f-g)*(f-g)+(p-d)*(p-d));return Math.abs(b)<.001&&(b=1),this.x=(l-_)/b,this.y=(f-g)/b,this.z=(p-d)/b,this.w=Math.acos((h+m+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rh extends qn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Te(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new mc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends rh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class _c extends Te{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ah extends Te{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],h=i[s+1],d=i[s+2],f=i[s+3];const p=r[a+0],m=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=c,t[e+1]=h,t[e+2]=d,t[e+3]=f;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=g;return}if(f!==g||c!==p||h!==m||d!==_){let l=1-o;const u=c*p+h*m+d*_+f*g,b=u>=0?1:-1,E=1-u*u;if(E>Number.EPSILON){const D=Math.sqrt(E),A=Math.atan2(D,u*b);l=Math.sin(l*A)/D,o=Math.sin(o*A)/D}const S=o*b;if(c=c*l+p*S,h=h*l+m*S,d=d*l+_*S,f=f*l+g*S,l===1-o){const D=1/Math.sqrt(c*c+h*h+d*d+f*f);c*=D,h*=D,d*=D,f*=D}}t[e]=c,t[e+1]=h,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],h=i[s+2],d=i[s+3],f=r[a],p=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+d*f+c*m-h*p,t[e+1]=c*_+d*p+h*f-o*m,t[e+2]=h*_+d*m+o*p-c*f,t[e+3]=d*_-o*f-c*p-h*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,h=o(i/2),d=o(s/2),f=o(r/2),p=c(i/2),m=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=p*d*f+h*m*_,this._y=h*m*f-p*d*_,this._z=h*d*_+p*m*f,this._w=h*d*f-p*m*_;break;case"YXZ":this._x=p*d*f+h*m*_,this._y=h*m*f-p*d*_,this._z=h*d*_-p*m*f,this._w=h*d*f+p*m*_;break;case"ZXY":this._x=p*d*f-h*m*_,this._y=h*m*f+p*d*_,this._z=h*d*_+p*m*f,this._w=h*d*f-p*m*_;break;case"ZYX":this._x=p*d*f-h*m*_,this._y=h*m*f+p*d*_,this._z=h*d*_-p*m*f,this._w=h*d*f+p*m*_;break;case"YZX":this._x=p*d*f+h*m*_,this._y=h*m*f+p*d*_,this._z=h*d*_-p*m*f,this._w=h*d*f-p*m*_;break;case"XZY":this._x=p*d*f-h*m*_,this._y=h*m*f-p*d*_,this._z=h*d*_+p*m*f,this._w=h*d*f+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],h=e[2],d=e[6],f=e[10],p=i+o+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-h)*m,this._z=(a-s)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+h)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(r-h)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-s)/m,this._x=(r+h)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,h=e._z,d=e._w;return this._x=i*d+a*o+s*h-r*c,this._y=s*d+a*c+r*o-i*h,this._z=r*d+a*h+i*c-s*o,this._w=a*d-i*o-s*c-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const h=Math.sqrt(c),d=Math.atan2(h,o),f=Math.sin((1-e)*d)/h,p=Math.sin(e*d)/h;return this._w=a*f+this._w*p,this._x=i*f+this._x*p,this._y=s*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(no.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(no.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,h=2*(a*s-o*i),d=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*h+a*f-o*d,this.y=i+c*d+o*h-r*f,this.z=s+c*f+r*d-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ws.copy(this).projectOnVector(t),this.sub(Ws)}reflect(t){return this.sub(Ws.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new U,no=new Yn;class Gi{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Oe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Oe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Oe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Oe):Oe.fromBufferAttribute(r,a),Oe.applyMatrix4(t.matrixWorld),this.expandByPoint(Oe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$i.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$i.copy(i.boundingBox)),$i.applyMatrix4(t.matrixWorld),this.union($i)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oe),Oe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Pi),ji.subVectors(this.max,Pi),Kn.subVectors(t.a,Pi),Jn.subVectors(t.b,Pi),Qn.subVectors(t.c,Pi),xn.subVectors(Jn,Kn),vn.subVectors(Qn,Jn),Un.subVectors(Kn,Qn);let e=[0,-xn.z,xn.y,0,-vn.z,vn.y,0,-Un.z,Un.y,xn.z,0,-xn.x,vn.z,0,-vn.x,Un.z,0,-Un.x,-xn.y,xn.x,0,-vn.y,vn.x,0,-Un.y,Un.x,0];return!Xs(e,Kn,Jn,Qn,ji)||(e=[1,0,0,0,1,0,0,0,1],!Xs(e,Kn,Jn,Qn,ji))?!1:(Zi.crossVectors(xn,vn),e=[Zi.x,Zi.y,Zi.z],Xs(e,Kn,Jn,Qn,ji))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new U,new U,new U,new U,new U,new U,new U,new U],Oe=new U,$i=new Gi,Kn=new U,Jn=new U,Qn=new U,xn=new U,vn=new U,Un=new U,Pi=new U,ji=new U,Zi=new U,In=new U;function Xs(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){In.fromArray(n,r);const o=s.x*Math.abs(In.x)+s.y*Math.abs(In.y)+s.z*Math.abs(In.z),c=t.dot(In),h=e.dot(In),d=i.dot(In);if(Math.max(-Math.max(c,h,d),Math.min(c,h,d))>o)return!1}return!0}const oh=new Gi,Di=new U,Ys=new U;class va{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):oh.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Di.subVectors(t,this.center);const e=Di.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Di,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ys.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Di.copy(t.center).add(Ys)),this.expandByPoint(Di.copy(t.center).sub(Ys))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new U,qs=new U,Ki=new U,Mn=new U,$s=new U,Ji=new U,js=new U;class gc{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){qs.copy(t).add(e).multiplyScalar(.5),Ki.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(qs);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ki),o=Mn.dot(this.direction),c=-Mn.dot(Ki),h=Mn.lengthSq(),d=Math.abs(1-a*a);let f,p,m,_;if(d>0)if(f=a*c-o,p=a*o-c,_=r*d,f>=0)if(p>=-_)if(p<=_){const g=1/d;f*=g,p*=g,m=f*(f+a*p+2*o)+p*(a*f+p+2*c)+h}else p=r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+h;else p=-r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+h;else p<=-_?(f=Math.max(0,-(-a*r+o)),p=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+h):p<=_?(f=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+h):(f=Math.max(0,-(a*r+o)),p=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+h);else p=a>0?-r:r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(qs).addScaledVector(Ki,p),m}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const i=sn.dot(this.direction),s=sn.dot(sn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const h=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,p=this.origin;return h>=0?(i=(t.min.x-p.x)*h,s=(t.max.x-p.x)*h):(i=(t.max.x-p.x)*h,s=(t.min.x-p.x)*h),d>=0?(r=(t.min.y-p.y)*d,a=(t.max.y-p.y)*d):(r=(t.max.y-p.y)*d,a=(t.min.y-p.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-p.z)*f,c=(t.max.z-p.z)*f):(o=(t.max.z-p.z)*f,c=(t.min.z-p.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,i,s,r){$s.subVectors(e,t),Ji.subVectors(i,t),js.crossVectors($s,Ji);let a=this.direction.dot(js),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,t);const c=o*this.direction.dot(Ji.crossVectors(Mn,Ji));if(c<0)return null;const h=o*this.direction.dot($s.cross(Mn));if(h<0||c+h>a)return null;const d=-o*Mn.dot(js);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,i,s,r,a,o,c,h,d,f,p,m,_,g,l){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,h,d,f,p,m,_,g,l)}set(t,e,i,s,r,a,o,c,h,d,f,p,m,_,g,l){const u=this.elements;return u[0]=t,u[4]=e,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=h,u[6]=d,u[10]=f,u[14]=p,u[3]=m,u[7]=_,u[11]=g,u[15]=l,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ti.setFromMatrixColumn(t,0).length(),r=1/ti.setFromMatrixColumn(t,1).length(),a=1/ti.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),h=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=a*d,m=a*f,_=o*d,g=o*f;e[0]=c*d,e[4]=-c*f,e[8]=h,e[1]=m+_*h,e[5]=p-g*h,e[9]=-o*c,e[2]=g-p*h,e[6]=_+m*h,e[10]=a*c}else if(t.order==="YXZ"){const p=c*d,m=c*f,_=h*d,g=h*f;e[0]=p+g*o,e[4]=_*o-m,e[8]=a*h,e[1]=a*f,e[5]=a*d,e[9]=-o,e[2]=m*o-_,e[6]=g+p*o,e[10]=a*c}else if(t.order==="ZXY"){const p=c*d,m=c*f,_=h*d,g=h*f;e[0]=p-g*o,e[4]=-a*f,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*d,e[9]=g-p*o,e[2]=-a*h,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const p=a*d,m=a*f,_=o*d,g=o*f;e[0]=c*d,e[4]=_*h-m,e[8]=p*h+g,e[1]=c*f,e[5]=g*h+p,e[9]=m*h-_,e[2]=-h,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const p=a*c,m=a*h,_=o*c,g=o*h;e[0]=c*d,e[4]=g-p*f,e[8]=_*f+m,e[1]=f,e[5]=a*d,e[9]=-o*d,e[2]=-h*d,e[6]=m*f+_,e[10]=p-g*f}else if(t.order==="XZY"){const p=a*c,m=a*h,_=o*c,g=o*h;e[0]=c*d,e[4]=-f,e[8]=h*d,e[1]=p*f+g,e[5]=a*d,e[9]=m*f-_,e[2]=_*f-m,e[6]=o*d,e[10]=g*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ch,t,lh)}lookAt(t,e,i){const s=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),Sn.crossVectors(i,Pe),Sn.lengthSq()===0&&(Math.abs(i.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),Sn.crossVectors(i,Pe)),Sn.normalize(),Qi.crossVectors(Pe,Sn),s[0]=Sn.x,s[4]=Qi.x,s[8]=Pe.x,s[1]=Sn.y,s[5]=Qi.y,s[9]=Pe.y,s[2]=Sn.z,s[6]=Qi.z,s[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],h=i[12],d=i[1],f=i[5],p=i[9],m=i[13],_=i[2],g=i[6],l=i[10],u=i[14],b=i[3],E=i[7],S=i[11],D=i[15],A=s[0],w=s[4],P=s[8],y=s[12],M=s[1],R=s[5],H=s[9],F=s[13],V=s[2],X=s[6],W=s[10],Z=s[14],k=s[3],et=s[7],lt=s[11],mt=s[15];return r[0]=a*A+o*M+c*V+h*k,r[4]=a*w+o*R+c*X+h*et,r[8]=a*P+o*H+c*W+h*lt,r[12]=a*y+o*F+c*Z+h*mt,r[1]=d*A+f*M+p*V+m*k,r[5]=d*w+f*R+p*X+m*et,r[9]=d*P+f*H+p*W+m*lt,r[13]=d*y+f*F+p*Z+m*mt,r[2]=_*A+g*M+l*V+u*k,r[6]=_*w+g*R+l*X+u*et,r[10]=_*P+g*H+l*W+u*lt,r[14]=_*y+g*F+l*Z+u*mt,r[3]=b*A+E*M+S*V+D*k,r[7]=b*w+E*R+S*X+D*et,r[11]=b*P+E*H+S*W+D*lt,r[15]=b*y+E*F+S*Z+D*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],h=t[13],d=t[2],f=t[6],p=t[10],m=t[14],_=t[3],g=t[7],l=t[11],u=t[15];return _*(+r*c*f-s*h*f-r*o*p+i*h*p+s*o*m-i*c*m)+g*(+e*c*m-e*h*p+r*a*p-s*a*m+s*h*d-r*c*d)+l*(+e*h*f-e*o*m-r*a*f+i*a*m+r*o*d-i*h*d)+u*(-s*o*d-e*c*f+e*o*p+s*a*f-i*a*p+i*c*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],h=t[7],d=t[8],f=t[9],p=t[10],m=t[11],_=t[12],g=t[13],l=t[14],u=t[15],b=f*l*h-g*p*h+g*c*m-o*l*m-f*c*u+o*p*u,E=_*p*h-d*l*h-_*c*m+a*l*m+d*c*u-a*p*u,S=d*g*h-_*f*h+_*o*m-a*g*m-d*o*u+a*f*u,D=_*f*c-d*g*c-_*o*p+a*g*p+d*o*l-a*f*l,A=e*b+i*E+s*S+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return t[0]=b*w,t[1]=(g*p*r-f*l*r-g*s*m+i*l*m+f*s*u-i*p*u)*w,t[2]=(o*l*r-g*c*r+g*s*h-i*l*h-o*s*u+i*c*u)*w,t[3]=(f*c*r-o*p*r-f*s*h+i*p*h+o*s*m-i*c*m)*w,t[4]=E*w,t[5]=(d*l*r-_*p*r+_*s*m-e*l*m-d*s*u+e*p*u)*w,t[6]=(_*c*r-a*l*r-_*s*h+e*l*h+a*s*u-e*c*u)*w,t[7]=(a*p*r-d*c*r+d*s*h-e*p*h-a*s*m+e*c*m)*w,t[8]=S*w,t[9]=(_*f*r-d*g*r-_*i*m+e*g*m+d*i*u-e*f*u)*w,t[10]=(a*g*r-_*o*r+_*i*h-e*g*h-a*i*u+e*o*u)*w,t[11]=(d*o*r-a*f*r-d*i*h+e*f*h+a*i*m-e*o*m)*w,t[12]=D*w,t[13]=(d*g*s-_*f*s+_*i*p-e*g*p-d*i*l+e*f*l)*w,t[14]=(_*o*s-a*g*s-_*i*c+e*g*c+a*i*l-e*o*l)*w,t[15]=(a*f*s-d*o*s+d*i*c-e*f*c-a*i*p+e*o*p)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,h=r*a,d=r*o;return this.set(h*a+i,h*o-s*c,h*c+s*o,0,h*o+s*c,d*o+i,d*c-s*a,0,h*c-s*o,d*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,h=r+r,d=a+a,f=o+o,p=r*h,m=r*d,_=r*f,g=a*d,l=a*f,u=o*f,b=c*h,E=c*d,S=c*f,D=i.x,A=i.y,w=i.z;return s[0]=(1-(g+u))*D,s[1]=(m+S)*D,s[2]=(_-E)*D,s[3]=0,s[4]=(m-S)*A,s[5]=(1-(p+u))*A,s[6]=(l+b)*A,s[7]=0,s[8]=(_+E)*w,s[9]=(l-b)*w,s[10]=(1-(p+g))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ti.set(s[0],s[1],s[2]).length();const a=ti.set(s[4],s[5],s[6]).length(),o=ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ze.copy(this);const h=1/r,d=1/a,f=1/o;return ze.elements[0]*=h,ze.elements[1]*=h,ze.elements[2]*=h,ze.elements[4]*=d,ze.elements[5]*=d,ze.elements[6]*=d,ze.elements[8]*=f,ze.elements[9]*=f,ze.elements[10]*=f,e.setFromRotationMatrix(ze),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=dn){const c=this.elements,h=2*r/(e-t),d=2*r/(i-s),f=(e+t)/(e-t),p=(i+s)/(i-s);let m,_;if(o===dn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===As)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=dn){const c=this.elements,h=1/(e-t),d=1/(i-s),f=1/(a-r),p=(e+t)*h,m=(i+s)*d;let _,g;if(o===dn)_=(a+r)*f,g=-2*f;else if(o===As)_=r*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ti=new U,ze=new ae,ch=new U(0,0,0),lh=new U(1,1,1),Sn=new U,Qi=new U,Pe=new U,io=new ae,so=new Yn;class Je{constructor(t=0,e=0,i=0,s=Je.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],h=s[5],d=s[9],f=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ve(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,h),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return io.makeRotationFromQuaternion(t),this.setFromRotationMatrix(io,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return so.setFromEuler(this),this.setFromQuaternion(so,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Je.DEFAULT_ORDER="XYZ";class xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hh=0;const ro=new U,ei=new Yn,rn=new ae,ts=new U,Li=new U,uh=new U,dh=new Yn,ao=new U(1,0,0),oo=new U(0,1,0),co=new U(0,0,1),lo={type:"added"},fh={type:"removed"},ni={type:"childadded",child:null},Zs={type:"childremoved",child:null};class me extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new U,e=new Je,i=new Yn,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new It}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(ao,t)}rotateY(t){return this.rotateOnAxis(oo,t)}rotateZ(t){return this.rotateOnAxis(co,t)}translateOnAxis(t,e){return ro.copy(t).applyQuaternion(this.quaternion),this.position.add(ro.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ao,t)}translateY(t){return this.translateOnAxis(oo,t)}translateZ(t){return this.translateOnAxis(co,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ts.copy(t):ts.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Li.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Li,ts,this.up):rn.lookAt(ts,Li,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),ei.setFromRotationMatrix(rn),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lo),ni.child=t,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fh),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lo),ni.child=t,this.dispatchEvent(ni),ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,t,uh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,dh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let h=0,d=c.length;h<d;h++){const f=c[h];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,h=this.material.length;c<h;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),h=a(t.textures),d=a(t.images),f=a(t.shapes),p=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),p.length>0&&(i.skeletons=p),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const c=[];for(const h in o){const d=o[h];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}me.DEFAULT_UP=new U(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Be=new U,an=new U,Ks=new U,on=new U,ii=new U,si=new U,ho=new U,Js=new U,Qs=new U,tr=new U,er=new Zt,nr=new Zt,ir=new Zt;class ke{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Be.subVectors(t,e),s.cross(Be);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Be.subVectors(s,e),an.subVectors(i,e),Ks.subVectors(t,e);const a=Be.dot(Be),o=Be.dot(an),c=Be.dot(Ks),h=an.dot(an),d=an.dot(Ks),f=a*h-o*o;if(f===0)return r.set(0,0,0),null;const p=1/f,m=(h*c-o*d)*p,_=(a*d-o*c)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,on)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,on.x),c.addScaledVector(a,on.y),c.addScaledVector(o,on.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return er.setScalar(0),nr.setScalar(0),ir.setScalar(0),er.fromBufferAttribute(t,e),nr.fromBufferAttribute(t,i),ir.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(er,r.x),a.addScaledVector(nr,r.y),a.addScaledVector(ir,r.z),a}static isFrontFacing(t,e,i,s){return Be.subVectors(i,e),an.subVectors(t,e),Be.cross(an).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Be.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Be.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return ke.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;ii.subVectors(s,i),si.subVectors(r,i),Js.subVectors(t,i);const c=ii.dot(Js),h=si.dot(Js);if(c<=0&&h<=0)return e.copy(i);Qs.subVectors(t,s);const d=ii.dot(Qs),f=si.dot(Qs);if(d>=0&&f<=d)return e.copy(s);const p=c*f-d*h;if(p<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(i).addScaledVector(ii,a);tr.subVectors(t,r);const m=ii.dot(tr),_=si.dot(tr);if(_>=0&&m<=_)return e.copy(r);const g=m*h-c*_;if(g<=0&&h>=0&&_<=0)return o=h/(h-_),e.copy(i).addScaledVector(si,o);const l=d*_-m*f;if(l<=0&&f-d>=0&&m-_>=0)return ho.subVectors(r,s),o=(f-d)/(f-d+(m-_)),e.copy(s).addScaledVector(ho,o);const u=1/(l+g+p);return a=g*u,o=p*u,e.copy(i).addScaledVector(ii,a).addScaledVector(si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},es={h:0,s:0,l:0};function sr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Vt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Vt.workingColorSpace){if(t=Zl(t,1),e=ve(e,0,1),i=ve(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=sr(a,r,t+1/3),this.g=sr(a,r,t),this.b=sr(a,r,t-1/3)}return Vt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const i=vc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}copyLinearToSRGB(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Vt.fromWorkingColorSpace(xe.copy(this),t),Math.round(ve(xe.r*255,0,255))*65536+Math.round(ve(xe.g*255,0,255))*256+Math.round(ve(xe.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.fromWorkingColorSpace(xe.copy(this),e);const i=xe.r,s=xe.g,r=xe.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,h;const d=(o+a)/2;if(o===a)c=0,h=0;else{const f=a-o;switch(h=d<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=h,t.l=d,t}getRGB(t,e=Vt.workingColorSpace){return Vt.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=Ee){Vt.fromWorkingColorSpace(xe.copy(this),t);const e=xe.r,i=xe.g,s=xe.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(es);const i=ks(yn.h,es.h,e),s=ks(yn.s,es.s,e),r=ks(yn.l,es.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xe=new zt;zt.NAMES=vc;let ph=0;class Vi extends qn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=ki(),this.name="",this.blending=fi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sr,this.blendDst=yr,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jn,this.stencilZFail=jn,this.stencilZPass=jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fi&&(i.blending=this.blending),this.side!==An&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Sr&&(i.blendSrc=this.blendSrc),this.blendDst!==yr&&(i.blendDst=this.blendDst),this.blendEquation!==Hn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==jn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==jn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==jn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ds extends Vi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Je,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const le=new U,ns=new At;class We{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=$a,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ns.fromBufferAttribute(this,e),ns.applyMatrix3(t),this.setXY(e,ns.x,ns.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$a&&(t.usage=this.usage),t}}class Mc extends We{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Sc extends We{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends We{constructor(t,e,i){super(new Float32Array(t),e,i)}}let mh=0;const Ue=new ae,rr=new me,ri=new U,De=new Gi,Ui=new Gi,fe=new U;class Xe extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pc(t)?Sc:Mc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new It().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ue.makeRotationFromQuaternion(t),this.applyMatrix4(Ue),this}rotateX(t){return Ue.makeRotationX(t),this.applyMatrix4(Ue),this}rotateY(t){return Ue.makeRotationY(t),this.applyMatrix4(Ue),this}rotateZ(t){return Ue.makeRotationZ(t),this.applyMatrix4(Ue),this}translate(t,e,i){return Ue.makeTranslation(t,e,i),this.applyMatrix4(Ue),this}scale(t,e,i){return Ue.makeScale(t,e,i),this.applyMatrix4(Ue),this}lookAt(t){return rr.lookAt(t),rr.updateMatrix(),this.applyMatrix4(rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];De.setFromBufferAttribute(r),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new va);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ui.setFromBufferAttribute(o),this.morphTargetsRelative?(fe.addVectors(De.min,Ui.min),De.expandByPoint(fe),fe.addVectors(De.max,Ui.max),De.expandByPoint(fe)):(De.expandByPoint(Ui.min),De.expandByPoint(Ui.max))}De.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)fe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(fe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let h=0,d=o.count;h<d;h++)fe.fromBufferAttribute(o,h),c&&(ri.fromBufferAttribute(t,h),fe.add(ri)),s=Math.max(s,i.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<i.count;P++)o[P]=new U,c[P]=new U;const h=new U,d=new U,f=new U,p=new At,m=new At,_=new At,g=new U,l=new U;function u(P,y,M){h.fromBufferAttribute(i,P),d.fromBufferAttribute(i,y),f.fromBufferAttribute(i,M),p.fromBufferAttribute(r,P),m.fromBufferAttribute(r,y),_.fromBufferAttribute(r,M),d.sub(h),f.sub(h),m.sub(p),_.sub(p);const R=1/(m.x*_.y-_.x*m.y);isFinite(R)&&(g.copy(d).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(R),l.copy(f).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(R),o[P].add(g),o[y].add(g),o[M].add(g),c[P].add(l),c[y].add(l),c[M].add(l))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,y=b.length;P<y;++P){const M=b[P],R=M.start,H=M.count;for(let F=R,V=R+H;F<V;F+=3)u(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const E=new U,S=new U,D=new U,A=new U;function w(P){D.fromBufferAttribute(s,P),A.copy(D);const y=o[P];E.copy(y),E.sub(D.multiplyScalar(D.dot(y))).normalize(),S.crossVectors(A,y);const R=S.dot(c[P])<0?-1:1;a.setXYZW(P,E.x,E.y,E.z,R)}for(let P=0,y=b.length;P<y;++P){const M=b[P],R=M.start,H=M.count;for(let F=R,V=R+H;F<V;F+=3)w(t.getX(F+0)),w(t.getX(F+1)),w(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new We(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,m=i.count;p<m;p++)i.setXYZ(p,0,0,0);const s=new U,r=new U,a=new U,o=new U,c=new U,h=new U,d=new U,f=new U;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),g=t.getX(p+1),l=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,l),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),h.fromBufferAttribute(i,l),o.add(d),c.add(d),h.add(d),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(l,h.x,h.y,h.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(p+0,d.x,d.y,d.z),i.setXYZ(p+1,d.x,d.y,d.z),i.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(o,c){const h=o.array,d=o.itemSize,f=o.normalized,p=new h.constructor(c.length*d);let m=0,_=0;for(let g=0,l=c.length;g<l;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*d;for(let u=0;u<d;u++)p[_++]=h[m++]}return new We(p,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Xe,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],h=t(c,i);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const c=[],h=r[o];for(let d=0,f=h.length;d<f;d++){const p=h[d],m=t(p,i);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const h=i[c];t.data.attributes[c]=h.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],d=[];for(let f=0,p=h.length;f<p;f++){const m=h[f];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const h in s){const d=s[h];this.setAttribute(h,d.clone(e))}const r=t.morphAttributes;for(const h in r){const d=[],f=r[h];for(let p=0,m=f.length;p<m;p++)d.push(f[p].clone(e));this.morphAttributes[h]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,d=a.length;h<d;h++){const f=a[h];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uo=new ae,Nn=new gc,is=new va,fo=new U,ss=new U,rs=new U,as=new U,ar=new U,os=new U,po=new U,cs=new U;class Yt extends me{constructor(t=new Xe,e=new Ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){os.set(0,0,0);for(let c=0,h=r.length;c<h;c++){const d=o[c],f=r[c];d!==0&&(ar.fromBufferAttribute(f,t),a?os.addScaledVector(ar,d):os.addScaledVector(ar.sub(e),d))}e.add(os)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),is.copy(i.boundingSphere),is.applyMatrix4(r),Nn.copy(t.ray).recast(t.near),!(is.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(is,fo)===null||Nn.origin.distanceToSquared(fo)>(t.far-t.near)**2))&&(uo.copy(r).invert(),Nn.copy(t.ray).applyMatrix4(uo),!(i.boundingBox!==null&&Nn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Nn)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,h=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const l=p[_],u=a[l.materialIndex],b=Math.max(l.start,m.start),E=Math.min(o.count,Math.min(l.start+l.count,m.start+m.count));for(let S=b,D=E;S<D;S+=3){const A=o.getX(S),w=o.getX(S+1),P=o.getX(S+2);s=ls(this,u,t,i,h,d,f,A,w,P),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=l.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let l=_,u=g;l<u;l+=3){const b=o.getX(l),E=o.getX(l+1),S=o.getX(l+2);s=ls(this,a,t,i,h,d,f,b,E,S),s&&(s.faceIndex=Math.floor(l/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const l=p[_],u=a[l.materialIndex],b=Math.max(l.start,m.start),E=Math.min(c.count,Math.min(l.start+l.count,m.start+m.count));for(let S=b,D=E;S<D;S+=3){const A=S,w=S+1,P=S+2;s=ls(this,u,t,i,h,d,f,A,w,P),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=l.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let l=_,u=g;l<u;l+=3){const b=l,E=l+1,S=l+2;s=ls(this,a,t,i,h,d,f,b,E,S),s&&(s.faceIndex=Math.floor(l/3),e.push(s))}}}}function _h(n,t,e,i,s,r,a,o){let c;if(t.side===Me?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===An,o),c===null)return null;cs.copy(o),cs.applyMatrix4(n.matrixWorld);const h=e.ray.origin.distanceTo(cs);return h<e.near||h>e.far?null:{distance:h,point:cs.clone(),object:n}}function ls(n,t,e,i,s,r,a,o,c,h){n.getVertexPosition(o,ss),n.getVertexPosition(c,rs),n.getVertexPosition(h,as);const d=_h(n,t,e,i,ss,rs,as,po);if(d){const f=new U;ke.getBarycoord(po,ss,rs,as,f),s&&(d.uv=ke.getInterpolatedAttribute(s,o,c,h,f,new At)),r&&(d.uv1=ke.getInterpolatedAttribute(r,o,c,h,f,new At)),a&&(d.normal=ke.getInterpolatedAttribute(a,o,c,h,f,new U),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:c,c:h,normal:new U,materialIndex:0};ke.getNormal(ss,rs,as,p.normal),d.face=p,d.barycoord=f}return d}class Pn extends Xe{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],h=[],d=[],f=[];let p=0,m=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Se(h,3)),this.setAttribute("normal",new Se(d,3)),this.setAttribute("uv",new Se(f,2));function _(g,l,u,b,E,S,D,A,w,P,y){const M=S/w,R=D/P,H=S/2,F=D/2,V=A/2,X=w+1,W=P+1;let Z=0,k=0;const et=new U;for(let lt=0;lt<W;lt++){const mt=lt*R-F;for(let Pt=0;Pt<X;Pt++){const Bt=Pt*M-H;et[g]=Bt*b,et[l]=mt*E,et[u]=V,h.push(et.x,et.y,et.z),et[g]=0,et[l]=0,et[u]=A>0?1:-1,d.push(et.x,et.y,et.z),f.push(Pt/w),f.push(1-lt/P),Z+=1}}for(let lt=0;lt<P;lt++)for(let mt=0;mt<w;mt++){const Pt=p+mt+X*lt,Bt=p+mt+X*(lt+1),Y=p+(mt+1)+X*(lt+1),Q=p+(mt+1)+X*lt;c.push(Pt,Bt,Q),c.push(Bt,Y,Q),k+=6}o.addGroup(m,k,y),m+=k,p+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Si(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ye(n){const t={};for(let e=0;e<n.length;e++){const i=Si(n[e]);for(const s in i)t[s]=i[s]}return t}function gh(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function yc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}const Ec={clone:Si,merge:ye};var xh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qe extends Vi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xh,this.fragmentShader=vh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=gh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Tc extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new U,mo=new At,_o=new At;class Re extends Tc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ra*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ra*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,mo,_o),e.subVectors(_o,mo)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ts*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/h,s*=a.width/c,i*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,oi=1;class Mh extends me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Re(ai,oi,t,e);s.layers=this.layers,this.add(s);const r=new Re(ai,oi,t,e);r.layers=this.layers,this.add(r);const a=new Re(ai,oi,t,e);a.layers=this.layers,this.add(a);const o=new Re(ai,oi,t,e);o.layers=this.layers,this.add(o);const c=new Re(ai,oi,t,e);c.layers=this.layers,this.add(c);const h=new Re(ai,oi,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const h of e)this.remove(h);if(t===dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===As)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,h,d]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,h),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,d),t.setRenderTarget(f,p,m),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class bc extends Te{constructor(t,e,i,s,r,a,o,c,h,d){t=t!==void 0?t:[],e=e!==void 0?e:gi,super(t,e,i,s,r,a,o,c,h,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Sh extends Rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new bc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:Si(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Me,blending:bn});r.uniforms.tEquirect.value=e;const a=new Yt(s,r),o=e.minFilter;return e.minFilter===Vn&&(e.minFilter=Ze),new Mh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const or=new U,yh=new U,Eh=new It;class hn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=or.subVectors(i,e).cross(yh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(or),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Eh.getNormalMatrix(t),s=this.coplanarPoint(or).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fn=new va,hs=new U;class Ma{constructor(t=new hn,e=new hn,i=new hn,s=new hn,r=new hn,a=new hn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=dn){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],h=s[4],d=s[5],f=s[6],p=s[7],m=s[8],_=s[9],g=s[10],l=s[11],u=s[12],b=s[13],E=s[14],S=s[15];if(i[0].setComponents(c-r,p-h,l-m,S-u).normalize(),i[1].setComponents(c+r,p+h,l+m,S+u).normalize(),i[2].setComponents(c+a,p+d,l+_,S+b).normalize(),i[3].setComponents(c-a,p-d,l-_,S-b).normalize(),i[4].setComponents(c-o,p-f,l-g,S-E).normalize(),e===dn)i[5].setComponents(c+o,p+f,l+g,S+E).normalize();else if(e===As)i[5].setComponents(o,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(t){return Fn.center.set(0,0,0),Fn.radius=.7071067811865476,Fn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(hs.x=s.normal.x>0?t.max.x:t.min.x,hs.y=s.normal.y>0?t.max.y:t.min.y,hs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wc(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Th(n){const t=new WeakMap;function e(o,c){const h=o.array,d=o.usage,f=h.byteLength,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,h,d),o.onUploadCallback();let m;if(h instanceof Float32Array)m=n.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=n.SHORT;else if(h instanceof Uint32Array)m=n.UNSIGNED_INT;else if(h instanceof Int32Array)m=n.INT;else if(h instanceof Int8Array)m=n.BYTE;else if(h instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,h){const d=c.array,f=c.updateRanges;if(n.bindBuffer(h,o),f.length===0)n.bufferSubData(h,0,d);else{f.sort((m,_)=>m.start-_.start);let p=0;for(let m=1;m<f.length;m++){const _=f[p],g=f[m];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++p,f[p]=g)}f.length=p+1;for(let m=0,_=f.length;m<_;m++){const g=f[m];n.bufferSubData(h,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,c));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,c),h.version=o.version}}return{get:s,remove:r,update:a}}class Ke extends Xe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),h=o+1,d=c+1,f=t/o,p=e/c,m=[],_=[],g=[],l=[];for(let u=0;u<d;u++){const b=u*p-a;for(let E=0;E<h;E++){const S=E*f-r;_.push(S,-b,0),g.push(0,0,1),l.push(E/o),l.push(1-u/c)}}for(let u=0;u<c;u++)for(let b=0;b<o;b++){const E=b+h*u,S=b+h*(u+1),D=b+1+h*(u+1),A=b+1+h*u;m.push(E,S,A),m.push(S,D,A)}this.setIndex(m),this.setAttribute("position",new Se(_,3)),this.setAttribute("normal",new Se(g,3)),this.setAttribute("uv",new Se(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ke(t.width,t.height,t.widthSegments,t.heightSegments)}}var bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ch=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ph=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ih=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Oh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$h=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eu="gl_FragColor = linearToOutputTexel( gl_FragColor );",nu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,su=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ru=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,au=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ou=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,du=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_u=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Su=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Eu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Au=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ru=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Du=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Iu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ou=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ku=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$u=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ju=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ku=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ju=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,td=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ed=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ad=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ld=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ud=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,md=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Md=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ed=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Td=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ad=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ld=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ud=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Od=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:bh,alphahash_pars_fragment:wh,alphamap_fragment:Ah,alphamap_pars_fragment:Rh,alphatest_fragment:Ch,alphatest_pars_fragment:Ph,aomap_fragment:Dh,aomap_pars_fragment:Lh,batching_pars_vertex:Uh,batching_vertex:Ih,begin_vertex:Nh,beginnormal_vertex:Fh,bsdfs:Oh,iridescence_fragment:zh,bumpmap_pars_fragment:Bh,clipping_planes_fragment:Hh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Gh,clipping_planes_vertex:Vh,color_fragment:Wh,color_pars_fragment:Xh,color_pars_vertex:Yh,color_vertex:qh,common:$h,cube_uv_reflection_fragment:jh,defaultnormal_vertex:Zh,displacementmap_pars_vertex:Kh,displacementmap_vertex:Jh,emissivemap_fragment:Qh,emissivemap_pars_fragment:tu,colorspace_fragment:eu,colorspace_pars_fragment:nu,envmap_fragment:iu,envmap_common_pars_fragment:su,envmap_pars_fragment:ru,envmap_pars_vertex:au,envmap_physical_pars_fragment:gu,envmap_vertex:ou,fog_vertex:cu,fog_pars_vertex:lu,fog_fragment:hu,fog_pars_fragment:uu,gradientmap_pars_fragment:du,lightmap_pars_fragment:fu,lights_lambert_fragment:pu,lights_lambert_pars_fragment:mu,lights_pars_begin:_u,lights_toon_fragment:xu,lights_toon_pars_fragment:vu,lights_phong_fragment:Mu,lights_phong_pars_fragment:Su,lights_physical_fragment:yu,lights_physical_pars_fragment:Eu,lights_fragment_begin:Tu,lights_fragment_maps:bu,lights_fragment_end:wu,logdepthbuf_fragment:Au,logdepthbuf_pars_fragment:Ru,logdepthbuf_pars_vertex:Cu,logdepthbuf_vertex:Pu,map_fragment:Du,map_pars_fragment:Lu,map_particle_fragment:Uu,map_particle_pars_fragment:Iu,metalnessmap_fragment:Nu,metalnessmap_pars_fragment:Fu,morphinstance_vertex:Ou,morphcolor_vertex:zu,morphnormal_vertex:Bu,morphtarget_pars_vertex:Hu,morphtarget_vertex:ku,normal_fragment_begin:Gu,normal_fragment_maps:Vu,normal_pars_fragment:Wu,normal_pars_vertex:Xu,normal_vertex:Yu,normalmap_pars_fragment:qu,clearcoat_normal_fragment_begin:$u,clearcoat_normal_fragment_maps:ju,clearcoat_pars_fragment:Zu,iridescence_pars_fragment:Ku,opaque_fragment:Ju,packing:Qu,premultiplied_alpha_fragment:td,project_vertex:ed,dithering_fragment:nd,dithering_pars_fragment:id,roughnessmap_fragment:sd,roughnessmap_pars_fragment:rd,shadowmap_pars_fragment:ad,shadowmap_pars_vertex:od,shadowmap_vertex:cd,shadowmask_pars_fragment:ld,skinbase_vertex:hd,skinning_pars_vertex:ud,skinning_vertex:dd,skinnormal_vertex:fd,specularmap_fragment:pd,specularmap_pars_fragment:md,tonemapping_fragment:_d,tonemapping_pars_fragment:gd,transmission_fragment:xd,transmission_pars_fragment:vd,uv_pars_fragment:Md,uv_pars_vertex:Sd,uv_vertex:yd,worldpos_vertex:Ed,background_vert:Td,background_frag:bd,backgroundCube_vert:wd,backgroundCube_frag:Ad,cube_vert:Rd,cube_frag:Cd,depth_vert:Pd,depth_frag:Dd,distanceRGBA_vert:Ld,distanceRGBA_frag:Ud,equirect_vert:Id,equirect_frag:Nd,linedashed_vert:Fd,linedashed_frag:Od,meshbasic_vert:zd,meshbasic_frag:Bd,meshlambert_vert:Hd,meshlambert_frag:kd,meshmatcap_vert:Gd,meshmatcap_frag:Vd,meshnormal_vert:Wd,meshnormal_frag:Xd,meshphong_vert:Yd,meshphong_frag:qd,meshphysical_vert:$d,meshphysical_frag:jd,meshtoon_vert:Zd,meshtoon_frag:Kd,points_vert:Jd,points_frag:Qd,shadow_vert:tf,shadow_frag:ef,sprite_vert:nf,sprite_frag:sf},it={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},je={basic:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:ye([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:ye([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:ye([it.points,it.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:ye([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:ye([it.common,it.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:ye([it.sprite,it.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:ye([it.common,it.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:ye([it.lights,it.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};je.physical={uniforms:ye([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const us={r:0,b:0,g:0},On=new Je,rf=new ae;function af(n,t,e,i,s,r,a){const o=new zt(0);let c=r===!0?0:1,h,d,f=null,p=0,m=null;function _(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function g(b){let E=!1;const S=_(b);S===null?u(o,c):S&&S.isColor&&(u(S,1),E=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function l(b,E){const S=_(E);S&&(S.isCubeTexture||S.mapping===Cs)?(d===void 0&&(d=new Yt(new Pn(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:Si(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:Me,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),On.copy(E.backgroundRotation),On.x*=-1,On.y*=-1,On.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),d.material.uniforms.envMap.value=S,d.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(rf.makeRotationFromEuler(On)),d.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Jt,(f!==S||p!==S.version||m!==n.toneMapping)&&(d.material.needsUpdate=!0,f=S,p=S.version,m=n.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Yt(new Ke(2,2),new Qe({name:"BackgroundMaterial",uniforms:Si(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Jt,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||p!==S.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,f=S,p=S.version,m=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null))}function u(b,E){b.getRGB(us,yc(n)),i.buffers.color.setClear(us.r,us.g,us.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),c=E,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,u(o,c)},render:g,addToRenderList:l}}function of(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,a=!1;function o(M,R,H,F,V){let X=!1;const W=f(F,H,R);r!==W&&(r=W,h(r.object)),X=m(M,F,H,V),X&&_(M,F,H,V),V!==null&&t.update(V,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(M,R,H,F),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return n.createVertexArray()}function h(M){return n.bindVertexArray(M)}function d(M){return n.deleteVertexArray(M)}function f(M,R,H){const F=H.wireframe===!0;let V=i[M.id];V===void 0&&(V={},i[M.id]=V);let X=V[R.id];X===void 0&&(X={},V[R.id]=X);let W=X[F];return W===void 0&&(W=p(c()),X[F]=W),W}function p(M){const R=[],H=[],F=[];for(let V=0;V<e;V++)R[V]=0,H[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:H,attributeDivisors:F,object:M,attributes:{},index:null}}function m(M,R,H,F){const V=r.attributes,X=R.attributes;let W=0;const Z=H.getAttributes();for(const k in Z)if(Z[k].location>=0){const lt=V[k];let mt=X[k];if(mt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor)),lt===void 0||lt.attribute!==mt||mt&&lt.data!==mt.data)return!0;W++}return r.attributesNum!==W||r.index!==F}function _(M,R,H,F){const V={},X=R.attributes;let W=0;const Z=H.getAttributes();for(const k in Z)if(Z[k].location>=0){let lt=X[k];lt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor));const mt={};mt.attribute=lt,lt&&lt.data&&(mt.data=lt.data),V[k]=mt,W++}r.attributes=V,r.attributesNum=W,r.index=F}function g(){const M=r.newAttributes;for(let R=0,H=M.length;R<H;R++)M[R]=0}function l(M){u(M,0)}function u(M,R){const H=r.newAttributes,F=r.enabledAttributes,V=r.attributeDivisors;H[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),V[M]!==R&&(n.vertexAttribDivisor(M,R),V[M]=R)}function b(){const M=r.newAttributes,R=r.enabledAttributes;for(let H=0,F=R.length;H<F;H++)R[H]!==M[H]&&(n.disableVertexAttribArray(H),R[H]=0)}function E(M,R,H,F,V,X,W){W===!0?n.vertexAttribIPointer(M,R,H,V,X):n.vertexAttribPointer(M,R,H,F,V,X)}function S(M,R,H,F){g();const V=F.attributes,X=H.getAttributes(),W=R.defaultAttributeValues;for(const Z in X){const k=X[Z];if(k.location>=0){let et=V[Z];if(et===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(et=M.instanceColor)),et!==void 0){const lt=et.normalized,mt=et.itemSize,Pt=t.get(et);if(Pt===void 0)continue;const Bt=Pt.buffer,Y=Pt.type,Q=Pt.bytesPerElement,pt=Y===n.INT||Y===n.UNSIGNED_INT||et.gpuType===fa;if(et.isInterleavedBufferAttribute){const nt=et.data,yt=nt.stride,bt=et.offset;if(nt.isInstancedInterleavedBuffer){for(let Dt=0;Dt<k.locationSize;Dt++)u(k.location+Dt,nt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Dt=0;Dt<k.locationSize;Dt++)l(k.location+Dt);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let Dt=0;Dt<k.locationSize;Dt++)E(k.location+Dt,mt/k.locationSize,Y,lt,yt*Q,(bt+mt/k.locationSize*Dt)*Q,pt)}else{if(et.isInstancedBufferAttribute){for(let nt=0;nt<k.locationSize;nt++)u(k.location+nt,et.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let nt=0;nt<k.locationSize;nt++)l(k.location+nt);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let nt=0;nt<k.locationSize;nt++)E(k.location+nt,mt/k.locationSize,Y,lt,mt*Q,mt/k.locationSize*nt*Q,pt)}}else if(W!==void 0){const lt=W[Z];if(lt!==void 0)switch(lt.length){case 2:n.vertexAttrib2fv(k.location,lt);break;case 3:n.vertexAttrib3fv(k.location,lt);break;case 4:n.vertexAttrib4fv(k.location,lt);break;default:n.vertexAttrib1fv(k.location,lt)}}}}b()}function D(){P();for(const M in i){const R=i[M];for(const H in R){const F=R[H];for(const V in F)d(F[V].object),delete F[V];delete R[H]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const R=i[M.id];for(const H in R){const F=R[H];for(const V in F)d(F[V].object),delete F[V];delete R[H]}delete i[M.id]}function w(M){for(const R in i){const H=i[R];if(H[M.id]===void 0)continue;const F=H[M.id];for(const V in F)d(F[V].object),delete F[V];delete H[M.id]}}function P(){y(),a=!0,r!==s&&(r=s,h(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:y,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:l,disableUnusedAttributes:b}}function cf(n,t,e){let i;function s(h){i=h}function r(h,d){n.drawArrays(i,h,d),e.update(d,i,1)}function a(h,d,f){f!==0&&(n.drawArraysInstanced(i,h,d,f),e.update(d,i,f))}function o(h,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=d[_];e.update(m,i,1)}function c(h,d,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<h.length;_++)a(h[_],d[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(i,h,0,d,0,p,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g]*p[g];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function lf(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==Ge&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const P=w===Ei&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==pn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==un&&!P)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const d=c(h);d!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",d,"instead."),h=d);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),l=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=_>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:l,maxAttributes:u,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:D,maxSamples:A}}function hf(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new hn,o=new It,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||i!==0||s;return s=p,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=d(f,p,0)},this.setState=function(f,p,m){const _=f.clippingPlanes,g=f.clipIntersection,l=f.clipShadows,u=n.get(f);if(!s||_===null||_.length===0||r&&!l)r?d(null):h();else{const b=r?0:i,E=b*4;let S=u.clippingState||null;c.value=S,S=d(_,p,E,m);for(let D=0;D!==E;++D)S[D]=e[D];u.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(f,p,m,_){const g=f!==null?f.length:0;let l=null;if(g!==0){if(l=c.value,_!==!0||l===null){const u=m+g*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(l===null||l.length<u)&&(l=new Float32Array(u));for(let E=0,S=m;E!==g;++E,S+=4)a.copy(f[E]).applyMatrix4(b,o),a.normal.toArray(l,S),l[S+3]=a.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,l}}function uf(n){let t=new WeakMap;function e(a,o){return o===Pr?a.mapping=gi:o===Dr&&(a.mapping=xi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Pr||o===Dr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const h=new Sh(c.height);return h.fromEquirectangularTexture(n,a),t.set(a,h),a.addEventListener("dispose",s),e(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Ac extends Tc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ui=4,go=[.125,.215,.35,.446,.526,.582],kn=20,cr=new Ac,xo=new zt;let lr=null,hr=0,ur=0,dr=!1;const Bn=(1+Math.sqrt(5))/2,ci=1/Bn,vo=[new U(-Bn,ci,0),new U(Bn,ci,0),new U(-ci,0,Bn),new U(ci,0,Bn),new U(0,Bn,-ci),new U(0,Bn,ci),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class aa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){lr=this._renderer.getRenderTarget(),hr=this._renderer.getActiveCubeFace(),ur=this._renderer.getActiveMipmapLevel(),dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=So(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(lr,hr,ur),this._renderer.xr.enabled=dr,t.scissorTest=!1,ds(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gi||t.mapping===xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),lr=this._renderer.getRenderTarget(),hr=this._renderer.getActiveCubeFace(),ur=this._renderer.getActiveMipmapLevel(),dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Ei,format:Ge,colorSpace:Ti,depthBuffer:!1},s=Mo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mo(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=df(r)),this._blurMaterial=ff(r,t,e)}return s}_compileMaterial(t){const e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,cr)}_sceneToCubeUV(t,e,i,s){const o=new Re(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(xo),d.toneMapping=wn,d.autoClear=!1;const m=new Ds({name:"PMREM.Background",side:Me,depthWrite:!1,depthTest:!1}),_=new Yt(new Pn,m);let g=!1;const l=t.background;l?l.isColor&&(m.color.copy(l),t.background=null,g=!0):(m.color.copy(xo),g=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(o.up.set(0,c[u],0),o.lookAt(h[u],0,0)):b===1?(o.up.set(0,0,c[u]),o.lookAt(0,h[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,h[u]));const E=this._cubeSize;ds(s,b*E,u>2?E:0,E,E),d.setRenderTarget(s),g&&d.render(_,o),d.render(t,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=p,d.autoClear=f,t.background=l}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===gi||t.mapping===xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=So());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Yt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ds(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,cr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vo[(s-r-1)%vo.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const c=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Yt(this._lodPlanes[s],h),p=h.uniforms,m=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*kn-1),g=r/_,l=isFinite(r)?1+Math.floor(d*g):kn;l>kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${l} samples when the maximum is set to ${kn}`);const u=[];let b=0;for(let w=0;w<kn;++w){const P=w/g,y=Math.exp(-P*P/2);u.push(y),w===0?b+=y:w<l&&(b+=2*y)}for(let w=0;w<u.length;w++)u[w]=u[w]/b;p.envMap.value=t.texture,p.samples.value=l,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:E}=this;p.dTheta.value=_,p.mipInt.value=E-i;const S=this._sizeLods[s],D=3*S*(s>E-ui?s-E+ui:0),A=4*(this._cubeSize-S);ds(e,D,A,3*S,2*S),c.setRenderTarget(e),c.render(f,cr)}}function df(n){const t=[],e=[],i=[];let s=n;const r=n-ui+1+go.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>n-ui?c=go[a-n+ui-1]:a===0&&(c=0),i.push(c);const h=1/(o-2),d=-h,f=1+h,p=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,_=6,g=3,l=2,u=1,b=new Float32Array(g*_*m),E=new Float32Array(l*_*m),S=new Float32Array(u*_*m);for(let A=0;A<m;A++){const w=A%3*2/3-1,P=A>2?0:-1,y=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];b.set(y,g*_*A),E.set(p,l*_*A);const M=[A,A,A,A,A,A];S.set(M,u*_*A)}const D=new Xe;D.setAttribute("position",new We(b,g)),D.setAttribute("uv",new We(E,l)),D.setAttribute("faceIndex",new We(S,u)),t.push(D),s>ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Mo(n,t,e){const i=new Rn(n,t,e);return i.texture.mapping=Cs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ds(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function ff(n,t,e){const i=new Float32Array(kn),s=new U(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function So(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function yo(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function pf(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const c=o.mapping,h=c===Pr||c===Dr,d=c===gi||c===xi;if(h||d){let f=t.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new aa(n)),f=h?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const m=o.image;return h&&m&&m.height>0||d&&m&&s(m)?(e===null&&(e=new aa(n)),f=h?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let c=0;const h=6;for(let d=0;d<h;d++)o[d]!==void 0&&c++;return c===h}function r(o){const c=o.target;c.removeEventListener("dispose",r);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function mf(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Fi("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function _f(n,t,e,i){const s={},r=new WeakMap;function a(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const g=p.morphAttributes[_];for(let l=0,u=g.length;l<u;l++)t.remove(g[l])}p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(f,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function c(f){const p=f.attributes;for(const _ in p)t.update(p[_],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let l=0,u=g.length;l<u;l++)t.update(g[l],n.ARRAY_BUFFER)}}function h(f){const p=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const b=m.array;g=m.version;for(let E=0,S=b.length;E<S;E+=3){const D=b[E+0],A=b[E+1],w=b[E+2];p.push(D,A,A,w,w,D)}}else if(_!==void 0){const b=_.array;g=_.version;for(let E=0,S=b.length/3-1;E<S;E+=3){const D=E+0,A=E+1,w=E+2;p.push(D,A,A,w,w,D)}}else return;const l=new(pc(p)?Sc:Mc)(p,1);l.version=g;const u=r.get(f);u&&t.remove(u),r.set(f,l)}function d(f){const p=r.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&h(f)}else h(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:d}}function gf(n,t,e){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,m){n.drawElements(i,m,r,p*a),e.update(m,i,1)}function h(p,m,_){_!==0&&(n.drawElementsInstanced(i,m,r,p*a,_),e.update(m,i,_))}function d(p,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,p,0,_);let l=0;for(let u=0;u<_;u++)l+=m[u];e.update(l,i,1)}function f(p,m,_,g){if(_===0)return;const l=t.get("WEBGL_multi_draw");if(l===null)for(let u=0;u<p.length;u++)h(p[u]/a,m[u],g[u]);else{l.multiDrawElementsInstancedWEBGL(i,m,0,r,p,0,g,0,_);let u=0;for(let b=0;b<_;b++)u+=m[b]*g[b];e.update(u,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function xf(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function vf(n,t,e){const i=new WeakMap,s=new Zt;function r(a,o,c){const h=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let p=i.get(o);if(p===void 0||p.count!==f){let M=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var m=M;p!==void 0&&p.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,l=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),g===!0&&(S=2),l===!0&&(S=3);let D=o.attributes.position.count*S,A=1;D>t.maxTextureSize&&(A=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const w=new Float32Array(D*A*4*f),P=new _c(w,D,A,f);P.type=un,P.needsUpdate=!0;const y=S*4;for(let R=0;R<f;R++){const H=u[R],F=b[R],V=E[R],X=D*A*4*R;for(let W=0;W<H.count;W++){const Z=W*y;_===!0&&(s.fromBufferAttribute(H,W),w[X+Z+0]=s.x,w[X+Z+1]=s.y,w[X+Z+2]=s.z,w[X+Z+3]=0),g===!0&&(s.fromBufferAttribute(F,W),w[X+Z+4]=s.x,w[X+Z+5]=s.y,w[X+Z+6]=s.z,w[X+Z+7]=0),l===!0&&(s.fromBufferAttribute(V,W),w[X+Z+8]=s.x,w[X+Z+9]=s.y,w[X+Z+10]=s.z,w[X+Z+11]=V.itemSize===4?s.w:1)}}p={count:f,texture:P,size:new At(D,A)},i.set(o,p),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let _=0;for(let l=0;l<h.length;l++)_+=h[l];const g=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",h)}c.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function Mf(n,t,e,i){let s=new WeakMap;function r(c){const h=i.render.frame,d=c.geometry,f=t.get(c,d);if(s.get(f)!==h&&(t.update(f),s.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return f}function a(){s=new WeakMap}function o(c){const h=c.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class Rc extends Te{constructor(t,e,i,s,r,a,o,c,h,d=pi){if(d!==pi&&d!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===pi&&(i=Xn),i===void 0&&d===Mi&&(i=vi),super(null,s,r,a,o,c,d,i,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ve,this.minFilter=c!==void 0?c:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Cc=new Te,Eo=new Rc(1,1),Pc=new _c,Dc=new ah,Lc=new bc,To=[],bo=[],wo=new Float32Array(16),Ao=new Float32Array(9),Ro=new Float32Array(4);function bi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=To[s];if(r===void 0&&(r=new Float32Array(s),To[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function de(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ls(n,t){let e=bo[t];e===void 0&&(e=new Int32Array(t),bo[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Sf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function yf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2fv(this.addr,t),de(e,t)}}function Ef(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;n.uniform3fv(this.addr,t),de(e,t)}}function Tf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4fv(this.addr,t),de(e,t)}}function bf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(ue(e,i))return;Ro.set(i),n.uniformMatrix2fv(this.addr,!1,Ro),de(e,i)}}function wf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(ue(e,i))return;Ao.set(i),n.uniformMatrix3fv(this.addr,!1,Ao),de(e,i)}}function Af(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(ue(e,i))return;wo.set(i),n.uniformMatrix4fv(this.addr,!1,wo),de(e,i)}}function Rf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Cf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2iv(this.addr,t),de(e,t)}}function Pf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3iv(this.addr,t),de(e,t)}}function Df(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4iv(this.addr,t),de(e,t)}}function Lf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Uf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2uiv(this.addr,t),de(e,t)}}function If(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3uiv(this.addr,t),de(e,t)}}function Nf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4uiv(this.addr,t),de(e,t)}}function Ff(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Eo.compareFunction=fc,r=Eo):r=Cc,e.setTexture2D(t||r,s)}function Of(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Dc,s)}function zf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Lc,s)}function Bf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Pc,s)}function Hf(n){switch(n){case 5126:return Sf;case 35664:return yf;case 35665:return Ef;case 35666:return Tf;case 35674:return bf;case 35675:return wf;case 35676:return Af;case 5124:case 35670:return Rf;case 35667:case 35671:return Cf;case 35668:case 35672:return Pf;case 35669:case 35673:return Df;case 5125:return Lf;case 36294:return Uf;case 36295:return If;case 36296:return Nf;case 35678:case 36198:case 36298:case 36306:case 35682:return Ff;case 35679:case 36299:case 36307:return Of;case 35680:case 36300:case 36308:case 36293:return zf;case 36289:case 36303:case 36311:case 36292:return Bf}}function kf(n,t){n.uniform1fv(this.addr,t)}function Gf(n,t){const e=bi(t,this.size,2);n.uniform2fv(this.addr,e)}function Vf(n,t){const e=bi(t,this.size,3);n.uniform3fv(this.addr,e)}function Wf(n,t){const e=bi(t,this.size,4);n.uniform4fv(this.addr,e)}function Xf(n,t){const e=bi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Yf(n,t){const e=bi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function qf(n,t){const e=bi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function $f(n,t){n.uniform1iv(this.addr,t)}function jf(n,t){n.uniform2iv(this.addr,t)}function Zf(n,t){n.uniform3iv(this.addr,t)}function Kf(n,t){n.uniform4iv(this.addr,t)}function Jf(n,t){n.uniform1uiv(this.addr,t)}function Qf(n,t){n.uniform2uiv(this.addr,t)}function tp(n,t){n.uniform3uiv(this.addr,t)}function ep(n,t){n.uniform4uiv(this.addr,t)}function np(n,t,e){const i=this.cache,s=t.length,r=Ls(e,s);ue(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Cc,r[a])}function ip(n,t,e){const i=this.cache,s=t.length,r=Ls(e,s);ue(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Dc,r[a])}function sp(n,t,e){const i=this.cache,s=t.length,r=Ls(e,s);ue(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Lc,r[a])}function rp(n,t,e){const i=this.cache,s=t.length,r=Ls(e,s);ue(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Pc,r[a])}function ap(n){switch(n){case 5126:return kf;case 35664:return Gf;case 35665:return Vf;case 35666:return Wf;case 35674:return Xf;case 35675:return Yf;case 35676:return qf;case 5124:case 35670:return $f;case 35667:case 35671:return jf;case 35668:case 35672:return Zf;case 35669:case 35673:return Kf;case 5125:return Jf;case 36294:return Qf;case 36295:return tp;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return np;case 35679:case 36299:case 36307:return ip;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return rp}}class op{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Hf(e.type)}}class cp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ap(e.type)}}class lp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const fr=/(\w+)(\])?(\[|\.)?/g;function Co(n,t){n.seq.push(t),n.map[t.id]=t}function hp(n,t,e){const i=n.name,s=i.length;for(fr.lastIndex=0;;){const r=fr.exec(i),a=fr.lastIndex;let o=r[1];const c=r[2]==="]",h=r[3];if(c&&(o=o|0),h===void 0||h==="["&&a+2===s){Co(e,h===void 0?new op(o,n,t):new cp(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new lp(o),Co(e,f)),e=f}}}class bs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);hp(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Po(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const up=37297;let dp=0;function fp(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Do=new It;function pp(n){Vt._getMatrix(Do,Vt.workingColorSpace,n);const t=`mat3( ${Do.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(n)){case Ps:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Lo(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+fp(n.getShaderSource(t),a)}else return s}function mp(n,t){const e=pp(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function _p(n,t){let e;switch(t){case Ul:e="Linear";break;case Il:e="Reinhard";break;case Nl:e="Cineon";break;case tc:e="ACESFilmic";break;case Ol:e="AgX";break;case zl:e="Neutral";break;case Fl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const fs=new U;function gp(){Vt.getLuminanceCoefficients(fs);const n=fs.x.toFixed(4),t=fs.y.toFixed(4),e=fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oi).join(`
`)}function vp(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Mp(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Oi(n){return n!==""}function Uo(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Io(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Sp=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(n){return n.replace(Sp,Ep)}const yp=new Map;function Ep(n,t){let e=Ft[t];if(e===void 0){const i=yp.get(t);if(i!==void 0)e=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return oa(e)}const Tp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function No(n){return n.replace(Tp,bp)}function bp(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fo(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wp(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ko?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jo?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Ap(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gi:case xi:t="ENVMAP_TYPE_CUBE";break;case Cs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Rp(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case xi:t="ENVMAP_MODE_REFRACTION";break}return t}function Cp(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Qo:t="ENVMAP_BLENDING_MULTIPLY";break;case Dl:t="ENVMAP_BLENDING_MIX";break;case Ll:t="ENVMAP_BLENDING_ADD";break}return t}function Pp(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Dp(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=wp(e),h=Ap(e),d=Rp(e),f=Cp(e),p=Pp(e),m=xp(e),_=vp(r),g=s.createProgram();let l,u,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(l=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Oi).join(`
`),l.length>0&&(l+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Oi).join(`
`),u.length>0&&(u+=`
`)):(l=[Fo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oi).join(`
`),u=[Fo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==wn?_p("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,mp("linearToOutputTexel",e.outputColorSpace),gp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Oi).join(`
`)),a=oa(a),a=Uo(a,e),a=Io(a,e),o=oa(o),o=Uo(o,e),o=Io(o,e),a=No(a),o=No(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,l=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+l,u=["#define varying in",e.glslVersion===ja?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ja?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const E=b+l+a,S=b+u+o,D=Po(s,s.VERTEX_SHADER,E),A=Po(s,s.FRAGMENT_SHADER,S);s.attachShader(g,D),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function w(R){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(g).trim(),F=s.getShaderInfoLog(D).trim(),V=s.getShaderInfoLog(A).trim();let X=!0,W=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,D,A);else{const Z=Lo(s,D,"vertex"),k=Lo(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+Z+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(F===""||V==="")&&(W=!1);W&&(R.diagnostics={runnable:X,programLog:H,vertexShader:{log:F,prefix:l},fragmentShader:{log:V,prefix:u}})}s.deleteShader(D),s.deleteShader(A),P=new bs(s,g),y=Mp(s,g)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(g,up)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dp++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=D,this.fragmentShader=A,this}let Lp=0;class Up{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Ip(t),e.set(t,i)),i}}class Ip{constructor(t){this.id=Lp++,this.code=t,this.usedTimes=0}}function Np(n,t,e,i,s,r,a){const o=new xc,c=new Up,h=new Set,d=[],f=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return h.add(y),y===0?"uv":`uv${y}`}function l(y,M,R,H,F){const V=H.fog,X=F.geometry,W=y.isMeshStandardMaterial?H.environment:null,Z=(y.isMeshStandardMaterial?e:t).get(y.envMap||W),k=Z&&Z.mapping===Cs?Z.image.height:null,et=_[y.type];y.precision!==null&&(m=s.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const lt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,mt=lt!==void 0?lt.length:0;let Pt=0;X.morphAttributes.position!==void 0&&(Pt=1),X.morphAttributes.normal!==void 0&&(Pt=2),X.morphAttributes.color!==void 0&&(Pt=3);let Bt,Y,Q,pt;if(et){const Kt=je[et];Bt=Kt.vertexShader,Y=Kt.fragmentShader}else Bt=y.vertexShader,Y=y.fragmentShader,c.update(y),Q=c.getVertexShaderID(y),pt=c.getFragmentShaderID(y);const nt=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),bt=F.isInstancedMesh===!0,Dt=F.isBatchedMesh===!0,te=!!y.map,Ht=!!y.matcap,st=!!Z,C=!!y.aoMap,Xt=!!y.lightMap,Rt=!!y.bumpMap,Ot=!!y.normalMap,St=!!y.displacementMap,qt=!!y.emissiveMap,Et=!!y.metalnessMap,T=!!y.roughnessMap,x=y.anisotropy>0,O=y.clearcoat>0,$=y.dispersion>0,K=y.iridescence>0,q=y.sheen>0,vt=y.transmission>0,at=x&&!!y.anisotropyMap,ut=O&&!!y.clearcoatMap,Gt=O&&!!y.clearcoatNormalMap,J=O&&!!y.clearcoatRoughnessMap,dt=K&&!!y.iridescenceMap,Tt=K&&!!y.iridescenceThicknessMap,wt=q&&!!y.sheenColorMap,ft=q&&!!y.sheenRoughnessMap,kt=!!y.specularMap,Nt=!!y.specularColorMap,ee=!!y.specularIntensityMap,L=vt&&!!y.transmissionMap,rt=vt&&!!y.thicknessMap,G=!!y.gradientMap,j=!!y.alphaMap,ht=y.alphaTest>0,ot=!!y.alphaHash,Lt=!!y.extensions;let oe=wn;y.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(oe=n.toneMapping);const _e={shaderID:et,shaderType:y.type,shaderName:y.name,vertexShader:Bt,fragmentShader:Y,defines:y.defines,customVertexShaderID:Q,customFragmentShaderID:pt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Dt,batchingColor:Dt&&F._colorsTexture!==null,instancing:bt,instancingColor:bt&&F.instanceColor!==null,instancingMorph:bt&&F.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ti,alphaToCoverage:!!y.alphaToCoverage,map:te,matcap:Ht,envMap:st,envMapMode:st&&Z.mapping,envMapCubeUVHeight:k,aoMap:C,lightMap:Xt,bumpMap:Rt,normalMap:Ot,displacementMap:p&&St,emissiveMap:qt,normalMapObjectSpace:Ot&&y.normalMapType===Gl,normalMapTangentSpace:Ot&&y.normalMapType===dc,metalnessMap:Et,roughnessMap:T,anisotropy:x,anisotropyMap:at,clearcoat:O,clearcoatMap:ut,clearcoatNormalMap:Gt,clearcoatRoughnessMap:J,dispersion:$,iridescence:K,iridescenceMap:dt,iridescenceThicknessMap:Tt,sheen:q,sheenColorMap:wt,sheenRoughnessMap:ft,specularMap:kt,specularColorMap:Nt,specularIntensityMap:ee,transmission:vt,transmissionMap:L,thicknessMap:rt,gradientMap:G,opaque:y.transparent===!1&&y.blending===fi&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:ht,alphaHash:ot,combine:y.combine,mapUv:te&&g(y.map.channel),aoMapUv:C&&g(y.aoMap.channel),lightMapUv:Xt&&g(y.lightMap.channel),bumpMapUv:Rt&&g(y.bumpMap.channel),normalMapUv:Ot&&g(y.normalMap.channel),displacementMapUv:St&&g(y.displacementMap.channel),emissiveMapUv:qt&&g(y.emissiveMap.channel),metalnessMapUv:Et&&g(y.metalnessMap.channel),roughnessMapUv:T&&g(y.roughnessMap.channel),anisotropyMapUv:at&&g(y.anisotropyMap.channel),clearcoatMapUv:ut&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ft&&g(y.sheenRoughnessMap.channel),specularMapUv:kt&&g(y.specularMap.channel),specularColorMapUv:Nt&&g(y.specularColorMap.channel),specularIntensityMapUv:ee&&g(y.specularIntensityMap.channel),transmissionMapUv:L&&g(y.transmissionMap.channel),thicknessMapUv:rt&&g(y.thicknessMap.channel),alphaMapUv:j&&g(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ot||x),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(te||j),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:yt,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Pt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:oe,decodeVideoTexture:te&&y.map.isVideoTexture===!0&&Vt.getTransfer(y.map.colorSpace)===Jt,decodeVideoTextureEmissive:qt&&y.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(y.emissiveMap.colorSpace)===Jt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ie,flipSided:y.side===Me,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Lt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&y.extensions.multiDraw===!0||Dt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return _e.vertexUv1s=h.has(1),_e.vertexUv2s=h.has(2),_e.vertexUv3s=h.has(3),h.clear(),_e}function u(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)M.push(R),M.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(b(M,y),E(M,y),M.push(n.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function b(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function E(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const M=_[y.type];let R;if(M){const H=je[M];R=Ec.clone(H.uniforms)}else R=y.uniforms;return R}function D(y,M){let R;for(let H=0,F=d.length;H<F;H++){const V=d[H];if(V.cacheKey===M){R=V,++R.usedTimes;break}}return R===void 0&&(R=new Dp(n,M,y,r),d.push(R)),R}function A(y){if(--y.usedTimes===0){const M=d.indexOf(y);d[M]=d[d.length-1],d.pop(),y.destroy()}}function w(y){c.remove(y)}function P(){c.dispose()}return{getParameters:l,getProgramCacheKey:u,getUniforms:S,acquireProgram:D,releaseProgram:A,releaseShaderCache:w,programs:d,dispose:P}}function Fp(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Op(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Oo(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function zo(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(f,p,m,_,g,l){let u=n[t];return u===void 0?(u={id:f.id,object:f,geometry:p,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:l},n[t]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=m,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=g,u.group=l),t++,u}function o(f,p,m,_,g,l){const u=a(f,p,m,_,g,l);m.transmission>0?i.push(u):m.transparent===!0?s.push(u):e.push(u)}function c(f,p,m,_,g,l){const u=a(f,p,m,_,g,l);m.transmission>0?i.unshift(u):m.transparent===!0?s.unshift(u):e.unshift(u)}function h(f,p){e.length>1&&e.sort(f||Op),i.length>1&&i.sort(p||Oo),s.length>1&&s.sort(p||Oo)}function d(){for(let f=t,p=n.length;f<p;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:d,sort:h}}function zp(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new zo,n.set(i,[a])):s>=r.length?(a=new zo,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Bp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new zt};break;case"SpotLight":e={position:new U,direction:new U,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function Hp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let kp=0;function Gp(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Vp(n){const t=new Bp,e=Hp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new U);const s=new U,r=new ae,a=new ae;function o(h){let d=0,f=0,p=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let m=0,_=0,g=0,l=0,u=0,b=0,E=0,S=0,D=0,A=0,w=0;h.sort(Gp);for(let y=0,M=h.length;y<M;y++){const R=h[y],H=R.color,F=R.intensity,V=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=H.r*F,f+=H.g*F,p+=H.b*F;else if(R.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(R.sh.coefficients[W],F);w++}else if(R.isDirectionalLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Z=R.shadow,k=e.get(R);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=X,i.directionalShadowMatrix[m]=R.shadow.matrix,b++}i.directional[m]=W,m++}else if(R.isSpotLight){const W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(H).multiplyScalar(F),W.distance=V,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,i.spot[g]=W;const Z=R.shadow;if(R.map&&(i.spotLightMap[D]=R.map,D++,Z.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[g]=Z.matrix,R.castShadow){const k=e.get(R);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,i.spotShadow[g]=k,i.spotShadowMap[g]=X,S++}g++}else if(R.isRectAreaLight){const W=t.get(R);W.color.copy(H).multiplyScalar(F),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),i.rectArea[l]=W,l++}else if(R.isPointLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const Z=R.shadow,k=e.get(R);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,k.shadowCameraNear=Z.camera.near,k.shadowCameraFar=Z.camera.far,i.pointShadow[_]=k,i.pointShadowMap[_]=X,i.pointShadowMatrix[_]=R.shadow.matrix,E++}i.point[_]=W,_++}else if(R.isHemisphereLight){const W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(F),W.groundColor.copy(R.groundColor).multiplyScalar(F),i.hemi[u]=W,u++}}l>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=p;const P=i.hash;(P.directionalLength!==m||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==l||P.hemiLength!==u||P.numDirectionalShadows!==b||P.numPointShadows!==E||P.numSpotShadows!==S||P.numSpotMaps!==D||P.numLightProbes!==w)&&(i.directional.length=m,i.spot.length=g,i.rectArea.length=l,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+D-A,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,P.directionalLength=m,P.pointLength=_,P.spotLength=g,P.rectAreaLength=l,P.hemiLength=u,P.numDirectionalShadows=b,P.numPointShadows=E,P.numSpotShadows=S,P.numSpotMaps=D,P.numLightProbes=w,i.version=kp++)}function c(h,d){let f=0,p=0,m=0,_=0,g=0;const l=d.matrixWorldInverse;for(let u=0,b=h.length;u<b;u++){const E=h[u];if(E.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(l),f++}else if(E.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(l),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(l),m++}else if(E.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(l),a.identity(),r.copy(E.matrixWorld),r.premultiply(l),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(E.isPointLight){const S=i.point[p];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(l),p++}else if(E.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(l),g++}}}return{setup:o,setupView:c,state:i}}function Bo(n){const t=new Vp(n),e=[],i=[];function s(d){h.camera=d,e.length=0,i.length=0}function r(d){e.push(d)}function a(d){i.push(d)}function o(){t.setup(e)}function c(d){t.setupView(e,d)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Wp(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Bo(n),t.set(s,[o])):r>=a.length?(o=new Bo(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class Xp extends Vi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Yp extends Vi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$p=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jp(n,t,e){let i=new Ma;const s=new At,r=new At,a=new Zt,o=new Xp({depthPacking:kl}),c=new Yp,h={},d=e.maxTextureSize,f={[An]:Me,[Me]:An,[Ie]:Ie},p=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:qp,fragmentShader:$p}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new Xe;_.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Yt(_,p),l=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ko;let u=this.type;this.render=function(A,w,P){if(l.enabled===!1||l.autoUpdate===!1&&l.needsUpdate===!1||A.length===0)return;const y=n.getRenderTarget(),M=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),H=n.state;H.setBlending(bn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const F=u!==ln&&this.type===ln,V=u===ln&&this.type!==ln;for(let X=0,W=A.length;X<W;X++){const Z=A[X],k=Z.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const et=k.getFrameExtents();if(s.multiply(et),r.copy(k.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/et.x),s.x=r.x*et.x,k.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/et.y),s.y=r.y*et.y,k.mapSize.y=r.y)),k.map===null||F===!0||V===!0){const mt=this.type!==ln?{minFilter:Ve,magFilter:Ve}:{};k.map!==null&&k.map.dispose(),k.map=new Rn(s.x,s.y,mt),k.map.texture.name=Z.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const lt=k.getViewportCount();for(let mt=0;mt<lt;mt++){const Pt=k.getViewport(mt);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),H.viewport(a),k.updateMatrices(Z,mt),i=k.getFrustum(),S(w,P,k.camera,Z,this.type)}k.isPointLightShadow!==!0&&this.type===ln&&b(k,P),k.needsUpdate=!1}u=this.type,l.needsUpdate=!1,n.setRenderTarget(y,M,R)};function b(A,w){const P=t.update(g);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Rn(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(w,null,P,p,g,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(w,null,P,m,g,null)}function E(A,w,P,y){let M=null;const R=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)M=R;else if(M=P.isPointLight===!0?c:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=M.uuid,F=w.uuid;let V=h[H];V===void 0&&(V={},h[H]=V);let X=V[F];X===void 0&&(X=M.clone(),V[F]=X,w.addEventListener("dispose",D)),M=X}if(M.visible=w.visible,M.wireframe=w.wireframe,y===ln?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:f[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=n.properties.get(M);H.light=P}return M}function S(A,w,P,y,M){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===ln)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const F=t.update(A),V=A.material;if(Array.isArray(V)){const X=F.groups;for(let W=0,Z=X.length;W<Z;W++){const k=X[W],et=V[k.materialIndex];if(et&&et.visible){const lt=E(A,et,y,M);A.onBeforeShadow(n,A,w,P,F,lt,k),n.renderBufferDirect(P,null,F,lt,A,k),A.onAfterShadow(n,A,w,P,F,lt,k)}}}else if(V.visible){const X=E(A,V,y,M);A.onBeforeShadow(n,A,w,P,F,X,null),n.renderBufferDirect(P,null,F,X,A,null),A.onAfterShadow(n,A,w,P,F,X,null)}}const H=A.children;for(let F=0,V=H.length;F<V;F++)S(H[F],w,P,y,M)}function D(A){A.target.removeEventListener("dispose",D);for(const P in h){const y=h[P],M=A.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Zp={[Er]:Tr,[br]:Rr,[wr]:Cr,[_i]:Ar,[Tr]:Er,[Rr]:br,[Cr]:wr,[Ar]:_i};function Kp(n,t){function e(){let L=!1;const rt=new Zt;let G=null;const j=new Zt(0,0,0,0);return{setMask:function(ht){G!==ht&&!L&&(n.colorMask(ht,ht,ht,ht),G=ht)},setLocked:function(ht){L=ht},setClear:function(ht,ot,Lt,oe,_e){_e===!0&&(ht*=oe,ot*=oe,Lt*=oe),rt.set(ht,ot,Lt,oe),j.equals(rt)===!1&&(n.clearColor(ht,ot,Lt,oe),j.copy(rt))},reset:function(){L=!1,G=null,j.set(-1,0,0,0)}}}function i(){let L=!1,rt=!1,G=null,j=null,ht=null;return{setReversed:function(ot){if(rt!==ot){const Lt=t.get("EXT_clip_control");rt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT);const oe=ht;ht=null,this.setClear(oe)}rt=ot},getReversed:function(){return rt},setTest:function(ot){ot?nt(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(ot){G!==ot&&!L&&(n.depthMask(ot),G=ot)},setFunc:function(ot){if(rt&&(ot=Zp[ot]),j!==ot){switch(ot){case Er:n.depthFunc(n.NEVER);break;case Tr:n.depthFunc(n.ALWAYS);break;case br:n.depthFunc(n.LESS);break;case _i:n.depthFunc(n.LEQUAL);break;case wr:n.depthFunc(n.EQUAL);break;case Ar:n.depthFunc(n.GEQUAL);break;case Rr:n.depthFunc(n.GREATER);break;case Cr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=ot}},setLocked:function(ot){L=ot},setClear:function(ot){ht!==ot&&(rt&&(ot=1-ot),n.clearDepth(ot),ht=ot)},reset:function(){L=!1,G=null,j=null,ht=null,rt=!1}}}function s(){let L=!1,rt=null,G=null,j=null,ht=null,ot=null,Lt=null,oe=null,_e=null;return{setTest:function(Kt){L||(Kt?nt(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(Kt){rt!==Kt&&!L&&(n.stencilMask(Kt),rt=Kt)},setFunc:function(Kt,Ne,tn){(G!==Kt||j!==Ne||ht!==tn)&&(n.stencilFunc(Kt,Ne,tn),G=Kt,j=Ne,ht=tn)},setOp:function(Kt,Ne,tn){(ot!==Kt||Lt!==Ne||oe!==tn)&&(n.stencilOp(Kt,Ne,tn),ot=Kt,Lt=Ne,oe=tn)},setLocked:function(Kt){L=Kt},setClear:function(Kt){_e!==Kt&&(n.clearStencil(Kt),_e=Kt)},reset:function(){L=!1,rt=null,G=null,j=null,ht=null,ot=null,Lt=null,oe=null,_e=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,h=new WeakMap;let d={},f={},p=new WeakMap,m=[],_=null,g=!1,l=null,u=null,b=null,E=null,S=null,D=null,A=null,w=new zt(0,0,0),P=0,y=!1,M=null,R=null,H=null,F=null,V=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Z=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(k)[1]),W=Z>=1):k.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),W=Z>=2);let et=null,lt={};const mt=n.getParameter(n.SCISSOR_BOX),Pt=n.getParameter(n.VIEWPORT),Bt=new Zt().fromArray(mt),Y=new Zt().fromArray(Pt);function Q(L,rt,G,j){const ht=new Uint8Array(4),ot=n.createTexture();n.bindTexture(L,ot),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<G;Lt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,ht):n.texImage2D(rt+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ht);return ot}const pt={};pt[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),pt[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pt[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(n.DEPTH_TEST),a.setFunc(_i),Rt(!1),Ot(Wa),nt(n.CULL_FACE),C(bn);function nt(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function yt(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function bt(L,rt){return f[L]!==rt?(n.bindFramebuffer(L,rt),f[L]=rt,L===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=rt),L===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function Dt(L,rt){let G=m,j=!1;if(L){G=p.get(rt),G===void 0&&(G=[],p.set(rt,G));const ht=L.textures;if(G.length!==ht.length||G[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Lt=ht.length;ot<Lt;ot++)G[ot]=n.COLOR_ATTACHMENT0+ot;G.length=ht.length,j=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,j=!0);j&&n.drawBuffers(G)}function te(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const Ht={[Hn]:n.FUNC_ADD,[pl]:n.FUNC_SUBTRACT,[ml]:n.FUNC_REVERSE_SUBTRACT};Ht[_l]=n.MIN,Ht[gl]=n.MAX;const st={[xl]:n.ZERO,[vl]:n.ONE,[Ml]:n.SRC_COLOR,[Sr]:n.SRC_ALPHA,[wl]:n.SRC_ALPHA_SATURATE,[Tl]:n.DST_COLOR,[yl]:n.DST_ALPHA,[Sl]:n.ONE_MINUS_SRC_COLOR,[yr]:n.ONE_MINUS_SRC_ALPHA,[bl]:n.ONE_MINUS_DST_COLOR,[El]:n.ONE_MINUS_DST_ALPHA,[Al]:n.CONSTANT_COLOR,[Rl]:n.ONE_MINUS_CONSTANT_COLOR,[Cl]:n.CONSTANT_ALPHA,[Pl]:n.ONE_MINUS_CONSTANT_ALPHA};function C(L,rt,G,j,ht,ot,Lt,oe,_e,Kt){if(L===bn){g===!0&&(yt(n.BLEND),g=!1);return}if(g===!1&&(nt(n.BLEND),g=!0),L!==fl){if(L!==l||Kt!==y){if((u!==Hn||S!==Hn)&&(n.blendEquation(n.FUNC_ADD),u=Hn,S=Hn),Kt)switch(L){case fi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mr:n.blendFunc(n.ONE,n.ONE);break;case Xa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ya:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case fi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ya:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,E=null,D=null,A=null,w.set(0,0,0),P=0,l=L,y=Kt}return}ht=ht||rt,ot=ot||G,Lt=Lt||j,(rt!==u||ht!==S)&&(n.blendEquationSeparate(Ht[rt],Ht[ht]),u=rt,S=ht),(G!==b||j!==E||ot!==D||Lt!==A)&&(n.blendFuncSeparate(st[G],st[j],st[ot],st[Lt]),b=G,E=j,D=ot,A=Lt),(oe.equals(w)===!1||_e!==P)&&(n.blendColor(oe.r,oe.g,oe.b,_e),w.copy(oe),P=_e),l=L,y=!1}function Xt(L,rt){L.side===Ie?yt(n.CULL_FACE):nt(n.CULL_FACE);let G=L.side===Me;rt&&(G=!G),Rt(G),L.blending===fi&&L.transparent===!1?C(bn):C(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),qt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(L){M!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),M=L)}function Ot(L){L!==ul?(nt(n.CULL_FACE),L!==R&&(L===Wa?n.cullFace(n.BACK):L===dl?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),R=L}function St(L){L!==H&&(W&&n.lineWidth(L),H=L)}function qt(L,rt,G){L?(nt(n.POLYGON_OFFSET_FILL),(F!==rt||V!==G)&&(n.polygonOffset(rt,G),F=rt,V=G)):yt(n.POLYGON_OFFSET_FILL)}function Et(L){L?nt(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function T(L){L===void 0&&(L=n.TEXTURE0+X-1),et!==L&&(n.activeTexture(L),et=L)}function x(L,rt,G){G===void 0&&(et===null?G=n.TEXTURE0+X-1:G=et);let j=lt[G];j===void 0&&(j={type:void 0,texture:void 0},lt[G]=j),(j.type!==L||j.texture!==rt)&&(et!==G&&(n.activeTexture(G),et=G),n.bindTexture(L,rt||pt[L]),j.type=L,j.texture=rt)}function O(){const L=lt[et];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function vt(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Gt(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function dt(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function wt(L){Bt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Bt.copy(L))}function ft(L){Y.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function kt(L,rt){let G=h.get(rt);G===void 0&&(G=new WeakMap,h.set(rt,G));let j=G.get(L);j===void 0&&(j=n.getUniformBlockIndex(rt,L.name),G.set(L,j))}function Nt(L,rt){const j=h.get(rt).get(L);c.get(rt)!==j&&(n.uniformBlockBinding(rt,j,L.__bindingPointIndex),c.set(rt,j))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},et=null,lt={},f={},p=new WeakMap,m=[],_=null,g=!1,l=null,u=null,b=null,E=null,S=null,D=null,A=null,w=new zt(0,0,0),P=0,y=!1,M=null,R=null,H=null,F=null,V=null,Bt.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:yt,bindFramebuffer:bt,drawBuffers:Dt,useProgram:te,setBlending:C,setMaterial:Xt,setFlipSided:Rt,setCullFace:Ot,setLineWidth:St,setPolygonOffset:qt,setScissorTest:Et,activeTexture:T,bindTexture:x,unbindTexture:O,compressedTexImage2D:$,compressedTexImage3D:K,texImage2D:dt,texImage3D:Tt,updateUBOMapping:kt,uniformBlockBinding:Nt,texStorage2D:Gt,texStorage3D:J,texSubImage2D:q,texSubImage3D:vt,compressedTexSubImage2D:at,compressedTexSubImage3D:ut,scissor:wt,viewport:ft,reset:ee}}function Ho(n,t,e,i){const s=Jp(i);switch(e){case rc:return n*t;case oc:return n*t;case cc:return n*t*2;case lc:return n*t/s.components*s.byteLength;case _a:return n*t/s.components*s.byteLength;case hc:return n*t*2/s.components*s.byteLength;case ga:return n*t*2/s.components*s.byteLength;case ac:return n*t*3/s.components*s.byteLength;case Ge:return n*t*4/s.components*s.byteLength;case xa:return n*t*4/s.components*s.byteLength;case vs:case Ms:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ss:case ys:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ir:case Fr:return Math.max(n,16)*Math.max(t,8)/4;case Ur:case Nr:return Math.max(n,8)*Math.max(t,8)/2;case Or:case zr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Br:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Hr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case kr:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Gr:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Vr:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Wr:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xr:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Yr:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case qr:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case $r:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case jr:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Zr:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Kr:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Jr:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Qr:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Es:case ta:case ea:return Math.ceil(n/4)*Math.ceil(t/4)*16;case uc:case na:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ia:case sa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jp(n){switch(n){case pn:case nc:return{byteLength:1,components:1};case Hi:case ic:case Ei:return{byteLength:2,components:1};case pa:case ma:return{byteLength:2,components:4};case Xn:case fa:case un:return{byteLength:4,components:1};case sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Qp(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new At,d=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return m?new OffscreenCanvas(T,x):Rs("canvas")}function g(T,x,O){let $=1;const K=Et(T);if((K.width>O||K.height>O)&&($=O/Math.max(K.width,K.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor($*K.width),vt=Math.floor($*K.height);f===void 0&&(f=_(q,vt));const at=x?_(q,vt):f;return at.width=q,at.height=vt,at.getContext("2d").drawImage(T,0,0,q,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+vt+")."),at}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function l(T){return T.generateMipmaps}function u(T){n.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,x,O,$,K=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=x;if(x===n.RED&&(O===n.FLOAT&&(q=n.R32F),O===n.HALF_FLOAT&&(q=n.R16F),O===n.UNSIGNED_BYTE&&(q=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.R8UI),O===n.UNSIGNED_SHORT&&(q=n.R16UI),O===n.UNSIGNED_INT&&(q=n.R32UI),O===n.BYTE&&(q=n.R8I),O===n.SHORT&&(q=n.R16I),O===n.INT&&(q=n.R32I)),x===n.RG&&(O===n.FLOAT&&(q=n.RG32F),O===n.HALF_FLOAT&&(q=n.RG16F),O===n.UNSIGNED_BYTE&&(q=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RG8UI),O===n.UNSIGNED_SHORT&&(q=n.RG16UI),O===n.UNSIGNED_INT&&(q=n.RG32UI),O===n.BYTE&&(q=n.RG8I),O===n.SHORT&&(q=n.RG16I),O===n.INT&&(q=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RGB8UI),O===n.UNSIGNED_SHORT&&(q=n.RGB16UI),O===n.UNSIGNED_INT&&(q=n.RGB32UI),O===n.BYTE&&(q=n.RGB8I),O===n.SHORT&&(q=n.RGB16I),O===n.INT&&(q=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),O===n.UNSIGNED_INT&&(q=n.RGBA32UI),O===n.BYTE&&(q=n.RGBA8I),O===n.SHORT&&(q=n.RGBA16I),O===n.INT&&(q=n.RGBA32I)),x===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),x===n.RGBA){const vt=K?Ps:Vt.getTransfer($);O===n.FLOAT&&(q=n.RGBA32F),O===n.HALF_FLOAT&&(q=n.RGBA16F),O===n.UNSIGNED_BYTE&&(q=vt===Jt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function S(T,x){let O;return T?x===null||x===Xn||x===vi?O=n.DEPTH24_STENCIL8:x===un?O=n.DEPTH32F_STENCIL8:x===Hi&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Xn||x===vi?O=n.DEPTH_COMPONENT24:x===un?O=n.DEPTH_COMPONENT32F:x===Hi&&(O=n.DEPTH_COMPONENT16),O}function D(T,x){return l(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ve&&T.minFilter!==Ze?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),P(x),x.isVideoTexture&&d.delete(x)}function w(T){const x=T.target;x.removeEventListener("dispose",w),M(x)}function P(T){const x=i.get(T);if(x.__webglInit===void 0)return;const O=T.source,$=p.get(O);if($){const K=$[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(T),Object.keys($).length===0&&p.delete(O)}i.remove(T)}function y(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const O=T.source,$=p.get(O);delete $[x.__cacheKey],a.memory.textures--}function M(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let K=0;K<x.__webglFramebuffer[$].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[$][K]);else n.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)n.deleteFramebuffer(x.__webglFramebuffer[$]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let $=0,K=O.length;$<K;$++){const q=i.get(O[$]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),i.remove(O[$])}i.remove(T)}let R=0;function H(){R=0}function F(){const T=R;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),R+=1,T}function V(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function X(T,x){const O=i.get(T);if(T.isVideoTexture&&St(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,T,x);return}}e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function W(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){Y(O,T,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function Z(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){Y(O,T,x);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function k(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){Q(O,T,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const et={[Wn]:n.REPEAT,[Gn]:n.CLAMP_TO_EDGE,[Lr]:n.MIRRORED_REPEAT},lt={[Ve]:n.NEAREST,[Bl]:n.NEAREST_MIPMAP_NEAREST,[qi]:n.NEAREST_MIPMAP_LINEAR,[Ze]:n.LINEAR,[Hs]:n.LINEAR_MIPMAP_NEAREST,[Vn]:n.LINEAR_MIPMAP_LINEAR},mt={[Vl]:n.NEVER,[jl]:n.ALWAYS,[Wl]:n.LESS,[fc]:n.LEQUAL,[Xl]:n.EQUAL,[$l]:n.GEQUAL,[Yl]:n.GREATER,[ql]:n.NOTEQUAL};function Pt(T,x){if(x.type===un&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Ze||x.magFilter===Hs||x.magFilter===qi||x.magFilter===Vn||x.minFilter===Ze||x.minFilter===Hs||x.minFilter===qi||x.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,et[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,et[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,et[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,lt[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,lt[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,mt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ve||x.minFilter!==qi&&x.minFilter!==Vn||x.type===un&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Bt(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const $=x.source;let K=p.get($);K===void 0&&(K={},p.set($,K));const q=V(x);if(q!==T.__cacheKey){K[q]===void 0&&(K[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[q].usedTimes++;const vt=K[T.__cacheKey];vt!==void 0&&(K[T.__cacheKey].usedTimes--,vt.usedTimes===0&&y(x)),T.__cacheKey=q,T.__webglTexture=K[q].texture}return O}function Y(T,x,O){let $=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=n.TEXTURE_3D);const K=Bt(T,x),q=x.source;e.bindTexture($,T.__webglTexture,n.TEXTURE0+O);const vt=i.get(q);if(q.version!==vt.__version||K===!0){e.activeTexture(n.TEXTURE0+O);const at=Vt.getPrimaries(Vt.workingColorSpace),ut=x.colorSpace===Tn?null:Vt.getPrimaries(x.colorSpace),Gt=x.colorSpace===Tn||at===ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let J=g(x.image,!1,s.maxTextureSize);J=qt(x,J);const dt=r.convert(x.format,x.colorSpace),Tt=r.convert(x.type);let wt=E(x.internalFormat,dt,Tt,x.colorSpace,x.isVideoTexture);Pt($,x);let ft;const kt=x.mipmaps,Nt=x.isVideoTexture!==!0,ee=vt.__version===void 0||K===!0,L=q.dataReady,rt=D(x,J);if(x.isDepthTexture)wt=S(x.format===Mi,x.type),ee&&(Nt?e.texStorage2D(n.TEXTURE_2D,1,wt,J.width,J.height):e.texImage2D(n.TEXTURE_2D,0,wt,J.width,J.height,0,dt,Tt,null));else if(x.isDataTexture)if(kt.length>0){Nt&&ee&&e.texStorage2D(n.TEXTURE_2D,rt,wt,kt[0].width,kt[0].height);for(let G=0,j=kt.length;G<j;G++)ft=kt[G],Nt?L&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,ft.width,ft.height,dt,Tt,ft.data):e.texImage2D(n.TEXTURE_2D,G,wt,ft.width,ft.height,0,dt,Tt,ft.data);x.generateMipmaps=!1}else Nt?(ee&&e.texStorage2D(n.TEXTURE_2D,rt,wt,J.width,J.height),L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,dt,Tt,J.data)):e.texImage2D(n.TEXTURE_2D,0,wt,J.width,J.height,0,dt,Tt,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Nt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,wt,kt[0].width,kt[0].height,J.depth);for(let G=0,j=kt.length;G<j;G++)if(ft=kt[G],x.format!==Ge)if(dt!==null)if(Nt){if(L)if(x.layerUpdates.size>0){const ht=Ho(ft.width,ft.height,x.format,x.type);for(const ot of x.layerUpdates){const Lt=ft.data.subarray(ot*ht/ft.data.BYTES_PER_ELEMENT,(ot+1)*ht/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,ot,ft.width,ft.height,1,dt,Lt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ft.width,ft.height,J.depth,dt,ft.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,wt,ft.width,ft.height,J.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ft.width,ft.height,J.depth,dt,Tt,ft.data):e.texImage3D(n.TEXTURE_2D_ARRAY,G,wt,ft.width,ft.height,J.depth,0,dt,Tt,ft.data)}else{Nt&&ee&&e.texStorage2D(n.TEXTURE_2D,rt,wt,kt[0].width,kt[0].height);for(let G=0,j=kt.length;G<j;G++)ft=kt[G],x.format!==Ge?dt!==null?Nt?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,ft.width,ft.height,dt,ft.data):e.compressedTexImage2D(n.TEXTURE_2D,G,wt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?L&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,ft.width,ft.height,dt,Tt,ft.data):e.texImage2D(n.TEXTURE_2D,G,wt,ft.width,ft.height,0,dt,Tt,ft.data)}else if(x.isDataArrayTexture)if(Nt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,wt,J.width,J.height,J.depth),L)if(x.layerUpdates.size>0){const G=Ho(J.width,J.height,x.format,x.type);for(const j of x.layerUpdates){const ht=J.data.subarray(j*G/J.data.BYTES_PER_ELEMENT,(j+1)*G/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,dt,Tt,ht)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,dt,Tt,J.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,wt,J.width,J.height,J.depth,0,dt,Tt,J.data);else if(x.isData3DTexture)Nt?(ee&&e.texStorage3D(n.TEXTURE_3D,rt,wt,J.width,J.height,J.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,dt,Tt,J.data)):e.texImage3D(n.TEXTURE_3D,0,wt,J.width,J.height,J.depth,0,dt,Tt,J.data);else if(x.isFramebufferTexture){if(ee)if(Nt)e.texStorage2D(n.TEXTURE_2D,rt,wt,J.width,J.height);else{let G=J.width,j=J.height;for(let ht=0;ht<rt;ht++)e.texImage2D(n.TEXTURE_2D,ht,wt,G,j,0,dt,Tt,null),G>>=1,j>>=1}}else if(kt.length>0){if(Nt&&ee){const G=Et(kt[0]);e.texStorage2D(n.TEXTURE_2D,rt,wt,G.width,G.height)}for(let G=0,j=kt.length;G<j;G++)ft=kt[G],Nt?L&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,dt,Tt,ft):e.texImage2D(n.TEXTURE_2D,G,wt,dt,Tt,ft);x.generateMipmaps=!1}else if(Nt){if(ee){const G=Et(J);e.texStorage2D(n.TEXTURE_2D,rt,wt,G.width,G.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Tt,J)}else e.texImage2D(n.TEXTURE_2D,0,wt,dt,Tt,J);l(x)&&u($),vt.__version=q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Q(T,x,O){if(x.image.length!==6)return;const $=Bt(T,x),K=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+O);const q=i.get(K);if(K.version!==q.__version||$===!0){e.activeTexture(n.TEXTURE0+O);const vt=Vt.getPrimaries(Vt.workingColorSpace),at=x.colorSpace===Tn?null:Vt.getPrimaries(x.colorSpace),ut=x.colorSpace===Tn||vt===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Gt=x.isCompressedTexture||x.image[0].isCompressedTexture,J=x.image[0]&&x.image[0].isDataTexture,dt=[];for(let j=0;j<6;j++)!Gt&&!J?dt[j]=g(x.image[j],!0,s.maxCubemapSize):dt[j]=J?x.image[j].image:x.image[j],dt[j]=qt(x,dt[j]);const Tt=dt[0],wt=r.convert(x.format,x.colorSpace),ft=r.convert(x.type),kt=E(x.internalFormat,wt,ft,x.colorSpace),Nt=x.isVideoTexture!==!0,ee=q.__version===void 0||$===!0,L=K.dataReady;let rt=D(x,Tt);Pt(n.TEXTURE_CUBE_MAP,x);let G;if(Gt){Nt&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,rt,kt,Tt.width,Tt.height);for(let j=0;j<6;j++){G=dt[j].mipmaps;for(let ht=0;ht<G.length;ht++){const ot=G[ht];x.format!==Ge?wt!==null?Nt?L&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,0,0,ot.width,ot.height,wt,ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,kt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,0,0,ot.width,ot.height,wt,ft,ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,kt,ot.width,ot.height,0,wt,ft,ot.data)}}}else{if(G=x.mipmaps,Nt&&ee){G.length>0&&rt++;const j=Et(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,rt,kt,j.width,j.height)}for(let j=0;j<6;j++)if(J){Nt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,dt[j].width,dt[j].height,wt,ft,dt[j].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,dt[j].width,dt[j].height,0,wt,ft,dt[j].data);for(let ht=0;ht<G.length;ht++){const Lt=G[ht].image[j].image;Nt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,0,0,Lt.width,Lt.height,wt,ft,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,kt,Lt.width,Lt.height,0,wt,ft,Lt.data)}}else{Nt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,wt,ft,dt[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,wt,ft,dt[j]);for(let ht=0;ht<G.length;ht++){const ot=G[ht];Nt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,0,0,wt,ft,ot.image[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,kt,wt,ft,ot.image[j])}}}l(x)&&u(n.TEXTURE_CUBE_MAP),q.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function pt(T,x,O,$,K,q){const vt=r.convert(O.format,O.colorSpace),at=r.convert(O.type),ut=E(O.internalFormat,vt,at,O.colorSpace),Gt=i.get(x),J=i.get(O);if(J.__renderTarget=x,!Gt.__hasExternalTextures){const dt=Math.max(1,x.width>>q),Tt=Math.max(1,x.height>>q);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,q,ut,dt,Tt,x.depth,0,vt,at,null):e.texImage2D(K,q,ut,dt,Tt,0,vt,at,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Ot(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,K,J.__webglTexture,0,Rt(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,K,J.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(T,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const $=x.depthTexture,K=$&&$.isDepthTexture?$.type:null,q=S(x.stencilBuffer,K),vt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=Rt(x);Ot(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,q,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,q,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,q,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,T)}else{const $=x.textures;for(let K=0;K<$.length;K++){const q=$[K],vt=r.convert(q.format,q.colorSpace),at=r.convert(q.type),ut=E(q.internalFormat,vt,at,q.colorSpace),Gt=Rt(x);O&&Ot(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Gt,ut,x.width,x.height):Ot(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Gt,ut,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ut,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function yt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(x.depthTexture);$.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);const K=$.__webglTexture,q=Rt(x);if(x.depthTexture.format===pi)Ot(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(x.depthTexture.format===Mi)Ot(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function bt(T){const x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const $=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",K)};$.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=$}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");yt(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=n.createRenderbuffer(),nt(x.__webglDepthbuffer[$],T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),nt(x.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,K)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Dt(T,x,O){const $=i.get(T);x!==void 0&&pt($.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&bt(T)}function te(T){const x=T.texture,O=i.get(T),$=i.get(x);T.addEventListener("dispose",w);const K=T.textures,q=T.isWebGLCubeRenderTarget===!0,vt=K.length>1;if(vt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=x.version,a.memory.textures++),q){O.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[at]=[];for(let ut=0;ut<x.mipmaps.length;ut++)O.__webglFramebuffer[at][ut]=n.createFramebuffer()}else O.__webglFramebuffer[at]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)O.__webglFramebuffer[at]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(vt)for(let at=0,ut=K.length;at<ut;at++){const Gt=i.get(K[at]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Ot(T)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let at=0;at<K.length;at++){const ut=K[at];O.__webglColorRenderbuffer[at]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[at]);const Gt=r.convert(ut.format,ut.colorSpace),J=r.convert(ut.type),dt=E(ut.internalFormat,Gt,J,ut.colorSpace,T.isXRRenderTarget===!0),Tt=Rt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt,dt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,O.__webglColorRenderbuffer[at])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Pt(n.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let ut=0;ut<x.mipmaps.length;ut++)pt(O.__webglFramebuffer[at][ut],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,ut);else pt(O.__webglFramebuffer[at],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);l(x)&&u(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let at=0,ut=K.length;at<ut;at++){const Gt=K[at],J=i.get(Gt);e.bindTexture(n.TEXTURE_2D,J.__webglTexture),Pt(n.TEXTURE_2D,Gt),pt(O.__webglFramebuffer,T,Gt,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,0),l(Gt)&&u(n.TEXTURE_2D)}e.unbindTexture()}else{let at=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(at,$.__webglTexture),Pt(at,x),x.mipmaps&&x.mipmaps.length>0)for(let ut=0;ut<x.mipmaps.length;ut++)pt(O.__webglFramebuffer[ut],T,x,n.COLOR_ATTACHMENT0,at,ut);else pt(O.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,at,0);l(x)&&u(at),e.unbindTexture()}T.depthBuffer&&bt(T)}function Ht(T){const x=T.textures;for(let O=0,$=x.length;O<$;O++){const K=x[O];if(l(K)){const q=b(T),vt=i.get(K).__webglTexture;e.bindTexture(q,vt),u(q),e.unbindTexture()}}}const st=[],C=[];function Xt(T){if(T.samples>0){if(Ot(T)===!1){const x=T.textures,O=T.width,$=T.height;let K=n.COLOR_BUFFER_BIT;const q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(T),at=x.length>1;if(at)for(let ut=0;ut<x.length;ut++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let ut=0;ut<x.length;ut++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),at){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[ut]);const Gt=i.get(x[ut]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Gt,0)}n.blitFramebuffer(0,0,O,$,0,0,O,$,K,n.NEAREST),c===!0&&(st.length=0,C.length=0,st.push(n.COLOR_ATTACHMENT0+ut),T.depthBuffer&&T.resolveDepthBuffer===!1&&(st.push(q),C.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,C)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),at)for(let ut=0;ut<x.length;ut++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,vt.__webglColorRenderbuffer[ut]);const Gt=i.get(x[ut]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,Gt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Rt(T){return Math.min(s.maxSamples,T.samples)}function Ot(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function St(T){const x=a.render.frame;d.get(T)!==x&&(d.set(T,x),T.update())}function qt(T,x){const O=T.colorSpace,$=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Ti&&O!==Tn&&(Vt.getTransfer(O)===Jt?($!==Ge||K!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function Et(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=k,this.rebindTextures=Dt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Xt,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Ot}function tm(n,t){function e(i,s=Tn){let r;const a=Vt.getTransfer(s);if(i===pn)return n.UNSIGNED_BYTE;if(i===pa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ma)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nc)return n.BYTE;if(i===ic)return n.SHORT;if(i===Hi)return n.UNSIGNED_SHORT;if(i===fa)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===Ei)return n.HALF_FLOAT;if(i===rc)return n.ALPHA;if(i===ac)return n.RGB;if(i===Ge)return n.RGBA;if(i===oc)return n.LUMINANCE;if(i===cc)return n.LUMINANCE_ALPHA;if(i===pi)return n.DEPTH_COMPONENT;if(i===Mi)return n.DEPTH_STENCIL;if(i===lc)return n.RED;if(i===_a)return n.RED_INTEGER;if(i===hc)return n.RG;if(i===ga)return n.RG_INTEGER;if(i===xa)return n.RGBA_INTEGER;if(i===vs||i===Ms||i===Ss||i===ys)if(a===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===vs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ms)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ss)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===vs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ms)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ss)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ur||i===Ir||i===Nr||i===Fr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ir)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Or||i===zr||i===Br)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Or||i===zr)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Br)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Hr||i===kr||i===Gr||i===Vr||i===Wr||i===Xr||i===Yr||i===qr||i===$r||i===jr||i===Zr||i===Kr||i===Jr||i===Qr)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Hr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Gr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$r)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Kr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qr)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Es||i===ta||i===ea)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Es)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ta)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ea)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===uc||i===na||i===ia||i===sa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Es)return r.COMPRESSED_RED_RGTC1_EXT;if(i===na)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class em extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class zi extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nm={type:"move"};class pr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const g of t.hand.values()){const l=e.getJointPose(g,i),u=this._getHandJoint(h,g);l!==null&&(u.matrix.fromArray(l.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=l.radius),u.visible=l!==null}const d=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],p=d.position.distanceTo(f.position),m=.02,_=.005;h.inputState.pinching&&p>m+_?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&p<=m-_&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new zi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Te,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Qe({vertexShader:im,fragmentShader:sm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new Ke(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class am extends qn{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,h=null,d=null,f=null,p=null,m=null,_=null;const g=new rm,l=e.getContextAttributes();let u=null,b=null;const E=[],S=[],D=new At;let A=null;const w=new Re;w.viewport=new Zt;const P=new Re;P.viewport=new Zt;const y=[w,P],M=new em;let R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=E[Y];return Q===void 0&&(Q=new pr,E[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=E[Y];return Q===void 0&&(Q=new pr,E[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=E[Y];return Q===void 0&&(Q=new pr,E[Y]=Q),Q.getHandSpace()};function F(Y){const Q=S.indexOf(Y.inputSource);if(Q===-1)return;const pt=E[Q];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,h||a),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",X);for(let Y=0;Y<E.length;Y++){const Q=S[Y];Q!==null&&(S[Y]=null,E[Y].disconnect(Q))}R=null,H=null,g.reset(),t.setRenderTarget(u),m=null,p=null,f=null,s=null,b=null,Bt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(u=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",V),s.addEventListener("inputsourceschange",X),l.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const Q={antialias:l.antialias,alpha:!0,depth:l.depth,stencil:l.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Rn(m.framebufferWidth,m.framebufferHeight,{format:Ge,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:l.stencil})}else{let Q=null,pt=null,nt=null;l.depth&&(nt=l.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=l.stencil?Mi:pi,pt=l.stencil?vi:Xn);const yt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};f=new XRWebGLBinding(s,e),p=f.createProjectionLayer(yt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),b=new Rn(p.textureWidth,p.textureHeight,{format:Ge,type:pn,depthTexture:new Rc(p.textureWidth,p.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:l.stencil,colorSpace:t.outputColorSpace,samples:l.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),h=null,a=await s.requestReferenceSpace(o),Bt.setContext(s),Bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(Y){for(let Q=0;Q<Y.removed.length;Q++){const pt=Y.removed[Q],nt=S.indexOf(pt);nt>=0&&(S[nt]=null,E[nt].disconnect(pt))}for(let Q=0;Q<Y.added.length;Q++){const pt=Y.added[Q];let nt=S.indexOf(pt);if(nt===-1){for(let bt=0;bt<E.length;bt++)if(bt>=S.length){S.push(pt),nt=bt;break}else if(S[bt]===null){S[bt]=pt,nt=bt;break}if(nt===-1)break}const yt=E[nt];yt&&yt.connect(pt)}}const W=new U,Z=new U;function k(Y,Q,pt){W.setFromMatrixPosition(Q.matrixWorld),Z.setFromMatrixPosition(pt.matrixWorld);const nt=W.distanceTo(Z),yt=Q.projectionMatrix.elements,bt=pt.projectionMatrix.elements,Dt=yt[14]/(yt[10]-1),te=yt[14]/(yt[10]+1),Ht=(yt[9]+1)/yt[5],st=(yt[9]-1)/yt[5],C=(yt[8]-1)/yt[0],Xt=(bt[8]+1)/bt[0],Rt=Dt*C,Ot=Dt*Xt,St=nt/(-C+Xt),qt=St*-C;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(qt),Y.translateZ(St),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),yt[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const Et=Dt+St,T=te+St,x=Rt-qt,O=Ot+(nt-qt),$=Ht*te/T*Et,K=st*te/T*Et;Y.projectionMatrix.makePerspective(x,O,$,K,Et,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function et(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,pt=Y.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),M.near=P.near=w.near=Q,M.far=P.far=w.far=pt,(R!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,H=M.far),w.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,M.layers.mask=w.layers.mask|P.layers.mask;const nt=Y.parent,yt=M.cameras;et(M,nt);for(let bt=0;bt<yt.length;bt++)et(yt[bt],nt);yt.length===2?k(M,w,P):M.projectionMatrix.copy(w.projectionMatrix),lt(Y,M,nt)};function lt(Y,Q,pt){pt===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ra*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(Y){c=Y,p!==null&&(p.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let mt=null;function Pt(Y,Q){if(d=Q.getViewerPose(h||a),_=Q,d!==null){const pt=d.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let nt=!1;pt.length!==M.cameras.length&&(M.cameras.length=0,nt=!0);for(let bt=0;bt<pt.length;bt++){const Dt=pt[bt];let te=null;if(m!==null)te=m.getViewport(Dt);else{const st=f.getViewSubImage(p,Dt);te=st.viewport,bt===0&&(t.setRenderTargetTextures(b,st.colorTexture,p.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(b))}let Ht=y[bt];Ht===void 0&&(Ht=new Re,Ht.layers.enable(bt),Ht.viewport=new Zt,y[bt]=Ht),Ht.matrix.fromArray(Dt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Dt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(te.x,te.y,te.width,te.height),bt===0&&(M.matrix.copy(Ht.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),nt===!0&&M.cameras.push(Ht)}const yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")){const bt=f.getDepthInformation(pt[0]);bt&&bt.isValid&&bt.texture&&g.init(t,bt,s.renderState)}}for(let pt=0;pt<E.length;pt++){const nt=S[pt],yt=E[pt];nt!==null&&yt!==void 0&&yt.update(nt,Q,h||a)}mt&&mt(Y,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const Bt=new wc;Bt.setAnimationLoop(Pt),this.setAnimationLoop=function(Y){mt=Y},this.dispose=function(){}}}const zn=new Je,om=new ae;function cm(n,t){function e(l,u){l.matrixAutoUpdate===!0&&l.updateMatrix(),u.value.copy(l.matrix)}function i(l,u){u.color.getRGB(l.fogColor.value,yc(n)),u.isFog?(l.fogNear.value=u.near,l.fogFar.value=u.far):u.isFogExp2&&(l.fogDensity.value=u.density)}function s(l,u,b,E,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(l,u):u.isMeshToonMaterial?(r(l,u),f(l,u)):u.isMeshPhongMaterial?(r(l,u),d(l,u)):u.isMeshStandardMaterial?(r(l,u),p(l,u),u.isMeshPhysicalMaterial&&m(l,u,S)):u.isMeshMatcapMaterial?(r(l,u),_(l,u)):u.isMeshDepthMaterial?r(l,u):u.isMeshDistanceMaterial?(r(l,u),g(l,u)):u.isMeshNormalMaterial?r(l,u):u.isLineBasicMaterial?(a(l,u),u.isLineDashedMaterial&&o(l,u)):u.isPointsMaterial?c(l,u,b,E):u.isSpriteMaterial?h(l,u):u.isShadowMaterial?(l.color.value.copy(u.color),l.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(l,u){l.opacity.value=u.opacity,u.color&&l.diffuse.value.copy(u.color),u.emissive&&l.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(l.map.value=u.map,e(u.map,l.mapTransform)),u.alphaMap&&(l.alphaMap.value=u.alphaMap,e(u.alphaMap,l.alphaMapTransform)),u.bumpMap&&(l.bumpMap.value=u.bumpMap,e(u.bumpMap,l.bumpMapTransform),l.bumpScale.value=u.bumpScale,u.side===Me&&(l.bumpScale.value*=-1)),u.normalMap&&(l.normalMap.value=u.normalMap,e(u.normalMap,l.normalMapTransform),l.normalScale.value.copy(u.normalScale),u.side===Me&&l.normalScale.value.negate()),u.displacementMap&&(l.displacementMap.value=u.displacementMap,e(u.displacementMap,l.displacementMapTransform),l.displacementScale.value=u.displacementScale,l.displacementBias.value=u.displacementBias),u.emissiveMap&&(l.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,l.emissiveMapTransform)),u.specularMap&&(l.specularMap.value=u.specularMap,e(u.specularMap,l.specularMapTransform)),u.alphaTest>0&&(l.alphaTest.value=u.alphaTest);const b=t.get(u),E=b.envMap,S=b.envMapRotation;E&&(l.envMap.value=E,zn.copy(S),zn.x*=-1,zn.y*=-1,zn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),l.envMapRotation.value.setFromMatrix4(om.makeRotationFromEuler(zn)),l.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,l.reflectivity.value=u.reflectivity,l.ior.value=u.ior,l.refractionRatio.value=u.refractionRatio),u.lightMap&&(l.lightMap.value=u.lightMap,l.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,l.lightMapTransform)),u.aoMap&&(l.aoMap.value=u.aoMap,l.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,l.aoMapTransform))}function a(l,u){l.diffuse.value.copy(u.color),l.opacity.value=u.opacity,u.map&&(l.map.value=u.map,e(u.map,l.mapTransform))}function o(l,u){l.dashSize.value=u.dashSize,l.totalSize.value=u.dashSize+u.gapSize,l.scale.value=u.scale}function c(l,u,b,E){l.diffuse.value.copy(u.color),l.opacity.value=u.opacity,l.size.value=u.size*b,l.scale.value=E*.5,u.map&&(l.map.value=u.map,e(u.map,l.uvTransform)),u.alphaMap&&(l.alphaMap.value=u.alphaMap,e(u.alphaMap,l.alphaMapTransform)),u.alphaTest>0&&(l.alphaTest.value=u.alphaTest)}function h(l,u){l.diffuse.value.copy(u.color),l.opacity.value=u.opacity,l.rotation.value=u.rotation,u.map&&(l.map.value=u.map,e(u.map,l.mapTransform)),u.alphaMap&&(l.alphaMap.value=u.alphaMap,e(u.alphaMap,l.alphaMapTransform)),u.alphaTest>0&&(l.alphaTest.value=u.alphaTest)}function d(l,u){l.specular.value.copy(u.specular),l.shininess.value=Math.max(u.shininess,1e-4)}function f(l,u){u.gradientMap&&(l.gradientMap.value=u.gradientMap)}function p(l,u){l.metalness.value=u.metalness,u.metalnessMap&&(l.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,l.metalnessMapTransform)),l.roughness.value=u.roughness,u.roughnessMap&&(l.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,l.roughnessMapTransform)),u.envMap&&(l.envMapIntensity.value=u.envMapIntensity)}function m(l,u,b){l.ior.value=u.ior,u.sheen>0&&(l.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),l.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(l.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,l.sheenColorMapTransform)),u.sheenRoughnessMap&&(l.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,l.sheenRoughnessMapTransform))),u.clearcoat>0&&(l.clearcoat.value=u.clearcoat,l.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(l.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,l.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(l.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Me&&l.clearcoatNormalScale.value.negate())),u.dispersion>0&&(l.dispersion.value=u.dispersion),u.iridescence>0&&(l.iridescence.value=u.iridescence,l.iridescenceIOR.value=u.iridescenceIOR,l.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(l.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,l.iridescenceMapTransform)),u.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),u.transmission>0&&(l.transmission.value=u.transmission,l.transmissionSamplerMap.value=b.texture,l.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(l.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,l.transmissionMapTransform)),l.thickness.value=u.thickness,u.thicknessMap&&(l.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=u.attenuationDistance,l.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(l.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(l.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=u.specularIntensity,l.specularColor.value.copy(u.specularColor),u.specularColorMap&&(l.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,l.specularColorMapTransform)),u.specularIntensityMap&&(l.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,l.specularIntensityMapTransform))}function _(l,u){u.matcap&&(l.matcap.value=u.matcap)}function g(l,u){const b=t.get(u).light;l.referencePosition.value.setFromMatrixPosition(b.matrixWorld),l.nearDistance.value=b.shadow.camera.near,l.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function lm(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,E){const S=E.program;i.uniformBlockBinding(b,S)}function h(b,E){let S=s[b.id];S===void 0&&(_(b),S=d(b),s[b.id]=S,b.addEventListener("dispose",l));const D=E.program;i.updateUBOMapping(b,D);const A=t.render.frame;r[b.id]!==A&&(p(b),r[b.id]=A)}function d(b){const E=f();b.__bindingPointIndex=E;const S=n.createBuffer(),D=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,D,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const E=s[b.id],S=b.uniforms,D=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let A=0,w=S.length;A<w;A++){const P=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,M=P.length;y<M;y++){const R=P[y];if(m(R,A,y,D)===!0){const H=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let V=0;for(let X=0;X<F.length;X++){const W=F[X],Z=g(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,H+V,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,V),V+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,E,S,D){const A=b.value,w=E+"_"+S;if(D[w]===void 0)return typeof A=="number"||typeof A=="boolean"?D[w]=A:D[w]=A.clone(),!0;{const P=D[w];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return D[w]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function _(b){const E=b.uniforms;let S=0;const D=16;for(let w=0,P=E.length;w<P;w++){const y=Array.isArray(E[w])?E[w]:[E[w]];for(let M=0,R=y.length;M<R;M++){const H=y[M],F=Array.isArray(H.value)?H.value:[H.value];for(let V=0,X=F.length;V<X;V++){const W=F[V],Z=g(W),k=S%D,et=k%Z.boundary,lt=k+et;S+=et,lt!==0&&D-lt<Z.storage&&(S+=D-lt),H.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=Z.storage}}}const A=S%D;return A>0&&(S+=D-A),b.__size=S,b.__cache={},this}function g(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function l(b){const E=b.target;E.removeEventListener("dispose",l);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function u(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:h,dispose:u}}class hm{constructor(t={}){const{canvas:e=Jl(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=new Uint32Array(4),g=new Int32Array(4);let l=null,u=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=wn,this.toneMappingExposure=1;const S=this;let D=!1,A=0,w=0,P=null,y=-1,M=null;const R=new Zt,H=new Zt;let F=null;const V=new zt(0);let X=0,W=e.width,Z=e.height,k=1,et=null,lt=null;const mt=new Zt(0,0,W,Z),Pt=new Zt(0,0,W,Z);let Bt=!1;const Y=new Ma;let Q=!1,pt=!1;const nt=new ae,yt=new ae,bt=new U,Dt=new Zt,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ht=!1;function st(){return P===null?k:1}let C=i;function Xt(v,I){return e.getContext(v,I)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${da}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",ot,!1),C===null){const I="webgl2";if(C=Xt(I,v),C===null)throw Xt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Rt,Ot,St,qt,Et,T,x,O,$,K,q,vt,at,ut,Gt,J,dt,Tt,wt,ft,kt,Nt,ee,L;function rt(){Rt=new mf(C),Rt.init(),Nt=new tm(C,Rt),Ot=new lf(C,Rt,t,Nt),St=new Kp(C,Rt),Ot.reverseDepthBuffer&&p&&St.buffers.depth.setReversed(!0),qt=new xf(C),Et=new Fp,T=new Qp(C,Rt,St,Et,Ot,Nt,qt),x=new uf(S),O=new pf(S),$=new Th(C),ee=new of(C,$),K=new _f(C,$,qt,ee),q=new Mf(C,K,$,qt),wt=new vf(C,Ot,T),J=new hf(Et),vt=new Np(S,x,O,Rt,Ot,ee,J),at=new cm(S,Et),ut=new zp,Gt=new Wp(Rt),Tt=new af(S,x,O,St,q,m,c),dt=new jp(S,q,Ot),L=new lm(C,qt,Ot,St),ft=new cf(C,Rt,qt),kt=new gf(C,Rt,qt),qt.programs=vt.programs,S.capabilities=Ot,S.extensions=Rt,S.properties=Et,S.renderLists=ut,S.shadowMap=dt,S.state=St,S.info=qt}rt();const G=new am(S,C);this.xr=G,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const v=Rt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Rt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(v){v!==void 0&&(k=v,this.setSize(W,Z,!1))},this.getSize=function(v){return v.set(W,Z)},this.setSize=function(v,I,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=v,Z=I,e.width=Math.floor(v*k),e.height=Math.floor(I*k),z===!0&&(e.style.width=v+"px",e.style.height=I+"px"),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(W*k,Z*k).floor()},this.setDrawingBufferSize=function(v,I,z){W=v,Z=I,k=z,e.width=Math.floor(v*z),e.height=Math.floor(I*z),this.setViewport(0,0,v,I)},this.getCurrentViewport=function(v){return v.copy(R)},this.getViewport=function(v){return v.copy(mt)},this.setViewport=function(v,I,z,B){v.isVector4?mt.set(v.x,v.y,v.z,v.w):mt.set(v,I,z,B),St.viewport(R.copy(mt).multiplyScalar(k).round())},this.getScissor=function(v){return v.copy(Pt)},this.setScissor=function(v,I,z,B){v.isVector4?Pt.set(v.x,v.y,v.z,v.w):Pt.set(v,I,z,B),St.scissor(H.copy(Pt).multiplyScalar(k).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(v){St.setScissorTest(Bt=v)},this.setOpaqueSort=function(v){et=v},this.setTransparentSort=function(v){lt=v},this.getClearColor=function(v){return v.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor.apply(Tt,arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha.apply(Tt,arguments)},this.clear=function(v=!0,I=!0,z=!0){let B=0;if(v){let N=!1;if(P!==null){const tt=P.texture.format;N=tt===xa||tt===ga||tt===_a}if(N){const tt=P.texture.type,ct=tt===pn||tt===Xn||tt===Hi||tt===vi||tt===pa||tt===ma,_t=Tt.getClearColor(),gt=Tt.getClearAlpha(),Ct=_t.r,Ut=_t.g,xt=_t.b;ct?(_[0]=Ct,_[1]=Ut,_[2]=xt,_[3]=gt,C.clearBufferuiv(C.COLOR,0,_)):(g[0]=Ct,g[1]=Ut,g[2]=xt,g[3]=gt,C.clearBufferiv(C.COLOR,0,g))}else B|=C.COLOR_BUFFER_BIT}I&&(B|=C.DEPTH_BUFFER_BIT),z&&(B|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),ut.dispose(),Gt.dispose(),Et.dispose(),x.dispose(),O.dispose(),q.dispose(),ee.dispose(),L.dispose(),vt.dispose(),G.dispose(),G.removeEventListener("sessionstart",Da),G.removeEventListener("sessionend",La),Dn.stop()};function j(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const v=qt.autoReset,I=dt.enabled,z=dt.autoUpdate,B=dt.needsUpdate,N=dt.type;rt(),qt.autoReset=v,dt.enabled=I,dt.autoUpdate=z,dt.needsUpdate=B,dt.type=N}function ot(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Lt(v){const I=v.target;I.removeEventListener("dispose",Lt),oe(I)}function oe(v){_e(v),Et.remove(v)}function _e(v){const I=Et.get(v).programs;I!==void 0&&(I.forEach(function(z){vt.releaseProgram(z)}),v.isShaderMaterial&&vt.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,z,B,N,tt){I===null&&(I=te);const ct=N.isMesh&&N.matrixWorld.determinant()<0,_t=Gc(v,I,z,B,N);St.setMaterial(B,ct);let gt=z.index,Ct=1;if(B.wireframe===!0){if(gt=K.getWireframeAttribute(z),gt===void 0)return;Ct=2}const Ut=z.drawRange,xt=z.attributes.position;let Wt=Ut.start*Ct,ne=(Ut.start+Ut.count)*Ct;tt!==null&&(Wt=Math.max(Wt,tt.start*Ct),ne=Math.min(ne,(tt.start+tt.count)*Ct)),gt!==null?(Wt=Math.max(Wt,0),ne=Math.min(ne,gt.count)):xt!=null&&(Wt=Math.max(Wt,0),ne=Math.min(ne,xt.count));const se=ne-Wt;if(se<0||se===1/0)return;ee.setup(N,B,_t,z,gt);let be,$t=ft;if(gt!==null&&(be=$.get(gt),$t=kt,$t.setIndex(be)),N.isMesh)B.wireframe===!0?(St.setLineWidth(B.wireframeLinewidth*st()),$t.setMode(C.LINES)):$t.setMode(C.TRIANGLES);else if(N.isLine){let Mt=B.linewidth;Mt===void 0&&(Mt=1),St.setLineWidth(Mt*st()),N.isLineSegments?$t.setMode(C.LINES):N.isLineLoop?$t.setMode(C.LINE_LOOP):$t.setMode(C.LINE_STRIP)}else N.isPoints?$t.setMode(C.POINTS):N.isSprite&&$t.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)$t.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Rt.get("WEBGL_multi_draw"))$t.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Mt=N._multiDrawStarts,en=N._multiDrawCounts,jt=N._multiDrawCount,Fe=gt?$.get(gt).bytesPerElement:1,$n=Et.get(B).currentProgram.getUniforms();for(let Ce=0;Ce<jt;Ce++)$n.setValue(C,"_gl_DrawID",Ce),$t.render(Mt[Ce]/Fe,en[Ce])}else if(N.isInstancedMesh)$t.renderInstances(Wt,se,N.count);else if(z.isInstancedBufferGeometry){const Mt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,en=Math.min(z.instanceCount,Mt);$t.renderInstances(Wt,se,en)}else $t.render(Wt,se)};function Kt(v,I,z){v.transparent===!0&&v.side===Ie&&v.forceSinglePass===!1?(v.side=Me,v.needsUpdate=!0,Xi(v,I,z),v.side=An,v.needsUpdate=!0,Xi(v,I,z),v.side=Ie):Xi(v,I,z)}this.compile=function(v,I,z=null){z===null&&(z=v),u=Gt.get(z),u.init(I),E.push(u),z.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),v!==z&&v.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),u.setupLights();const B=new Set;return v.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const tt=N.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const _t=tt[ct];Kt(_t,z,N),B.add(_t)}else Kt(tt,z,N),B.add(tt)}),E.pop(),u=null,B},this.compileAsync=function(v,I,z=null){const B=this.compile(v,I,z);return new Promise(N=>{function tt(){if(B.forEach(function(ct){Et.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){N(v);return}setTimeout(tt,10)}Rt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Ne=null;function tn(v){Ne&&Ne(v)}function Da(){Dn.stop()}function La(){Dn.start()}const Dn=new wc;Dn.setAnimationLoop(tn),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(v){Ne=v,G.setAnimationLoop(v),v===null?Dn.stop():Dn.start()},G.addEventListener("sessionstart",Da),G.addEventListener("sessionend",La),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(I),I=G.getCamera()),v.isScene===!0&&v.onBeforeRender(S,v,I,P),u=Gt.get(v,E.length),u.init(I),E.push(u),yt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Y.setFromProjectionMatrix(yt),pt=this.localClippingEnabled,Q=J.init(this.clippingPlanes,pt),l=ut.get(v,b.length),l.init(),b.push(l),G.enabled===!0&&G.isPresenting===!0){const tt=S.xr.getDepthSensingMesh();tt!==null&&Fs(tt,I,-1/0,S.sortObjects)}Fs(v,I,0,S.sortObjects),l.finish(),S.sortObjects===!0&&l.sort(et,lt),Ht=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Ht&&Tt.addToRenderList(l,v),this.info.render.frame++,Q===!0&&J.beginShadows();const z=u.state.shadowsArray;dt.render(z,v,I),Q===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=l.opaque,N=l.transmissive;if(u.setupLights(),I.isArrayCamera){const tt=I.cameras;if(N.length>0)for(let ct=0,_t=tt.length;ct<_t;ct++){const gt=tt[ct];Ia(B,N,v,gt)}Ht&&Tt.render(v);for(let ct=0,_t=tt.length;ct<_t;ct++){const gt=tt[ct];Ua(l,v,gt,gt.viewport)}}else N.length>0&&Ia(B,N,v,I),Ht&&Tt.render(v),Ua(l,v,I);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),v.isScene===!0&&v.onAfterRender(S,v,I),ee.resetDefaultState(),y=-1,M=null,E.pop(),E.length>0?(u=E[E.length-1],Q===!0&&J.setGlobalState(S.clippingPlanes,u.state.camera)):u=null,b.pop(),b.length>0?l=b[b.length-1]:l=null};function Fs(v,I,z,B){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)z=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)u.pushLight(v),v.castShadow&&u.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Y.intersectsSprite(v)){B&&Dt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(yt);const ct=q.update(v),_t=v.material;_t.visible&&l.push(v,ct,_t,z,Dt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Y.intersectsObject(v))){const ct=q.update(v),_t=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Dt.copy(v.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Dt.copy(ct.boundingSphere.center)),Dt.applyMatrix4(v.matrixWorld).applyMatrix4(yt)),Array.isArray(_t)){const gt=ct.groups;for(let Ct=0,Ut=gt.length;Ct<Ut;Ct++){const xt=gt[Ct],Wt=_t[xt.materialIndex];Wt&&Wt.visible&&l.push(v,ct,Wt,z,Dt.z,xt)}}else _t.visible&&l.push(v,ct,_t,z,Dt.z,null)}}const tt=v.children;for(let ct=0,_t=tt.length;ct<_t;ct++)Fs(tt[ct],I,z,B)}function Ua(v,I,z,B){const N=v.opaque,tt=v.transmissive,ct=v.transparent;u.setupLightsView(z),Q===!0&&J.setGlobalState(S.clippingPlanes,z),B&&St.viewport(R.copy(B)),N.length>0&&Wi(N,I,z),tt.length>0&&Wi(tt,I,z),ct.length>0&&Wi(ct,I,z),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function Ia(v,I,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new Rn(1,1,{generateMipmaps:!0,type:Rt.has("EXT_color_buffer_half_float")||Rt.has("EXT_color_buffer_float")?Ei:pn,minFilter:Vn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Vt.workingColorSpace}));const tt=u.state.transmissionRenderTarget[B.id],ct=B.viewport||R;tt.setSize(ct.z,ct.w);const _t=S.getRenderTarget();S.setRenderTarget(tt),S.getClearColor(V),X=S.getClearAlpha(),X<1&&S.setClearColor(16777215,.5),S.clear(),Ht&&Tt.render(z);const gt=S.toneMapping;S.toneMapping=wn;const Ct=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),Q===!0&&J.setGlobalState(S.clippingPlanes,B),Wi(v,z,B),T.updateMultisampleRenderTarget(tt),T.updateRenderTargetMipmap(tt),Rt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let xt=0,Wt=I.length;xt<Wt;xt++){const ne=I[xt],se=ne.object,be=ne.geometry,$t=ne.material,Mt=ne.group;if($t.side===Ie&&se.layers.test(B.layers)){const en=$t.side;$t.side=Me,$t.needsUpdate=!0,Na(se,z,B,be,$t,Mt),$t.side=en,$t.needsUpdate=!0,Ut=!0}}Ut===!0&&(T.updateMultisampleRenderTarget(tt),T.updateRenderTargetMipmap(tt))}S.setRenderTarget(_t),S.setClearColor(V,X),Ct!==void 0&&(B.viewport=Ct),S.toneMapping=gt}function Wi(v,I,z){const B=I.isScene===!0?I.overrideMaterial:null;for(let N=0,tt=v.length;N<tt;N++){const ct=v[N],_t=ct.object,gt=ct.geometry,Ct=B===null?ct.material:B,Ut=ct.group;_t.layers.test(z.layers)&&Na(_t,I,z,gt,Ct,Ut)}}function Na(v,I,z,B,N,tt){v.onBeforeRender(S,I,z,B,N,tt),v.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),N.onBeforeRender(S,I,z,B,v,tt),N.transparent===!0&&N.side===Ie&&N.forceSinglePass===!1?(N.side=Me,N.needsUpdate=!0,S.renderBufferDirect(z,I,B,N,v,tt),N.side=An,N.needsUpdate=!0,S.renderBufferDirect(z,I,B,N,v,tt),N.side=Ie):S.renderBufferDirect(z,I,B,N,v,tt),v.onAfterRender(S,I,z,B,N,tt)}function Xi(v,I,z){I.isScene!==!0&&(I=te);const B=Et.get(v),N=u.state.lights,tt=u.state.shadowsArray,ct=N.state.version,_t=vt.getParameters(v,N.state,tt,I,z),gt=vt.getProgramCacheKey(_t);let Ct=B.programs;B.environment=v.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(v.isMeshStandardMaterial?O:x).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Ct===void 0&&(v.addEventListener("dispose",Lt),Ct=new Map,B.programs=Ct);let Ut=Ct.get(gt);if(Ut!==void 0){if(B.currentProgram===Ut&&B.lightsStateVersion===ct)return Oa(v,_t),Ut}else _t.uniforms=vt.getUniforms(v),v.onBeforeCompile(_t,S),Ut=vt.acquireProgram(_t,gt),Ct.set(gt,Ut),B.uniforms=_t.uniforms;const xt=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(xt.clippingPlanes=J.uniform),Oa(v,_t),B.needsLights=Wc(v),B.lightsStateVersion=ct,B.needsLights&&(xt.ambientLightColor.value=N.state.ambient,xt.lightProbe.value=N.state.probe,xt.directionalLights.value=N.state.directional,xt.directionalLightShadows.value=N.state.directionalShadow,xt.spotLights.value=N.state.spot,xt.spotLightShadows.value=N.state.spotShadow,xt.rectAreaLights.value=N.state.rectArea,xt.ltc_1.value=N.state.rectAreaLTC1,xt.ltc_2.value=N.state.rectAreaLTC2,xt.pointLights.value=N.state.point,xt.pointLightShadows.value=N.state.pointShadow,xt.hemisphereLights.value=N.state.hemi,xt.directionalShadowMap.value=N.state.directionalShadowMap,xt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,xt.spotShadowMap.value=N.state.spotShadowMap,xt.spotLightMatrix.value=N.state.spotLightMatrix,xt.spotLightMap.value=N.state.spotLightMap,xt.pointShadowMap.value=N.state.pointShadowMap,xt.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Ut,B.uniformsList=null,Ut}function Fa(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=bs.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function Oa(v,I){const z=Et.get(v);z.outputColorSpace=I.outputColorSpace,z.batching=I.batching,z.batchingColor=I.batchingColor,z.instancing=I.instancing,z.instancingColor=I.instancingColor,z.instancingMorph=I.instancingMorph,z.skinning=I.skinning,z.morphTargets=I.morphTargets,z.morphNormals=I.morphNormals,z.morphColors=I.morphColors,z.morphTargetsCount=I.morphTargetsCount,z.numClippingPlanes=I.numClippingPlanes,z.numIntersection=I.numClipIntersection,z.vertexAlphas=I.vertexAlphas,z.vertexTangents=I.vertexTangents,z.toneMapping=I.toneMapping}function Gc(v,I,z,B,N){I.isScene!==!0&&(I=te),T.resetTextureUnits();const tt=I.fog,ct=B.isMeshStandardMaterial?I.environment:null,_t=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ti,gt=(B.isMeshStandardMaterial?O:x).get(B.envMap||ct),Ct=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ut=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),xt=!!z.morphAttributes.position,Wt=!!z.morphAttributes.normal,ne=!!z.morphAttributes.color;let se=wn;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(se=S.toneMapping);const be=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,$t=be!==void 0?be.length:0,Mt=Et.get(B),en=u.state.lights;if(Q===!0&&(pt===!0||v!==M)){const Le=v===M&&B.id===y;J.setState(B,v,Le)}let jt=!1;B.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==en.state.version||Mt.outputColorSpace!==_t||N.isBatchedMesh&&Mt.batching===!1||!N.isBatchedMesh&&Mt.batching===!0||N.isBatchedMesh&&Mt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Mt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Mt.instancing===!1||!N.isInstancedMesh&&Mt.instancing===!0||N.isSkinnedMesh&&Mt.skinning===!1||!N.isSkinnedMesh&&Mt.skinning===!0||N.isInstancedMesh&&Mt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Mt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Mt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Mt.instancingMorph===!1&&N.morphTexture!==null||Mt.envMap!==gt||B.fog===!0&&Mt.fog!==tt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==J.numPlanes||Mt.numIntersection!==J.numIntersection)||Mt.vertexAlphas!==Ct||Mt.vertexTangents!==Ut||Mt.morphTargets!==xt||Mt.morphNormals!==Wt||Mt.morphColors!==ne||Mt.toneMapping!==se||Mt.morphTargetsCount!==$t)&&(jt=!0):(jt=!0,Mt.__version=B.version);let Fe=Mt.currentProgram;jt===!0&&(Fe=Xi(B,I,N));let $n=!1,Ce=!1,wi=!1;const re=Fe.getUniforms(),Ye=Mt.uniforms;if(St.useProgram(Fe.program)&&($n=!0,Ce=!0,wi=!0),B.id!==y&&(y=B.id,Ce=!0),$n||M!==v){St.buffers.depth.getReversed()?(nt.copy(v.projectionMatrix),th(nt),eh(nt),re.setValue(C,"projectionMatrix",nt)):re.setValue(C,"projectionMatrix",v.projectionMatrix),re.setValue(C,"viewMatrix",v.matrixWorldInverse);const mn=re.map.cameraPosition;mn!==void 0&&mn.setValue(C,bt.setFromMatrixPosition(v.matrixWorld)),Ot.logarithmicDepthBuffer&&re.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&re.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,Ce=!0,wi=!0)}if(N.isSkinnedMesh){re.setOptional(C,N,"bindMatrix"),re.setOptional(C,N,"bindMatrixInverse");const Le=N.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),re.setValue(C,"boneTexture",Le.boneTexture,T))}N.isBatchedMesh&&(re.setOptional(C,N,"batchingTexture"),re.setValue(C,"batchingTexture",N._matricesTexture,T),re.setOptional(C,N,"batchingIdTexture"),re.setValue(C,"batchingIdTexture",N._indirectTexture,T),re.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&re.setValue(C,"batchingColorTexture",N._colorsTexture,T));const Ai=z.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&wt.update(N,z,Fe),(Ce||Mt.receiveShadow!==N.receiveShadow)&&(Mt.receiveShadow=N.receiveShadow,re.setValue(C,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Ye.envMap.value=gt,Ye.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(Ye.envMapIntensity.value=I.environmentIntensity),Ce&&(re.setValue(C,"toneMappingExposure",S.toneMappingExposure),Mt.needsLights&&Vc(Ye,wi),tt&&B.fog===!0&&at.refreshFogUniforms(Ye,tt),at.refreshMaterialUniforms(Ye,B,k,Z,u.state.transmissionRenderTarget[v.id]),bs.upload(C,Fa(Mt),Ye,T)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(bs.upload(C,Fa(Mt),Ye,T),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&re.setValue(C,"center",N.center),re.setValue(C,"modelViewMatrix",N.modelViewMatrix),re.setValue(C,"normalMatrix",N.normalMatrix),re.setValue(C,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Le=B.uniformsGroups;for(let mn=0,_n=Le.length;mn<_n;mn++){const za=Le[mn];L.update(za,Fe),L.bind(za,Fe)}}return Fe}function Vc(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function Wc(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(v,I,z){Et.get(v.texture).__webglTexture=I,Et.get(v.depthTexture).__webglTexture=z;const B=Et.get(v);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=z===void 0,B.__autoAllocateDepthBuffer||Rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,I){const z=Et.get(v);z.__webglFramebuffer=I,z.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,z=0){P=v,A=I,w=z;let B=!0,N=null,tt=!1,ct=!1;if(v){const gt=Et.get(v);if(gt.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(C.FRAMEBUFFER,null),B=!1;else if(gt.__webglFramebuffer===void 0)T.setupRenderTarget(v);else if(gt.__hasExternalTextures)T.rebindTextures(v,Et.get(v.texture).__webglTexture,Et.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const xt=v.depthTexture;if(gt.__boundDepthTexture!==xt){if(xt!==null&&Et.has(xt)&&(v.width!==xt.image.width||v.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(v)}}const Ct=v.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ct=!0);const Ut=Et.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ut[I])?N=Ut[I][z]:N=Ut[I],tt=!0):v.samples>0&&T.useMultisampledRTT(v)===!1?N=Et.get(v).__webglMultisampledFramebuffer:Array.isArray(Ut)?N=Ut[z]:N=Ut,R.copy(v.viewport),H.copy(v.scissor),F=v.scissorTest}else R.copy(mt).multiplyScalar(k).floor(),H.copy(Pt).multiplyScalar(k).floor(),F=Bt;if(St.bindFramebuffer(C.FRAMEBUFFER,N)&&B&&St.drawBuffers(v,N),St.viewport(R),St.scissor(H),St.setScissorTest(F),tt){const gt=Et.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+I,gt.__webglTexture,z)}else if(ct){const gt=Et.get(v.texture),Ct=I||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,gt.__webglTexture,z||0,Ct)}y=-1},this.readRenderTargetPixels=function(v,I,z,B,N,tt,ct){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Et.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){St.bindFramebuffer(C.FRAMEBUFFER,_t);try{const gt=v.texture,Ct=gt.format,Ut=gt.type;if(!Ot.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-B&&z>=0&&z<=v.height-N&&C.readPixels(I,z,B,N,Nt.convert(Ct),Nt.convert(Ut),tt)}finally{const gt=P!==null?Et.get(P).__webglFramebuffer:null;St.bindFramebuffer(C.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(v,I,z,B,N,tt,ct){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Et.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){const gt=v.texture,Ct=gt.format,Ut=gt.type;if(!Ot.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=v.width-B&&z>=0&&z<=v.height-N){St.bindFramebuffer(C.FRAMEBUFFER,_t);const xt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,xt),C.bufferData(C.PIXEL_PACK_BUFFER,tt.byteLength,C.STREAM_READ),C.readPixels(I,z,B,N,Nt.convert(Ct),Nt.convert(Ut),0);const Wt=P!==null?Et.get(P).__webglFramebuffer:null;St.bindFramebuffer(C.FRAMEBUFFER,Wt);const ne=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ql(C,ne,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,xt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,tt),C.deleteBuffer(xt),C.deleteSync(ne),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,I=null,z=0){v.isTexture!==!0&&(Fi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,v=arguments[1]);const B=Math.pow(2,-z),N=Math.floor(v.image.width*B),tt=Math.floor(v.image.height*B),ct=I!==null?I.x:0,_t=I!==null?I.y:0;T.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,z,0,0,ct,_t,N,tt),St.unbindTexture()},this.copyTextureToTexture=function(v,I,z=null,B=null,N=0){v.isTexture!==!0&&(Fi("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,v=arguments[1],I=arguments[2],N=arguments[3]||0,z=null);let tt,ct,_t,gt,Ct,Ut,xt,Wt,ne;const se=v.isCompressedTexture?v.mipmaps[N]:v.image;z!==null?(tt=z.max.x-z.min.x,ct=z.max.y-z.min.y,_t=z.isBox3?z.max.z-z.min.z:1,gt=z.min.x,Ct=z.min.y,Ut=z.isBox3?z.min.z:0):(tt=se.width,ct=se.height,_t=se.depth||1,gt=0,Ct=0,Ut=0),B!==null?(xt=B.x,Wt=B.y,ne=B.z):(xt=0,Wt=0,ne=0);const be=Nt.convert(I.format),$t=Nt.convert(I.type);let Mt;I.isData3DTexture?(T.setTexture3D(I,0),Mt=C.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(T.setTexture2DArray(I,0),Mt=C.TEXTURE_2D_ARRAY):(T.setTexture2D(I,0),Mt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);const en=C.getParameter(C.UNPACK_ROW_LENGTH),jt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Fe=C.getParameter(C.UNPACK_SKIP_PIXELS),$n=C.getParameter(C.UNPACK_SKIP_ROWS),Ce=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,se.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,se.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ct),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ut);const wi=v.isDataArrayTexture||v.isData3DTexture,re=I.isDataArrayTexture||I.isData3DTexture;if(v.isRenderTargetTexture||v.isDepthTexture){const Ye=Et.get(v),Ai=Et.get(I),Le=Et.get(Ye.__renderTarget),mn=Et.get(Ai.__renderTarget);St.bindFramebuffer(C.READ_FRAMEBUFFER,Le.__webglFramebuffer),St.bindFramebuffer(C.DRAW_FRAMEBUFFER,mn.__webglFramebuffer);for(let _n=0;_n<_t;_n++)wi&&C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.get(v).__webglTexture,N,Ut+_n),v.isDepthTexture?(re&&C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.get(I).__webglTexture,N,ne+_n),C.blitFramebuffer(gt,Ct,tt,ct,xt,Wt,tt,ct,C.DEPTH_BUFFER_BIT,C.NEAREST)):re?C.copyTexSubImage3D(Mt,N,xt,Wt,ne+_n,gt,Ct,tt,ct):C.copyTexSubImage2D(Mt,N,xt,Wt,ne+_n,gt,Ct,tt,ct);St.bindFramebuffer(C.READ_FRAMEBUFFER,null),St.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else re?v.isDataTexture||v.isData3DTexture?C.texSubImage3D(Mt,N,xt,Wt,ne,tt,ct,_t,be,$t,se.data):I.isCompressedArrayTexture?C.compressedTexSubImage3D(Mt,N,xt,Wt,ne,tt,ct,_t,be,se.data):C.texSubImage3D(Mt,N,xt,Wt,ne,tt,ct,_t,be,$t,se):v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,N,xt,Wt,tt,ct,be,$t,se.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,N,xt,Wt,se.width,se.height,be,se.data):C.texSubImage2D(C.TEXTURE_2D,N,xt,Wt,tt,ct,be,$t,se);C.pixelStorei(C.UNPACK_ROW_LENGTH,en),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,jt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Fe),C.pixelStorei(C.UNPACK_SKIP_ROWS,$n),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ce),N===0&&I.generateMipmaps&&C.generateMipmap(Mt),St.unbindTexture()},this.copyTextureToTexture3D=function(v,I,z=null,B=null,N=0){return v.isTexture!==!0&&(Fi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,B=arguments[1]||null,v=arguments[2],I=arguments[3],N=arguments[4]||0),Fi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,I,z,B,N)},this.initRenderTarget=function(v){Et.get(v).__webglFramebuffer===void 0&&T.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?T.setTextureCube(v,0):v.isData3DTexture?T.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?T.setTexture2DArray(v,0):T.setTexture2D(v,0),St.unbindTexture()},this.resetState=function(){A=0,w=0,P=null,St.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}}class ya{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=i}clone(){return new ya(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uc extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Je,this.environmentIntensity=1,this.environmentRotation=new Je,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ic extends Te{constructor(t,e,i,s,r,a,o,c,h){super(t,e,i,s,r,a,o,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Us extends Xe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],h=new U,d=new At;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,p=3;f<=e;f++,p+=3){const m=i+f/e*s;h.x=t*Math.cos(m),h.y=t*Math.sin(m),a.push(h.x,h.y,h.z),o.push(0,0,1),d.x=(a[p]/t+1)/2,d.y=(a[p+1]/t+1)/2,c.push(d.x,d.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(o,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ea extends Xe{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const h=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],p=[],m=[];let _=0;const g=[],l=i/2;let u=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Se(f,3)),this.setAttribute("normal",new Se(p,3)),this.setAttribute("uv",new Se(m,2));function b(){const S=new U,D=new U;let A=0;const w=(e-t)/i;for(let P=0;P<=r;P++){const y=[],M=P/r,R=M*(e-t)+t;for(let H=0;H<=s;H++){const F=H/s,V=F*c+o,X=Math.sin(V),W=Math.cos(V);D.x=R*X,D.y=-M*i+l,D.z=R*W,f.push(D.x,D.y,D.z),S.set(X,w,W).normalize(),p.push(S.x,S.y,S.z),m.push(F,1-M),y.push(_++)}g.push(y)}for(let P=0;P<s;P++)for(let y=0;y<r;y++){const M=g[y][P],R=g[y+1][P],H=g[y+1][P+1],F=g[y][P+1];(t>0||y!==0)&&(d.push(M,R,F),A+=3),(e>0||y!==r-1)&&(d.push(R,H,F),A+=3)}h.addGroup(u,A,0),u+=A}function E(S){const D=_,A=new At,w=new U;let P=0;const y=S===!0?t:e,M=S===!0?1:-1;for(let H=1;H<=s;H++)f.push(0,l*M,0),p.push(0,M,0),m.push(.5,.5),_++;const R=_;for(let H=0;H<=s;H++){const V=H/s*c+o,X=Math.cos(V),W=Math.sin(V);w.x=y*W,w.y=l*M,w.z=y*X,f.push(w.x,w.y,w.z),p.push(0,M,0),A.x=X*.5+.5,A.y=W*.5*M+.5,m.push(A.x,A.y),_++}for(let H=0;H<s;H++){const F=D+H,V=R+H;S===!0?d.push(V,V+1,F):d.push(V+1,V,F),P+=3}h.addGroup(u,P,S===!0?1:2),u+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ta extends Xe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let h=0;const d=[],f=new U,p=new U,m=[],_=[],g=[],l=[];for(let u=0;u<=i;u++){const b=[],E=u/i;let S=0;u===0&&a===0?S=.5/e:u===i&&c===Math.PI&&(S=-.5/e);for(let D=0;D<=e;D++){const A=D/e;f.x=-t*Math.cos(s+A*r)*Math.sin(a+E*o),f.y=t*Math.cos(a+E*o),f.z=t*Math.sin(s+A*r)*Math.sin(a+E*o),_.push(f.x,f.y,f.z),p.copy(f).normalize(),g.push(p.x,p.y,p.z),l.push(A+S,1-E),b.push(h++)}d.push(b)}for(let u=0;u<i;u++)for(let b=0;b<e;b++){const E=d[u][b+1],S=d[u][b],D=d[u+1][b],A=d[u+1][b+1];(u!==0||a>0)&&m.push(E,S,A),(u!==i-1||c<Math.PI)&&m.push(S,D,A)}this.setIndex(m),this.setAttribute("position",new Se(_,3)),this.setAttribute("normal",new Se(g,3)),this.setAttribute("uv",new Se(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Cn extends Vi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Je,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nc extends Cn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Is extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class um extends Is{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const mr=new ae,ko=new U,Go=new U;class Fc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ma,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ko.setFromMatrixPosition(t.matrixWorld),e.position.copy(ko),Go.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Go),e.updateMatrixWorld(),mr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Vo=new ae,Ii=new U,_r=new U;class dm extends Fc{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new At(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Ii.setFromMatrixPosition(t.matrixWorld),i.position.copy(Ii),_r.copy(i.position),_r.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(_r),i.updateMatrixWorld(),s.makeTranslation(-Ii.x,-Ii.y,-Ii.z),Vo.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo)}}class fm extends Is{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new dm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class pm extends Fc{constructor(){super(new Ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mm extends Is{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new pm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _m extends Is{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Wo{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ve(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gm extends qn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=da);const Xo={type:"change"},ba={type:"start"},Oc={type:"end"},ps=new gc,Yo=new hn,xm=Math.cos(70*Kl.DEG2RAD),he=new U,Ae=2*Math.PI,Qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gr=1e-6;class vm extends gm{constructor(t,e=null){super(t,e),this.state=Qt.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:hi.ROTATE,TWO:hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Yn,this._lastTargetPosition=new U,this._quat=new Yn().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wo,this._sphericalDelta=new Wo,this._scale=1,this._panOffset=new U,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new U,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sm.bind(this),this._onPointerDown=Mm.bind(this),this._onPointerUp=ym.bind(this),this._onContextMenu=Cm.bind(this),this._onMouseWheel=bm.bind(this),this._onKeyDown=wm.bind(this),this._onTouchStart=Am.bind(this),this._onTouchMove=Rm.bind(this),this._onMouseDown=Em.bind(this),this._onMouseMove=Tm.bind(this),this._interceptControlDown=Pm.bind(this),this._interceptControlUp=Dm.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xo),this.update(),this.state=Qt.NONE}update(t=null){const e=this.object.position;he.copy(e).sub(this.target),he.applyQuaternion(this._quat),this._spherical.setFromVector3(he),this.autoRotate&&this.state===Qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ae:i>Math.PI&&(i-=Ae),s<-Math.PI?s+=Ae:s>Math.PI&&(s-=Ae),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(he.setFromSpherical(this._spherical),he.applyQuaternion(this._quatInverse),e.copy(this.target).add(he),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=he.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new U(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const h=new U(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),a=he.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ps.origin.copy(this.object.position),ps.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ps.direction))<xm?this.object.lookAt(this.target):(Yo.setFromNormalAndCoplanarPoint(this.object.up,this.target),ps.intersectPlane(Yo,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gr||this._lastTargetPosition.distanceToSquared(this.target)>gr?(this.dispatchEvent(Xo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ae/60*this.autoRotateSpeed*t:Ae/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){he.setFromMatrixColumn(e,0),he.multiplyScalar(-t),this._panOffset.add(he)}_panUp(t,e){this.screenSpacePanning===!0?he.setFromMatrixColumn(e,1):(he.setFromMatrixColumn(e,0),he.crossVectors(this.object.up,he)),he.multiplyScalar(t),this._panOffset.add(he)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;he.copy(s).sub(this.target);let r=he.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ae*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ae*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ae*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ae*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Mm(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Sm(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function ym(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Oc),this.state=Qt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Em(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Qt.DOLLY;break;case di.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qt.ROTATE}break;case di.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qt.PAN}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(ba)}function Tm(n){switch(this.state){case Qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function bm(n){this.enabled===!1||this.enableZoom===!1||this.state!==Qt.NONE||(n.preventDefault(),this.dispatchEvent(ba),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Oc))}function wm(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function Am(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case hi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Qt.TOUCH_ROTATE;break;case hi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Qt.TOUCH_PAN;break;default:this.state=Qt.NONE}break;case 2:switch(this.touches.TWO){case hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Qt.TOUCH_DOLLY_PAN;break;case hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Qt.TOUCH_DOLLY_ROTATE;break;default:this.state=Qt.NONE}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(ba)}function Rm(n){switch(this._trackPointer(n),this.state){case Qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Qt.NONE}}function Cm(n){this.enabled!==!1&&n.preventDefault()}function Pm(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Dm(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Lm extends Uc{constructor(){super();const t=new Pn;t.deleteAttribute("uv");const e=new Cn({side:Me}),i=new Cn,s=new fm(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Yt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Yt(t,i);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Yt(t,i);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const c=new Yt(t,i);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const h=new Yt(t,i);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const d=new Yt(t,i);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const f=new Yt(t,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const p=new Yt(t,li(50));p.position.set(-16.116,14.37,8.208),p.scale.set(.1,2.428,2.739),this.add(p);const m=new Yt(t,li(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);const _=new Yt(t,li(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const g=new Yt(t,li(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);const l=new Yt(t,li(20));l.position.set(3.235,11.486,-12.541),l.scale.set(2.5,2,.1),this.add(l);const u=new Yt(t,li(100));u.position.set(0,20,0),u.scale.set(1,.1,1),this.add(u)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function li(n){const t=new Ds;return t.color.setScalar(n),t}function Um(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,c=new Xe;let h=0;for(let d=0;d<n.length;++d){const f=n[d];let p=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in f.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(f.attributes[m]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in f.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(f.morphAttributes[m])}if(t){let m;if(e)m=f.index.count;else if(f.attributes.position!==void 0)m=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,m,d),h+=m}}if(e){let d=0;const f=[];for(let p=0;p<n.length;++p){const m=n[p].index;for(let _=0;_<m.count;++_)f.push(m.getX(_)+d);d+=n[p].attributes.position.count}c.setIndex(f)}for(const d in r){const f=qo(r[d]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,f)}for(const d in a){const f=a[d][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let p=0;p<f;++p){const m=[];for(let g=0;g<a[d].length;++g)m.push(a[d][g][p]);const _=qo(m);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(_)}}return c}function qo(n){let t,e,i,s=-1,r=0;for(let h=0;h<n.length;++h){const d=n[h];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*e}const a=new t(r),o=new We(a,e,i);let c=0;for(let h=0;h<n.length;++h){const d=n[h];if(d.isInterleavedBufferAttribute){const f=c/e;for(let p=0,m=d.count;p<m;p++)for(let _=0;_<e;_++){const g=d.getComponent(p,_);o.setComponent(p+f,_,g)}}else a.set(d.array,c);c+=d.count*e}return s!==void 0&&(o.gpuType=s),o}function Im(n,t){const e=[],i=[],s=[],r=[],a=[],o=new zi;o.name="house";const c=n.solids.find(g=>g.role==="pavilion"),h=n.solids.find(g=>g.id==="sun-wall");let d=n.court.d*.82;if(c&&h){const g=h.z-(c.z+c.d);d=Math.max(n.unit*8,g-n.unit*1.5)}for(const g of n.solids){if(g.shape==="cylinder"){e.push(Wm(g,n.panel.w,n.panel.h));continue}const l=n.openings.filter(E=>E.hostId===g.id),u=l.filter(E=>Nm(g,E.face,n.wallThickness)),b=u.length?Fm(g,u):[g];for(const E of b)E.w<.02||E.h<.02||E.d<.02||e.push(yi(E,n.panel.w,n.panel.h));for(const E of l)zm(g,E,n,u.includes(E),d,u.includes(E)?i:s,r,o,a)}for(const g of n.circulation)g.kind==="stair"?Gm(g,n,e):e.push(Vm(g,n.panel.w,n.panel.h));ms(o,e,t.concrete,!0),ms(o,i,t.glassClear,!1),ms(o,s,t.glassDark,!1),ms(o,r,t.steel,!0);const f=new Yt(new Ke(220,220),t.ground);f.rotation.x=-Math.PI/2,f.position.y=0,f.receiveShadow=!0,f.name="ground",o.add(f);const p=t.gravel.clone();p.map=t.gravel.map;const m=new Yt(new Ke(n.site.w,n.site.d),p);m.rotation.x=-Math.PI/2,m.position.set(n.site.x+n.site.w/2,.01,n.site.z+n.site.d/2),m.receiveShadow=!0,o.add(m);const _=new Yt(new Ke(Math.max(.2,n.court.w-.08),Math.max(.2,n.court.d-.08)),t.court);if(_.rotation.x=-Math.PI/2,_.position.set(n.court.x+n.court.w/2,.02,n.court.z+n.court.d/2),_.receiveShadow=!0,o.add(_),n.garden){const g=new Yt(new Ke(n.garden.w,n.garden.d),t.grass);g.rotation.x=-Math.PI/2,g.position.set(n.garden.x+n.garden.w/2,.018,n.garden.z+n.garden.d/2),g.receiveShadow=!0,o.add(g)}return{content:o,shafts:a,dispose:()=>{o.traverse(g=>{const l=g;l.geometry&&l.geometry.dispose()});for(const g of a)g.dispose();p.dispose()}}}function Nm(n,t,e){return(t==="px"||t==="nx"?n.w:n.d)<=e*1.15}function Fm(n,t){const e=t[0].face;if(e==="px"||e==="nx"){const r={x:n.z,y:n.y,w:n.d,h:n.h},a=t.flatMap(o=>ws(o).map(c=>({x:n.z+c.x,y:n.y+c.y,w:c.w,h:c.h})));return $o(r,a).map(o=>({x:n.x,y:o.y,z:o.x,w:n.w,h:o.h,d:o.w}))}const i={x:n.x,y:n.y,w:n.w,h:n.h},s=t.flatMap(r=>ws(r).map(a=>({x:n.x+a.x,y:n.y+a.y,w:a.w,h:a.h})));return $o(i,s).map(r=>({x:r.x,y:r.y,z:n.z,w:r.w,h:r.h,d:n.d}))}function $o(n,t){let e=[n];for(const i of t){const s=[];for(const r of e)s.push(...Om(r,i));e=s}return e}function Om(n,t){const e=Math.max(n.x,t.x),i=Math.max(n.y,t.y),s=Math.min(n.x+n.w,t.x+t.w),r=Math.min(n.y+n.h,t.y+t.h);if(s-e<=1e-5||r-i<=1e-5)return[n];const a=[];return e-n.x>1e-4&&a.push({x:n.x,y:n.y,w:e-n.x,h:n.h}),n.x+n.w-s>1e-4&&a.push({x:s,y:n.y,w:n.x+n.w-s,h:n.h}),i-n.y>1e-4&&a.push({x:e,y:n.y,w:s-e,h:i-n.y}),n.y+n.h-r>1e-4&&a.push({x:e,y:r,w:s-e,h:n.y+n.h-r}),a}function zm(n,t,e,i,s,r,a,o,c){const h=ws(t),d=t.kind==="glass-slot";for(const f of h){if((t.kind!=="slit"||!i)&&r.push(Bm(n,t.face,f,i,t.kind==="glass-slot"?.04:.008)),d&&a.push(...Hm(n,t.face,f,i)),!i||t.purpose==="entry")continue;const p=km(n,t,f,e,s);if(!p)continue;const m=t.kind==="cruciform"?.16:.07,_=new Ds({color:16773330,transparent:!0,opacity:0,depthWrite:!1,blending:Mr,side:Ie});_.userData.gain=m;const g=new Yt(yi(p,e.panel.w,e.panel.h),_);g.userData.shaft=!0,o.add(g),c.push(_)}}function Bm(n,t,e,i,s){if(t==="pz"||t==="nz"){const o=i?n.z+n.d/2-.01:t==="pz"?n.z+n.d-.02:n.z;return yi({x:n.x+e.x+s,y:n.y+e.y+s,z:o,w:Math.max(.02,e.w-s*2),h:Math.max(.02,e.h-s*2),d:.02},1,1)}const a=i?n.x+n.w/2-.02/2:t==="px"?n.x+n.w-.02:n.x;return yi({x:a,y:n.y+e.y+s,z:n.z+e.x+s,w:.02,h:Math.max(.02,e.h-s*2),d:Math.max(.02,e.w-s*2)},1,1)}function Hm(n,t,e,i){const a=[];if(t==="pz"||t==="nz"){const o=i?n.z+(n.d-.045)/2:t==="pz"?n.z+n.d-.01575:n.z-.029249999999999998,c=n.x+e.x,h=n.y+e.y;a.push({x:c,y:h,z:o,w:e.w,h:.028,d:.045},{x:c,y:h+e.h-.028,z:o,w:e.w,h:.028,d:.045},{x:c,y:h+.028,z:o,w:.028,h:Math.max(.02,e.h-2*.028),d:.045},{x:c+e.w-.028,y:h+.028,z:o,w:.028,h:Math.max(.02,e.h-2*.028),d:.045})}else{const o=i?n.x+(n.w-.045)/2:t==="px"?n.x+n.w-.01575:n.x-.029249999999999998,c=n.z+e.x,h=n.y+e.y;a.push({x:o,y:h,z:c,w:.045,h:.028,d:e.w},{x:o,y:h+e.h-.028,z:c,w:.045,h:.028,d:e.w},{x:o,y:h+.028,z:c,w:.045,h:Math.max(.02,e.h-2*.028),d:.028},{x:o,y:h+.028,z:c+e.w-.028,w:.045,h:Math.max(.02,e.h-2*.028),d:.028})}return a.map(o=>yi(o,1,1))}function km(n,t,e,i,s){if(t.face==="pz"&&t.kind==="cruciform")return{x:n.x+e.x,y:n.y+e.y,z:n.z-s,w:e.w,h:e.h,d:s};if(t.face==="pz"&&t.id==="court-glass"){const a=Math.min(i.court.d*.55,4.5);return{x:n.x+e.x,y:n.y+e.y,z:n.z-a,w:e.w,h:e.h,d:a}}if(t.purpose!=="procession")return null;const r=2.4*i.params.scale;return t.face==="px"?{x:n.x+n.w,y:n.y+e.y,z:n.z+e.x,w:r,h:e.h,d:e.w}:t.face==="nx"?{x:n.x-r,y:n.y+e.y,z:n.z+e.x,w:r,h:e.h,d:e.w}:null}function Gm(n,t,e){const i=Math.abs(n.y0-n.y1),s=Math.max(2,Math.round(i/t.unit)),r=i/s,a=Math.abs(n.z1-n.z0)/s,o=Math.max(n.z0,n.z1);for(let c=0;c<s;c++)e.push(yi({x:n.bounds.x,y:c*r,z:o-(c+1)*a+.01,w:n.bounds.w,h:r,d:Math.max(.04,a-.012)},t.panel.w,t.panel.h))}function Vm(n,t,e){const i=n.z1-n.z0,s=n.y0-n.y1,r=Math.max(.2,Math.hypot(i,s)-.04),a=Math.atan2(Math.abs(s),Math.abs(i)),o=.16,c=new Pn(n.width,o,r);return c.translate(0,-o/2,0),c.rotateX(i*s>=0?a:-a),c.translate((n.x0+n.x1)/2,(n.y0+n.y1)/2,(n.z0+n.z1)/2),wa(c,t,e),c}function yi(n,t,e){const i=new Pn(n.w,n.h,n.d);return i.translate(n.x+n.w/2,n.y+n.h/2,n.z+n.d/2),wa(i,t,e),i}function Wm(n,t,e){const i=Math.min(n.w,n.d)/2,s=new Ea(i,i,n.h,36);return s.translate(n.x+n.w/2,n.y+n.h/2,n.z+n.d/2),wa(s,t,e),s}function wa(n,t,e){const i=n.attributes.position,s=n.attributes.normal,r=n.attributes.uv;if(!(!i||!s||!r)){for(let a=0;a<i.count;a++){const o=i.getX(a),c=i.getY(a),h=i.getZ(a),d=Math.abs(s.getX(a)),f=Math.abs(s.getY(a)),p=Math.abs(s.getZ(a));let m,_;f>=d&&f>=p?(m=o/t,_=h/e):d>=p?(m=h/t,_=c/e):(m=o/t,_=c/e),r.setXY(a,m,_)}r.needsUpdate=!0}}function ms(n,t,e,i){if(!t.length)return;const s=Um(t,!1);for(const a of t)a.dispose();if(!s)return;const r=new Yt(s,e);r.castShadow=i,r.receiveShadow=!0,n.add(r)}const ca=[[.25,1/6],[.75,1/6],[.25,.5],[.75,.5],[.25,5/6],[.75,5/6]];function Xm(){const e=document.createElement("canvas"),i=document.createElement("canvas"),s=document.createElement("canvas");e.width=i.width=s.width=1024,e.height=i.height=s.height=512;const r=e.getContext("2d"),a=i.getContext("2d"),o=s.getContext("2d");r.fillStyle="#b1ada6",r.fillRect(0,0,1024,512);const c=r.getImageData(0,0,1024,512),h=ua(1592594996);for(let p=0;p<c.data.length;p+=4){const m=(h.next()-.5)*18;c.data[p]=qe(c.data[p]+m),c.data[p+1]=qe(c.data[p+1]+m),c.data[p+2]=qe(c.data[p+2]+m*.85)}for(let p=0;p<512;p++){const m=Math.sin(p*.37)*4+Math.sin(p*1.7)*2;for(let _=0;_<1024;_++){const g=(p*1024+_)*4;c.data[g]=qe(c.data[g]+m),c.data[g+1]=qe(c.data[g+1]+m),c.data[g+2]=qe(c.data[g+2]+m*.9)}}r.putImageData(c,0,0),r.strokeStyle="rgba(78, 74, 68, 0.85)",r.lineWidth=3,r.strokeRect(1.5,1.5,1021,509),r.strokeStyle="rgba(90, 86, 80, 0.45)",r.lineWidth=1,r.beginPath(),r.moveTo(0,512*.5),r.lineTo(1024,512*.5),r.stroke();for(const[p,m]of ca){const _=p*1024,g=(1-m)*512,l=1024*.034,u=r.createRadialGradient(_,g,l*.15,_,g,l);u.addColorStop(0,"rgba(48, 45, 42, 0.72)"),u.addColorStop(.45,"rgba(92, 88, 82, 0.4)"),u.addColorStop(.72,"rgba(186, 182, 174, 0.35)"),u.addColorStop(1,"rgba(0, 0, 0, 0)"),r.fillStyle=u,r.beginPath(),r.arc(_,g,l,0,Math.PI*2),r.fill()}const d=a.createImageData(1024,512),f=o.createImageData(1024,512);for(let p=0;p<512;p++)for(let m=0;m<1024;m++){let _=0,g=0,l=1;const u=Math.min(m,1023-m),b=Math.min(p,511-p);u<5&&(_+=(m<1024/2?1:-1)*(1-u/5)*.85),b<5&&(g+=(p<512/2?-1:1)*(1-b/5)*.85);for(const[w,P]of ca){const y=w*1024,M=(1-P)*512,R=1024*.034,H=(m-y)/R,F=(p-M)/R,V=Math.hypot(H,F);if(V<1){const X=(1-V)*.95;_+=-H/(V||1)*X,g+=-F/(V||1)*X}}const E=Math.sin(p*.55)*.08;g+=E;const S=Math.hypot(_,g,l)||1;_/=S,g/=S,l/=S;const D=(p*1024+m)*4;d.data[D]=qe((_*.5+.5)*255),d.data[D+1]=qe((g*.5+.5)*255),d.data[D+2]=qe((l*.5+.5)*255),d.data[D+3]=255;const A=196+Ym(u,b)-qm(m,p,1024,512);f.data[D]=f.data[D+1]=f.data[D+2]=qe(A),f.data[D+3]=255}return a.putImageData(d,0,0),o.putImageData(f,0,0),{color:xr(e,!0),normal:xr(i,!1),roughness:xr(s,!1)}}function Ym(n,t){return n<4||t<4?28:0}function qm(n,t,e,i){let s=0;for(const[r,a]of ca){const o=n-r*e,c=t-(1-a)*i,h=Math.hypot(o,c)/(e*.034);h<1&&(s=Math.max(s,(1-h)*40))}return s}function xr(n,t){const e=new Ic(n);return e.wrapS=Wn,e.wrapT=Wn,e.anisotropy=8,t&&(e.colorSpace=Ee),e}function qe(n){return Math.max(0,Math.min(255,Math.round(n)))}function $m(n,t){const e=t.capabilities.getMaxAnisotropy();for(const i of[n.color,n.normal,n.roughness])i.anisotropy=Math.min(8,e)}function jm(n){const t=new Cn({map:n.color,normalMap:n.normal,roughnessMap:n.roughness,color:new zt("#c4c0b8"),roughness:.92,metalness:0});return t.normalScale.set(.65,.65),t}function vr(n){const t=(n==null?void 0:n.seed)??2,e=(n==null?void 0:n.repeat)??12,i=512,s=document.createElement("canvas");s.width=i,s.height=i;const r=s.getContext("2d");r.fillStyle="#8c877f",r.fillRect(0,0,i,i);const a=ua(t);for(let c=0;c<2400;c++){const h=a.next()*i,d=a.next()*i,f=.6+a.next()*2.4,p=90+a.next()*70;r.fillStyle=`rgba(${p}, ${p-4}, ${p-10}, 0.55)`,r.beginPath(),r.arc(h,d,f,0,Math.PI*2),r.fill()}const o=new Ic(s);return o.wrapS=Wn,o.wrapT=Wn,o.colorSpace=Ee,o.repeat.set(e,e),new Cn({map:o,color:(n==null?void 0:n.color)??"#a39e96",roughness:1,metalness:0})}function Zm(){return new Cn({color:"#6d7564",roughness:1,metalness:0})}function Km(){return new Cn({color:"#232527",metalness:.86,roughness:.34})}function Jm(){return new Nc({color:"#eef3f4",metalness:0,roughness:.03,transparent:!0,opacity:.14,envMapIntensity:.8,depthWrite:!1,side:Ie})}function Qm(){return new Nc({color:"#6f868c",metalness:.04,roughness:.08,transparent:!0,opacity:.72,envMapIntensity:1,side:Ie})}function t_(){return new Cn({color:"#8ea3a6",metalness:.42,roughness:.16,envMapIntensity:.9})}function e_(n){const t=Math.min(18,Math.max(6,n)),e=(t-12)/12*Math.PI,i=(t-6)/12,s=(8+Math.sin(i*Math.PI)*58)*Math.PI/180,r=Math.cos(s),a=Math.sin(i*Math.PI),o=1-a,c=1,h=.78+a*.18,d=.62+a*.28;return{x:-Math.sin(e)*r,y:Math.sin(s),z:Math.cos(e)*r,intensity:1.4+a*5.2,color:n_(c,h*(1-o*.05),d*(1-o*.15)),elevation:s,azimuth:e}}function n_(n,t,e){const i=s=>Math.max(0,Math.min(255,Math.round(s*255)));return(i(n)<<16)+(i(t)<<8)+i(e)}class Ns extends Yt{constructor(t,e={}){super(t),this.isReflector=!0,this.type="Reflector",this.camera=new Re;const i=this,s=e.color!==void 0?new zt(e.color):new zt(8355711),r=e.textureWidth||512,a=e.textureHeight||512,o=e.clipBias||0,c=e.shader||Ns.ReflectorShader,h=e.multisample!==void 0?e.multisample:4,d=new hn,f=new U,p=new U,m=new U,_=new ae,g=new U(0,0,-1),l=new Zt,u=new U,b=new U,E=new Zt,S=new ae,D=this.camera,A=new Rn(r,a,{samples:h,type:Ei}),w=new Qe({name:c.name!==void 0?c.name:"unspecified",uniforms:Ec.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});w.uniforms.tDiffuse.value=A.texture,w.uniforms.color.value=s,w.uniforms.textureMatrix.value=S,this.material=w,this.onBeforeRender=function(P,y,M){if(p.setFromMatrixPosition(i.matrixWorld),m.setFromMatrixPosition(M.matrixWorld),_.extractRotation(i.matrixWorld),f.set(0,0,1),f.applyMatrix4(_),u.subVectors(p,m),u.dot(f)>0)return;u.reflect(f).negate(),u.add(p),_.extractRotation(M.matrixWorld),g.set(0,0,-1),g.applyMatrix4(_),g.add(m),b.subVectors(p,g),b.reflect(f).negate(),b.add(p),D.position.copy(u),D.up.set(0,1,0),D.up.applyMatrix4(_),D.up.reflect(f),D.lookAt(b),D.far=M.far,D.updateMatrixWorld(),D.projectionMatrix.copy(M.projectionMatrix),S.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),S.multiply(D.projectionMatrix),S.multiply(D.matrixWorldInverse),S.multiply(i.matrixWorld),d.setFromNormalAndCoplanarPoint(f,p),d.applyMatrix4(D.matrixWorldInverse),l.set(d.normal.x,d.normal.y,d.normal.z,d.constant);const R=D.projectionMatrix;E.x=(Math.sign(l.x)+R.elements[8])/R.elements[0],E.y=(Math.sign(l.y)+R.elements[9])/R.elements[5],E.z=-1,E.w=(1+R.elements[10])/R.elements[14],l.multiplyScalar(2/l.dot(E)),R.elements[2]=l.x,R.elements[6]=l.y,R.elements[10]=l.z+1-o,R.elements[14]=l.w,i.visible=!1;const H=P.getRenderTarget(),F=P.xr.enabled,V=P.shadowMap.autoUpdate;P.xr.enabled=!1,P.shadowMap.autoUpdate=!1,P.setRenderTarget(A),P.state.buffers.depth.setMask(!0),P.autoClear===!1&&P.clear(),P.render(y,D),P.xr.enabled=F,P.shadowMap.autoUpdate=V,P.setRenderTarget(H);const X=M.viewport;X!==void 0&&P.state.viewport(X),i.visible=!0},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),i.material.dispose()}}}Ns.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function i_(n,t,e){const i=[];if(!n.waters.length)return{objects:i,dispose:()=>{}};const s=[...n.waters].sort((r,a)=>a.w*a.d-r.w*r.d)[0];for(const r of n.waters)r===s?i.push(s_(r,e)):i.push(r_(r,t));return{objects:i,dispose:()=>{for(const r of i){r.geometry.dispose();const a=r;typeof a.dispose=="function"&&r!==i.find(o=>o.material===t)&&a.dispose()}}}}function s_(n,t){const e=n.shape==="circle"?new Us(n.w/2,48):new Ke(n.w,n.d),i=Math.min(t.getPixelRatio(),1.5),s=new Ns(e,{clipBias:.003,textureWidth:Math.min(1024,Math.floor(t.domElement.width*i)||768),textureHeight:Math.min(1024,Math.floor(t.domElement.height*i)||768),color:12964564});return s.rotation.x=-Math.PI/2,s.position.set(n.x+n.w/2,n.y,n.z+n.d/2),s.receiveShadow=!0,s.name=n.id,s}function r_(n,t){const e=n.shape==="circle"?new Us(n.w/2,40):new Ke(n.w,n.d),i=new Yt(e,t);return i.rotation.x=-Math.PI/2,i.position.set(n.x+n.w/2,n.y,n.z+n.d/2),i.receiveShadow=!0,i.name=n.id,i}class a_{constructor(t){ie(this,"renderer");ie(this,"scene",new Uc);ie(this,"camera");ie(this,"controls");ie(this,"sun",new mm(16773853,4));ie(this,"hemi",new um(12965088,9077112,.28));ie(this,"ambient",new _m(16774894,.08));ie(this,"built",null);ie(this,"water",null);ie(this,"focus",new U);ie(this,"radius",24);ie(this,"hour",9.5);ie(this,"seed","");ie(this,"frames",0);ie(this,"running",!0);ie(this,"concrete");ie(this,"glassClear");ie(this,"glassDark");ie(this,"steel");ie(this,"gravel");ie(this,"groundMat");ie(this,"court");ie(this,"grass");ie(this,"basin");ie(this,"onResize",()=>{const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/Math.max(1,e),this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)});this.renderer=new hm({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(15128006,1),this.renderer.outputColorSpace=Ee,this.renderer.toneMapping=tc,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Jo,this.camera=new Re(36,window.innerWidth/window.innerHeight,.15,800),this.controls=new vm(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=Math.PI*.49,this.controls.minDistance=4,this.controls.maxDistance=90,this.controls.target.set(0,2,0);const e=Xm();$m(e,this.renderer),this.concrete=jm(e),this.glassClear=Jm(),this.glassDark=Qm(),this.steel=Km(),this.gravel=vr({seed:3,repeat:6,color:"#b7b2aa"}),this.groundMat=vr({seed:2,repeat:22,color:"#8a857e"}),this.court=vr({seed:5,repeat:3,color:"#9a958e"}),this.grass=Zm(),this.basin=t_();const i=new aa(this.renderer);this.scene.environment=i.fromScene(new Lm,.04).texture,i.dispose(),this.scene.fog=new ya(15128006,70,230),this.scene.add(this.makeSky()),this.hemi.position.set(0,20,0),this.scene.add(this.hemi,this.ambient),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-18e-5,this.sun.shadow.normalBias=.02,this.sun.shadow.radius=2.5,this.scene.add(this.sun,this.sun.target),window.addEventListener("resize",this.onResize),this.renderer.setAnimationLoop(()=>this.tick())}show(t,e){var i,s,r;this.hour=e,this.seed=t.seed,this.frames=0,window.__ANDO__={ready:!1,seed:t.seed},(i=this.built)==null||i.dispose(),(s=this.water)==null||s.dispose(),this.built&&this.scene.remove(this.built.content);for(const a of((r=this.water)==null?void 0:r.objects)??[])this.scene.remove(a);this.built=Im(t,{concrete:this.concrete,glassClear:this.glassClear,glassDark:this.glassDark,steel:this.steel,gravel:this.gravel,court:this.court,grass:this.grass,ground:this.groundMat}),this.scene.add(this.built.content),this.water=i_(t,this.basin,this.renderer);for(const a of this.water.objects)this.scene.add(a);this.frame(t),this.updateSun()}setSunHour(t){this.hour=t,this.updateSun()}frame(t){let e=1/0,i=1/0,s=-1/0,r=1,a=-1/0;for(const f of t.solids)e=Math.min(e,f.x),i=Math.min(i,f.z),s=Math.max(s,f.x+f.w),r=Math.max(r,f.y+f.h),a=Math.max(a,f.z+f.d);for(const f of t.waters)e=Math.min(e,f.x),i=Math.min(i,f.z),s=Math.max(s,f.x+f.w),a=Math.max(a,f.z+f.d);const o=new U((e+s)/2,r*.34,(i+a)/2),c=Math.max(s-e,a-i,r*1.4);this.focus.copy(o),this.radius=c*.78;const h=t.entrySide==="east"?1:-1,d=c*1.05;this.camera.position.set(o.x+d*.92*h,Math.max(7.5,r*.72+c*.22),o.z+d*.88),this.controls.target.set(o.x,r*.28,o.z-c*.04),this.controls.update()}updateSun(){const t=e_(this.hour),e=new U(t.x,t.y,t.z).normalize(),i=this.radius*2.6;this.sun.position.copy(this.focus).add(e.multiplyScalar(i)),this.sun.target.position.copy(this.focus),this.sun.intensity=t.intensity,this.sun.color.setHex(t.color),this.sun.shadow.camera.left=-this.radius,this.sun.shadow.camera.right=this.radius,this.sun.shadow.camera.top=this.radius,this.sun.shadow.camera.bottom=-this.radius,this.sun.shadow.camera.near=.5,this.sun.shadow.camera.far=i+this.radius*2.2,this.sun.shadow.camera.updateProjectionMatrix(),this.updateShafts(t.x,t.y,t.z)}updateShafts(t,e,i){var c;const s=Math.hypot(t,i)||1,r=Math.max(0,i/s),a=Math.min(1,Math.max(0,e)*1.7),o=r*r*a;for(const h of((c=this.built)==null?void 0:c.shafts)??[]){const d=typeof h.userData.gain=="number"?h.userData.gain:.08;h.opacity=o*d}}tick(){this.running&&(this.controls.update(),this.renderer.render(this.scene,this.camera),this.seed&&this.frames===3&&(window.__ANDO__={ready:!0,seed:this.seed}),this.frames+=1)}makeSky(){const t=new Qe({side:Me,depthWrite:!1,uniforms:{},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vDir;
        void main() {
          float h = normalize(vDir).y;
          vec3 zenith = vec3(0.545, 0.655, 0.760);
          vec3 horizon = vec3(0.902, 0.835, 0.776);
          vec3 below = vec3(0.735, 0.700, 0.655);
          vec3 col = mix(horizon, zenith, smoothstep(0.0, 0.62, h));
          col = mix(below, col, smoothstep(-0.28, 0.06, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `}),e=new Yt(new Ta(420,32,20),t);return e.frustumCulled=!1,e.renderOrder=-1,e}}const jo=["light","court","wall","axis","still","chapel","shadow","slit","water","nave"];function o_(n){const t=document.createElement("aside");t.id="panel",t.innerHTML=`
    <header>
      <p class="eyebrow">Procedural study</p>
      <h1>Light, concrete, water</h1>
    </header>
    <label class="seed">
      <span>Seed</span>
      <input id="seed" type="text" spellcheck="false" autocomplete="off" />
    </label>
    <div class="actions">
      <button id="regen" type="button">Regenerate</button>
    </div>
    ${_s("scale","Scale",pe.scale)}
    ${_s("volumes","Volumes",pe.volumes)}
    ${_s("water","Water",pe.water)}
    ${_s("sun","Sun",pe.sun)}
    <p id="summary"></p>
  `,document.body.append(t);const e=t.querySelector("#seed"),i=t.querySelector("#summary"),s=t.querySelector("#scale"),r=t.querySelector("#volumes"),a=t.querySelector("#water"),o=t.querySelector("#sun"),c=t.querySelector("#scale-out"),h=t.querySelector("#volumes-out"),d=t.querySelector("#water-out"),f=t.querySelector("#sun-out");e.value=n.initial.seed,s.value=String(n.initial.scale),r.value=String(n.initial.volumes),a.value=String(n.initial.water),o.value=String(n.sunHour),_();const p=()=>ha({seed:e.value,scale:Number(s.value),volumes:Number(r.value),water:Number(a.value)}),m=()=>{_(),n.onParams(p())};e.addEventListener("change",m),e.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),m())});for(const g of[s,r,a])g.addEventListener("input",m);o.addEventListener("input",()=>{_(),n.onSun(Number(o.value))}),t.querySelector("#regen").addEventListener("click",()=>{e.value=Zo(),m()}),window.addEventListener("keydown",g=>{g.key.toLowerCase()==="r"&&document.activeElement!==e&&(e.value=Zo(),m())});function _(){c.textContent=Number(s.value).toFixed(2),h.textContent=String(Math.round(Number(r.value))),d.textContent=String(Math.round(Number(a.value))),f.textContent=c_(Number(o.value))}return{getSunHour:()=>Number(o.value),setSummary(g){i.textContent=g},setSeed(g){e.value=g}}}function _s(n,t,e){return`
    <label class="slider">
      <span class="slider-label"><span>${t}</span><span id="${n}-out"></span></span>
      <input id="${n}" type="range" min="${e.min}" max="${e.max}" step="${e.step}" />
    </label>
  `}function c_(n){const t=Math.floor(n),e=Math.round((n-t)*60),i=e===60?0:e;return`${e===60?t+1:t}:${i.toString().padStart(2,"0")}`}function Zo(){const n=jo[Math.floor(Math.random()*jo.length)],t=Math.floor(1e3+Math.random()*9e3);return`${n}-${t}`}const Aa=document.querySelector("#app");if(!Aa)throw new Error("missing #app");const Ra=document.createElement("canvas");Ra.id="view";Aa.append(Ra);new URLSearchParams(window.location.search).get("bare")==="1"&&document.documentElement.classList.add("bare");const Ca=Jc(window.location.search),zc=Qc(window.location.search);let Pa;try{Pa=new a_(Ra)}catch(n){const t=n instanceof Error?n.message:"WebGL failed to start";throw Aa.replaceChildren(Object.assign(document.createElement("p"),{className:"boot-error",textContent:t})),n}let Bc=Ca;const la=o_({initial:Ca,sunHour:zc,onParams:n=>Hc(n,la.getSunHour()),onSun:n=>{Pa.setSunHour(n),kc(Bc,n)}});Hc(Ca,zc);function Hc(n,t,e){Bc=n;const i=hl(n);Pa.show(i,t),la.setSummary(i.summary),la.setSeed(i.seed),kc(n,t)}function kc(n,t){const e=tl(n,t);e!==window.location.search&&window.history.replaceState(null,"",e)}

import{a,t as Fe,q as S,R as G}from"./chunk-JZWAC4HX-BunqcFdX.js";import{h as ce,f as ee,e as te,i as x,n as j,j as ue,k as V,m as ne,_ as Ue,z as H,v as Ae,C as Me}from"./Toolbar-U7vFHVAX.js";const Ke=typeof window<"u"?a.useLayoutEffect:a.useEffect;let me=0;function _e(e){const[t,n]=a.useState(e),o=e||t;return a.useEffect(()=>{t==null&&(me+=1,n(`mui-${me}`))},[t]),o}const We={...Fe},ge=We.useId;function zt(e){if(ge!==void 0){const t=ge();return e??t}return _e(e)}function Ye(e){return ce("MuiSvgIcon",e)}ee("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Xe=e=>{const{color:t,fontSize:n,classes:o}=e,r={root:["root",t!=="inherit"&&`color${j(t)}`,`fontSize${j(n)}`]};return ue(r,Ye,o)},Ge=V("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${j(n.color)}`],t[`fontSize${j(n.fontSize)}`]]}})(ne(({theme:e})=>({userSelect:"none",width:"1em",height:"1em",display:"inline-block",flexShrink:0,transition:e.transitions?.create?.("fill",{duration:(e.vars??e).transitions?.duration?.shorter}),variants:[{props:t=>!t.hasSvgAsChild,style:{fill:"currentColor"}},{props:{fontSize:"inherit"},style:{fontSize:"inherit"}},{props:{fontSize:"small"},style:{fontSize:e.typography?.pxToRem?.(20)||"1.25rem"}},{props:{fontSize:"medium"},style:{fontSize:e.typography?.pxToRem?.(24)||"1.5rem"}},{props:{fontSize:"large"},style:{fontSize:e.typography?.pxToRem?.(35)||"2.1875rem"}},...Object.entries((e.vars??e).palette).filter(([,t])=>t&&t.main).map(([t])=>({props:{color:t},style:{color:(e.vars??e).palette?.[t]?.main}})),{props:{color:"action"},style:{color:(e.vars??e).palette?.action?.active}},{props:{color:"disabled"},style:{color:(e.vars??e).palette?.action?.disabled}},{props:{color:"inherit"},style:{color:void 0}}]}))),oe=a.forwardRef(function(t,n){const o=te({props:t,name:"MuiSvgIcon"}),{children:r,className:s,color:i="inherit",component:u="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:f=!1,titleAccess:d,viewBox:g="0 0 24 24",...M}=o,h=a.isValidElement(r)&&r.type==="svg",v={...o,color:i,component:u,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:f,viewBox:g,hasSvgAsChild:h},b={};f||(b.viewBox=g);const C=Xe(v);return S.jsxs(Ge,{as:u,className:x(C.root,s),focusable:"false",color:p,"aria-hidden":d?void 0:!0,role:d?"img":void 0,ref:n,...b,...M,...h&&r.props,ownerState:v,children:[h?r.props.children:r,d?S.jsx("title",{children:d}):null]})});oe.muiName="SvgIcon";function Dt(e,t){function n(o,r){return S.jsx(oe,{"data-testid":void 0,ref:r,...o,children:e})}return n.muiName=oe.muiName,a.memo(a.forwardRef(n))}function Z(e){const t=a.useRef(e);return Ke(()=>{t.current=e}),a.useRef((...n)=>(0,t.current)(...n)).current}function ye(...e){const t=a.useRef(void 0),n=a.useCallback(o=>{const r=e.map(s=>{if(s==null)return null;if(typeof s=="function"){const i=s,u=i(o);return typeof u=="function"?u:()=>{i(null)}}return s.current=o,()=>{s.current=null}});return()=>{r.forEach(s=>s?.())}},e);return a.useMemo(()=>e.every(o=>o==null)?null:o=>{t.current&&(t.current(),t.current=void 0),o!=null&&(t.current=n(o))},e)}function He(e,t){if(e==null)return{};var n={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.indexOf(o)!==-1)continue;n[o]=e[o]}return n}function se(e,t){return se=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},se(e,t)}function Je(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,se(e,t)}const be=G.createContext(null);function qe(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function pe(e,t){var n=function(s){return t&&a.isValidElement(s)?t(s):s},o=Object.create(null);return e&&a.Children.map(e,function(r){return r}).forEach(function(r){o[r.key]=n(r)}),o}function Ze(e,t){e=e||{},t=t||{};function n(f){return f in t?t[f]:e[f]}var o=Object.create(null),r=[];for(var s in e)s in t?r.length&&(o[s]=r,r=[]):r.push(s);var i,u={};for(var c in t){if(o[c])for(i=0;i<o[c].length;i++){var p=o[c][i];u[o[c][i]]=n(p)}u[c]=n(c)}for(i=0;i<r.length;i++)u[r[i]]=n(r[i]);return u}function U(e,t,n){return n[t]!=null?n[t]:e.props[t]}function Qe(e,t){return pe(e.children,function(n){return a.cloneElement(n,{onExited:t.bind(null,n),in:!0,appear:U(n,"appear",e),enter:U(n,"enter",e),exit:U(n,"exit",e)})})}function et(e,t,n){var o=pe(e.children),r=Ze(t,o);return Object.keys(r).forEach(function(s){var i=r[s];if(a.isValidElement(i)){var u=s in t,c=s in o,p=t[s],f=a.isValidElement(p)&&!p.props.in;c&&(!u||f)?r[s]=a.cloneElement(i,{onExited:n.bind(null,i),in:!0,exit:U(i,"exit",e),enter:U(i,"enter",e)}):!c&&u&&!f?r[s]=a.cloneElement(i,{in:!1}):c&&u&&a.isValidElement(p)&&(r[s]=a.cloneElement(i,{onExited:n.bind(null,i),in:p.props.in,exit:U(i,"exit",e),enter:U(i,"enter",e)}))}}),r}var tt=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},nt={component:"div",childFactory:function(t){return t}},fe=(function(e){Je(t,e);function t(o,r){var s;s=e.call(this,o,r)||this;var i=s.handleExited.bind(qe(s));return s.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},s}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(r,s){var i=s.children,u=s.handleExited,c=s.firstRender;return{children:c?Qe(r,u):et(r,i,u),firstRender:!1}},n.handleExited=function(r,s){var i=pe(this.props.children);r.key in i||(r.props.onExited&&r.props.onExited(s),this.mounted&&this.setState(function(u){var c=Ue({},u.children);return delete c[r.key],{children:c}}))},n.render=function(){var r=this.props,s=r.component,i=r.childFactory,u=He(r,["component","childFactory"]),c=this.state.contextValue,p=tt(this.state.children).map(i);return delete u.appear,delete u.enter,delete u.exit,s===null?G.createElement(be.Provider,{value:c},p):G.createElement(be.Provider,{value:c},G.createElement(s,u,p))},t})(G.Component);fe.propTypes={};fe.defaultProps=nt;const ve={};function xe(e,t){const n=a.useRef(ve);return n.current===ve&&(n.current=e(t)),n}const rt=[];function ot(e){a.useEffect(e,rt)}class de{static create(){return new de}currentId=null;start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear}function st(){const e=xe(de.create).current;return ot(e.disposeEffect),e}function Se(e){try{return e.matches(":focus-visible")}catch{}return!1}class Q{static create(){return new Q}static use(){const t=xe(Q.create).current,[n,o]=a.useState(!1);return t.shouldMount=n,t.setShouldMount=o,a.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=at(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...t){this.mount().then(()=>this.ref.current?.start(...t))}stop(...t){this.mount().then(()=>this.ref.current?.stop(...t))}pulsate(...t){this.mount().then(()=>this.ref.current?.pulsate(...t))}}function it(){return Q.use()}function at(){let e,t;const n=new Promise((o,r)=>{e=o,t=r});return n.resolve=e,n.reject=t,n}function lt(e){const{className:t,classes:n,pulsate:o=!1,rippleX:r,rippleY:s,rippleSize:i,in:u,onExited:c,timeout:p}=e,[f,d]=a.useState(!1),g=x(t,n.ripple,n.rippleVisible,o&&n.ripplePulsate),M={width:i,height:i,top:-(i/2)+s,left:-(i/2)+r},h=x(n.child,f&&n.childLeaving,o&&n.childPulsate);return!u&&!f&&d(!0),a.useEffect(()=>{if(!u&&c!=null){const v=setTimeout(c,p);return()=>{clearTimeout(v)}}},[c,u,p]),S.jsx("span",{className:g,style:M,children:S.jsx("span",{className:h})})}const R=ee("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),ie=550,ct=80,ut=H`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,pt=H`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,ft=H`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,dt=V("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ht=V(lt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${R.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${ut};
    animation-duration: ${ie}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${R.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${R.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${R.childLeaving} {
    opacity: 0;
    animation-name: ${pt};
    animation-duration: ${ie}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${R.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${ft};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,mt=a.forwardRef(function(t,n){const o=te({props:t,name:"MuiTouchRipple"}),{center:r=!1,classes:s={},className:i,...u}=o,[c,p]=a.useState([]),f=a.useRef(0),d=a.useRef(null);a.useEffect(()=>{d.current&&(d.current(),d.current=null)},[c]);const g=a.useRef(!1),M=st(),h=a.useRef(null),v=a.useRef(null),b=a.useCallback(m=>{const{pulsate:P,rippleX:E,rippleY:A,rippleSize:L,cb:_}=m;p(I=>[...I,S.jsx(ht,{classes:{ripple:x(s.ripple,R.ripple),rippleVisible:x(s.rippleVisible,R.rippleVisible),ripplePulsate:x(s.ripplePulsate,R.ripplePulsate),child:x(s.child,R.child),childLeaving:x(s.childLeaving,R.childLeaving),childPulsate:x(s.childPulsate,R.childPulsate)},timeout:ie,pulsate:P,rippleX:E,rippleY:A,rippleSize:L},f.current)]),f.current+=1,d.current=_},[s]),C=a.useCallback((m={},P={},E=()=>{})=>{const{pulsate:A=!1,center:L=r||P.pulsate,fakeElement:_=!1}=P;if(m?.type==="mousedown"&&g.current){g.current=!1;return}m?.type==="touchstart"&&(g.current=!0);const I=_?null:v.current,N=I?I.getBoundingClientRect():{width:0,height:0,left:0,top:0};let z,w,D;if(L||m===void 0||m.clientX===0&&m.clientY===0||!m.clientX&&!m.touches)z=Math.round(N.width/2),w=Math.round(N.height/2);else{const{clientX:W,clientY:O}=m.touches&&m.touches.length>0?m.touches[0]:m;z=Math.round(W-N.left),w=Math.round(O-N.top)}if(L)D=Math.sqrt((2*N.width**2+N.height**2)/3),D%2===0&&(D+=1);else{const W=Math.max(Math.abs((I?I.clientWidth:0)-z),z)*2+2,O=Math.max(Math.abs((I?I.clientHeight:0)-w),w)*2+2;D=Math.sqrt(W**2+O**2)}m?.touches?h.current===null&&(h.current=()=>{b({pulsate:A,rippleX:z,rippleY:w,rippleSize:D,cb:E})},M.start(ct,()=>{h.current&&(h.current(),h.current=null)})):b({pulsate:A,rippleX:z,rippleY:w,rippleSize:D,cb:E})},[r,b,M]),B=a.useCallback(()=>{C({},{pulsate:!0})},[C]),T=a.useCallback((m,P)=>{if(M.clear(),m?.type==="touchend"&&h.current){h.current(),h.current=null,M.start(0,()=>{T(m,P)});return}h.current=null,p(E=>E.length>0?E.slice(1):E),d.current=P},[M]);return a.useImperativeHandle(n,()=>({pulsate:B,start:C,stop:T}),[B,C,T]),S.jsx(dt,{className:x(R.root,s.root,i),ref:v,...u,children:S.jsx(fe,{component:null,exit:!0,children:c})})});function gt(e){return ce("MuiButtonBase",e)}const yt=ee("MuiButtonBase",["root","disabled","focusVisible"]),bt=e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:o,classes:r}=e,i=ue({root:["root",t&&"disabled",n&&"focusVisible"]},gt,r);return n&&o&&(i.root+=` ${o}`),i},vt=V("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${yt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),jt=a.forwardRef(function(t,n){const o=te({props:t,name:"MuiButtonBase"}),{action:r,centerRipple:s=!1,children:i,className:u,component:c="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:d=!1,focusRipple:g=!1,focusVisibleClassName:M,LinkComponent:h="a",onBlur:v,onClick:b,onContextMenu:C,onDragLeave:B,onFocus:T,onFocusVisible:m,onKeyDown:P,onKeyUp:E,onMouseDown:A,onMouseLeave:L,onMouseUp:_,onTouchEnd:I,onTouchMove:N,onTouchStart:z,tabIndex:w=0,TouchRippleProps:D,touchRippleRef:W,type:O,...K}=o,Y=a.useRef(null),y=it(),Ce=ye(y.ref,W),[F,J]=a.useState(!1);p&&F&&J(!1),a.useImperativeHandle(r,()=>({focusVisible:()=>{J(!0),Y.current.focus()}}),[]);const Ee=y.shouldMount&&!f&&!p;a.useEffect(()=>{F&&g&&!f&&y.pulsate()},[f,g,F,y]);const ke=$(y,"start",A,d),Pe=$(y,"stop",C,d),Ie=$(y,"stop",B,d),Te=$(y,"stop",_,d),we=$(y,"stop",l=>{F&&l.preventDefault(),L&&L(l)},d),$e=$(y,"start",z,d),Ne=$(y,"stop",I,d),ze=$(y,"stop",N,d),De=$(y,"stop",l=>{Se(l.target)||J(!1),v&&v(l)},!1),je=Z(l=>{Y.current||(Y.current=l.currentTarget),Se(l.target)&&(J(!0),m&&m(l)),T&&T(l)}),re=()=>{const l=Y.current;return c&&c!=="button"&&!(l.tagName==="A"&&l.href)},Ve=Z(l=>{g&&!l.repeat&&F&&l.key===" "&&y.stop(l,()=>{y.start(l)}),l.target===l.currentTarget&&re()&&l.key===" "&&l.preventDefault(),P&&P(l),l.target===l.currentTarget&&re()&&l.key==="Enter"&&!p&&(l.preventDefault(),b&&b(l))}),Be=Z(l=>{g&&l.key===" "&&F&&!l.defaultPrevented&&y.stop(l,()=>{y.pulsate(l)}),E&&E(l),b&&l.target===l.currentTarget&&re()&&l.key===" "&&!l.defaultPrevented&&b(l)});let q=c;q==="button"&&(K.href||K.to)&&(q=h);const X={};if(q==="button"){const l=!!K.formAction;X.type=O===void 0&&!l?"button":O,X.disabled=p}else!K.href&&!K.to&&(X.role="button"),p&&(X["aria-disabled"]=p);const Le=ye(n,Y),he={...o,centerRipple:s,component:c,disabled:p,disableRipple:f,disableTouchRipple:d,focusRipple:g,tabIndex:w,focusVisible:F},Oe=bt(he);return S.jsxs(vt,{as:q,className:x(Oe.root,u),ownerState:he,onBlur:De,onClick:b,onContextMenu:Pe,onFocus:je,onKeyDown:Ve,onKeyUp:Be,onMouseDown:ke,onMouseLeave:we,onMouseUp:Te,onDragLeave:Ie,onTouchEnd:Ne,onTouchMove:ze,onTouchStart:$e,ref:Le,tabIndex:p?-1:w,type:O,...X,...K,children:[i,Ee?S.jsx(mt,{ref:Ce,center:s,...D}):null]})});function $(e,t,n,o=!1){return Z(r=>(n&&n(r),o||e[t](r),!0))}function St(e){return ce("MuiCircularProgress",e)}ee("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","track","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const k=44,ae=H`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,le=H`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,Mt=typeof ae!="string"?Me`
        animation: ${ae} 1.4s linear infinite;
      `:null,xt=typeof le!="string"?Me`
        animation: ${le} 1.4s ease-in-out infinite;
      `:null,Rt=e=>{const{classes:t,variant:n,color:o,disableShrink:r}=e,s={root:["root",n,`color${j(o)}`],svg:["svg"],track:["track"],circle:["circle",`circle${j(n)}`,r&&"circleDisableShrink"]};return ue(s,St,t)},Ct=V("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`color${j(n.color)}`]]}})(ne(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:Mt||{animation:`${ae} 1.4s linear infinite`}},...Object.entries(e.palette).filter(Ae()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),Et=V("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),kt=V("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.circle,t[`circle${j(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(ne(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink,style:xt||{animation:`${le} 1.4s ease-in-out infinite`}}]}))),Pt=V("circle",{name:"MuiCircularProgress",slot:"Track"})(ne(({theme:e})=>({stroke:"currentColor",opacity:(e.vars||e).palette.action.activatedOpacity}))),Vt=a.forwardRef(function(t,n){const o=te({props:t,name:"MuiCircularProgress"}),{className:r,color:s="primary",disableShrink:i=!1,enableTrackSlot:u=!1,size:c=40,style:p,thickness:f=3.6,value:d=0,variant:g="indeterminate",...M}=o,h={...o,color:s,disableShrink:i,size:c,thickness:f,value:d,variant:g,enableTrackSlot:u},v=Rt(h),b={},C={},B={};if(g==="determinate"){const T=2*Math.PI*((k-f)/2);b.strokeDasharray=T.toFixed(3),B["aria-valuenow"]=Math.round(d),b.strokeDashoffset=`${((100-d)/100*T).toFixed(3)}px`,C.transform="rotate(-90deg)"}return S.jsx(Ct,{className:x(v.root,r),style:{width:c,height:c,...C,...p},ownerState:h,ref:n,role:"progressbar",...B,...M,children:S.jsxs(Et,{className:v.svg,ownerState:h,viewBox:`${k/2} ${k/2} ${k} ${k}`,children:[u?S.jsx(Pt,{className:v.track,ownerState:h,cx:k,cy:k,r:(k-f)/2,fill:"none",strokeWidth:f,"aria-hidden":"true"}):null,S.jsx(kt,{className:v.circle,style:b,ownerState:h,cx:k,cy:k,r:(k-f)/2,fill:"none",strokeWidth:f})]})})});function Re(){return"results"}function It(){return"eventStructure"}function Tt(){return"members"}function Bt(){const e=sessionStorage.getItem(It());return e?JSON.parse(e):{dates:[]}}function Lt(){const e=sessionStorage.getItem(Tt());return e?JSON.parse(e):[]}function wt(){const e=sessionStorage.getItem(Re());return e?JSON.parse(e):{}}function Ot(e,t,n,o){const r=wt();r[e]=r[e]??{},r[e][t]=r[e][t]??{},r[e][t][n]=o,sessionStorage.setItem(Re(),JSON.stringify(r))}export{jt as B,Vt as C,be as T,Je as _,zt as a,ye as b,Dt as c,Lt as d,wt as e,Z as f,He as g,st as h,Re as i,It as j,Tt as m,Bt as r,Ke as u,Ot as w};

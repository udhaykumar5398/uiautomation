/*! For license information please see main.5914d785.js.LICENSE.txt */
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),Rr=gr(kr||(kr=Tr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),Dr=gr(Cr||(Cr=Tr`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),Ir=(0,or.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Mr=(0,or.Ay)(xr,{name:"MuiTouchRipple",slot:"Ripple"})(Pr||(Pr=Tr`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),OC=gr(AC||(AC=CC`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),RC=(0,or.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`color${(0,Hr.A)(r.color)}`]]}})((e=>{let{ownerState:t,theme:r}=e;return(0,n.A)({display:"inline-block"},"determinate"===t.variant&&{transition:r.transitions.create("transform")},"inherit"!==t.color&&{color:(r.vars||r).palette[t.color].main})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&vr(EC||(EC=CC`
      animation: ${0} 1.4s linear infinite;
    `),TC)})),DC=(0,or.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),IC=(0,or.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.circle,t[`circle${(0,Hr.A)(r.variant)}`],r.disableShrink&&t.circleDisableShrink]}})((e=>{let{ownerState:t,theme:r}=e;return(0,n.A)({stroke:"currentColor"},"determinate"===t.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink&&vr(kC||(kC=CC`
      animation: ${0} 1.4s ease-in-out infinite;
//# sourceMappingURL=main.5914d785.js.map
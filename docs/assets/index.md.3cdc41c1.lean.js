import{d as r,r as d,o as i,c,a as o,n as u,_ as p,p as h,b as m,e as f,f as v}from"./app.74e3ecb9.js";const s=a=>(h("data-v-30443e48"),a=a(),m(),a),b={class:"scene"},g=s(()=>o("div",{class:"cube__face cube__face--right"},"Welcome",-1)),k=s(()=>o("div",{class:"cube__face cube__face--left"},"Witam",-1)),x=s(()=>o("div",{class:"cube__face cube__face--top"},"Bonvenon",-1)),w=[g,k,x],y=r({__name:"Cube",setup(a){const e=d([!0,!1,!1]);function*l(){let t=1;for(;t<e.value.length;){const n=t-1>=0?t-1:e.value.length-1;e.value[n]=!1,e.value[t]=!0,t===e.value.length-1?yield t=0:yield t++}}const _=l();return setInterval(()=>_.next().value,2e3),(t,n)=>(i(),c("div",b,[o("div",{class:u(["cube",{"show-top":e.value[2],"show-left":e.value[1],"show-right":e.value[0]}])},w,2)]))}});var j=p(y,[["__scopeId","data-v-30443e48"]]);const C=v('',5),T='{"title":"Home","description":"Welcome to my website, it will serve as my blog and portfolio.","frontmatter":{"title":"Home","description":"Welcome to my website, it will serve as my blog and portfolio."},"headers":[{"level":2,"title":"Contact me:","slug":"contact-me"},{"level":2,"title":"Me on:","slug":"me-on"}],"relativePath":"index.md","lastUpdated":1709057980554}',I={},V=Object.assign(I,{__name:"index",setup(a){return(e,l)=>(i(),c("div",null,[f(j),C]))}});export{T as __pageData,V as default};

import{p as e,b as a,d as t,r as l,o as n,c as o,a as i,e as s}from"./app.2c8e126f.js";e("data-v-3dfb5567");const c={class:"scene"},r=i("div",{class:"cube__face cube__face--right"},"Welcome",-1),u=i("div",{class:"cube__face cube__face--left"},"Witam",-1),d=i("div",{class:"cube__face cube__face--top"},"Bonvenon",-1);a();var _=t({setup(e){const a=l([!0,!1,!1]);const t=function*(){let e=1;for(;e<a.value.length;){const t=e-1>=0?e-1:a.value.length-1;a.value[t]=!1,a.value[e]=!0,e===a.value.length-1?yield e=0:yield e++}}();return setInterval((()=>t.next().value),2e3),(e,t)=>(n(),o("div",c,[i("div",{class:["cube",{"show-top":a.value[2],"show-left":a.value[1],"show-right":a.value[0]}]},[r,u,d],2)]))}});_.__scopeId="data-v-3dfb5567";const f=s('',5),m='{"title":"Home","description":"Welcome to my website, it will serve as my blog and portfolio.","frontmatter":{"title":"Home","description":"Welcome to my website, it will serve as my blog and portfolio."},"headers":[{"level":2,"title":"Contact me:","slug":"contact-me"},{"level":2,"title":"Me on:","slug":"me-on"}],"relativePath":"index.md","lastUpdated":1626958825604}',p={};const h=Object.assign(p,{setup:function(e){return(e,a)=>(n(),o("div",null,[i(_),f]))}});export default h;export{m as __pageData};
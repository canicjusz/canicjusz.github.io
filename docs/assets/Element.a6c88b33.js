import{_ as C,h as f,i as g,H as u,r as N,j as y,k as r,o as l,c as o,t as _,a as s,l as h,n as c,e as d,w as p,m as x,q as v,T as j}from"./app.74e3ecb9.js";const z=f(()=>g(()=>import("./app.74e3ecb9.js").then(function(t){return t.N}),[])),B={props:{page:Object,level:Number},components:{Navbar:z,Hamburger:u},setup(){return{isClicked:N(!1),hideNavbars:y}}},E={class:"navbar__element"},H=["href"];function O(t,n,a,e,T,V){const b=r("Hamburger"),m=r("Navbar"),k=r("ClientOnly");return l(),o("li",E,[a.page.type==="file"?(l(),o("a",{key:0,href:a.page.href,class:"navbar__link navbar__file",onClick:n[0]||(n[0]=(...i)=>e.hideNavbars&&e.hideNavbars(...i))},_(a.page.name),9,H)):(l(),o("div",{key:1,class:"navbar__folder",onClick:n[2]||(n[2]=i=>e.isClicked=!e.isClicked)},[s("div",null,[h(_(a.page.name)+" ",1),s("span",{class:c(["navbar__triangle",{"navbar__triangle--opened":e.isClicked}])},null,2)]),d(k,null,{default:p(()=>[(l(),x(j,{to:"nav"},[s("div",{class:"navbar-container",style:v({zIndex:a.level})},[s("div",{class:c(["navbar",{"navbar--show":e.isClicked}]),style:v({zIndex:a.level})},[d(b,{class:c({"hamburger--clicked":e.isClicked}),onClick:n[1]||(n[1]=i=>e.isClicked=!e.isClicked)},null,8,["class"]),d(m,{list:a.page.content,level:a.level+1},null,8,["list","level"])],6)],4)]))]),_:1})]))])}var I=C(B,[["render",O]]);export{I as default};
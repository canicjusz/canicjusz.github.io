import{_ as C,i as f,j as g,H as u,r as N,k as y,l as r,c as o,t as _,a as l,g as p,n as c,e as d,w as h,o as s,m as x,q as v,T as j}from"./app.cb393901.js";const z=f(()=>g(()=>import("./app.cb393901.js").then(function(t){return t.N}),[])),B={props:{page:Object,level:Number},components:{Navbar:z,Hamburger:u},setup(){return{isClicked:N(!1),hideNavbars:y}}},E={class:"navbar__element"},H=["href"];function O(t,n,a,e,T,V){const b=r("Hamburger"),m=r("Navbar"),k=r("ClientOnly");return s(),o("li",E,[a.page.type==="file"?(s(),o("a",{key:0,href:a.page.href,class:"navbar__link navbar__file",onClick:n[0]||(n[0]=(...i)=>e.hideNavbars&&e.hideNavbars(...i))},_(a.page.name),9,H)):(s(),o("div",{key:1,class:"navbar__folder",onClick:n[2]||(n[2]=i=>e.isClicked=!e.isClicked)},[l("div",null,[p(_(a.page.name)+" ",1),l("span",{class:c(["navbar__triangle",{"navbar__triangle--opened":e.isClicked}])},null,2)]),d(k,null,{default:h(()=>[(s(),x(j,{to:"nav"},[l("div",{class:"navbar-container",style:v({zIndex:a.level})},[l("div",{class:c(["navbar",{"navbar--show":e.isClicked}]),style:v({zIndex:a.level})},[d(b,{class:c({"hamburger--clicked":e.isClicked}),onClick:n[1]||(n[1]=i=>e.isClicked=!e.isClicked)},null,8,["class"]),d(m,{list:a.page.content,level:a.level+1},null,8,["list","level"])],6)],4)]))]),_:1})]))])}var I=C(B,[["render",O]]);export{I as default};
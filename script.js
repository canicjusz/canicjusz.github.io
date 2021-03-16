const getRoutes = fetch('/routes.json').then((response) => response.json())
const main = document.querySelector('main')
const hamburgers = document.querySelectorAll('.hamburger')
const folderLinks = document.querySelectorAll('.navbar__folder')
let globalRoutes = []
// maybe i should move it to fetch idk
const html = document.querySelector('html')
const description = document.querySelector('meta[name="description"]')
const title = document.querySelector('title')

const router = ()=>{
  if(location.pathname === '/'){
    getPage('/index.html')
  }
  const match = globalRoutes.find(route=>route === location.pathname)
  if(match){
    getPage(match)
  }else{
    getPage('/404.html')
  }
}

const getPage = path => {
  fetch(path).then(response => response.text()).then(text=>{
    const parser = new DOMParser()
    const virtualDom = parser.parseFromString(text, "text/html")
    const newHTML = virtualDom.querySelector('html')
    const newLang = newHTML.lang
    const newDescription = newHTML.querySelector('meta[name="description"]').content
    const newTitle = newHTML.querySelector('title').innerText
    html.lang = newLang
    description.content = newDescription
    title.innerText = newTitle
    document.documentElement.setAttribute('lang', newLang);
    const newMain = virtualDom.querySelector('main')
    main.innerHTML = newMain.innerHTML
  })
}
const goTo = route => {
  if(route !== location.pathname){
    history.pushState(null, null, route)
    getPage(route)
  }
}

getRoutes.then((routes) => {
  globalRoutes = routes
  document.addEventListener('click', e=>{
    const el = e.target
    const href = el.getAttribute('href')
    if(href){
      e.preventDefault()
      goTo(href)
    }
  })
  window.addEventListener("popstate", router);
})



for(let i = folderLinks.length; i--;){
  const element = folderLinks[i]
  const to = element.getAttribute('to')
  const navbarToOpen = document.querySelector('.navbar-'+to)
  element.addEventListener('click', ()=>{
    navbarToOpen.classList.add('navbar--show')
  })
}

for(let i = hamburgers.length; i--;){
  const hamburger = hamburgers[i]
  if(hamburger.parentElement.classList.contains('navbar')){
    const navbar = hamburger.parentElement
    hamburger.classList.add('hamburger--clicked')
    hamburger.addEventListener('click', ()=>{
      navbar.classList.remove('navbar--show')
    })
  }else{
    const navbar = hamburger.nextElementSibling
    hamburger.addEventListener('click', ()=>{
      hamburger.classList.toggle('hamburger--clicked')
      navbar.classList.toggle('navbar--show')
    })
  }
}

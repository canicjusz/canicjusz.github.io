const getRoutes = fetch('/routes.json').then((response) => response.json())
let main = document.querySelector('main')
let globalRoutes = []
const documentElement = document.documentElement
const description = document.querySelector('meta[name="description"]')
const title = document.querySelector('title')

const router = ()=>{
  if(location.pathname === '/'){
    getPage('/index.html')
  }
  const foundRoute = globalRoutes.find(route=>route === location.pathname)
  if(foundRoute){
    getPage(foundRoute)
  }else{
    getPage('/404.html')
  }
}

const extractHeadAttrsFromDOM = DOM => {
  const lang = DOM.lang
  const description = DOM.querySelector('meta[name="description"]').content
  const title = DOM.querySelector('title').innerText
  return [lang, description, title]
}

const stringIntoDOM = string => {
  const parser = new DOMParser()
  const virtualDom = parser.parseFromString(string, "text/html")
  const html = virtualDom.querySelector('html')
  return html
}

const replaceHeadAttrs = (newLang, newDescription, newTitle) => {
  documentElement.lang = newLang
  description.content = newDescription
  title.innerText = newTitle
}

const replaceContent = (newContent) => {
  main.parentElement.replaceChild(newContent, main)
  main = document.querySelector('main')
}

const convertHTML = text => {
  const html = stringIntoDOM(text)
  const newAttrs = extractHeadAttrsFromDOM(html)
  replaceHeadAttrs(...newAttrs)
  const newMain = html.querySelector('main')
  replaceContent(newMain)
}

const getText = (response) => {
  return response.text()
}

const getPage = path => {
  fetch(path).then(getText).then(convertHTML)
}

const goToRoute = route => {
  history.pushState(null, null, route)
  getPage(route)
}

const checkRoute = route => {
  if(route !== location.pathname){
    goToRoute(route)
  }
}

const checkTargetsHref = (element, event) => {
  const href = element.getAttribute('href')
  if(href){
    event.preventDefault()
    checkRoute(href)
  }
}

const setThingsUp = routes => {
  globalRoutes = routes
  window.addEventListener("popstate", router);
}

getRoutes.then(setThingsUp)


// not routing part

const hamburgers = document.querySelectorAll('.hamburger')
const folderLinks = document.querySelectorAll('.navbar__folder')

const classList = content => func => element => element.classList[func](content)

const showedNavbar = classList('navbar--show')
const addShowedNavbar = showedNavbar('add')
const toggleShowedNavbar = showedNavbar('toggle')

const clickedHamburger = classList('hamburger--clicked')
const addClickedHamburger = clickedHamburger('add')
const removeClickedHamburger = clickedHamburger('remove')
const toggleClickedHamburger = clickedHamburger('toggle')

const openedTriangle = classList('navbar__triangle--opened')
const addOpenedTriangle = openedTriangle('add')
const removeOpenedTriangle = openedTriangle('remove')

const isElementFromNavbar = element => (/hamburger|navbar/).test(element.className)

//got bored and i dont want to make this function smaller xD

const closeEverything = () => {
  const openedNavbars = document.querySelectorAll('.navbar--show')
  const openedTriangles = document.querySelectorAll('.navbar__triangle--opened')
  const firstNavbar = document.querySelector('.navbar-1')
  const firstHamburger = firstNavbar.previousElementSibling
  removeClickedHamburger(firstHamburger)
  for(let i = openedTriangles.length; i--;){
    removeOpenedTriangle(openedTriangles[i])
  }
  for(let i = openedNavbars.length; i--;){
    toggleShowedNavbar(openedNavbars[i])
  }
}

document.addEventListener('click', e => {
  const element = e.target
  if(isElementFromNavbar(element)){
    checkTargetsHref(element, e)
  }else{
    closeEverything()
  }
})

const addClassToNavbarAndTriangle = (navbar, triangle) => {
  addShowedNavbar(navbar)
  addOpenedTriangle(triangle)
}

const linkElementToNavbar = element => {
  const toAttribute = element.getAttribute('to')
  const navbar = document.querySelector('.navbar-'+toAttribute)
  const triangle = element.querySelector('.navbar__triangle')
  element.addEventListener('click', () => addClassToNavbarAndTriangle(navbar, triangle))
}

for(let i = folderLinks.length; i--;){
  const element = folderLinks[i]
  linkElementToNavbar(element)
}

const toggleNavbarAndRemoveOpenedTriangle = (navbar, triangle) => {
  toggleShowedNavbar(navbar)
  removeOpenedTriangle(triangle)
}

const linkToParent = hamburger => {
  const navbar = hamburger.parentElement
  const navbarNumber = navbar.getAttribute('number')
  const linkingTriangle = document.querySelector('.navbar__triangle[to="'+navbarNumber+'"]')
  addClickedHamburger(hamburger)
  hamburger.addEventListener('click', () => toggleNavbarAndRemoveOpenedTriangle(navbar, linkingTriangle))
}

const toggleHamburgerAndNavbar = (navbar, hamburger) => {
  toggleClickedHamburger(hamburger)
  toggleShowedNavbar(navbar)
}

const linkToSibling = hamburger => {
  const navbar = hamburger.nextElementSibling
  hamburger.addEventListener('click', () => toggleHamburgerAndNavbar(navbar, hamburger))
}

const getElementToToggle = hamburger => {
  const parentElement = hamburger.parentElement
  const isParentNavbar = classList('navbar')('contains')(parentElement)
  if(isParentNavbar){
    linkToParent(hamburger)
  }else{
    linkToSibling(hamburger)
  }
}

for(let i = hamburgers.length; i--;){
  const hamburger = hamburgers[i]
  getElementToToggle(hamburger)
}

const getRoutes = fetch('/routes.json').then((response) => response.json())
const main = document.querySelector('main')
const hamburgers = document.querySelectorAll('.hamburger')
const folderLinks = document.querySelectorAll('.navbar__folder')
const filesLinks = document.querySelectorAll('.navbar__link')

getRoutes.then((routes) => {
  routes.forEach((route) => {
    page(route, ()=>{})
  })
  page.start()
})

for(let i = filesLinks.length; i--;){
  const element = filesLinks[i]
  element.addEventListener('click', ()=>{
    fetch(element.href).then(response => response.text()).then(text=>{
        const dummyDiv = document.createElement('div')
        dummyDiv.innerHTML = text
        const newMain = dummyDiv.querySelector('main')
        main.innerHTML = newMain.innerHTML
      })
  })
}

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
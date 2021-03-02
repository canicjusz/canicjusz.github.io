// https://github.com/egoist/front-matter
const frontMatter = (str, delimiter = '---') => {
  if (!str && str !== '') {
    throw new TypeError('Expect str to be a string!')
  }

  str = str.trim()

  const RE = new RegExp(`^${delimiter}\\n+([\\s\\S]+)\\n+${delimiter}(?:\\n([\\s\\S]*))?$`)

  const splits = str.split('\n')
  const unmatchResult = {
    body: str
  }
  if (!splits[0] || splits[0] !== delimiter || !RE.test(str)) {
    return unmatchResult
  }

  const [, head, body] = RE.exec(str)
  return {
    head,
    body
  }
}

let navNumber = 1
const navbarsContainer = document.querySelector('.navbars-container')
const main = document.querySelector('main')
const getRoutes = fetch('/routes.json').then((response) => response.json())
const md = markdownit({
  html: true
})

getRoutes.then(({allRoutes, ...obj}) => {
  allRoutes.forEach(({route, path}) => {
    page(route, () => {
      fetch(path).then(response => 
        response.text()
      ).then(result => {
        const {head, body} = frontMatter(result)
        main.innerHTML = md.render(body)
        const grids = document.querySelectorAll('.grid')
        for(let i = grids.length; i--;){
          const element = grids[i]
          const files = element.getAttribute('files').split(',')
          const folder = element.getAttribute('folder')
          const grid = createGrid(files, folder)
          console.log(grid)
          element.parentElement.replaceChild(grid, element)
        }
      })
    })
  })
  page.redirect('/', '/pages/portfolio')
  page.start()
  createNavbar(obj.folders, obj.files)
})

function createGrid(files, folder){
  const grid = document.createElement('div')
  files.forEach(file=>{
    const image = document.createElement('img')
    image.src = '/static/'+folder+'/'+file
    image.classList.add('grid__img')
    grid.appendChild(image)
  })
  grid.classList.add('grid')
  return grid
}

// function createGrid(href, parent){

  // console.log(href, parent)
  // parent.appendChild(image)
// }

function createNavbar(folders, files) {
  const navbar = document.createElement('div')
  const navbarContainer = document.createElement('div')
  navbar.classList.add('navbar-'+navNumber)
  navbar.classList.add('navbar')
  navbar.style.zIndex = navNumber
  navbarContainer.classList.add('navbar-container')
  if(navNumber === 1){
    navbar.style.transform = 'translateX(-180px)'
    createHamburger(navbarContainer, navbar)
    createList(folders, files, navbar)
  }else{
    navbar.style.transform = 'translateX(-240px)'
    createHamburger(navbar, navbar)
    createList(folders, files, navbar)
  }
  navbarContainer.appendChild(navbar)
  navbarsContainer.prepend(navbarContainer)
}

function createHamburger(parent, navbar){
  const hamburger = document.createElement('div')
  const bun = document.createElement('div')
  const cheese = document.createElement('div')
  const meat = document.createElement('div')
  hamburger.classList.add('hamburger')
  bun.classList.add('hamburger__bun')
  meat.classList.add('hamburger__meat')
  cheese.classList.add('hamburger__cheese')
  if(navNumber === 1){
    hamburger.addEventListener('click', ()=>{
      hamburger.classList.toggle('hamburger--clicked')
      navbar.classList.toggle('navbar--show')
    })
  }else{
    hamburger.classList.add('hamburger--clicked')
    hamburger.addEventListener('click', ()=>{
      navbar.classList.toggle('navbar--show')
    })
  }
  hamburger.appendChild(cheese)
  hamburger.appendChild(meat)
  hamburger.appendChild(bun)
  parent.appendChild(hamburger)
}

function createList(folders, files, parent) {
  const ul = document.createElement('ul')
  ul.classList.add('navbar__list')
  folders.forEach(folder => {
    navNumber++
    createFolderElement(folder.name, ul)
    createNavbar(folder.folders, folder.files)
  })
  files.forEach(file => {
    createFileElement(file.name, file.route, ul)
  })
  parent.appendChild(ul)
}

function createFolderElement(name, parent) {
  const li = document.createElement('li')
  li.classList.add('navbar__element')
  li.classList.add('navbar__folder')
  const triangle = document.createElement('span')
  triangle.classList.add('navbar__traingle')
  li.textContent = name
  li.appendChild(triangle)
  const currNavNumber = navNumber
  li.addEventListener('click', ()=>{
    const navbarToShow = document.querySelector('.navbar-'+currNavNumber)
    navbarToShow.classList.add('navbar--show')
  })
  parent.appendChild(li)
}

function createFileElement(name, route, parent) {
  const li = document.createElement('li')
  li.classList.add('navbar__element')
  li.classList.add('navbar__file')
  const anchor = document.createElement('a')
  anchor.classList.add('navbar__link')
  anchor.href = route
  anchor.textContent = name
  li.appendChild(anchor)
  parent.appendChild(li)
}
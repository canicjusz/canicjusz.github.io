const fs = require('fs')

const md = require('markdown-it')({html: true})
    // mdwfm = md.use(require('markdown-it-front-matter'), fm=>fm)

const routes = []

let navbars = ''
let navNumber = 1;
const source = './markdown'
const destination = './pages'

let template = fs.readFileSync('./template.html').toString()

const hamburger = `<div class="hamburger"><div class="hamburger__cheese"></div><div class="hamburger__meat"></div><div class="hamburger__bun"></div></div>`

const createFiles = (fromDir = source, toDir = destination) => fs.readdir(fromDir, (err, dirs) => {
  const files = dirs.filter(directory => directory.includes('.'))
  const folders = dirs.filter(directory => !directory.includes('.'))
  folders.forEach(name => {
    if (!fs.existsSync(toDir+'/'+name)) {
      fs.mkdirSync(toDir+'/'+name); 
    }
    createFiles(fromDir+'/'+name, toDir+'/'+name)
  })
  files.forEach(name=>{
    let string = fs.readFileSync(fromDir+'/'+name).toString()
    matches = string.match(/{"files": \[.*\], "folder": ".*"}/g)
    if(matches !== null){
      matches.forEach(el=>{
        const obj = JSON.parse(el)
        let div = '<div class="grid">'
        obj.files.forEach(img=>{
          div+=`<img class="grid__img" src="/static/${obj.folder}/${img}" />`
        })
        div+= '</div>'
        string = string.replace(el, div)
      })
    }
    const html = md.render(string)
    const file = template.replace('<!-- content -->', html)
    fs.writeFileSync(toDir+'/'+name.replace('.txt', '.html'), file)
    if(name === 'portfolio.txt'){
      fs.writeFileSync('./index.html', file)
    }
  })
})

const editTemplate = () => {
  template = template.replace('<!-- navbar -->', navbars)
  createFiles()
  fs.writeFileSync('./routes.json', JSON.stringify(routes))
  fs.writeFileSync('./404.html', template.replace('<!-- content -->', '<h1>Page not found</h1><a href="/pages/portfolio.html">Go back to portfolio</a>'))
}

const createNavbar = (dir = source) => fs.readdir(dir, (err, dirs) => {
  const currNavNumber = navNumber
  let navbar = currNavNumber === 1 ? `<div class="navbar-container">${hamburger}<div class="navbar-${currNavNumber} navbar" style="z-index: ${currNavNumber}; transform: translateX(-180px);"><ul class="navbar__list">` : `<div class="navbar-container"><div class="navbar-${currNavNumber} navbar" style="z-index: ${currNavNumber}; transform: translateX(-240px);">${hamburger}<ul class="navbar__list">`
  const files = dirs.filter(directory => directory.includes('.'))
  const folders = dirs.filter(directory => !directory.includes('.'))
  files.forEach((name, i) => { 
    const nameWithNewExtension = name.replace('.txt', '.html')
    const path = dir.replace(source, destination).slice(1) + '/' + nameWithNewExtension; 
    navbar += `<li class="navbar__element navbar__file"><a class="navbar__link" href="${path}">${name.slice(0, -4)}</a></li>`
    routes.push(path); 
    if(i === files.length - 1 && folders.length === 0){
      navbar += `</ul></div></div>`
      navbars += navbar
      editTemplate()
    }
  })
  folders.forEach((name) => {
    navNumber++
    navbar += `<li class="navbar__element navbar__folder" to="${navNumber}">${name}<span class="navbar__traingle"></span></li>`
    createNavbar(dir+'/'+name)
  })
  navbar += `</ul></div></div>`
  navbars += navbar
})

createNavbar()
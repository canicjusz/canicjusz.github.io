const fs = require('fs')
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const cleanCSS = require('@node-minify/clean-css');
const uglifyJS = require('@node-minify/uglify-js');

const md = require('markdown-it')({html: true}),
matter = require('gray-matter')

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
    let {birthtime, mtime} = fs.statSync(fromDir+'/'+name)
    let lastEdit = mtime.getDate()+'/'+Number(mtime.getMonth() + 1)+'/'+mtime.getFullYear()
    let creationDate = birthtime.getDate()+'/'+Number(birthtime.getMonth() + 1)+'/'+birthtime.getFullYear()
    matches = string.match(/{"files": \[.*\], "folder": ".*"}/g)
    if(matches !== null){
      matches.forEach(el=>{
        const obj = JSON.parse(el)
        let div = '<div class="grid">'
        obj.files.forEach(({file, alt, size: [x, y]})=>{
          div+=`<img class="grid__img" src="/static/${obj.folder}/${file}" alt="${alt}" width="${x}" height="${y}">`
        })
        div += '</div>'
        string = string.replace(el, div)
      })
    }
    const {data, content} = matter(string)
    const {lang, desc, title} = data
    const html = md.render(content)
    let file = template.replace('<!-- content -->', html).replace('<!-- lang -->', lang).replace('<!-- title -->', title).replace('<!-- desc -->', desc).replace(/<table>/g, '<div class="table-container"><table>').replace(/<\/table>/g, '</table></div>')
    switch(lang) {
      case 'eo':
        date = `</h1><div class="date"><p class="created">Kreita: ${creationDate}</p><p class="edited">Lasta redakto: ${lastEdit}</p></div>`
        break;
      case 'pl':
        date = `</h1><div class="date"><p class="created">Stworzono: ${creationDate}</p><p class="edited">Ostatnia zmiana: ${lastEdit}</p></div>`
        break;
      default:
        date = `</h1><div class="date"><p class="created">Created: ${creationDate}</p><p class="edited">Last edit: ${lastEdit}</p></div>`
    }
    minify({
      compressor: htmlMinifier,
      content: file.replace('</h1>', date)
    }).then(min=>{
      fs.writeFileSync(toDir+'/'+name.replace('.md', '.html'), min)
      if(name === 'portfolio.md'){
        fs.writeFileSync('./index.html', min)
      }
    })
  })

  minify({
    compressor: cleanCSS,
    input: 'style.css',
    output: 'style.min.css',
  });

  minify({
    compressor: uglifyJS,
    input: 'script.js',
    output: 'script.min.js',
  })
})

const editTemplate = () => {
  template = template.replace('<!-- navbar -->', navbars)
  createFiles()
  fs.writeFileSync('./routes.json', JSON.stringify(routes))
  const page404 = template.replace('<!-- content -->', '<h1>Page not found</h1><a href="/pages/portfolio.html">Go back to portfolio</a>').replace('<!-- lang -->', 'en').replace('<!-- title -->', '404 | canicjusz').replace('<!-- desc -->', 'No page found on this site') 
  minify({
    compressor: htmlMinifier,
    content: page404
  }).then(min=>{
    fs.writeFileSync('./404.html', min)
  })
}

const createNavbar = (dir = source) => fs.readdir(dir, (err, dirs) => {
  const currNavNumber = navNumber
  let navbar = currNavNumber === 1 ? `<div class="navbar-container">${hamburger}<div number="${currNavNumber}" class="navbar-${currNavNumber} navbar" style="z-index: ${currNavNumber}; transform: translateX(-180px);"><ul class="navbar__list">` : `<div class="navbar-container"><div number="${currNavNumber}" class="navbar-${currNavNumber} navbar" style="z-index: ${currNavNumber}; transform: translateX(-240px);">${hamburger}<ul class="navbar__list">`
  const files = dirs.filter(directory => directory.includes('.'))
  const folders = dirs.filter(directory => !directory.includes('.'))
  files.forEach((name, i) => { 
    const nameWithNewExtension = name.replace('.md', '.html')
    const path = dir.replace(source, destination).slice(1) + '/' + nameWithNewExtension; 
    navbar += `<li class="navbar__element navbar__file"><a class="navbar__link" href="${path}">${name.slice(0, -3)}</a></li>`
    routes.push(path); 
    if(i === files.length - 1 && folders.length === 0){
      navbar += `</ul></div></div>`
      navbars += navbar
      editTemplate()
    }
  })
  folders.forEach((name) => {
    navNumber++
    navbar += `<li class="navbar__element navbar__folder" to="${navNumber}">${name}<span class="navbar__triangle" to="${navNumber}"></span></li>`
    createNavbar(dir+'/'+name)
  })
  navbar += `</ul></div></div>`
  navbars += navbar
})

createNavbar()
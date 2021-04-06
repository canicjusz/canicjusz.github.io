const fs = require('fs')
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const cleanCSS = require('@node-minify/clean-css');
const uglifyJS = require('@node-minify/uglify-js');
const del = require('del');

const md = require('markdown-it')({html: true}),
matter = require('gray-matter')

let templateWithNavbar

let template = fs.readFileSync('./template.html').toString()
let currToDir, currFromDir
let currFile
let currMtime
let currBirthtime

const containsDot = dir => dir.includes('.')
const notContainsDot = dir => !dir.includes('.')
const filterContainsDot = (dirs=[]) => dirs.filter(containsDot)
const filterNotContainsDot = (dirs=[]) => dirs.filter(notContainsDot)
const minifyHTML = content => minify({compressor: htmlMinifier, content})
const minifyCSS = () => minify({compressor: cleanCSS, input: 'style.css', output: 'style.min.css'})
const minifyJS = () => minify({compressor: uglifyJS, input: 'script.js', output: 'script.min.js'})
const createPageDirectories = name => {
  const newDirectory = currToDir+'/'+name
  const correspondingDirectory = currFromDir+'/'+name
  fs.mkdir(newDirectory, ()=>{
    createFilesAndFolders(correspondingDirectory, newDirectory)
  }); 
}
const createGrid = el=>{
  const obj = JSON.parse(el)
  let div = '<div class="grid">'
  obj.files.forEach(({file, alt, size: [x, y]})=>{
    div+=`<img class="grid__img" src="/static/${obj.folder}/${file}" alt="${alt}" width="${x}" height="${y}">`
  })
  div += '</div>'
  currFile = currFile.replace(el, div)
}

const addTime = lang => {
  let lastEdit = currMtime.getDate()+'/'+(currMtime.getMonth() + 1)+'/'+currMtime.getFullYear()
  let creationDate = currBirthtime.getDate()+'/'+(currBirthtime.getMonth() + 1)+'/'+currBirthtime.getFullYear()
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
  return date
}


const editPageTemplate = (newFile) => {
  let matchGrid = currFile.match(/{"files": \[.*\], "folder": ".*"}/g)
  if(matchGrid !== null){
    matchGrid.forEach(createGrid)
  }
  const {data, content} = matter(currFile)
  const {lang, desc, title} = data
  const html = md.render(content)
  const dates = addTime(lang)
  currFile = templateWithNavbar.replace('<!-- content -->', html).replace('<!-- lang -->', lang).replace('<!-- title -->', title).replace('<!-- desc -->', desc).replace(/<table>/g, '<div class="table-container"><table>').replace(/<\/table>/g, '</table></div>').replace('</h1>', dates)
  minifyHTML(currFile).then(min=>{
    fs.writeFileSync(newFile, min)
    if(newFile === './pages/portfolio.html'){
      fs.writeFileSync('./index.html', min)
    }
  })
}

const createPageFiles = name=>{
  const newFile = currToDir+'/'+name.replace('.md', '.html')
  const correspondingFile = currFromDir+'/'+name
  fs.readFile(correspondingFile, 'utf8', (err, string)=>{
    fs.stat(correspondingFile, (err, {birthtime, mtime})=>{
      currFile = string
      currMtime = mtime
      currBirthtime = birthtime
      editPageTemplate(newFile)
    })
  })
}
const createFilesAndFolders = (fromDir = source, toDir = destination) => fs.readdir(fromDir, (err, dirs) => {
  currToDir = toDir
  currFromDir = fromDir
  const folders = filterNotContainsDot(dirs)
  const files = filterContainsDot(dirs)
  folders.forEach(createPageDirectories)
  files.forEach(createPageFiles)
})

const recreatePages = async () => {
  await del('./pages')
  fs.mkdir('./pages', ()=>{
    createFilesAndFolders()
  })
}


const create404Page = () => {
  const page404 = template.replace('<!-- content -->', '<h1>Page not found</h1><a href="/pages/portfolio.html">Go back to portfolio</a>').replace('<!-- lang -->', 'en').replace('<!-- title -->', '404 | canicjusz').replace('<!-- desc -->', 'No page found on this site') 
  minifyHTML(page404)
    .then(minified=>fs.writeFileSync('./404.html', minified))
}

const editTemplate = () => {
  templateWithNavbar = template.replace('<!-- navbar -->', navbars)
  recreatePages()
  create404Page()
}

const writeJSON = () => {
  const JSONedString = JSON.stringify(routes)
  fs.writeFileSync('./routes.json', JSONedString)
}
const routes = []

let navbars = ''
let navNumber = 1;
let currDir;
const source = './markdown'
const destination = './pages'
const hamburger = `<div class="hamburger"><div class="hamburger__cheese"></div><div class="hamburger__meat"></div><div class="hamburger__bun"></div></div>`

const createFolderElements = (name) => {
  navNumber++
  const element = `<li class="navbar__element navbar__folder" to="${navNumber}">${name}<span class="navbar__triangle" to="${navNumber}"></span></li>`
  createNavbar(currDir+'/'+name)
  return element
}

const createNavbarsBeggining = num => num === 1 ? `<div class="navbar-container">${hamburger}<div number="${num}" class="navbar-${num} navbar" style="z-index: ${num}; transform: translateX(-180px);"><ul class="navbar__list">` : `<div class="navbar-container"><div number="${num}" class="navbar-${num} navbar" style="z-index: ${num}; transform: translateX(-240px);">${hamburger}<ul class="navbar__list">`
const createFileElements = (name) => { 
  const nameWithNewExtension = name.replace('.md', '.html')
  const nameWithoutExtension = name.slice(0, -3)
  const newDestination = currDir.replace(source, destination).slice(1)
  const path = `${newDestination}/${nameWithNewExtension}`
  const element = `<li class="navbar__element navbar__file"><a class="navbar__link" href="${path}">${nameWithoutExtension}</a></li>`
  routes.push(path); 
  return element
}

const createNavbar = (dir = source) => fs.readdir(dir, (err, dirs) => {
  currDir = dir;
  const folders = filterNotContainsDot(dirs)
  const files = filterContainsDot(dirs)
  let navbar = createNavbarsBeggining(navNumber)
  const fileElements = files.map(createFileElements).join``
  if(folders.length !== 0){
    const folderElements = folders.map(createFolderElements).join``
    navbar += fileElements+folderElements+`</ul></div></div>`
    navbars += navbar
  }else{
    navbar += fileElements+`</ul></div></div>`
    navbars += navbar
    writeJSON()
    editTemplate()
  }
})

createNavbar()
minifyCSS()
minifyJS()
const fs = require('fs')

const json = {
  name: '',
  folders: [],
  files: [],
  allRoutes: []
}

const readDir = (dir, obj) => fs.readdir(dir, (err, dirs) => {
  const files = dirs.filter(directory => directory.includes('.'))
  const folders = dirs.filter(directory => !directory.includes('.'))
  obj.files = files.map(name => { const path = dir.slice(1) + '/' + name; const route = path.slice(6, -3); json.allRoutes.push({ route, path }); return { name, route } })
  obj.folders = folders.map(name=>({name, files: [], folders: []}))
  folders.forEach((name, i) => {
    readDir(dir+'/'+name, obj.folders[i])
  })
})

new Promise((resolve) => resolve(readDir('./pages', json))).then(c => {

  fs.truncate("routes.json", 0, function () {
    fs.writeFile("routes.json", JSON.stringify(json), function (err) {
      if (err) {
        return console.log("Error writing file: " + err);
      }
    });
  });
})
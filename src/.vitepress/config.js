const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const markdownItAttrs = require("markdown-it-attrs");
const markdonwItContainer = require("markdown-it-container");

const links = {};

const addToLinks = (href, nameWoExtension) => {
  if (links[nameWoExtension]) {
    links[nameWoExtension].push(href);
  } else {
    links[nameWoExtension] = [href];
  }
};

const getPages = (dir, dirPath, arr) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const { name } = file;
    if (file.isDirectory()) {
      const nextPath = dirPath + "/" + name;
      const nextDir = path.resolve(__dirname, nextPath);
      const nextIndex = arr.push({
        type: "dir",
        name: name,
        content: [],
      });
      const nextContent = arr[nextIndex - 1].content;
      getPages(nextDir, nextPath, nextContent);
    } else {
      const nameWoExtension = name.slice(0, -3);
      const dirsWoDots = dirPath.slice(2);
      const href = dirsWoDots + "/" + nameWoExtension;
      const pageDir = path.resolve(__dirname, dirPath);
      const src = fs.readFileSync(path.join(pageDir, name));
      const {
        data: { title },
      } = matter(src);
      arr.push({
        type: "file",
        name: title,
        href: href,
      });
      addToLinks(href, nameWoExtension);
    }
  });
  return arr;
};

const basePath = "../pages";
const baseDir = path.resolve(__dirname, basePath);
const pagesBase = [{ type: "file", name: "Home", href: "/" }];
const pages = getPages(baseDir, basePath, pagesBase);

module.exports = {
  lang: "en-US",
  base: "/",
  title: "canicjusz in English",
  locales: {
    "/pages/Esperanto/": {
      lang: "eo",
      title: "canicjusz Esperante",
    },
    "/pages/Polski/": {
      lang: "pl",
      title: "canicjusz po polsku",
    },
  },
  customData: {
    pages,
    links,
  },
  markdown: {
    anchor: { permalink: false },
    config: (md) => {
      md.use(markdownItAttrs).use(markdonwItContainer, "table-container");
    },
  },
};

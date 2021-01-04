"use strict";

const P = require("../parsers.js");

const writeString = string => (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  res.write(string);
  res.end();
};

const homeHtml = `
<a href="17-may-2020/page1">page1</a><br>
<a href="17-may-2020/page2">page2</a><br>
<a href="follow-mouse">Follow Mouse</a><br>
<a href="mobile-drag-n-drop">Mobile Drag N Drop</a><br>
<a href="drag-n-drop">Drag N Drop</a><br>
<a href="pills">Pills</a><br>
`;

module.exports = P.end("")
  .map(_ => homeHtml)
  .or(P.end("/page1").map(_ => "This is page 1"))
  .or(P.end("/page2").map(_ => "This is page 2"))
  .map(writeString);
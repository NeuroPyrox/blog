"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const requireFile = filePath => require(path.join(__dirname, filePath));
const writeFile = requireFile("2020/5/17/writeFile.js");

const paths = requireFile("2020/5/oldHandlers.js");
paths["/"] = requireFile("2020/5/20/homepage/server.js");
paths["/2020/5/21/progress-report"] = requireFile("2020/5/21/progress-report/server.js");

const handle404error = res => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("404 not found");
  res.end();
};

http
  .createServer((req, res) => {
    const handler = paths[req.url];
    if (handler === undefined) {
      handle404error(res);
    } else {
      handler(res);
    }
  })
  .listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });

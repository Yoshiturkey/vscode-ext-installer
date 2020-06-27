#! /usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const shell = require("shelljs");
const ProgressBar = require("progress");
const request = require("request");
const extListFile =
  "https://raw.githubusercontent.com/Yoshiturkey/vscode-ext-installer/master/extensions.txt";
let bar = new ProgressBar("vscode extensions installed [:bar]", { total: 23 });
const { exit } = require("process");

const isCode = shell.which("code") || false;

if (!isCode) {
  console.error("codeコマンドがありません");
  exit(1);
}

async function run() {
  await request(extListFile, (error, response, body) => {
    if (error !== null) {
      console.error("error:", error);
      return false;
    }
    const text = body.split(/\r\n|\r|\n/);
    text.forEach((element) => {
      shell.exec(`code --install-extension ${element}`, { silent: true });
      bar.tick();
    });
  });
}

run();

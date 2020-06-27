#! /usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const shell = require('shelljs');
const ProgressBar = require('progress');

let bar = new ProgressBar('vscode extensions installed [:bar]', { total: 23 });
const {
    exit
} = require("process");


const isCode = shell.which('code') || false

if (!isCode) {
    console.error('codeコマンドがありません')
    exit(1)
}

const readStrem = fs.createReadStream('./extensions.txt')

const interface = readline.createInterface({
    input: readStrem
})

interface.on('line', (lineString) => {
   shell.exec(`code --install-extension ${lineString}`, {silent: true})
   bar.tick();
})
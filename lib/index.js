#!/usr/bin/env node
"use strict";
var path = require('path');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var fs = require('fs');
var inquirer = require('inquirer');
var program = require('commander');
var incPrompt = inquirer.createPromptModule();
clear();
console.log(chalk.red(figlet.textSync('brandon-cli', { horizontalLayout: 'full' })));
var options = [
    { name: "Init new brand", value: 1 },
    { name: "List brands", value: 2 },
    { name: "Verify brands", value: 3 },
    { name: "Activate brand", value: 4 },
    { name: "Exit", value: 5 },
];
var questions = [
    { type: 'list', name: 'menu', message: 'What can brandon do for you?', choices: options },
];
var main = function () {
    return inquirer
        .prompt(questions)
        .then(function (answer) {
        console.log(answer);
        console.log('\n');
        main();
    });
};
main();

#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer = require('inquirer');
const program = require('commander');
const incPrompt = inquirer.createPromptModule();

clear();
console.log(
  chalk.red(
    figlet.textSync('brandon-cli', { horizontalLayout: 'full' })
  )
);

const options = [
    {name: "Init new brand", value: 1},
    {name: "List brands", value: 2},
    {name: "Verify brands", value: 3},
    {name: "Activate brand", value: 4},
    {name: "Exit", value: 5},
]

const questions = [
    { type: 'list', name: 'menu', message: 'What can brandon do for you?', choices: options },
]

  
const main = () =>
    inquirer
    .prompt(questions)
    .then((answer: any) => {
        console.log(answer);
        console.log('\n');
        main();
    });

main();


#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var fs = require('fs');
var ora = require('ora');
var inquirer = require('inquirer');
var program = require('commander');
var incPrompt = inquirer.createPromptModule();
var actions_1 = require("./actions");
var spinner = undefined;
program.option('--brand <type>', '', undefined);
clear();
console.log(chalk.red(figlet.textSync('brandon-cli', { horizontalLayout: 'full' })));
var options = [
    { name: "Init new brand", value: 1 },
    { name: "List brands", value: 2 },
    { name: "Verify brands", value: 3 },
    { name: "Activate brand", value: 4 },
    { name: "Exit", value: 5 },
];
var config = [
    { name: "Development", value: 1 },
    { name: "Production", value: 2 },
];
var configQuestions = [
    { type: 'list', name: 'env', message: 'What environment do you need?', choices: config },
];
var actions = new actions_1.Actions();
var questions = [
    { type: 'list', name: 'menu', message: 'What can brandon do for you?', choices: options },
];
var brandQuestion = [
    { type: 'list', name: 'brand', message: 'Which brand would you like to activate?', choices: actions.brands }
];
var processInput = function (input) {
    switch (input) {
        case 1:
            return actions.createBrand("");
        case 2:
            return actions.listBrands();
        case 3:
            return actions.validate();
        case 4:
            return actions.activateBrand("test");
        case 5:
            process.exit(0);
    }
};
var main = function () {
    return inquirer
        .prompt(questions)
        .then(function (answer) {
        // console.log(answer);
        // console.log('\n');
        if (answer.menu == 4) {
            actions.listBrands(false).then(function (res) {
                brandQuestion[0].choices = res;
                inquirer.prompt(brandQuestion)
                    .then(function (answer) {
                    return inquirer.prompt(configQuestions)
                        .then(function (configAnswer) {
                        actions.activateBrand(answer.brand, configAnswer.env)
                            .then(function (_) { return main(); })
                            .catch(function (err_) { return console.log(err_); });
                    });
                }).catch(function (err) {
                    console.error(err);
                    main();
                });
            });
        }
        else {
            var res = processInput(answer.menu);
            if (res) {
                res
                    .then(function (_) { return main(); })
                    .catch(function (err) {
                    console.error(err);
                    main();
                });
            }
        }
    });
};
function argHandler() {
    program.parse(process.argv);
    if (program.brand) {
        actions.listBrands(false).then(function (brands) {
            if (brands.indexOf(program.brand) > -1) {
                actions.activateBrand(program.brand);
            }
            else {
                console.log('No such brand!');
            }
        });
    }
    else
        main();
}
argHandler();

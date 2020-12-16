#!/usr/bin/env node
const path = require("path");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const fs = require("fs");
const ora = require("ora");
const inquirer = require("inquirer");
const program = require("commander");
import * as Promise from "bluebird";
const incPrompt = inquirer.createPromptModule();
import { Actions } from "./actions";

let spinner = undefined;

program.option("--brand <type>", "", undefined);

clear();
console.log(
  chalk.red(figlet.textSync("brandon-cli", { horizontalLayout: "full" }))
);

const options = [
  { name: "Init new brand", value: 1 },
  { name: "List brands", value: 2 },
  { name: "Verify brands", value: 3 },
  { name: "Activate brand", value: 4 },
  { name: "Exit", value: 5 },
];

const config = [
  { name: "Development", value: 1 },
  { name: "Production", value: 2 },
];

const configQuestions = [
  {
    type: "list",
    name: "env",
    message: "What environment do you need?",
    choices: config,
  },
];

let actions = new Actions();

const questions = [
  {
    type: "list",
    name: "menu",
    message: "What can brandon do for you?",
    choices: options,
  },
];

const brandQuestion = [
  {
    type: "list",
    name: "brand",
    message: "Which brand would you like to activate?",
    choices: actions.brands,
  },
];

const processInput = (input: any) => {
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

const main = () =>
  inquirer.prompt(questions).then((answer: any) => {
    // console.log(answer);
    // console.log('\n');
    if (answer.menu == 4) {
      actions.listBrands(false).then((res) => {
        brandQuestion[0].choices = res;
        inquirer
          .prompt(brandQuestion)
          .then((answer: any) =>
            inquirer.prompt(configQuestions).then((configAnswer: any) => {
              actions
                .activateBrand(answer.brand, configAnswer.env)
                .then((_) => main())
                .catch((err_) => console.log(err_));
            })
          )
          .catch((err: any) => {
            console.error(err);
            main();
          });
      });
    } else {
      const res = processInput(answer.menu);
      if (res) {
        res
          .then((_) => main())
          .catch((err: any) => {
            console.error(err);
            main();
          });
      }
    }
  });

function argHandler() {
  program.parse(process.argv);
  if (program.brand) {
    actions.listBrands(false).then((brands) => {
      if (brands.indexOf(program.brand) > -1) {
        actions.activateBrand(program.brand);
      } else {
        console.log("No such brand!");
      }
    });
  } else main();
}

argHandler();

#!/usr/bin/env node
declare const path: any;
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const fs: any;
declare const inquirer: any;
declare const program: any;
declare const incPrompt: any;
declare const options: {
    name: string;
    value: number;
}[];
declare const questions: {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
        value: number;
    }[];
}[];
declare const main: () => any;

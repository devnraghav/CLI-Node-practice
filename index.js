#!/usr/bin/env node
import config from './config.js';

import chalk from 'chalk';
// chalk for styling the output.
import readline from 'readline-sync';
// readline-sync for getting user input.
import fetch from 'node-fetch';
// node-fetch for making HTTP requests.
import ora from 'ora';
// ora for displaying progress indicators.

// using FIXER API and their free key (~100 requests per month)

 // Welcome to 𝗖𝗨𝗥𝗥𝗘𝗡𝗖𝗬 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 9000!

// 🚀 Unleash the power of currency conversion with the speed of light. Whether you're a jet-setting globetrotter, an international entrepreneur, or just curious about exchange rates, this CLI tool is your passport to a world of financial wizardry.

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function lineSpace() {
    console.log("");
}

const spin = ora(`Welcome to 𝗖𝗨𝗥𝗥𝗘𝗡𝗖𝗬 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 ${chalk.blue(9000)}!`).start();
lineSpace();

async function main() {
    await sleep(1000);
    console.log(`\nFor example ${chalk.blue('USD')} to ${chalk.red('CAD')}`);
    lineSpace();
    const from_currency = readline.question("What currency would you like to convert from? \n");
    console.log(from_currency);
    lineSpace();
    const to_currency = readline.question("What currency would you like to convert to? \n");
    console.log(to_currency);
    lineSpace();
    const amount = readline.question("How much $$ would you like to convert? \n");
    console.log(amount);

    GetConvertRate(from_currency, to_currency, amount);
}

main();

// function to get the conversion rate
function GetConvertRate(from, to, amount) {
    const conversion_url = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;
    const options = {
        method: 'GET',
        headers: {
            'apikey': config.apikey
        }
    };

    return fetch(conversion_url, options)
    .then(res => res.json())
    .then(data => {
        

        if (data.success) {
            spin.succeed(chalk.bgBlack.white(`Converstion Complete: $${data.result}`));
            console.log(chalk.yellow(`Rate: ${data.info.rate}`));
            process.exit(0);
        }
    })
    .catch(err => {
        spin.fail(chalk.bgBlack.red('Error fetching data: ' + err));
        process.exit(1); // exit process with code 1. shit hits the fan.
    });
}

// data object
// {
//     success, -- true/false
//     query, -- {from:--USD, to:--CAD,amount:--1}
//     info, -- {timestamp:--17043532, rate:--1.33725}
//     data, -- 2024-01-06 -- yyyy-mm-dd
//     result
// }
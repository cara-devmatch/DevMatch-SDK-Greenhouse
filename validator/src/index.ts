// const { program } = require('commander');
import { Command } from '@commander-js/extra-typings';
import { program } from '@commander-js/extra-typings';

import { Validator } from './validator';

program
    .command("statement")
    //.option('--double-sided')
    .action((targetFile, options) => {
        let validator = new Validator();
        console.log("val...", validator.getProblemStatement('123'))
    });

program.parse();

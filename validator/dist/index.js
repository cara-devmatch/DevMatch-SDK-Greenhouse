"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extra_typings_1 = require("@commander-js/extra-typings");
const validator_1 = require("./validator");
extra_typings_1.program
    .command("statement")
    //.option('--double-sided')
    .action((targetFile, options) => {
    let validator = new validator_1.Validator();
    console.log("val...", validator.getProblemStatement('123'));
});
extra_typings_1.program.parse();
//# sourceMappingURL=index.js.map
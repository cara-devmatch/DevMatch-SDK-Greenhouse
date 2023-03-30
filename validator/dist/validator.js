"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const interfaces_1 = require("./interfaces");
class Validator {
    getTestCases() {
        return [];
    }
    prerequesites(user) {
        // There are no pre-requisites for this problem.
        return true;
    }
    getProblemStatement(userId) {
        return `In this assessment you need to do the follwing:

* First, do this.
* Then do that.

That's it!
`;
    }
    getProblemConfiguration() {
        let config = new interfaces_1.ProblemConfiguration();
        config.ideEnabled = false;
        config.inputType = interfaces_1.ProblemInputType.GitRepo;
        return config;
    }
    openProblem(user) {
        return Promise.resolve(new interfaces_1.ProblemOpenedResult());
    }
    validate(id, user, testCases, databag, validationInput) {
        return Promise.resolve(testCases);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map
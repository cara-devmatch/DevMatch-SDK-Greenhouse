"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const interfaces_1 = require("./interfaces");
class Validator {
    getTestCases() {
        return [
            new interfaces_1.ProblemTestCase({
                id: "TEST_1",
                description: "Add two integers",
                maxPoints: 10,
            }),
            new interfaces_1.ProblemTestCase({
                id: "TEST_2",
                description: "Bad arguments - Too few",
                maxPoints: 10,
            }),
            new interfaces_1.ProblemTestCase({
                id: "TEST_3",
                description: "Bad arguments - Too many",
                maxPoints: 10,
            }),
        ];
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
    /**
     *
     * @returns An instance of the configuration object
     */
    getProblemConfiguration() {
        let config = new interfaces_1.ProblemConfiguration();
        config.ideEnabled = false;
        config.inputType = interfaces_1.ProblemInputType.GitRepo;
        return config;
    }
    /**
     *
     * @param user The user that is opening this problem
     * @returns A ProblemOpenedResult with information about the action of opening.
     */
    openProblem(user) {
        let openResult = new interfaces_1.ProblemOpenedResult();
        openResult.opened = true;
        openResult.databag.set('date', new Date().getTime().toString());
        openResult.instructions = `
These are instructions.`;
        return Promise.resolve(openResult);
    }
    validate(id, user, testCases, databag, validationInput) {
        return Promise.resolve(testCases);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map
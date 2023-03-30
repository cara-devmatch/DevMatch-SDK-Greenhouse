"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 *
 *
 **/
class Validator {
    getTestCases() {
        return [];
    }
    prerequesites(user) {
        return true;
    }
    getProblemStatement(userId) {
    }
    getProblemConfiguration() {
        return new ProblemConfiguration();
    }
    openProblem(user) {
        return new ProblemOpenedResult();
    }
    validate(id, user, testCases, databag, validationInput) {
        return testCases;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemOpenedResult = exports.ProblemOpenedMetadata = exports.ProblemInputType = exports.ProblemConfiguration = exports.EvaluatedTestCase = exports.ProblemTestCase = exports.User = void 0;
class User {
    id;
    name;
    role;
    email;
    github;
    last_login;
    last_login_pretty;
}
exports.User = User;
class ProblemTestCase {
    id;
    description;
    hint;
    maxPoints;
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.ProblemTestCase = ProblemTestCase;
class EvaluatedTestCase extends ProblemTestCase {
    // After you have evaluated, you need to fill out these
    actualPoints = 0;
    solved = false;
    verdictHint = "";
    constructor(testCase) {
        super(testCase);
    }
}
exports.EvaluatedTestCase = EvaluatedTestCase;
/**
 * Different configurations for this problem, the defaults are defined here.
 */
class ProblemConfiguration {
    inputType = ProblemInputType.GitRepo;
    ideEnabled = false;
}
exports.ProblemConfiguration = ProblemConfiguration;
/**
 * Problems can accept user submisions in a variety of ways, including
 * pushing to a git repo, a url cotaining a website to test, a simple
 * text entry.
 */
var ProblemInputType;
(function (ProblemInputType) {
    ProblemInputType[ProblemInputType["GitRepo"] = 0] = "GitRepo";
    ProblemInputType[ProblemInputType["Url"] = 1] = "Url";
})(ProblemInputType = exports.ProblemInputType || (exports.ProblemInputType = {}));
class ProblemOpenedMetadata {
    databag;
}
exports.ProblemOpenedMetadata = ProblemOpenedMetadata;
class ProblemOpenedResult {
    opened;
    databag;
    instructions;
    static OK;
    static {
        this.OK = new ProblemOpenedResult();
        this.OK.opened = true;
    }
    constructor() {
        this.opened = false;
        this.databag = new Map();
    }
}
exports.ProblemOpenedResult = ProblemOpenedResult;
//# sourceMappingURL=interfaces.js.map
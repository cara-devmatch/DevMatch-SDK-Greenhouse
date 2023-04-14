import { DevMatchValidator, EvaluatedTestCase, ProblemConfiguration, ProblemInputType, ProblemOpenedResult, ProblemTestCase, User } from './interfaces'

export class Validator implements DevMatchValidator{

    getTestCases(): ProblemTestCase[] {
        return [
            new ProblemTestCase({
            id: "TEST_1",
            description: "Add two integers",
            maxPoints: 10,
        }),
        new ProblemTestCase({
            id: "TEST_2",
            description: "Bad arguments - Too few",
            maxPoints: 10,
        }),
        new ProblemTestCase({
            id: "TEST_3",
            description: "Bad arguments - Too many",
            maxPoints: 80,
        }),
        ]
    }

    prerequesites(user: User) {
        // There are no pre-requisites for this problem.
        return true;
    }

    getProblemStatement(userId: string): string {
        return  `The contents of the problem are here!`
    }

    /**
     * @returns An instance of the configuration object
     */
    getProblemConfiguration(): ProblemConfiguration {
        let config = new ProblemConfiguration();
        config.ideEnabled = false;
        config.inputType = ProblemInputType.GitRepo;
        return config;
    }

    /**
     * @param user The user that is opening this problem
     * @returns A ProblemOpenedResult with information about the action of opening.
     */
    openProblem(user: User): Promise<ProblemOpenedResult> {
        let openResult = new ProblemOpenedResult();
        openResult.opened = true;
        openResult.databag.set('date', new Date().getTime().toString())
        openResult.instructions = `These are instructions.`

        return Promise.resolve(openResult)
    }


    validate( id: number, user: User, testCases: EvaluatedTestCase[], databag: Map<string, string>, validationInput?: any,): Promise<EvaluatedTestCase[]> {
        for (let testCase of testCases) {
            testCase.actualPoints = testCase.maxPoints
            testCase.hint = 'here is a hint from the problem for case ' + testCase.id
            testCase.solved = true
        }
        return Promise.resolve(testCases);
    }
}

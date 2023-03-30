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
            maxPoints: 10,
        }),
        ]
    }

    prerequesites(user: User) {
        // There are no pre-requisites for this problem.
        return true;
    }

    getProblemStatement(userId: string): string {
        return  `In this assessment you need to do the follwing:

* First, do this.
* Then do that.

That's it!
`

    }

    /**
     * 
     * @returns An instance of the configuration object
     */
    getProblemConfiguration(): ProblemConfiguration {
        let config = new ProblemConfiguration();
        config.ideEnabled = false;
        config.inputType = ProblemInputType.GitRepo;
        return config;
    }

    /**
     * 
     * @param user The user that is opening this problem
     * @returns A ProblemOpenedResult with information about the action of opening.
     */
    openProblem(user: User): Promise<ProblemOpenedResult> {
        let openResult = new ProblemOpenedResult();
        openResult.opened = true;
        openResult.databag.set('date', new Date().getTime().toString())
        openResult.instructions = `
These are instructions.`

        return Promise.resolve(openResult)
    }


    validate( id: number, user: User, testCases: EvaluatedTestCase[], databag: Map<string, string>, validationInput?: any,): Promise<EvaluatedTestCase[]> {
        return Promise.resolve(testCases);
    }
}

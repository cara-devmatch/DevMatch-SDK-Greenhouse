import { DevMatchValidator, ProblemTestCase } from './interfaces'

/**
 *
 *
 **/
export class Validator implements DevMatchValidator{
    getTestCases(): ProblemTestCase[] {
        return [];
    }

    prerequesites(user: User) {
        return true;
    }

    getProblemStatement(userId: string): string {
    }

    getProblemConfiguration(): ProblemConfiguration {
        return new ProblemConfiguration();
    }

    openProblem(user: User): Promise<ProblemOpenedResult> {
        return new ProblemOpenedResult()
    }

    validate( id: number, user: User, testCases: EvaluatedTestCase[], databag: Map<string, string>, validationInput?: any,): Promise<EvaluatedTestCase[]> {
        return testCases;
    }
}

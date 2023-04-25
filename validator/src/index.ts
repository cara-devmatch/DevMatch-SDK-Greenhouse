// const { program } = require('commander');
import { Command } from '@commander-js/extra-typings';
import { program } from '@commander-js/extra-typings';
import { User } from './interfaces';
import { Validator } from './validator';
import { GitHubPlugin } from './github';
import { UnzipPlugin } from './unzip';
import { LoggerPlugin } from './logger';
import { DevMatchGitServer } from './DevMatchGitServer';
import { StoragePlugin } from './s3';
import { AzureDevOpsPlugin } from './devops';

function log(s) {
    console.log(s)
}

program
    //
    // statement command - Print out the statement to std out
    //
    // // // .command("statement")
    // // // //.option('--double-sided')
    // // // .action((targetFile, options) => {
    // // //     let validator = new Validator();
    // // //     console.log("val...", validator.getProblemStatement('123'))
    // // // })
    //
    // test command - Make sure all the outputes return valid results
    //
    .command("test")
    .action(async (targetFile, options) => {
        let validationFailures : string[] = [];

        // This commands tests codepaths of the problem,
        // first instantiate the validator.
        let validator = new Validator(
            new GitHubPlugin(),
            new UnzipPlugin(),
            new LoggerPlugin(),
            new DevMatchGitServer(),
            new StoragePlugin(),
            new AzureDevOpsPlugin());

        // TODO: Validator must be an instance of DevMatchValidator
        // TODO: DevMatchValidator must have not been tampered with

        // Get the problem configuration
        let problemConfig = await validator.getProblemConfiguration();
        if (problemConfig.ideEnabled) {
            log(`configuration.ideEnabled: ${problemConfig.ideEnabled}`)
            log(`configuration.inputType: ${problemConfig.inputType}`)
        }

        // Validation rule: Test cases must add up to 100
        const problemTestCases = await validator.getTestCases();
        const moreThanOneTestCase = problemTestCases.length > 1;
        if (!moreThanOneTestCase) {
            validationFailures.push("Must have more than one test case.");
        }

        let total = 0;
        for (let testCase of problemTestCases) {
            total += testCase.maxPoints;
        }

        if (total != 100) {
            validationFailures.push("Total points of test cases do not add up to 100")
        }
 
        // Validation rule: Test cases must have unique IDs
        let testCaseIds = problemTestCases.map((t) => t.id)
        for (const testCaseId of testCaseIds) {
            let duplicates = testCaseIds.filter((id) => testCaseId === id);
            if (duplicates.length >= 2) {
                validationFailures.push("ProblemTestCase id's must be unique")
            }
        }

        // Get the problem pre-requisites
        let user : User = new User();
        user.id = "some-user-id"

        let problemPreReq = validator.prerequesites(user)

        // Open the problem
        let problemOpenResult = await validator.openProblem(user);

        // Get the statement
        let problemStatement = await validator.getProblemStatement(user.id)

        console.log("Validation failures: ", validationFailures)
    });

program.parse();

import { CodeReviewTestCase, DevMatchValidator, EvaluatedTestCase, ProblemConfiguration, ProblemInputType, ProblemOpenedResult, ProblemPrerequisitesResult, ProblemTestCase, User } from './interfaces'

import { GitHubPlugin } from './github'
import { LoggerPlugin } from './logger'
import { UnzipPlugin } from './unzip' 
import { DevMatchGitServer } from './DevMatchGitServer'
import { StoragePlugin } from './s3'
import { AzureDevOpsPlugin } from "./devops";

import fs from 'fs'

export class Validator implements DevMatchValidator {
    constructor(
      private githubPlugin: GitHubPlugin,
      private unzipPlugin: UnzipPlugin,
      private logger: LoggerPlugin,
      private gitServer: DevMatchGitServer,
      private storagePlugin: StoragePlugin,
      private devopsClient: AzureDevOpsPlugin){
    }

    async getTestCases(): Promise<ProblemTestCase[]> {
        return Promise.resolve([
            new CodeReviewTestCase({
                id: "SELLING_SOLD_PLANTS",
                description: "The new plant selling endpoint does not consider what happens when we try to sell a plant we have already sold.",
                maxPoints: 100,
                newFileCommentLine: -1
            })
        ])
    }

    async prerequesites(user: User): Promise<ProblemPrerequisitesResult> {
        // There are no pre-requisites for this problem.
        return Promise.resolve(new ProblemPrerequisitesResult(true));
    }

    async getProblemStatement(userId: string): Promise<string> {
        return Promise.resolve(`{diff}`)
        // return Promise.resolve(
// `# The Greenhouse

// Your friends own a large greenhouse, and recently set up some great technology that can care for plants at the push of a button! They have put together an API so they can interact with their new technology from afar using Python's FastAPI framework and SQL. You've been assigned to review a recent pull request to the API that modifies some core functionality.

// # The Database

// ## plants table

// Plants have an \`id (primary key)\`, \`name (varchar)\` (your friends treat their plants like family), \`species (varchar)\`, \`sell_price (float)\`, and \`watering_interval_days (int)\` (which indicates how often that plant need watered).

// ## watering_events table

// This table keeps track of when plants were last watered. A watering event has a \`plant_id (foreign key to plant's id)\` and an \`event_date (datetime)\`.

// ## sales_events table

// This table keeps track of when plants were sold. a sales event has a \`plant_id (foreign key to plant's id)\`, a \`customer_name (varchar)\`, and an \`event_date (datetime)\`.

// Sold plants do not need watered anymore because they are no longer in the greenhouse.

// # Changes For Review

// Selling plants is a new operation for your friends, so the \`sell_price\` field on the \`plants\` table is a new column. Existing endpoints need to reflect this change, and a new endpoint was added to initate a sales event.

// Review the changes made, providing feedback on this pull request including readability, maintainability, and considering edge cases in inputs.

// (The changes are being merged from the \`after-changes\` branch to the \`main\` branch of the repo at \`{repoUrl}\`.)
// `)
    }

    /**
     * @returns An instance of the configuration object
     */
    async getProblemConfiguration(): Promise<ProblemConfiguration> {
        let config = new ProblemConfiguration();
        config.inputType = ProblemInputType.CodeReview;
        return Promise.resolve(config);
    }

    /**
     * @param user The user that is opening this problem
     * @returns A ProblemOpenedResult with information about the action of opening.
     */
    async openProblem(user: User): Promise<ProblemOpenedResult> {
        let openResult = new ProblemOpenedResult();
        const repoUrl = "https://github.com/cara-devmatch/Greenhouse-Code.git"
        const diff = `diff --git a/sample.js b/sample.js
index 0000001..0ddf2ba
--- a/sample.js
+++ b/sample.js
@@ -1 +1 @@
-console.log("Hello World!")
+console.log("Hello from Diff2Html!")`

        openResult.databag.set("diff", diff)
        openResult.databag.set("repoUrl", repoUrl)

        openResult.opened = true;
        openResult.databag.set('date', new Date().getTime().toString())

        return Promise.resolve(openResult)
    }


    async validate( id: number, user: User, testCases: EvaluatedTestCase[], databag: Map<string, string>, validationInput?: any,): Promise<EvaluatedTestCase[]> {
        for (let testCase of testCases) {
            testCase.actualPoints = testCase.maxPoints
            testCase.hint = 'here is a hint from the problem for case ' + testCase.id
            testCase.solved = true
        }
        return Promise.resolve(testCases);
    }
}

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
        const diff = "\n\n--- a/school_crud.py\n+++ b/school_crud.py\n@@ -1,7 +1,107 @@\n import json\n \n class SchoolCRUD:\n+    def validate_input(self, data):\n+        \"\"\"Validates the input data for the API\n+\n+        Args:\n+            data (dict): The data to validate\n+\n+        Returns:\n+            bool: True if the data is valid, False otherwise\n+        \"\"\"\n+        # Validate the data is a dict\n+        if not isinstance(data, dict):\n+            return False\n+\n+        # Validate the required fields\n+        required_fields = [\"name\", \"address\", \"phone\"]\n+        for field in required_fields:\n+            if field not in data:\n+                return False\n+\n+        # Validate the name is a string\n+        if not isinstance(data[\"name\"], str):\n+            return False\n+\n+        # Validate the address is a string\n+        if not isinstance(data[\"address\"], str):\n+            return False\n+\n+        # Validate the phone is a string\n+        if not isinstance(data[\"phone\"], str):\n+            return False\n+\n+        # Validate the phone is a valid phone number\n+        if not re.match(r\"^\\d{3}-\\d{3}-\\d{4}$\", data[\"phone\"]):\n+            return False\n+\n+        # Validate the optional fields\n+        optional_fields = [\"website\", \"principal\"]\n+        for field in optional_fields:\n+            if field in data:\n+                # Validate the website is a string\n+                if field == \"website\" and not isinstance(data[\"website\"], str):\n+                    return False\n+\n+                # Validate the principal is a string\n+                if field == \"principal\" and not isinstance(data[\"principal\"], str):\n+                    return False\n+\n+        # If all the checks pass, the data is valid\n+        return True\n+\n     def create(self, data):\n         \"\"\"Creates a new school\n\n@@ -10,6 +110,7 @@ class SchoolCRUD:\n             return False\n \n         # Validate the data\n+        if not self.validate_input(data):\n             return False\n \n         # Create the school"
        
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

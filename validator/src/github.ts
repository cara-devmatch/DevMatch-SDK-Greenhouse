
export class GitHubPlugin {

  public async test() {
    return `inside the problem`;
    }

  public async inviteUserToRepo(githubUser: string, repoFullName: string) {
  }

  public async userExists(githubUser: string) : Promise<boolean> {
    return Promise.resolve(true);
  }

  public canUserHaveAccessToRepo(githubUser: string, repoFullName: string) : Promise<boolean> {
    return Promise.resolve(true);
  }

  public createIssue( githubUser: string, repoFullName: string, title, body, assignees: Array<string>, labels: Array<string>,) {

  }

  public async findForkedRepoForUser(username: string, repoName: string) {
  }

  public async getWorkflow(repoFullName: string, workflowId: string) {
  }

  public async findWorkflowsForPr(repoFullName: string, pullRequestNumber: string, owner: string) {
  }

  public async findWorkflowForRepo(repoFullName: string) {
  }

  public async triggerWorkflow( repoFullName: string, workflowId: string, inputs: any,): Promise<Number> {
    return Promise.resolve(0);
  }

  public async getArtifactsForWorkflow(repoFullName: string, id: number) {
  }

  public async download(repoFullName: string, id: number) {
  }

  public async findPrFromUser(githubUser: string, repoFullName: string) {
  }
}


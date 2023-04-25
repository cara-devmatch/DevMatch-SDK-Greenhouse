
export class AzureDevOpsPlugin {
    public constructor() {

    }

    public queue(...args) {

    }

    public async getFileContentsFromArtifact(...args) : Promise<any> {}

    public async getBuild(projectName, buildId) : Promise<any> {}

    public put(path: string, contents: string) : Promise<void> {
        return Promise.resolve()
    }
  }
  
  

export class AzureDevOpsPlugin {
    public constructor() {
    }

    public queue(...args) {
    }

    public async getFileContentsFromArtifact(...args) : Promise<any> {
    }

    public async getBuild(projectName, buildId) : Promise<any> {
        return Promise.resolve({ status: 2 })
    }

    public put(path: string, contents: string) : Promise<void> {
        return Promise.resolve()
    }
  }
  
  
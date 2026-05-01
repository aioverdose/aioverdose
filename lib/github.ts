import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_REPO_OWNER || 'aioverdose';
const repo = process.env.GITHUB_REPO_NAME || 'aioverdose';

export async function getFileContents(path: string): Promise<string> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if ('content' in response.data) {
      return Buffer.from(response.data.content, 'base64').toString('utf-8');
    }

    throw new Error('File not found');
  } catch (error) {
    throw new Error(`Failed to read file ${path}: ${error}`);
  }
}

export async function getRepoTree(): Promise<string[]> {
  try {
    const response = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: 'main',
      recursive: '1',
    });

    return response.data.tree
      .filter((item) => item.type === 'blob')
      .map((item) => item.path)
      .filter(
        (path) =>
          !path.includes('node_modules') &&
          !path.includes('.next') &&
          !path.includes('.git')
      );
  } catch (error) {
    throw new Error(`Failed to get repo tree: ${error}`);
  }
}

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export async function commitChanges(
  files: FileChange[],
  message: string
): Promise<string> {
  try {
    const mainBranch = await octokit.repos.getBranch({
      owner,
      repo,
      branch: 'main',
    });

    const baseTreeSha = mainBranch.data.commit.commit.tree.sha;

    const treeItems = await Promise.all(
      files.map(async (file) => {
        if (file.action === 'delete') {
          return null;
        }

        const blob = await octokit.git.createBlob({
          owner,
          repo,
          content: file.content,
          encoding: 'utf-8',
        });

        return {
          path: file.path,
          mode: '100644' as const,
          type: 'blob' as const,
          sha: blob.data.sha,
        };
      })
    );

    const tree = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: treeItems.filter((item) => item !== null) as any[],
    });

    const commit = await octokit.git.createCommit({
      owner,
      repo,
      message,
      tree: tree.data.sha,
      parents: [mainBranch.data.commit.sha],
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.data.sha,
    });

    return commit.data.sha;
  } catch (error) {
    throw new Error(`Failed to commit changes: ${error}`);
  }
}

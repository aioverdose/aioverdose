import Anthropic from '@anthropic-ai/sdk';
import { getRepoTree, getFileContents } from './github';

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface DevAgentResponse {
  explanation: string;
  files: FileChange[];
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function buildSystemPrompt(): Promise<string> {
  try {
    const tree = await getRepoTree();

    const keyFiles = [
      'app/page.tsx',
      'app/layout.tsx',
      'components/Hero.tsx',
      'components/Navbar.tsx',
      'lib/admin-auth.ts',
      'middleware.ts',
      'tailwind.config.ts',
    ];

    const fileContents: Record<string, string> = {};

    for (const file of keyFiles) {
      try {
        fileContents[file] = await getFileContents(file);
      } catch {
        // File might not exist, skip it
      }
    }

    const fileList = tree
      .slice(0, 50)
      .map((f) => `  - ${f}`)
      .join('\n');

    return `You are an expert developer assistant for a Next.js 15 project. Your job is to help the user make code changes to their repository.

## Project Structure
${fileList}

## Key Files
${Object.entries(fileContents)
  .map(
    ([path, content]) => `
### ${path}
\`\`\`
${content}
\`\`\`
`
  )
  .join('\n')}

## Instructions
1. The user will ask you to make code changes to the project.
2. Analyze the request and provide a list of files to create, update, or delete.
3. For each file, provide the complete new content (or updated content if modifying).
4. Return your response as a JSON object with this structure:
{
  "explanation": "Brief explanation of what you changed and why",
  "files": [
    {
      "path": "path/to/file.tsx",
      "action": "create" | "update" | "delete",
      "content": "complete file content (empty string for delete)"
    }
  ]
}

## Important Notes
- Do not modify lib/admin-auth.ts or middleware.ts without explicit permission.
- Always use TypeScript for .ts/.tsx files.
- Follow existing code patterns and styling conventions.
- Include proper error handling and type safety.
- Use Tailwind CSS for styling components.
- Do not create unnecessary files or duplicate functionality.

Return ONLY valid JSON, no other text.`;
  } catch (error) {
    console.error('Error building system prompt:', error);
    // Return a minimal system prompt if building the full one fails
    return `You are an expert developer assistant for a Next.js 15 React project. Help the user make code changes. Return responses as JSON with structure: { "explanation": string, "files": [{ "path": string, "action": "create"|"update"|"delete", "content": string }] }`;
  }
}

export async function generateCodeChanges(
  userMessage: string
): Promise<DevAgentResponse> {
  try {
    const systemPrompt = await buildSystemPrompt();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Extract JSON from the response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      explanation: parsed.explanation || 'Changes generated',
      files: parsed.files || [],
    };
  } catch (error) {
    throw new Error(
      `Failed to generate code changes: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

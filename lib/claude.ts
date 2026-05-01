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

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

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
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    const systemPrompt = await buildSystemPrompt();

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://aioverdose.com',
        'X-Title': 'aioverdose',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response content from OpenRouter');
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
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

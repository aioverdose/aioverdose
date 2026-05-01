import { NextRequest, NextResponse } from 'next/server';
import { commitChanges } from '@/lib/github';

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files, message } = body;

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'Files array is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Commit message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // Validate files
    const validatedFiles: FileChange[] = files.map((file: any) => ({
      path: file.path,
      content: file.content || '',
      action: file.action,
    }));

    const commitSha = await commitChanges(
      validatedFiles,
      message
    );

    // Build Vercel URL (adjust based on your project)
    const vercelUrl =
      process.env.VERCEL_URL || 'https://aioverdose.com';

    return NextResponse.json({
      success: true,
      commitSha,
      vercelUrl,
      message: 'Changes committed successfully. Vercel will deploy shortly.',
    });
  } catch (error) {
    console.error('Apply changes error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to apply changes',
      },
      { status: 500 }
    );
  }
}

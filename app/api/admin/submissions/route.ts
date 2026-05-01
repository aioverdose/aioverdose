import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const SUBMISSIONS_FILE = join(process.cwd(), 'data', 'submissions.json');

async function readSubmissions(): Promise<Submission[]> {
  try {
    const data = await readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeSubmissions(submissions: Submission[]): Promise<void> {
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const submissions = await readSubmissions();
    return NextResponse.json(submissions.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read submissions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    const submissions = await readSubmissions();
    const index = submissions.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    submissions[index].read = typeof read === 'boolean' ? read : !submissions[index].read;
    await writeSubmissions(submissions);

    return NextResponse.json(submissions[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    const submissions = await readSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);

    if (submissions.length === filtered.length) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    await writeSubmissions(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}

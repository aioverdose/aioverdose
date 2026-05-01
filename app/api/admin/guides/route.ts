import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  datePublished: string;
  dateModified: string;
  published: boolean;
  body: string;
}

const GUIDES_FILE = join(process.cwd(), 'data', 'guides.json');

async function readGuides(): Promise<Guide[]> {
  try {
    const data = await readFile(GUIDES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeGuides(guides: Guide[]): Promise<void> {
  await writeFile(GUIDES_FILE, JSON.stringify(guides, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const guides = await readGuides();
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read guides' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const guides = await readGuides();

    const newGuide: Guide = {
      id: Date.now().toString(),
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      author: body.author || 'Admin',
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      published: false,
      body: body.body,
    };

    guides.push(newGuide);
    await writeGuides(guides);

    return NextResponse.json(newGuide, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create guide' },
      { status: 500 }
    );
  }
}

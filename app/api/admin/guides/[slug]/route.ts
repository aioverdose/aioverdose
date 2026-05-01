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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const guides = await readGuides();
    const guide = guides.find((g) => g.slug === slug);

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    return NextResponse.json(guide);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read guide' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const guides = await readGuides();
    const index = guides.findIndex((g) => g.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    const updatedGuide: Guide = {
      ...guides[index],
      title: body.title,
      excerpt: body.excerpt,
      author: body.author || guides[index].author,
      body: body.body,
      published: body.published !== undefined ? body.published : guides[index].published,
      dateModified: new Date().toISOString().split('T')[0],
    };

    guides[index] = updatedGuide;
    await writeGuides(guides);

    return NextResponse.json(updatedGuide);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const guides = await readGuides();
    const filteredGuides = guides.filter((g) => g.slug !== slug);

    if (guides.length === filteredGuides.length) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    await writeGuides(filteredGuides);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete guide' },
      { status: 500 }
    );
  }
}

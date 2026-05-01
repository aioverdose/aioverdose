import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const CONTENT_FILE = join(process.cwd(), 'data', 'site-content.json');

async function readContent(): Promise<SiteContent> {
  try {
    const data = await readFile(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      hero: {
        title: '',
        subtitle: '',
        cta: '',
      },
      faqs: [],
    };
  }
}

async function writeContent(content: SiteContent): Promise<void> {
  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const content = await readContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const content: SiteContent = {
      hero: {
        title: body.hero?.title || '',
        subtitle: body.hero?.subtitle || '',
        cta: body.hero?.cta || '',
      },
      faqs: Array.isArray(body.faqs)
        ? body.faqs.map((faq: any) => ({
            question: faq.question || '',
            answer: faq.answer || '',
          }))
        : [],
    };

    await writeContent(content);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

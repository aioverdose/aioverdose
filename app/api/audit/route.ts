import { NextRequest, NextResponse } from 'next/server';
import { analyzeURL, analyzeHTML } from '@/lib/audit/analyzer';

const resultCache = new Map<string, { result: any; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, html } = body;

    if (!url && !html) {
      return NextResponse.json({ error: 'Either url or html is required' }, { status: 400 });
    }

    // Check cache for URL-based requests
    if (url && !html) {
      const cacheKey = `url:${url}`;
      const cached = resultCache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ ...cached.result, fromCache: true });
      }

      try {
        const result = await analyzeURL(url);

        // Store in cache
        resultCache.set(cacheKey, { result, timestamp: Date.now() });

        return NextResponse.json(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
          {
            error: errorMessage,
            suggestions: [
              'Check that the URL is valid and publicly accessible',
              'If you get a CORS error, try pasting the HTML directly',
              'Some JavaScript-heavy sites may show limited analysis',
            ],
          },
          { status: 400 }
        );
      }
    }

    // HTML-based analysis
    if (html) {
      try {
        const result = analyzeHTML(html);
        return NextResponse.json(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to parse HTML';

        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Audit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
  }

  const cacheKey = `url:${url}`;
  const cached = resultCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ ...cached.result, fromCache: true });
  }

  return NextResponse.json({ error: 'No cached result found' }, { status: 404 });
}

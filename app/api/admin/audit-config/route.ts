import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface AuditConfig {
  weights: {
    structure: number;
    schema: number;
    content: number;
    faq: number;
    trust: number;
    technical: number;
  };
  thresholds: {
    pass: number;
    warning: number;
    fail: number;
  };
}

const CONFIG_FILE = join(process.cwd(), 'data', 'audit-config.json');

async function readConfig(): Promise<AuditConfig> {
  try {
    const data = await readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      weights: {
        structure: 0.2,
        schema: 0.2,
        content: 0.2,
        faq: 0.15,
        trust: 0.15,
        technical: 0.1,
      },
      thresholds: {
        pass: 70,
        warning: 50,
        fail: 0,
      },
    };
  }
}

async function writeConfig(config: AuditConfig): Promise<void> {
  await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const config = await readConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read audit config' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const config: AuditConfig = {
      weights: {
        structure: body.weights?.structure ?? 0.2,
        schema: body.weights?.schema ?? 0.2,
        content: body.weights?.content ?? 0.2,
        faq: body.weights?.faq ?? 0.15,
        trust: body.weights?.trust ?? 0.15,
        technical: body.weights?.technical ?? 0.1,
      },
      thresholds: {
        pass: body.thresholds?.pass ?? 70,
        warning: body.thresholds?.warning ?? 50,
        fail: body.thresholds?.fail ?? 0,
      },
    };

    await writeConfig(config);
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update audit config' },
      { status: 500 }
    );
  }
}

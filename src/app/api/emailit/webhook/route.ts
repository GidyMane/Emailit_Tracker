import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // We'll create this helper next

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract webhook data structure from Emailit (mock example)
    const {
      email,
      event,
      timestamp,
      messageId,
      subject,
      domain,
      status,
    } = body;

    // Save to your database
    await prisma.emailEvent.create({
      data: {
        email,
        event,
        timestamp: new Date(timestamp),
        messageId,
        subject,
        domain,
        status,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}

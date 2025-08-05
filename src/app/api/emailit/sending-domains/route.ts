import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const response = await fetch('https://api.emailit.com/v1/sending-domains', {
      headers: {
        Authorization: `Bearer ${process.env.EMAILIT_API_KEY!}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    for (const domain of data.data) {
      await prisma.domain.upsert({
        where: { name: domain.name },
        update: {
          updatedAt: new Date(),
        },
        create: {
          name: domain.name,
    
         
        },
      });
    }

    return NextResponse.json({ message: 'Domains synced successfully' });
  } catch (err) {
    console.error('Sync error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

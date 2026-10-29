import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { enquirySchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        studentClass: data.studentClass || null,
        board: data.board || null,
        interest: data.interest || null,
        learningFormat: data.learningFormat || null,
        message: data.message || null,
        consentGiven: data.consentGiven,
        source: 'WEBSITE',
      },
      select: {
        referenceNo: true,
      },
    });

    return NextResponse.json({
      message: 'Thank you for your enquiry! We will get back to you soon.',
      referenceNo: enquiry.referenceNo,
    }, { status: 201 });
  } catch (error) {
    console.error('Enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface AccountProps {
  isTeacher: boolean;
  name: string;
  grade?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {name, grade } = body as AccountProps;


      const newStudent = await prisma.student.create({
        data: {
          name,
          grade: Number(grade),
        },
      });
      return NextResponse.json({ results: newStudent }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

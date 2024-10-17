import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth'; // Adjust the import path as necessary

interface AccountProps {
  name: string;
  grade?: number;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, grade, email, password } = body as AccountProps;

    const newStudent = await createUser(name, grade ?? 0, email, password);
    return NextResponse.json({ results: newStudent }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

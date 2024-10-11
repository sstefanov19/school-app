import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


interface ClassProps {
    teacher: string;
    grade: number;
    subject: string;
}


export async function GET() {
    try {
        const classes = await prisma.classes.findMany();
        console.log('Database Response:', classes);
        return NextResponse.json({ results: classes }, { status: 200 });
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const {teacher , grade , subject} = body as ClassProps;

       console.log('Request Body:', body);

        const newClass = await prisma.classes.create({
            data : {
                teacher,
                grade,
                subject
            }

        })

        return NextResponse.json({ results: newClass }, { status: 201});
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

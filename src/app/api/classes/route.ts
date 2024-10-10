import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const classes = await prisma.classes.findMany();
        console.log('Database Response:', classes); // Log the database response
        return NextResponse.json({ results: classes }, { status: 200 });
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

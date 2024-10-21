import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
try{
    const assignments = await prisma.assignement.findMany();
    console.log(assignments);

    return NextResponse.json({results : assignments} , {status: 200});
}catch(error) {
    console.error("Error", error);
    return NextResponse.json({error : "Internal Server Error"} , {status: 500});

}

}


export async function POST(req : NextRequest) {

    try {

        const body = await req.formData();
        console.log("Request Body:", body);
        const title = body.get('title') as string;
        const description = body.get('description') as string;
        const dueDate = body.get('dueDate') as string;
        const grade = parseInt(body.get('grade') as string, 10);
        const subject = body.get('subject') as string;

        const newAssignment = await prisma.assignement.create({
            data: {
                title,
                description,
                due_date: new Date(dueDate),
                grade,
                subject,
            },
        });

        return NextResponse.json({results : newAssignment} , {status : 201});

    } catch (error) {
        console.log("Error " , error);
        return NextResponse.json({error : "Internal Server Error"} , {status : 500});
    }

}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(req : NextRequest) {

    try {

        const body = await req.json();
        console.log("Body -  " , body)
        const {studentId , assignmentId , fileUrl  , name} = body;

        if(!studentId || !assignmentId) return NextResponse.json({error: "StudentId and AssignmentId are required"}, {status: 400});



        const completeAssignment = await prisma.completedAssignment.create({
            data: {
                studentId,
                assignmentId,
                name,
                fileUrl
            }
        })

    return NextResponse.json({results : completeAssignment} , {status : 201});

    } catch (error) {
        console.log("Error " , error);
        return NextResponse.json({error : "Internal Server Error"} , {status : 500});

    }
}

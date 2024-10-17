import prisma from "@/lib/db";
import { NextResponse } from "next/server";


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

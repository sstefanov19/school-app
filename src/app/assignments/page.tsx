"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query';

export default function Assignemnts() {

    const { data: session, status } = useSession()

    const fetchAssignments = async () => {
        const response = await fetch('/api/assignments');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.results;
    }

    const { data: assignments = [], error } = useQuery({
        queryKey: ['assignments'],
        queryFn: fetchAssignments,
    })

    if (status === "loading") return <div>Loading...</div>
    if (error) return <div>Error loading assignments</div>


    console.log("Assignments", assignments);

    if (!Array.isArray(assignments)) {
        return <div>Unexpected data format</div>
    }


    const filteredAssignemnts = assignments.filter((assignments) => session?.user.grade === assignments.grade);

    if (filteredAssignemnts.length === 0) return <div className='font-bold text-center md:text-4xl text-xl'>No subjects found for your grade</div>;

    return (
        <div>
            {filteredAssignemnts.map((assignment: { id: React.Key | null | undefined; title: string; description: string }) => (
                <div key={assignment.id}>
                    <h1>{assignment.title}</h1>
                    <p>{assignment.description}</p>
                </div>
            ))}
        </div>
    )
}

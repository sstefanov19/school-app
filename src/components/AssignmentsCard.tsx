"use client";
import React, { Suspense, useState } from "react";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import AssignmentModal from "./AssignmentModal";

export default function AssignmentsCard(): JSX.Element {
  interface Assignment {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    grade: string;
  }

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const fetchAssignments = async () => {
    const response = await fetch("/api/assignments");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  };

  const { data: assignments = [], error } = useQuery({
    queryKey: ["assignments"],
    queryFn: fetchAssignments,
  });






  if (error) return <div>Error loading assignments</div>;



  if (!Array.isArray(assignments)) {
    return <div>Unexpected data format</div>;
  }

  const filteredAssignemnts = assignments.filter(
    (assignments) => session?.user.grade === assignments.grade
  );

  if (filteredAssignemnts.length === 0)
    return (
      <div className="font-bold text-center md:text-4xl text-xl">
        No subjects found for your grade
      </div>
    );

  const handleModelOpen =  (assignment: Assignment) => {
     setSelectedAssignment(assignment);
    setIsModalOpen(true);

  };

  const handleModelClose = () => {
    setIsModalOpen(false);

    setSelectedAssignment(null);
  };



  return (
    <div className="flex flex-col mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignemnts.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg">{assignment.title}</span>
                <Badge variant={assignment.status === "Submitted" ? "default" : "secondary"}>
                  {assignment.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleModelOpen(assignment)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isModalOpen && selectedAssignment && (
        <AssignmentModal
          closeModal={handleModelClose}
          assignmentId={selectedAssignment.id}
          studentId={session?.user?.id ?? 0}
        />
      )}
    </div>
  );
}

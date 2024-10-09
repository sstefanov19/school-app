import ClassesCard from "@/components/ClassesCard";
import React from "react";

export default function Classes() {


    const subjects = [
        {
            id : 1,
            name : "Math",
        },
        {
            id :2,
            name : "Physics",
        },
        {
            id: 3,
            name : "History",
        },
        {
            id : 4,
            name : "Biology",
        },
        {
            id : 5,
            name : "Gym",
        },
        {
            id : 6,
            name : "English",
        },
        {
            id : 7,
            name : "Chemistry",
        },
        {
            id : 8,
            name : "Art",
        }
    ]

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-full mx-16 mt-4 grid xl:grid-cols-4 2xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10  ">
        {subjects.map((subject) => (
            <ClassesCard key={subject.id} name={subject.name} />
        ))}
      </div>
    </div>
  );
}

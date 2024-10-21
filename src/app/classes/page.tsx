"use client";
import { useSession } from 'next-auth/react';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ClassesCard from '@/components/ClassesCard';

interface Subject {
  id: number;
  subject: string;
  grade: number;
  teacher: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      grade?: number | null;
    };
  }
}

const fetchSubject = async (): Promise<Subject[]> => {
  const response = await axios.get<{ results: Subject[] }>('/api/classes');
  console.log(response.data.results);
  return response.data.results;
};

export default function Classes(): JSX.Element {
  const { data: session, status } = useSession();
  const { data: subjects = [], isLoading, error } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubject,
  });


  if (status === "loading") return <div className='font-bold text-center md:text-4xl text-xl'>Loading...</div>;
  if (status === "unauthenticated") return <div className='font-bold text-center md:text-4xl text-xl'>Please log in to view classes</div>;

  const userGrade = session?.user?.grade;

  console.log("grade " , userGrade);
  if (isLoading) return <div className='font-bold text-center md:text-4xl text-xl'>Loading...</div>;
if (error) return <div className='font-bold text-center md:text-4xl text-xl'>Error loading subjects</div>;

  const filteredSubjects = subjects.filter(subject => subject.grade === userGrade);

  if (filteredSubjects.length === 0) return <div className='font-bold text-center md:text-4xl text-xl'>No subjects found for your grade</div>;

  return (
    <div className="min-h-screen flex justify-center bg-zinc-300">
      <div className="w-full mx-16 mt-4 grid gap-x-10 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {filteredSubjects.map((subject: Subject) => (
          <ClassesCard key={subject.id} {...subject} />
        ))}
      </div>
    </div>
  );
}

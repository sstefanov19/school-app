"use client";

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

const fetchSubject = async (): Promise<Subject[]> => {
  const response = await axios.get<{ results: Subject[] }>('/api/classes');
  console.log(response.data.results);
  return response.data.results;

};

export default function Classes(): JSX.Element {
  const { data: subjects = [], isLoading, error } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubject,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subjects</div>;

  if(subjects.length === 0) return <div>No subjects found</div>;

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-full mx-16 mt-4 grid gap-x-10 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {subjects.map((subject: Subject) => (
          <ClassesCard key={subject.id} {...subject} />
        ))}
      </div>
    </div>
  );
}

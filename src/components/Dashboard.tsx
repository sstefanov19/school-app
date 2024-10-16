"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  role: z.enum(['teacher', 'student']),
  name: z.string().nonempty('Name is required'),
  grade: z.preprocess((val) => Number(val), z.number().nonnegative('Invalid grade').refine(value => value !== 0, {
    message: 'Grade cannot be zero',
  })).optional(),
});

export default function CreateClasses() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      grade: 0,
    },
  });

  const handleSubmit = async (data : { role: 'teacher' | 'student'; name: string; grade?: number; }) => {
    try {
      const response = await fetch('/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          grade: data.grade,
        }),
      });

      if (response.ok) {
        console.log('Class created');
        form.reset();
      } else {
        const errorData = await response.json();
        console.error('Failed to create class:', errorData);
        alert(`Failed to create class: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className='min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-gray-200 to-gray-100'>
      <h1 className='text-black text-4xl font-bold mt-16 mb-8'>Register Teacher/Student</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-6 bg-zinc-600 p-8 rounded-lg shadow-lg'>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='text'
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Name'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )} />
          {role === 'student' && (
            <>
              <FormField control={form.control} name="grade" render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white font-bold text-lg mb-2'>Grade</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='number'
                      className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Grade'
                    />
                  </FormControl>
                  <FormMessage>{form.formState.errors.grade?.message}</FormMessage>
                </FormItem>
              )} />
            </>
          )}
          <Button type='submit' className='w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

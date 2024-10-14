"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';



const formSchema = z.object({
    teacher: z.string().nonempty('Teacher name is required'),
    grade: z.preprocess((val) => Number(val), z.number().nonnegative('Invalid grade').refine(value => value !== 0, {
        message: 'Grade cannot be zero',
    })),
    subject: z.string().min(3, 'Subject should be valid'),
});

export default function CreateClasses() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teacher: '',
            grade: 0,
            subject: '',
        },
    });

    const { toast } = useToast();

    const handleSubmit = async (data: { teacher: string; grade: number; subject: string }) => {
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Class created');
        toast({
            title: 'Class created successfully',
            description: 'Thanks for adding a new class',

        });
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
      <h1 className='text-zinc-700 text-4xl font-bold mt-16 mb-8'>Create Class</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-6 bg-zinc-600 p-8 rounded-lg shadow-lg'>
          <FormField control={form.control} name="teacher" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-zinc-200 font-bold text-lg mb-2'>Teacher</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='text'
                  className='w-full p-3 rounded-lg bg-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Teacher Name'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.teacher?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="grade" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-zinc-200 font-bold text-lg mb-2'>Grade</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='number'
                  className='w-full p-3 rounded-lg bg-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Teaching grade'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.grade?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-zinc-200 font-bold text-lg mb-2'>Subject</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className='w-full p-3 rounded-lg bg-zinc-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Subject...'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.subject?.message}</FormMessage>
            </FormItem>
          )} />
          <Button type='submit' className='w-full p-3 rounded-lg bg-zinc-800 text-white font-bold hover:bg-blue-900 transition-colors'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

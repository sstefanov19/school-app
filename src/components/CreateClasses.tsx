"use client"
import React, { useEffect, useState } from 'react';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';



const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  grade: z.number().nonnegative('Invalid grade').refine(value => value !== 0, {
    message: 'Grade cannot be zero',
  }),
  question: z.string().min(3, 'Subject should be valid'),
});

export default function CreateClasses() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      grade: 0,
      subject: '',
    },
  });

  const handleSubmit = (data: { name: string; grade: number; subject: string }) => {
    console.log('Submitted', data);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className='min-h-screen flex flex-col items-center  p-8 bg-gradient-to-br from-gray-200 to-gray-100'>
      <h1 className='text-black text-4xl font-bold mt-16 mb-8'>Create</h1>
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
                  placeholder='Your Name'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="grade" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Grade</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='number'
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Teaching grade'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.grade?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Subject</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Subject...'
                ></input>
              </FormControl>
              <FormMessage>{form.formState.errors.subject?.message}</FormMessage>
            </FormItem>
          )} />
          <Button type='submit' className='w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

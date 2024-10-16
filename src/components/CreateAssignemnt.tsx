"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';



export default function CreateAssignemnt() {


    const formSchema = z.object({
        date: z.string().nonempty('Date is required'),
        grade: z.preprocess((val) => Number(val), z.number().nonnegative('Invalid grade').refine(value => value !== 0, {
            message: 'Grade cannot be zero',
        })),
        subject: z.string().min(3, 'Subject should be valid'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            grade: 0,
            date : '',
        },
    });

    function handleSubmit() {
        console.log("KUR");
    }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-6 bg-zinc-600 p-8 rounded-lg shadow-lg'>
          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-zinc-200 font-bold text-lg mb-2'>Subject</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='text'
                  className='w-full p-3 rounded-lg bg-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Teacher Name'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.subject?.message}</FormMessage>
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
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-zinc-200 font-bold text-lg mb-2'>Date</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className='w-full p-3 rounded-lg bg-zinc-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Subject...'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.date?.message}</FormMessage>
            </FormItem>
          )} />
          <Button type='submit' className='w-full p-3 rounded-lg bg-zinc-800 text-white font-bold hover:bg-blue-900 transition-colors'>
            Submit
          </Button>
        </form>
      </Form>
  )
    }

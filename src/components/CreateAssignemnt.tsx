"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export default function CreateAssignment() {
    const formSchema = z.object({
        title: z.string().nonempty('Title is required'),
        description: z.string().nonempty('Description is required'),
        dueDate: z.string().nonempty('Due date is required'),
        grade: z.preprocess((val) => Number(val), z.number().nonnegative('Invalid grade').refine(value => value !== 0, {
            message: 'Grade cannot be zero',
        })),
        subject: z.string().min(3, 'Subject should be valid'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            grade: 0,
            subject: '',
        },
    });

   async function handleSubmit(data: { title: string; description: string; dueDate: string; grade: number; subject: string }) {
        console.log("Form Data:", data);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('dueDate', data.dueDate);
        formData.append('grade', data.grade.toString());
        formData.append('subject', data.subject);

        try {

            const response = await fetch('/api/assignments', {
                method : "POST",
                body : formData
            })

            const data = await response.json();
            console.log("Assignment Created:", data);

        } catch (error) {
            console.error("Error", error);
        }

    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <input className="border-2 rounded-md p-2 w-full" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea className="border-2 rounded-md p-2 w-full" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="dueDate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                                <input className="border-2 rounded-md p-2 w-full" {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="grade" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                                <input className="border-2 rounded-md p-2 w-full" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <input className="bordepor-2 rounded-md p-2 w-full" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

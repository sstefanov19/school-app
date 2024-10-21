import React from 'react';
import ReactDOM from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface AssignmentModalProps {
  closeModal: () => void;
  assignmentId: number;
  studentId: number;
}

export default function AssignmentModal({ closeModal, assignmentId, studentId }: AssignmentModalProps) {
  const formSchema = z.object({
    name: z.string().nonempty('Name is required'),
    fileUrl: z.instanceof(File).refine(file => file.size > 0, {
      message: 'File is required',
    }),
  });




  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      fileUrl: null,
    },
  });

  async function handleSubmit(data: { name: string; fileUrl: File | null }) {
    const formData = new FormData();
    formData.append('studentId', studentId.toString());
    formData.append('assignmentId', assignmentId.toString());
    const fileUrl = data.fileUrl;
    if (fileUrl) {
      formData.append('fileUrl', fileUrl);
    }

    formData.append('name' , data.name);

    console.log("Data ,  " , data);


    console.log("FormData ,  " , formData);

    try {
      const response = await fetch('/api/completed', {
        method: 'POST',
        body: formData,
      });


      if (!response.ok) {
        throw new Error('Failed to submit assignment');
      }

      const result = await response.json();
      console.log('Assignment submitted successfully:', result);
      closeModal();
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  }

  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
    <div className='bg-white w-full max-w-lg h-auto border-black border-2 p-6 rounded-lg shadow-lg'>
      <Button variant="outline" className="mt-4" onClick={closeModal}>
        Close
      </Button>
      <Form {...form}>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input className='border-2 rounded-md p-2 w-full' {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="fileUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Completed Assignment</FormLabel>
              <FormControl>
                <input className='border-2 rounded-md p-2 w-full' type="file" onChange={(e) => field.onChange(e.target.files?.[0])} onBlur={field.onBlur} name={field.name} ref={field.ref} />
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
  </div>,
    document.getElementById('modal-root')!
  );
}

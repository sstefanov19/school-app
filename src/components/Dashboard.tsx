"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import AuthorizedUser from "./AuthorizedUser";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  grade: z.preprocess((val) => Number(val), z.number().nonnegative("Invalid grade").refine(value => value !== 0, {
    message: "Grade cannot be zero",
  })),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
});

export default function Dashboard() {
  const { data: session, status } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grade: 0,
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        form.reset();
        // Sign in as the newly created user
        await signIn("credentials", {
          redirect: false,
          email: userData.email,
          password: data.password, // Use the password from the form data
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to create student:", errorData);
        alert(`Failed to create student: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }


  if (status === "authenticated") {
    return (
      <AuthorizedUser session={session} />
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-gray-200 to-gray-100">
      <h1 className="text-black text-4xl font-bold mt-16 mb-8">Student</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-6 bg-zinc-600 p-8 rounded-lg shadow-lg">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold text-lg mb-2">Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="grade" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold text-lg mb-2">Grade</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="number"
                  className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Grade"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.grade?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold text-lg mb-2">Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="password"
                  className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )} />
          <Button type="submit">Create Student</Button>
        </form>
      </Form>
    </main>
  );
}

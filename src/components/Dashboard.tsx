"use client";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import AuthorizedUser from "./AuthorizedUser";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>You are not signed in.</p>
        <Button onClick={() => signIn()} className="mt-4">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AuthorizedUser session={session} />
    </div>
  );
}

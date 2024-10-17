"use client";
import { SessionProvider } from "next-auth/react";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
        <SessionProvider>
            <Dashboard />
        </SessionProvider>

  );
}

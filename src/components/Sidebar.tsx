"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  CalendarPlus,
  UserPlus,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const teacher = true;

  return (
    <aside className="w-64 bg-gradient-to-tr from-zinc-600 to-zinc-400 text-primary-foreground">
      <div className="p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">EduOrganizer</h1>
        </Link>
      </div>
      <nav className="mt-6">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-primary-foreground bg-primary/10 hover:bg-primary/20"
        >
          <Home className="w-5 h-5 mr-2" />
          Dashboard
        </Link>
        {pathname != "/classes" && (
          <Link
            href="/classes"
            className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20"
          >
            <Users className="w-5 h-5 mr-2" />
            Classes
          </Link>
        )}
        {teacher && pathname === "/classes" && (
          <Link
            href="/create-class"
            className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Class
          </Link>
        )}
        {pathname != "/assignments" && (
          <Link
            href="/assignments"
            className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Assignments
          </Link>
        )}
        {teacher && pathname === "/assignments" && (
          <>
            <Link
              href="/create-assignment"
              className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20"
            >
              <CalendarPlus className="w-5 h-5 mr-2" />
              Create Assignment
            </Link>
          </>
        )}
        <Link
          href="/schedule"
          className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule
        </Link>
      </nav>
    </aside>
  );
}

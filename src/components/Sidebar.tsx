import React from 'react'
import { BookOpen, Calendar, Home, Users } from "lucide-react"
import Link from 'next/link'
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-primary to-primary-foreground text-primary-foreground">
    <div className="p-4">
    <Link href="/">
      <h1 className="text-2xl font-bold">EduOrganizer</h1>
        </Link>
    </div>
    <nav className="mt-6">
      <Link href="/" className="flex items-center px-4 py-2 text-primary-foreground bg-primary/10 hover:bg-primary/20">
        <Home className="w-5 h-5 mr-2" />
        Dashboard
      </Link>
      <Link href="/classes" className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20">
        <Users className="w-5 h-5 mr-2" />
        Classes
      </Link>
      <a href="#" className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20">
        <BookOpen className="w-5 h-5 mr-2" />
        Assignments
      </a>
      <a href="#" className="flex items-center px-4 py-2 mt-1 text-primary-foreground hover:bg-primary/20">
        <Calendar className="w-5 h-5 mr-2" />
        Schedule
      </a>
    </nav>
  </aside>
  )
}

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";


const account  = "Teacher";

export default function Header() {
  return (
    <header className="bg-gradient-to-tr from-zinc-400 to-zinc-600 text-secondary-foreground shadow-md">
    <div className="flex items-center justify-between px-6 py-4">
        {account === "Teacher" ?
      <h2 className="text-xl text-white font-semibold">Teacher Dashboard</h2>
        :   <h2 className="text-xl font-semibold">Student Dashboard</h2> }

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-secondary-foreground bg-slate-50 hover:bg-secondary/20"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar>
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt="Teacher"
          />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
   )
}

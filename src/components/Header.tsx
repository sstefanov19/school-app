import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-secondary to-secondary-foreground text-secondary-foreground shadow-md">
    <div className="flex items-center justify-between px-6 py-4">
      <h2 className="text-xl font-semibold">Teacher Dashboard</h2>
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

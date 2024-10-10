import React from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="flex-1 overflow-y-auto">
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Upcoming Assignments */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-none">
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Math Quiz</span>
                    <span className="text-muted-foreground">Tomorrow</span>
                  </li>
                  <li className="flex justify-between">
                    <span>History Essay</span>
                    <span className="text-muted-foreground">In 3 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Science Project</span>
                    <span className="text-muted-foreground">In 5 days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Class List */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-none">
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>Current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Math 101</span>
                    <span className="text-muted-foreground">30 students</span>
                  </li>
                  <li className="flex justify-between">
                    <span>History 202</span>
                    <span className="text-muted-foreground">25 students</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Science 303</span>
                    <span className="text-muted-foreground">28 students</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Assignment Creation */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-none">
              <CardHeader>
                <CardTitle>Create Assignment</CardTitle>
                <CardDescription>Quick assignment creation</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    placeholder="Assignment Title"
                    className="bg-background/50"
                  />
                  <Select>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math 101</SelectItem>
                      <SelectItem value="history">History 202</SelectItem>
                      <SelectItem value="science">Science 303</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="date" className="bg-background/50" />
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-foreground hover:from-primary/90 hover:to-primary-foreground/90">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

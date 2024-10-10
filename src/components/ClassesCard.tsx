import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClassProps {
  subject: string;
  teacher: string;
  grade: number;
  id: number;
}

export default function ClassesCard(props: ClassProps) {
  return (
    <div className="flex flex-col h-[250px] w-[200px] border-black border-2 rounded-xl justify-center">
      <div className="h-[210px] text-center">
        <h1 className="text-bold  text-black text-2xl">{props.name}</h1>
        <p>Teacher</p>
        <p>Name {props.teacher}</p>
        <p>{props.subject}</p>
        <p>Grade : {props.grade}</p>
      </div>

      <Button>
        <Link href={`/classes/${props.id}`}>Join chat</Link>
      </Button>
    </div>
  );
}

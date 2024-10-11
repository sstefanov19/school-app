import React from "react";

import Link from "next/link";

interface ClassProps {
  subject: string;
  teacher: string;
  grade: number;
  id: number;
}

export default function ClassesCard(props: ClassProps) {
  return (
      <div className="flex flex-col h-[250px] w-[200px] bg-zinc-300 border-black border-2 rounded-xl justify-center">
    <Link href={`/classes/${props.id}`}>
      <div className="h-full items-center text-center">
        <h1 className="text-bold text-4xl">{props.subject}</h1>
        <p>Grade : {props.grade}</p>
      </div>

        </Link>

    </div>
  );
}

import React from 'react'

interface ClassProps {
    name : string,
}


export default function ClassesCard({ name}: ClassProps) {
  return (
    <div className="h-[250px] w-[200px] border-black border-2 flex justify-center">
        <h1>{name}</h1>
    </div>
  )
}

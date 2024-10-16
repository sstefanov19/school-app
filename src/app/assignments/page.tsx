import CreateAssignemnt from '@/components/CreateAssignemnt'
import React from 'react'

export default function Assignemnts() {
  return (
    <main className='min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-gray-200 to-gray-100'>
    <h1 className='text-xl font-semibold md:text-4xl md:font-bold mb-4 '>Create Assignemnts</h1>
    <CreateAssignemnt />
    </main>
  )
}

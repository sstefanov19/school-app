import React from 'react';

export default function ClassesChat() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-gray-100 '>
      <div className='h-5/6 w-4/5 border-2 border-black rounded-xl '>
            <h1 className='text-center'>Chat</h1>
      </div>
      <div className='w-4/5 mt-2'>
        <input className='w-full p-2 border-2 border-black' placeholder='Type your message...' />
      </div>
    </div>
  );
}

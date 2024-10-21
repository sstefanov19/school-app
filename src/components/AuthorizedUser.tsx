import { signOut } from 'next-auth/react'
import React from 'react'

import { Session } from 'next-auth';

interface AuthorizedUserProps {
  session: Session;
}

export default function AuthorizedUser({ session }: AuthorizedUserProps) {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-gray-200 to-gray-100">
        <p>You are already logged in as {session.user?.name}</p>
        <p>Your grade is {session.user?.grade}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
  )
}

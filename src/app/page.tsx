
import { Button } from '@/components/ui/button'
import { requiredAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation'
import React from 'react'
import LogoutButton from './(auth)/_components/logout-button'

const Page = async() => {
    await requiredAuth()

    const data = await caller.getUser()

  return (
    <div>
       {JSON.stringify(data)}
      <LogoutButton />
    </div>
  )
}

export default Page

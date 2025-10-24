"use client"

import { Button } from '@/components/ui/button'
import { requiredAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
// import { redirect } from 'next/navigation'
import React from 'react'
import LogoutButton from './(auth)/_components/logout-button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

const Page = () => {
    // await requiredAuth()

    // const data = await caller.getUser()
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const {data} = useQuery(trpc.getWorkflows.queryOptions())

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: ()=> {
            queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
        }
    }))

    const testAi = useMutation(trpc.testAi.mutationOptions())

  return (
    <div className='w-full min-h-dvh flex items-center justify-center gap-3 flex-col'>
       {JSON.stringify(data)}
       <Button
       disabled={testAi.isPending}
       onClick={() => {
        testAi.mutate()
       }}
       >
        Test AI
       </Button>
       <Button
       disabled={create.isPending}
       onClick={() => create.mutate()}
       >
        Create Workflow
       </Button>
      <LogoutButton />
    </div>
  )
}

export default Page

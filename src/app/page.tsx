import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, useQuery } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import Client from './client'

const page = () => {
    const queryClient = getQueryClient()

    void queryClient.prefetchQuery(trpc.getUser.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <Suspense fallback="loading...">
         <Client />
       </Suspense>
    </HydrationBoundary>
  )
}

export default page

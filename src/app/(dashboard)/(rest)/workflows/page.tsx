import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { requiredAuth } from '@/lib/auth-utils'
import { ErrorBoundary } from "react-error-boundary"
import React, { Suspense } from 'react'
import { WorkflowsContainer, WorkflowsList } from '@/features/workflows/components/workflows'
import { HydrateClient } from '@/trpc/server'

const WorkflowPage = async () => {
    await requiredAuth()
    prefetchWorkflows()
  return (
   <WorkflowsContainer>
     <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
        <WorkflowsList />
        </Suspense>
        </ErrorBoundary>
    </HydrateClient>
   </WorkflowsContainer>
  )
}

export default WorkflowPage

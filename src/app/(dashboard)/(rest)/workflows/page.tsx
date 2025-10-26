import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { requiredAuth } from '@/lib/auth-utils'
import { ErrorBoundary } from "react-error-boundary"
import React, { Suspense } from 'react'
import { WorkflowsContainer, WorkflowsError, WorkflowsList, WorkflowsLoading } from '@/features/workflows/components/workflows'
import { HydrateClient } from '@/trpc/server'
import type { SearchParams } from 'nuqs'
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader'

type Props = {
    searchParams: Promise<SearchParams>
}

const WorkflowPage = async ({ searchParams }: Props) => {
    await requiredAuth()

    const params = await workflowsParamsLoader(searchParams)
    prefetchWorkflows(params)
  return (
   <WorkflowsContainer>
     <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
        <Suspense fallback={<WorkflowsLoading />}>
        <WorkflowsList />
        </Suspense>
        </ErrorBoundary>
    </HydrateClient>
   </WorkflowsContainer>
  )
}

export default WorkflowPage

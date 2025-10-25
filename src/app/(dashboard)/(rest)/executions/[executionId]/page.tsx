import { requiredAuth } from '@/lib/auth-utils'
import React from 'react'


interface PageProps {
    params: Promise<{
        executionId: string
    }>
}

const Page = async ({ params }: PageProps) => {
    await requiredAuth()
    const { executionId } = await params

    return (
    <div>Execution id: {executionId}</div>
  )
}

export default Page

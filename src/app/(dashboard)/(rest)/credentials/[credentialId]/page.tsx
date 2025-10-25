import { requiredAuth } from '@/lib/auth-utils'
import React from 'react'


interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const Page = async ({ params }: PageProps) => {
        await requiredAuth()
    const { credentialId } = await params

    return (
    <div>Credential id: {credentialId}</div>
  )
}

export default Page

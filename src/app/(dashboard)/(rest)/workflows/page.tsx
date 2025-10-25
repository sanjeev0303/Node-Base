import { requiredAuth } from '@/lib/auth-utils'
import React from 'react'

const WorkflowPage = async () => {
    await requiredAuth()
  return (
    <div>Workflow Page</div>
  )
}

export default WorkflowPage

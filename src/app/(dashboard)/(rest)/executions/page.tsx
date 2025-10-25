import { requiredAuth } from '@/lib/auth-utils'
import React from 'react'

const ExecutionsPage = async () => {
    await requiredAuth()
  return (
    <div>ExecutionsPage</div>
  )
}

export default ExecutionsPage

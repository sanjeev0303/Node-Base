import { requiredAuth } from '@/lib/auth-utils'
import React from 'react'

const CredentialsPage = async () => {
    await requiredAuth()
  return (
    <div>CredentialsPage</div>
  )
}

export default CredentialsPage

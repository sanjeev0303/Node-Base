import React from 'react'
import LoginForm from '../_components/login-form'
import { requiredUnAuth } from '@/lib/auth-utils'

const LoginPage = async () => {
    await requiredUnAuth()

  return (
    <div>
        <LoginForm />
    </div>
  )
}

export default LoginPage

import React from 'react'
import RegisterForm from '../_components/register-form'
import { requiredUnAuth } from '@/lib/auth-utils'

const RegisterPage = async () => {
    await requiredUnAuth()

  return (
    <div>
        <RegisterForm />
    </div>
  )
}

export default RegisterPage

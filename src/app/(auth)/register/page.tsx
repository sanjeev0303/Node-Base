import { requiredUnAuth } from '@/lib/auth-utils'
import RegisterForm from '../_components/register-form'

const RegisterPage = async () => {
    await requiredUnAuth()

  return <RegisterForm />

}

export default RegisterPage

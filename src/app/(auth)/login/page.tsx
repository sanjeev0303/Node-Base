import { requiredUnAuth } from '@/lib/auth-utils'
import LoginForm from '../_components/login-form'

const LoginPage = async () => {
    await requiredUnAuth()

  return <LoginForm />

}

export default LoginPage

import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import FormField from '../../components/ui/FormField'
import Button from '../../components/ui/Button'
import { getEmailError, getPasswordError } from '../../utils/validators'

const LoginPage = () => {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    const redirectTo = location.state?.from ?? '/'
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const emailError = getEmailError(email)
    const passwordError = getPasswordError(password)
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError })
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)

    if (error) {
      showToast(error.message, 'error')
      return
    }

    showToast('Welcome back!', 'success')
    navigate('/')
  }

  return (
    <section className="w-full px-gutter-mobile md:px-margin py-space-xl flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-surface-container-low rounded-xl p-space-lg shadow-2xl flex flex-col gap-space-md">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Member Sign In</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mt-space-xs">Sign In</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">Access your reservations and account.</p>
        </div>
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit} noValidate>
          <FormField label="Email Address" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </FormField>
          <FormField label="Password" htmlFor="password" error={errors.password}>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </FormField>
          <Button type="submit" disabled={submitting} className="w-full mt-space-xs">
            {submitting ? 'Signing In…' : 'Sign In'}
          </Button>
        </form>
        <p className="font-body-md text-body-md text-on-surface-variant text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage

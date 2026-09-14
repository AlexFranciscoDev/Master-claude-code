import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import FormField from '../../components/ui/FormField'
import Button from '../../components/ui/Button'
import { getEmailError, getPasswordError } from '../../utils/validators'

const RegisterPage = () => {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {
      fullName: fullName.trim() ? '' : 'Full name is required.',
      email: getEmailError(email),
      password: getPasswordError(password),
      confirmPassword: password !== confirmPassword ? 'Passwords do not match.' : '',
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName.trim() } },
    })
    setSubmitting(false)

    if (error) {
      showToast(error.message, 'error')
      return
    }

    showToast('Account created! You can now sign in.', 'success')
    navigate('/login')
  }

  return (
    <section className="w-full px-gutter-mobile md:px-margin py-space-xl flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-surface-container-low rounded-xl p-space-lg shadow-2xl flex flex-col gap-space-md">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Create Account</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mt-space-xs">Join Us</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Create an account to make table reservations.
          </p>
        </div>
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit} noValidate>
          <FormField label="Full Name" htmlFor="full-name" error={errors.fullName}>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Jane Doe"
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </FormField>
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
              placeholder="At least 8 characters"
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </FormField>
          <FormField label="Confirm Password" htmlFor="confirm-password" error={errors.confirmPassword}>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </FormField>
          <Button type="submit" disabled={submitting} className="w-full mt-space-xs">
            {submitting ? 'Creating Account…' : 'Create Account'}
          </Button>
        </form>
        <p className="font-body-md text-body-md text-on-surface-variant text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage

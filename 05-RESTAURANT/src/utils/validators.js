export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidPassword = (password) => password.length >= 8

export const getPasswordError = (password) => {
  if (!password) return 'Password is required.'
  if (!isValidPassword(password)) return 'Password must be at least 8 characters long.'
  return ''
}

export const getEmailError = (email) => {
  if (!email) return 'Email is required.'
  if (!isValidEmail(email)) return 'Please enter a valid email address.'
  return ''
}

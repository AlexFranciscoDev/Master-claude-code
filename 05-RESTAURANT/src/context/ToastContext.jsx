import { createContext, useCallback, useMemo, useState } from 'react'

export const ToastContext = createContext(null)

let nextToastId = 1

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, variant = 'info') => {
    const id = nextToastId
    nextToastId += 1
    setToasts((current) => [...current, { id, message, variant }])
    setTimeout(() => dismissToast(id), 4000)
  }, [dismissToast])

  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

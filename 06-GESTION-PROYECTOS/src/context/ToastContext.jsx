import { createContext, useCallback, useRef, useState } from 'react'
import { createId } from '../lib/ids.js'

export const ToastContext = createContext(null)

const AUTO_DISMISS_MS = 3200

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timeouts = useRef(new Map())

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timeoutId = timeouts.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeouts.current.delete(id)
    }
  }, [])

  const showToast = useCallback(
    (message, variant = 'success') => {
      const id = createId('toast')
      setToasts((current) => [...current, { id, message, variant }])

      const timeoutId = setTimeout(() => dismissToast(id), AUTO_DISMISS_MS)
      timeouts.current.set(id, timeoutId)
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

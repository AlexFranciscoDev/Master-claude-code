const VARIANT_CLASSES = {
  primary: 'bg-accent text-bg hover:bg-accent-strong',
  secondary: 'bg-surface-raised text-text border border-border hover:border-accent',
  danger: 'bg-danger text-bg hover:brightness-110',
  ghost: 'bg-transparent text-text-muted hover:text-text',
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`}
      {...props}
    />
  )
}

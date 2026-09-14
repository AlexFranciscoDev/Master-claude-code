const VARIANT_CLASSES = {
  neutral: 'bg-surface-container-high text-on-surface-variant',
  success: 'bg-primary/20 text-primary',
  error: 'bg-error-container text-on-error-container',
  warning: 'bg-tertiary-container text-on-tertiary-container',
}

const Badge = ({ variant = 'neutral', children }) => (
  <span className={`inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase ${VARIANT_CLASSES[variant]}`}>
    {children}
  </span>
)

export default Badge

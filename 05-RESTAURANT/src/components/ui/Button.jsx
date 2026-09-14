const VARIANT_CLASSES = {
  primary: 'bg-primary-container text-on-primary-container hover:brightness-110',
  ghost: 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest',
  danger: 'bg-secondary-container text-on-secondary-container hover:brightness-110',
}

const Button = ({ variant = 'primary', type = 'button', className = '', children, ...rest }) => (
  <button
    type={type}
    className={`px-space-md py-space-sm rounded font-label-md text-label-md uppercase tracking-wider transition-all ${VARIANT_CLASSES[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
)

export default Button

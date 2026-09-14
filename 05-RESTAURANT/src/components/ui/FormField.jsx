const FormField = ({ label, error, children, htmlFor }) => (
  <div className="flex flex-col gap-space-xs">
    <label htmlFor={htmlFor} className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
      {label}
    </label>
    {children}
    {error ? <span className="font-body-sm text-body-sm text-error">{error}</span> : null}
  </div>
)

export default FormField

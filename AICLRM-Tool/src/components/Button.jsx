import Spinner from './Spinner'

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[15px] font-medium ' +
    'transition-colors duration-200 ease-in-out ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:opacity-60'

  const variantClasses = {
    primary:
      'bg-accent text-accent-text hover:opacity-90 focus-visible:ring-accent ' +
      'disabled:hover:opacity-100',
    secondary:
      'bg-secondary text-secondary-text hover:opacity-90 focus-visible:ring-secondary ' +
      'disabled:hover:opacity-100',
    outline:
      'bg-transparent text-text border-2 border-border hover:bg-surface focus-visible:ring-accent ' +
      'disabled:hover:bg-transparent',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400 ' +
      'disabled:hover:bg-red-600',
  }

  const classes = [baseClasses, variantClasses[variant] || variantClasses.primary, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {loading && (
        <Spinner
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}

export default Button
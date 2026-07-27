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
      'bg-purple-500 text-white hover:bg-purple-600 focus-visible:ring-purple-400 ' +
      'disabled:hover:bg-purple-500',
    secondary:
      'bg-purple-100 text-purple-900 hover:bg-purple-200 focus-visible:ring-purple-400 ' +
      'dark:bg-purple-500/15 dark:text-purple-100 dark:hover:bg-purple-500/25 ' +
      'disabled:hover:bg-purple-100 dark:disabled:hover:bg-purple-500/15',
    outline:
      'bg-transparent text-gray-900 border-2 border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-400 ' +
      'dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ' +
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
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}

export default Button
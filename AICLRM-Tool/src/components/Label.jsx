function Label({ children, htmlFor, className = '', ...rest }) {
  const baseClasses = 'block text-base font-medium text-gray-900 dark:text-gray-100 mb-2'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  )
}

export default Label
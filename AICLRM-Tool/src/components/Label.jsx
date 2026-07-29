function Label({ children, htmlFor, className = '', ...rest }) {
  const baseClasses = 'block text-base font-medium text-text mb-2'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  )
}

export default Label
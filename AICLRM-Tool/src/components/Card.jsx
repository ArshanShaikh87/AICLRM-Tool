function Card({ children, className = '', ...rest }) {
  const baseClasses = 'rounded-lg border border-border bg-surface p-6 shadow-sm'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export default Card
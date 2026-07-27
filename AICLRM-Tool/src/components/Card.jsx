function Card({ children, className = '', ...rest }) {
  const baseClasses =
    'rounded-lg border border-gray-200 bg-white p-6 shadow-sm ' +
    'dark:border-gray-700 dark:bg-gray-900'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export default Card
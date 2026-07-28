function Container({ children, className = '', ...rest }) {
  const classes = ['mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export default Container
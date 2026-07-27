const SIZE_CLASSES = {
  sm: 'h-3 w-3 border-2',
  md: 'h-4 w-4 border-2',
  lg: 'h-6 w-6 border-[3px]',
}

function Spinner({ size = 'md', className = '', ...rest }) {
  const baseClasses = 'inline-block animate-spin rounded-full border-current border-t-transparent'
  const sizeClasses = SIZE_CLASSES[size] || SIZE_CLASSES.md

  const classes = [baseClasses, sizeClasses, className].filter(Boolean).join(' ')

  return <span aria-hidden="true" className={classes} {...rest} />
}

export default Spinner
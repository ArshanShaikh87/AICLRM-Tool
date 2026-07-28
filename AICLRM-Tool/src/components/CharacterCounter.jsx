function CharacterCounter({ current = 0, max, className = '', ...rest }) {
  const baseClasses = 'font-mono text-xs text-gray-500 dark:text-gray-400'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {max ? `${current} / ${max}` : current}
    </div>
  )
}

export default CharacterCounter
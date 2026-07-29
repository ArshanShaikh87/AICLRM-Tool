function CharacterCounter({ current = 0, max, className = '', ...rest }) {
  const baseClasses = 'font-mono text-xs text-text-soft'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {max ? `${current} / ${max}` : current}
    </div>
  )
}

export default CharacterCounter
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 8,
  disabled = false,
  readOnly = false,
  className = '',
  ...rest
}) {
  const baseClasses =
    'w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] leading-relaxed ' +
    'text-text placeholder-text-soft transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent ' +
    'disabled:cursor-not-allowed disabled:opacity-60'

  const classes = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      className={classes}
      {...rest}
    />
  )
}

export default Textarea
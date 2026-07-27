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
    'w-full resize-y rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-[15px] leading-relaxed ' +
    'text-gray-900 placeholder-gray-400 transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 focus-visible:border-purple-400 ' +
    'disabled:cursor-not-allowed disabled:opacity-60 ' +
    'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500'

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
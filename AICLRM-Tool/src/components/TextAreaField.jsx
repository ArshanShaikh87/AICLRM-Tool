function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  minLength,
  required = false,
}) {
  const currentLength = value.length

  return (
    <div className="flex w-full flex-col gap-2 text-left">
      <div className="flex items-center">
        <label className="text-base font-medium text-gray-900 dark:text-gray-100">
          {label}
          {required && <span className="ml-1 text-purple-500">*</span>}
        </label>
      </div>

      <textarea
        className="w-full min-h-[180px] resize-y rounded-lg border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-900 px-3.5 py-3 text-[15px] leading-relaxed
                   text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                   transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/40
                   focus:border-purple-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
      />

      {maxLength && (
        <div className="self-end font-mono text-xs text-gray-500 dark:text-gray-400">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  )
}

export default TextAreaField
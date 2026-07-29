import { useId } from 'react'
import Label from './Label'
import Textarea from './Textarea'
import CharacterCounter from './CharacterCounter'

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  minLength,
  required = false,
}) {
  const fieldId = useId()
  const currentLength = value.length

  return (
    <div className="flex w-full flex-col gap-2 text-left">
      <div className="flex items-center">
        <Label htmlFor={fieldId} className="mb-0">
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </Label>
      </div>

      <Textarea
        id={fieldId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        rows={8}
        className="min-h-[180px]"
      />

      {maxLength && (
        <CharacterCounter current={currentLength} max={maxLength} className="self-end" />
      )}
    </div>
  )
}

export default TextAreaField
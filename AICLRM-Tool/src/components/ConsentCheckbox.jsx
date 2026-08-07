import { useId } from 'react'
import { useAppRouter } from '../router/Router'

function ConsentCheckbox({ checked, onChange }) {
  const fieldId = useId()
  const { navigate } = useAppRouter()

  const goToPolicies = (e) => {
    e.preventDefault()
    navigate('/policies')
  }

  return (
    <div className="flex items-start gap-2.5">
      <input
        id={fieldId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border text-accent
                   accent-[color:var(--accent)] focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-accent/40"
      />
      <label htmlFor={fieldId} className="text-left text-sm leading-relaxed text-text-soft">
        I agree to the{' '}
        <a
          href="/policies"
          onClick={goToPolicies}
          className="font-medium text-secondary underline underline-offset-2 dark:text-accent"
        >
          Terms &amp; Privacy Policy
        </a>
        , and confirm the resume I&apos;m submitting is my own.
      </label>
    </div>
  )
}

export default ConsentCheckbox
function GenerateButton({ loading = false, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500
                 px-6 py-3 text-[15px] font-medium text-white transition-colors
                 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-300
                 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
    >
      {loading ? 'Generating...' : 'Generate'}
    </button>
  ) 
}

export default GenerateButton
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AppRouterContext = createContext(null)

export function AppRouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(to)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <AppRouterContext.Provider value={{ path, navigate }}>
      {children}
    </AppRouterContext.Provider>
  )
}

export function useAppRouter() {
  const ctx = useContext(AppRouterContext)
  if (!ctx) throw new Error('useAppRouter must be used within AppRouterProvider')
  return ctx
}
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
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
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within RouterProvider')
  return ctx
}
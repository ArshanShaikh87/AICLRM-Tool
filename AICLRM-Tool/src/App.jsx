import { AppRouterProvider, useAppRouter } from './router/Router'
import LandingPage from './components/landing/LandingPage'
import About from './pages/About'
import Policies from './pages/Policies'

function AppRoutes() {
  const { path } = useAppRouter()

  if (path === '/about') return <About />
  if (path === '/policies') return <Policies />

  return <LandingPage />
}

function App() {
  return (
    <AppRouterProvider>
      <AppRoutes />
    </AppRouterProvider>
  )
}

export default App
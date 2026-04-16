import { useState, useEffect } from 'react'
import InputScreen from './components/InputScreen'
import ResultScreen from './components/ResultScreen'
import RoutesScreen from './components/RoutesScreen'
import ProgressScreen from './components/ProgressScreen'

const KEY = 'fsa_v1'

export default function App() {
  const [screen, setScreen] = useState('input')
  const [userData, setUserData] = useState(null)
  const [chosenRoute, setChosenRoute] = useState(null)

  // Restore session from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY))
      if (saved?.userData) {
        setUserData(saved.userData)
        setChosenRoute(saved.chosenRoute || null)
        setScreen(saved.screen || 'result')
      }
    } catch {}
  }, [])

  const persist = (data, route, s) => {
    try { localStorage.setItem(KEY, JSON.stringify({ userData: data, chosenRoute: route, screen: s })) } catch {}
  }

  const handleSubmit = (data) => {
    setUserData(data)
    setChosenRoute(null)
    setScreen('result')
    persist(data, null, 'result')
  }

  const handleChooseRoute = (route) => {
    setChosenRoute(route)
    setScreen('progress')
    persist(userData, route, 'progress')
  }

  const handleReset = () => {
    setUserData(null)
    setChosenRoute(null)
    setScreen('input')
    localStorage.removeItem(KEY)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="max-w-md mx-auto min-h-screen">
        {screen === 'input'    && <InputScreen onSubmit={handleSubmit} />}
        {screen === 'result'   && userData && <ResultScreen data={userData} onContinue={() => { setScreen('routes'); persist(userData, null, 'routes') }} onReset={handleReset} />}
        {screen === 'routes'   && userData && <RoutesScreen data={userData} onChooseRoute={handleChooseRoute} onBack={() => { setScreen('result'); persist(userData, null, 'result') }} />}
        {screen === 'progress' && userData && chosenRoute && <ProgressScreen data={userData} route={chosenRoute} onBack={() => { setScreen('routes'); persist(userData, null, 'routes') }} onReset={handleReset} />}
      </div>
    </div>
  )
}

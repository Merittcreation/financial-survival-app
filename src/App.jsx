import { useState, useEffect } from 'react'
import LandingScreen from './components/LandingScreen'
import InputScreen from './components/InputScreen'
import ResultScreen from './components/ResultScreen'
import RoutesScreen from './components/RoutesScreen'
import ProgressScreen from './components/ProgressScreen'

const KEY = 'fsa_v3'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [data, setData] = useState(null)
  const [route, setRoute] = useState(null)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY))
      if (s?.data) {
        setData(s.data)
        setRoute(s.route || null)
        setScreen(s.screen || 'result')
        setLang(s.lang || 'en')
      }
    } catch {}
  }, [])

  const save = (d, r, sc, lg) => {
    try { localStorage.setItem(KEY, JSON.stringify({ data: d, route: r, screen: sc, lang: lg })) } catch {}
  }

  const go = (sc, d = data, r = route, lg = lang) => { setScreen(sc); save(d, r, sc, lg) }
  const changeLang = l => { setLang(l); save(data, route, screen, l) }
  const submit = d => { setData(d); setRoute(null); go('result', d, null, lang) }
  const choose = r => { setRoute(r); go('progress', data, r, lang) }
  const reset = () => { setData(null); setRoute(null); setScreen('landing'); localStorage.removeItem(KEY) }

  const lp = { lang, setLang: changeLang }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Inter','Sarabun',sans-serif" }}>
      <div className="max-w-md mx-auto min-h-screen">
        {screen === 'landing'  && <LandingScreen  onStart={() => go('input')} {...lp} />}
        {screen === 'input'    && <InputScreen    onSubmit={submit} onBack={() => go('landing')} {...lp} />}
        {screen === 'result'   && data  && <ResultScreen   data={data} onContinue={() => go('routes')} onReset={reset} {...lp} />}
        {screen === 'routes'   && data  && <RoutesScreen   data={data} onChoose={choose} onBack={() => go('result')} {...lp} />}
        {screen === 'progress' && data  && route && <ProgressScreen data={data} route={route} onBack={() => go('routes')} onReset={reset} {...lp} />}
      </div>
    </div>
  )
}

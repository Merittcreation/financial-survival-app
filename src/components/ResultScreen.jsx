import { useState, useEffect } from 'react'
import { calculateSurvivalDays, getSurvivalStatus, fmt$ } from '../utils/calculations'

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target <= 0) return
    const steps = Math.min(target, 80)
    const interval = duration / steps
    let current = 0
    const t = setInterval(() => {
      current += target / steps
      if (current >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(current))
    }, interval)
    return () => clearInterval(t)
  }, [target, duration])
  return count
}

function contextLine(days) {
  if (days <= 0)   return "You're already in survival mode."
  if (days <= 7)   return "That's less than a week. Emergency time."
  if (days <= 14)  return `${days} days. Under 2 weeks to fix this.`
  if (days <= 30)  return `About ${Math.ceil(days / 7)} weeks. Less than a month.`
  if (days <= 60)  return `About ${Math.ceil(days / 30)} month${Math.ceil(days/30) > 1 ? 's' : ''}. Better than many — not enough.`
  if (days <= 120) return `Around ${Math.ceil(days / 30)} months. A decent cushion. Could be stronger.`
  if (days <= 180) return `About ${Math.ceil(days / 30)} months. You're ahead of most people.`
  return `Over ${Math.floor(days / 30)} months. Impressive — keep building.`
}

export default function ResultScreen({ data, onContinue, onReset }) {
  const { cash, income, expenses, debt } = data
  const days   = calculateSurvivalDays(cash, expenses)
  const status = getSurvivalStatus(days)
  const count  = useCountUp(days)

  const savingsRate  = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0
  const debtToIncome = income > 0 ? (debt / income).toFixed(1) : '—'
  const meterPct     = Math.min((days / 365) * 100, 100)

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">

      {/* Top bar */}
      <div className="animate-fade-in flex items-center justify-between mb-8">
        <button onClick={onReset} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
          ← Start over
        </button>
        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest border ${status.bgClass} ${status.textClass} ${status.borderClass}`}>
          {status.label}
        </span>
      </div>

      {/* Main wow moment */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-4">
        <p className="animate-fade-in text-slate-400 text-base mb-5">You can survive</p>

        {/* Big number circle */}
        <div
          className={`animate-scale-in relative flex items-center justify-center w-52 h-52 rounded-full border-4 ${status.borderClass} ${status.bgClass} mb-3`}
          style={{ boxShadow: `0 0 70px ${status.glow}` }}
        >
          <div className="text-center">
            <div className={`text-[4.5rem] leading-none font-black ${status.textClass}`}>{count}</div>
            <div className="text-slate-300 text-xl font-semibold mt-1">days</div>
          </div>
        </div>

        <p className="animate-fade-in-up text-slate-400 text-sm text-center mt-1 px-4">
          {contextLine(days)}
        </p>

        {/* Survival meter */}
        <div className="w-full mt-8 animate-fade-in-up delay-100">
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>0 days</span><span>365 days (1 year)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out delay-300 ${status.barClass}`}
              style={{ width: `${meterPct}%` }}
            />
          </div>
          <p className={`text-center text-sm font-semibold mt-3 ${status.textClass}`}>{status.message}</p>
        </div>

        {/* Quick stats */}
        <div className="w-full grid grid-cols-3 gap-3 mt-8 animate-fade-in-up delay-200">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-white font-bold text-base">{fmt$(expenses)}</div>
            <div className="text-slate-500 text-xs mt-0.5">Monthly burn</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className={`font-bold text-base ${savingsRate >= 10 ? 'text-emerald-400' : savingsRate >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
              {savingsRate}%
            </div>
            <div className="text-slate-500 text-xs mt-0.5">Savings rate</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className={`font-bold text-base ${parseFloat(debtToIncome) <= 2 ? 'text-blue-400' : 'text-amber-400'}`}>
              {debtToIncome}x
            </div>
            <div className="text-slate-500 text-xs mt-0.5">Debt/income</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="animate-fade-in-up delay-300 mt-8 pb-6">
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl shadow-emerald-500/20"
        >
          See How to Extend It →
        </button>
        <p className="text-center text-slate-600 text-xs mt-3">3 routes. Pick what fits your life.</p>
      </div>
    </div>
  )
}

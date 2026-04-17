import { useState, useEffect } from 'react'
import { T } from '../i18n'
import { calcDays, getStatus, fmtC } from '../utils/calculations'
import LangToggle from './LangToggle'

function useCountUp(target, ms = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (target <= 0) return
    const steps = Math.min(target, 80)
    let cur = 0
    const ti = setInterval(() => {
      cur += target / steps
      if (cur >= target) { setV(target); clearInterval(ti) }
      else setV(Math.floor(cur))
    }, ms / steps)
    return () => clearInterval(ti)
  }, [target])
  return v
}

export default function ResultScreen({ data, onContinue, onReset, lang, setLang }) {
  const t = T[lang]
  const days = calcDays(data.cash, data.expenses)
  const status = getStatus(days)
  const count = useCountUp(days)
  const msg = t.advisorMsg(days, status.tier)
  const savRate = data.income > 0 ? Math.round(((data.income - data.expenses) / data.income) * 100) : 0
  const dti = data.income > 0 ? (data.debt / data.income).toFixed(1) : '—'
  const meterPct = Math.min((days / 365) * 100, 100)
  const statusLabel = t[status.tier + 'Label'] || t.stableLabel
  const dot = status.tier === 'critical' ? '🔴' : status.tier === 'risky' ? '🟡' : '🟢'

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <div className="anim-fi flex items-center justify-between mb-8">
        <button onClick={onReset} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{t.startOver}</button>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest border ${status.tagBg} ${status.tc}`}>
            {dot} {statusLabel}
          </span>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-6">
        <p className="anim-fi text-slate-400 text-base mb-5">{t.youCanSurvive}</p>

        <div
          className={`anim-si flex items-center justify-center w-52 h-52 rounded-full border-4 ${status.bc} ${status.bg} mb-4`}
          style={{ boxShadow: `0 0 80px ${status.glow}` }}
        >
          <div className="text-center">
            <div className={`text-[4.5rem] leading-none font-black ${status.tc}`}>{count}</div>
            <div className="text-slate-300 text-xl font-semibold mt-1">{t.days}</div>
          </div>
        </div>

        <div className={`anim-fiu d1 w-full ${status.bg} border ${status.bc} rounded-2xl px-5 py-4 mb-6 text-center`}>
          <p className="text-slate-200 text-sm leading-relaxed">{msg}</p>
        </div>

        <div className="w-full anim-fiu d2">
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>{t.meterL}</span><span>{t.meterR}</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full rounded-full bar-grow ${status.bar}`} style={{ width: `${meterPct}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-slate-600">{t.critMeter}</span>
            <span className="text-slate-600">{t.riskMeter}</span>
            <span className="text-slate-600">{t.stabMeter}</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 mt-6 anim-fiu d3">
          {[
            { v: fmtC(data.expenses, lang), l: t.monthlyBurn, c: 'text-white' },
            { v: `${savRate}%`, l: t.savingsRate, c: savRate >= 15 ? 'text-emerald-400' : savRate >= 0 ? 'text-amber-400' : 'text-red-400' },
            { v: `${dti}x`, l: t.debtIncome, c: parseFloat(dti) <= 2 ? 'text-blue-400' : 'text-amber-400' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <div className={`font-bold text-base ${s.c}`}>{s.v}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="anim-fiu d4 mt-8 pb-6">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[.98] text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-emerald-500/20"
        >
          {t.gameplanBtn}
        </button>
        <p className="text-center text-slate-600 text-xs mt-3">{t.gameplanSub}</p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { T } from '../i18n'
import { calcDays, getStatus, buildRoutes } from '../utils/calculations'
import LangToggle from './LangToggle'

const IMPACT_CLS = {
  'very high': 'bg-rose-500/15 text-rose-400',
  'high':      'bg-blue-500/15 text-blue-400',
  'medium':    'bg-amber-500/15 text-amber-400',
  'low':       'bg-slate-600/30 text-slate-400',
}

function RouteCard({ r, base, onChoose, delay, t, lang }) {
  const [open, setOpen] = useState(false)
  const pct = Math.min((r.newDays / Math.max(r.newDays * 1.2, 180)) * 100, 100)
  const dSuffix = lang === 'th' ? 'ว' : 'd'

  return (
    <div className="anim-fiu" style={{ animationDelay: `${delay}s` }}>
      <div className={`border ${r.cb} rounded-2xl bg-slate-900 overflow-hidden`}>
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl">{r.id === 'a' ? '🛡️' : r.id === 'b' ? '💪' : '🔥'}</span>
                <span className="font-bold text-white text-lg">{r.name}</span>
              </div>
              <p className="text-slate-500 text-sm">{r.sub}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ml-2 ${r.ab} ${r.at}`}>
              -{r.cut} {t.spendCut}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-3">
            <div>
              <div className={`text-5xl font-black leading-none ${r.at}`}>{r.newDays}</div>
              <div className="text-slate-500 text-sm mt-0.5">{t.daysRunway}</div>
            </div>
            <div className="pb-1">
              <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                +{r.gain} {t.daysGained}
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-4 leading-snug">{r.desc}</p>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-600 mb-1.5">
              <span>{t.nowLabel} {base}{dSuffix}</span>
              <span>{t.afterLabel} {r.newDays}{dSuffix}</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${r.bar}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`text-sm font-semibold ${r.at} hover:opacity-75 flex items-center gap-1 transition-opacity`}
          >
            <span>{open ? '▲' : '▼'}</span>
            <span>{open ? t.hideActions : `${t.showActions} (${r.actions.length})`}</span>
          </button>
        </div>

        {open && (
          <div className={`border-t ${r.cb} px-5 py-4 space-y-3.5`}>
            {r.actions.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full ${r.ab} flex items-center justify-center shrink-0 mt-0.5`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${r.bar}`} />
                </div>
                <p className="flex-1 text-slate-300 text-sm leading-snug">{a.t}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${IMPACT_CLS[a.i] || IMPACT_CLS.low}`}>
                  {a.i}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="px-5 pb-5 pt-3">
          <button
            onClick={() => onChoose(r)}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all active:scale-[.98] ${r.btn}`}
          >
            {t.chooseBtn}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RoutesScreen({ data, onChoose, onBack, lang, setLang }) {
  const t = T[lang]
  const routes = buildRoutes(data, t)
  const base = calcDays(data.cash, data.expenses)
  const status = getStatus(base)
  const statusLabel = t[status.tier + 'Label'] || t.stableLabel

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <div className="anim-fi flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{t.back}</button>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <div className="anim-fiu mb-6">
        <h2 className="text-2xl font-extrabold text-white mb-2">{t.heresPlan}</h2>
        <p className="text-slate-400 text-sm">
          {t.youHave} <span className={`font-bold ${status.tc}`}>{base}</span> {t.rightNow}
        </p>
      </div>

      <div className="anim-fiu d1 flex items-center gap-3 mb-5 text-xs text-slate-500">
        {[['bg-emerald-500', t.safeTag], ['bg-amber-500', t.seriousTag], ['bg-rose-500', t.extremeTag]].map(([c, l]) => (
          <span key={l} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${c} inline-block`} />{l}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {routes.map((r, i) => (
          <RouteCard key={r.id} r={r} base={base} onChoose={onChoose} delay={i * .09} t={t} lang={lang} />
        ))}
      </div>
    </div>
  )
}

import { T } from '../i18n'
import { calcDays, getStatus, buildWeeks, fmtC } from '../utils/calculations'
import LangToggle from './LangToggle'

export default function ProgressScreen({ data, route, onBack, onReset, lang, setLang }) {
  const t = T[lang]
  const base = calcDays(data.cash, data.expenses)
  const weeks = buildWeeks(base, route, t, 8)
  const final = weeks[7].days
  const gain = final - base
  const status = getStatus(final)
  const baseStatus = getStatus(base)
  const maxDays = Math.max(final * 1.1, 90)
  const saved = data.expenses - route.newExp
  const milestones = [0, 2, 4, 7].map(i => weeks[i])
  const baseLabel = t[baseStatus.tier + 'Label'] || t.stableLabel
  const statusLabel = t[status.tier + 'Label'] || t.stableLabel
  const dSuffix = lang === 'th' ? 'ว' : 'd'

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <div className="anim-fi flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{t.back}</button>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <div className="anim-fiu mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{route.id === 'a' ? '🛡️' : route.id === 'b' ? '💪' : '🔥'}</span>
          <span className={`text-sm font-bold ${route.at}`}>{route.name}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-1">{t.weekProjection}</h2>
        <p className="text-slate-400 text-sm">{t.stickToPlan}</p>
      </div>

      {/* Before / After */}
      <div className="anim-fiu d1 grid grid-cols-2 gap-3 mb-4">
        {[[baseStatus, base, baseLabel, t.today], [status, final, statusLabel, t.after8w]].map(([st, d, lb, title]) => (
          <div key={title} className={`${st.bg} border ${st.bc} rounded-2xl p-4 text-center`}>
            <p className="text-slate-500 text-xs mb-1">{title}</p>
            <div className={`text-4xl font-black ${st.tc}`}>{d}</div>
            <div className="text-slate-500 text-xs mt-0.5">{t.days}</div>
            <span className={`inline-block mt-2 text-xs font-bold ${st.tc}`}>{lb}</span>
          </div>
        ))}
      </div>

      <div className="anim-fiu d1 text-center mb-5">
        <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">
          ↑ +{gain} {t.daysGainedFull}
        </span>
      </div>

      {/* Weekly bars */}
      <div className="anim-fiu d2 bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">{t.weekByWeek}</h3>
        <div className="space-y-2.5">
          {weeks.map((w, i) => (
            <div key={w.week} className="flex items-center gap-3">
              <div className="w-8 text-xs text-slate-600 text-right shrink-0">W{w.week}</div>
              <div className="flex-1 h-6 bg-slate-800 rounded-lg overflow-hidden">
                <div
                  className={`h-full rounded-lg flex items-center px-2 bar-grow ${route.bar}`}
                  style={{ width: `${(w.days / maxDays) * 100}%`, transitionDelay: `${i * .06}s`, opacity: .6 + i * .05 }}
                >
                  {(w.days / maxDays) > .22 && (
                    <span className="text-white text-xs font-semibold">{w.days}{dSuffix}</span>
                  )}
                </div>
              </div>
              <div className="w-14 text-xs text-emerald-400 font-bold text-right shrink-0">+{w.gained}{dSuffix}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="anim-fiu d3 bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">{t.keyMilestones}</h3>
        <div className="space-y-3">
          {milestones.map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${route.ab} flex items-center justify-center shrink-0`}>
                <span className={`text-xs font-black ${route.at}`}>{w.week}</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-200 text-sm font-medium">{w.label}</p>
                <p className="text-slate-500 text-xs">{w.days} {t.days}</p>
              </div>
              <span className="text-emerald-400 text-sm font-bold">+{w.gained}{dSuffix}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className={`anim-fiu d4 ${route.ab} border ${route.cb} rounded-2xl p-5 mb-8`}>
        <p className={`${route.at} font-bold text-sm mb-2`}>{t.missionTitle}</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          {t.missionBody(route.name, fmtC(data.expenses, lang), fmtC(route.newExp, lang), fmtC(saved, lang))}
        </p>
      </div>

      <div className="flex gap-3 anim-fiu d5 pb-6">
        <button onClick={onReset} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all">
          {t.recalc}
        </button>
        <button onClick={onBack} className={`flex-1 py-3 ${route.btn} text-white font-bold rounded-xl transition-all active:scale-[.98]`}>
          {t.tryOther}
        </button>
      </div>
    </div>
  )
}

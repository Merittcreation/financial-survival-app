import { generateWeeklyProgress, calculateSurvivalDays, getSurvivalStatus, fmt$ } from '../utils/calculations'

export default function ProgressScreen({ data, route, onBack, onReset }) {
  const baseDays   = calculateSurvivalDays(data.cash, data.expenses)
  const weeks      = generateWeeklyProgress(baseDays, route, 8)
  const finalDays  = weeks[weeks.length - 1].days
  const totalGain  = finalDays - baseDays
  const status     = getSurvivalStatus(finalDays)
  const maxDays    = Math.max(finalDays * 1.1, 90)
  const monthlySave = data.expenses - route.newExpenses

  const MILESTONE_IDX = [0, 2, 4, 7]

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">

      {/* Header */}
      <div className="animate-fade-in mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors mb-6">
          ← Back to routes
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{route.emoji}</span>
          <span className={`text-sm font-bold ${route.accentText}`}>{route.name}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-1">Your 8-week projection</h2>
        <p className="text-slate-400 text-sm">Stick to the plan and watch your runway grow.</p>
      </div>

      {/* Hero stat */}
      <div className="animate-fade-in-up bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5 text-center">
        <p className="text-slate-400 text-sm mb-2">After 8 weeks you could have</p>
        <div className={`text-6xl font-black ${status.textClass} leading-none mb-1`}>{finalDays}</div>
        <div className="text-slate-400 text-sm mb-4">days of survival runway</div>
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">
          ↑ +{totalGain} days gained from today
        </div>
      </div>

      {/* Weekly bars */}
      <div className="animate-fade-in-up delay-100 bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Week-by-week progress</h3>
        <div className="space-y-2.5">
          {weeks.map((w, i) => (
            <div key={w.week} className="flex items-center gap-3">
              <div className="w-8 text-xs text-slate-600 text-right shrink-0">W{w.week}</div>
              <div className="flex-1 h-6 bg-slate-800 rounded-lg overflow-hidden">
                <div
                  className={`h-full rounded-lg flex items-center px-2 transition-all duration-700 ${route.barColor}`}
                  style={{ width: `${(w.days / maxDays) * 100}%`, transitionDelay: `${i * 0.06}s`, opacity: i < 2 ? 1 : 0.7 + i * 0.04 }}
                >
                  {(w.days / maxDays) > 0.25 && (
                    <span className="text-white text-xs font-semibold">{w.days}d</span>
                  )}
                </div>
              </div>
              <div className="w-12 text-xs text-emerald-400 font-semibold text-right shrink-0">+{w.gained}d</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="animate-fade-in-up delay-200 bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Key milestones</h3>
        <div className="space-y-3">
          {MILESTONE_IDX.map(idx => {
            const w = weeks[idx]
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${route.accentBg} flex items-center justify-center shrink-0`}>
                  <span className={`text-xs font-black ${route.accentText}`}>{w.week}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 text-sm font-medium">{w.label}</p>
                  <p className="text-slate-500 text-xs">{w.days} days runway</p>
                </div>
                <span className="text-emerald-400 text-sm font-bold">+{w.gained}d</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mission card */}
      <div className={`animate-fade-in-up delay-300 ${route.accentBg} border ${route.cardBorder} rounded-2xl p-5 mb-8`}>
        <p className={`${route.accentText} font-bold text-sm mb-2`}>Your mission:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Follow the <strong className="text-white">{route.name}</strong> plan for 8 weeks.
          Bring your monthly expenses from{' '}
          <strong className="text-white">{fmt$(data.expenses)}</strong> down to{' '}
          <strong className="text-white">{fmt$(route.newExpenses)}</strong>.{' '}
          That's{' '}
          <strong className={route.accentText}>{fmt$(monthlySave)}/month</strong> freed up —
          every dollar of it extends your runway.
        </p>
      </div>

      {/* Bottom actions */}
      <div className="flex gap-3 animate-fade-in-up delay-400 pb-6">
        <button
          onClick={onReset}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all duration-200"
        >
          Recalculate
        </button>
        <button
          onClick={onBack}
          className={`flex-1 py-3 ${route.btnClass} text-white font-bold rounded-xl transition-all duration-200 active:scale-[0.98]`}
        >
          Try Another Route
        </button>
      </div>
    </div>
  )
}

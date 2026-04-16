import { useState } from 'react'
import { generateRoutes, calculateSurvivalDays } from '../utils/calculations'

const IMPACT_STYLE = {
  'very high': 'bg-emerald-500/15 text-emerald-400',
  'high':      'bg-blue-500/15 text-blue-400',
  'medium':    'bg-amber-500/15 text-amber-400',
  'low':       'bg-slate-600/30 text-slate-400',
}

function RouteCard({ route, baseDays, onChoose, delay }) {
  const [open, setOpen] = useState(false)
  const pct = Math.min((route.newDays / Math.max(route.newDays * 1.15, 180)) * 100, 100)

  return (
    <div
      className={`animate-fade-in-up rounded-2xl border ${route.cardBorder} bg-slate-900 overflow-hidden`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-5">
        {/* Route header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xl">{route.emoji}</span>
              <span className="font-bold text-white text-lg">{route.name}</span>
            </div>
            <p className="text-slate-500 text-sm">{route.subtitle}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${route.accentBg} ${route.accentText} shrink-0 ml-2`}>
            -{route.expenseReduction}
          </span>
        </div>

        {/* Days */}
        <div className="flex items-end gap-3 mb-4">
          <div>
            <div className={`text-5xl font-black ${route.accentText} leading-none`}>{route.newDays}</div>
            <div className="text-slate-500 text-sm mt-0.5">days runway</div>
          </div>
          <div className="pb-1">
            <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
              +{route.daysGained} days
            </span>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-4">{route.description}</p>

        {/* Comparison bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-600 mb-1.5">
            <span>Now: {baseDays}d</span>
            <span>After: {route.newDays}d</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${route.barColor}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Actions toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`text-sm font-semibold transition-colors ${route.accentText} hover:opacity-75 flex items-center gap-1`}
        >
          <span>{open ? '▲' : '▼'}</span>
          <span>{open ? 'Hide' : 'View'} recommended actions</span>
        </button>
      </div>

      {/* Action list */}
      {open && (
        <div className={`border-t ${route.cardBorder} px-5 py-4 space-y-3`}>
          {route.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full ${route.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <div className={`w-1.5 h-1.5 rounded-full ${route.barColor}`} />
              </div>
              <p className="flex-1 text-slate-300 text-sm leading-snug">{action.text}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${IMPACT_STYLE[action.impact] || IMPACT_STYLE.low}`}>
                {action.impact}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="px-5 pb-5 pt-3">
        <button
          onClick={() => onChoose(route)}
          className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 active:scale-[0.98] ${route.btnClass}`}
        >
          I'll Do This →
        </button>
      </div>
    </div>
  )
}

export default function RoutesScreen({ data, onChooseRoute, onBack }) {
  const routes   = generateRoutes(data)
  const baseDays = calculateSurvivalDays(data.cash, data.expenses)

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <div className="animate-fade-in mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors mb-6 flex items-center gap-1">
          ← Back
        </button>
        <h2 className="text-2xl font-extrabold text-white mb-2">3 ways to extend your runway</h2>
        <p className="text-slate-400 text-sm">
          You have <span className="text-white font-semibold">{baseDays} days</span> right now.
          Here's how to get more.
        </p>
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {routes.map((route, i) => (
          <RouteCard key={route.id} route={route} baseDays={baseDays} onChoose={onChooseRoute} delay={i * 0.08} />
        ))}
      </div>
    </div>
  )
}

import { T } from '../i18n'
import LangToggle from './LangToggle'

export default function LandingScreen({ onStart, lang, setLang }) {
  const t = T[lang]
  return (
    <div className="min-h-screen flex flex-col px-6 py-10 relative overflow-hidden">
      <div className="glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500 blur-3xl pointer-events-none" />

      <div className="anim-fi relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-sm">⚡</div>
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">{t.brand}</span>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10 -mt-6">
        <div className="anim-fiu d1 mb-8">
          <h1 className="text-[2.6rem] font-black text-white leading-[1.1] mb-5">
            {t.heroLine1}<br />
            <span className="text-emerald-400">{t.heroLine2}</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">{t.heroSub}</p>
        </div>

        <div className="anim-fiu d2 mb-10">
          <button
            onClick={onStart}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 active:scale-[.98] text-white font-black text-xl rounded-2xl transition-all shadow-2xl shadow-emerald-500/25"
          >
            {t.ctaBtn}
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">{t.ctaNote}</p>
        </div>

        <div className="anim-fiu d3">
          <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-3 text-center">{t.whereLabel}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { dot: '🔴', lk: 'criticalLabel', sk: 'under30', bg: 'bg-red-500/10',     bd: 'border-red-500/25',     tc: 'text-red-400' },
              { dot: '🟡', lk: 'riskyLabel',    sk: 'days3090', bg: 'bg-amber-500/10',   bd: 'border-amber-500/25',   tc: 'text-amber-400' },
              { dot: '🟢', lk: 'stableLabel',   sk: 'days90p',  bg: 'bg-emerald-500/10', bd: 'border-emerald-500/25', tc: 'text-emerald-400' },
            ].map(s => (
              <div key={s.lk} className={`${s.bg} border ${s.bd} rounded-xl p-3 text-center`}>
                <div className="text-lg mb-1">{s.dot}</div>
                <div className={`${s.tc} font-black text-xs`}>{t[s.lk]}</div>
                <div className="text-slate-600 text-xs mt-0.5">{t[s.sk]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { T } from '../i18n'
import LangToggle from './LangToggle'

const FIELD_IDS = ['cash', 'income', 'expenses', 'debt']
const FIELD_REQ = { cash: true, income: true, expenses: true, debt: false }
const FIELD_EMOJI = ['💰', '💵', '📊', '📋']

export default function InputScreen({ onSubmit, onBack, lang, setLang }) {
  const t = T[lang]
  const [vals, setVals] = useState({ cash: '', income: '', expenses: '', debt: '' })
  const [errs, setErrs] = useState({})
  const [focus, setFocus] = useState(null)
  const firstRef = useRef(null)

  useEffect(() => { firstRef.current?.focus() }, [])

  const change = (id, raw) => {
    setVals(p => ({ ...p, [id]: raw.replace(/[^0-9]/g, '') }))
    if (errs[id]) setErrs(p => ({ ...p, [id]: null }))
  }

  const disp = id => {
    const v = vals[id]
    if (!v) return ''
    return focus === id ? v : new Intl.NumberFormat('en-US').format(v)
  }

  const submit = e => {
    e.preventDefault()
    const e2 = {}
    FIELD_IDS.filter(f => FIELD_REQ[f]).forEach(f => { if (!vals[f]) e2[f] = t.required })
    if (Object.keys(e2).length) { setErrs(e2); return }
    onSubmit({ cash: +vals.cash || 0, income: +vals.income || 0, expenses: +vals.expenses || 0, debt: +vals.debt || 0 })
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <div className="anim-fiu flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{t.back}</button>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <div className="anim-fiu d1 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center text-xs">⚡</div>
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">{t.yourNumbers}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white leading-tight mb-1">{t.inputTitle}</h1>
        <p className="text-slate-400 text-base">{t.inputSub}</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-5">
        {FIELD_IDS.map((id, i) => (
          <div key={id} className={`anim-fiu d${i + 1}`}>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              {FIELD_EMOJI[i]}&nbsp;{t.fieldLabels[id]}
              {FIELD_REQ[id] && <span className="text-red-400 ml-1">*</span>}
            </label>
            <div className={`flex items-center rounded-xl border transition-all duration-200 ${
              focus === id
                ? 'border-emerald-500 bg-slate-800/80 shadow-lg shadow-emerald-500/10'
                : errs[id]
                ? 'border-red-500/70 bg-slate-900/80'
                : 'border-slate-700/60 bg-slate-900 hover:border-slate-600'
            }`}>
              <span className="pl-4 text-slate-400 text-lg font-semibold select-none">
                {lang === 'th' ? '฿' : '$'}
              </span>
              <input
                ref={i === 0 ? firstRef : null}
                type="text"
                inputMode="numeric"
                value={disp(id)}
                onChange={e => change(id, e.target.value)}
                onFocus={() => setFocus(id)}
                onBlur={() => setFocus(null)}
                placeholder={['1,500', '2,500', '2,000', '0'][i]}
                className="flex-1 bg-transparent py-4 px-2 text-white text-lg font-semibold placeholder-slate-700 outline-none"
              />
            </div>
            {errs[id]
              ? <p className="text-red-400 text-xs mt-1.5 ml-1">{errs[id]}</p>
              : <p className="text-slate-600 text-xs mt-1.5 ml-1">{t.fieldHints[id]}</p>
            }
          </div>
        ))}

        <div className="anim-fiu d5 mt-2 pb-10">
          <button
            type="submit"
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[.98] text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-emerald-500/20"
          >
            {t.submitBtn}
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">{t.dataNote}</p>
        </div>
      </form>
    </div>
  )
}

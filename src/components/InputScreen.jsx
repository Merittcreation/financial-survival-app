import { useState, useRef, useEffect } from 'react'

const FIELDS = [
  { id: 'cash',     label: 'Cash on hand',     hint: 'Savings + checking — money you can access right now', placeholder: '1,500', emoji: '💰', required: true },
  { id: 'income',   label: 'Monthly income',   hint: 'Take-home pay after taxes', placeholder: '2,500', emoji: '💵', required: true },
  { id: 'expenses', label: 'Monthly expenses', hint: 'Rent, food, bills, transport, subscriptions — everything', placeholder: '2,000', emoji: '📊', required: true },
  { id: 'debt',     label: 'Total debt',       hint: 'Credit cards, loans, buy-now-pay-later (0 if none)', placeholder: '0', emoji: '📋', required: false },
]

export default function InputScreen({ onSubmit }) {
  const [values, setValues] = useState({ cash: '', income: '', expenses: '', debt: '' })
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState(null)
  const firstRef = useRef(null)

  useEffect(() => { firstRef.current?.focus() }, [])

  const handleChange = (id, raw) => {
    const numeric = raw.replace(/[^0-9]/g, '')
    setValues(prev => ({ ...prev, [id]: numeric }))
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }))
  }

  const displayValue = (id) => {
    const v = values[id]
    if (!v) return ''
    if (focused === id) return v
    return new Intl.NumberFormat('en-US').format(v)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    FIELDS.filter(f => f.required).forEach(f => { if (!values[f.id]) errs[f.id] = 'Required' })
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      cash:     parseFloat(values.cash)     || 0,
      income:   parseFloat(values.income)   || 0,
      expenses: parseFloat(values.expenses) || 0,
      debt:     parseFloat(values.debt)     || 0,
    })
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">

      {/* Header */}
      <div className="animate-fade-in-up mb-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-sm">⚡</div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Financial Survival</span>
        </div>
        <h1 className="text-[1.75rem] font-extrabold text-white leading-tight mb-3">
          How long could you survive<br />
          <span className="text-emerald-400">if income stopped today?</span>
        </h1>
        <p className="text-slate-400 text-sm">4 numbers. 30 seconds. The answer might surprise you.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {FIELDS.map((f, i) => (
          <div key={f.id} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              <span className="mr-1">{f.emoji}</span>
              {f.label}
              {f.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <div className={`flex items-center rounded-xl border transition-all duration-200 ${
              focused === f.id
                ? 'border-emerald-500 bg-slate-800/80 shadow-lg shadow-emerald-500/10'
                : errors[f.id]
                ? 'border-red-500/70 bg-slate-900/80'
                : 'border-slate-700/60 bg-slate-900 hover:border-slate-600'
            }`}>
              <span className="pl-4 text-slate-400 text-lg font-semibold select-none">$</span>
              <input
                ref={i === 0 ? firstRef : null}
                type="text"
                inputMode="numeric"
                value={displayValue(f.id)}
                onChange={e => handleChange(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
                placeholder={f.placeholder}
                className="flex-1 bg-transparent py-4 px-2 text-white text-lg font-semibold placeholder-slate-700 outline-none"
              />
            </div>
            {errors[f.id]
              ? <p className="text-red-400 text-xs mt-1.5 ml-1">{errors[f.id]}</p>
              : <p className="text-slate-600 text-xs mt-1.5 ml-1">{f.hint}</p>
            }
          </div>
        ))}

        <div className="animate-fade-in-up delay-500 mt-2 pb-10">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl shadow-emerald-500/20"
          >
            Calculate My Survival →
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">
            No account needed · Your data never leaves your device
          </p>
        </div>
      </form>
    </div>
  )
}

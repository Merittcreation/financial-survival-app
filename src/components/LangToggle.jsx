export default function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center bg-slate-800 rounded-full p-0.5 gap-0.5">
      {['en', 'th'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
            lang === l ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {l === 'en' ? 'EN' : 'ไทย'}
        </button>
      ))}
    </div>
  )
}

export function calcDays(cash, expenses) {
  if (!cash || cash <= 0) return 0
  if (!expenses || expenses <= 0) return 999
  return Math.floor(cash / (expenses / 30))
}

export function getStatus(days) {
  if (days < 30) return { tier: 'critical', tc: 'text-red-400',     bc: 'border-red-500',     bg: 'bg-red-500/10',     bar: 'bg-red-500',     glow: 'rgba(239,68,68,.3)',    tagBg: 'bg-red-500/15 border-red-500/40' }
  if (days < 90) return { tier: 'risky',    tc: 'text-amber-400',   bc: 'border-amber-500',   bg: 'bg-amber-500/10',   bar: 'bg-amber-500',   glow: 'rgba(245,158,11,.3)',   tagBg: 'bg-amber-500/15 border-amber-500/40' }
  return           { tier: 'stable',   tc: 'text-emerald-400', bc: 'border-emerald-500', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500', glow: 'rgba(16,185,129,.3)',   tagBg: 'bg-emerald-500/15 border-emerald-500/40' }
}

export function buildRoutes(data, t) {
  const base = calcDays(data.cash, data.expenses)
  const mk = (id, cut, mult, colorKey, rk) => ({
    id, cut: `${cut}%`, mult,
    ...(rk === 'a' ? t.routeA : rk === 'b' ? t.routeB : t.routeC),
    ...(colorKey === 'green'
      ? { cb: 'border-emerald-500/40', at: 'text-emerald-400', ab: 'bg-emerald-500/10', bar: 'bg-emerald-500', btn: 'bg-emerald-600 hover:bg-emerald-500' }
      : colorKey === 'amber'
      ? { cb: 'border-amber-500/40',   at: 'text-amber-400',   ab: 'bg-amber-500/10',   bar: 'bg-amber-500',   btn: 'bg-amber-600 hover:bg-amber-500' }
      : { cb: 'border-rose-500/40',    at: 'text-rose-400',    ab: 'bg-rose-500/10',    bar: 'bg-rose-500',    btn: 'bg-rose-700 hover:bg-rose-600' }),
    newExp: data.expenses * mult,
    newDays: calcDays(data.cash, data.expenses * mult),
    gain: calcDays(data.cash, data.expenses * mult) - base,
    actions: (rk === 'a' ? t.actionsA : rk === 'b' ? t.actionsB : t.actionsC)(data),
  })
  return [mk('a', 15, .85, 'green', 'a'), mk('b', 30, .70, 'amber', 'b'), mk('c', 50, .50, 'rose', 'c')]
}

export function buildWeeks(base, route, t, n = 8) {
  return Array.from({ length: n }, (_, i) => {
    const gained = Math.floor(route.gain * Math.pow((i + 1) / n, 0.65))
    return { week: i + 1, days: base + gained, gained, label: t.weekLabels[i] }
  })
}

export function fmtC(n, lang) {
  return lang === 'th'
    ? new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(n)
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

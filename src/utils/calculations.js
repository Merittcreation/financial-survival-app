export function calculateSurvivalDays(cash, monthlyExpenses) {
  if (!cash || cash <= 0) return 0
  if (!monthlyExpenses || monthlyExpenses <= 0) return 999
  return Math.floor(cash / (monthlyExpenses / 30))
}

export function getSurvivalStatus(days) {
  if (days <= 0)  return { label: 'CRITICAL', color: 'red',    textClass: 'text-red-400',    borderClass: 'border-red-500',    bgClass: 'bg-red-500/10',    barClass: 'bg-red-500',    glow: 'rgba(239,68,68,0.25)',    message: "Zero buffer. This is a financial emergency — act today." }
  if (days <= 14) return { label: 'CRITICAL', color: 'red',    textClass: 'text-red-400',    borderClass: 'border-red-500',    bgClass: 'bg-red-500/10',    barClass: 'bg-red-500',    glow: 'rgba(239,68,68,0.25)',    message: "Under 2 weeks. You need to act right now." }
  if (days <= 30) return { label: 'DANGER',   color: 'orange', textClass: 'text-orange-400', borderClass: 'border-orange-500', bgClass: 'bg-orange-500/10', barClass: 'bg-orange-500', glow: 'rgba(249,115,22,0.25)',   message: "Less than a month. Make a plan this week." }
  if (days <= 60) return { label: 'WARNING',  color: 'yellow', textClass: 'text-yellow-400', borderClass: 'border-yellow-500', bgClass: 'bg-yellow-500/10', barClass: 'bg-yellow-500', glow: 'rgba(234,179,8,0.25)',    message: "About 2 months. You have time — use it wisely." }
  if (days <= 120)return { label: 'CAUTION',  color: 'blue',   textClass: 'text-blue-400',   borderClass: 'border-blue-500',   bgClass: 'bg-blue-500/10',   barClass: 'bg-blue-500',   glow: 'rgba(59,130,246,0.25)',   message: "A decent cushion. Keep growing it." }
  if (days <= 180)return { label: 'STABLE',   color: 'blue',   textClass: 'text-blue-400',   borderClass: 'border-blue-500',   bgClass: 'bg-blue-500/10',   barClass: 'bg-blue-500',   glow: 'rgba(59,130,246,0.25)',   message: "Solid foundation. You're ahead of most people." }
  return           { label: 'THRIVING',  color: 'green',  textClass: 'text-emerald-400', borderClass: 'border-emerald-500', bgClass: 'bg-emerald-500/10', barClass: 'bg-emerald-500', glow: 'rgba(16,185,129,0.25)', message: "You've built a real safety net. Respect." }
}

function actionsA({ income, expenses }) {
  const list = []
  if (expenses * 0.35 > income * 0.30)
    list.push({ text: 'Find a roommate — split rent and cut housing costs 30–40%', impact: 'high' })
  list.push({ text: 'Audit every subscription — cancel anything unused in the last 30 days', impact: 'medium' })
  list.push({ text: 'Cook at home 5 days a week instead of eating out', impact: 'medium' })
  list.push({ text: 'Switch to a cheaper phone or internet plan', impact: 'low' })
  list.push({ text: 'Use cashback apps (Honey, Rakuten) on every purchase', impact: 'low' })
  return list.slice(0, 4)
}

function actionsB({ income, expenses, debt }) {
  const list = []
  list.push({ text: 'Negotiate your rent — landlords usually prefer keeping reliable tenants', impact: 'high' })
  list.push({ text: 'Start freelancing or consulting on weekends using your current skills', impact: 'high' })
  list.push({ text: 'Sell unused items on Facebook Marketplace: electronics, clothes, furniture', impact: 'medium' })
  if (debt > income * 2)
    list.push({ text: 'Consolidate high-interest debt to slash monthly payments', impact: 'high' })
  else
    list.push({ text: 'Drive rideshare or deliver food 10 hrs/week for extra cash', impact: 'medium' })
  list.push({ text: 'Meal prep every Sunday — cuts food costs 30–40% with zero sacrifice', impact: 'medium' })
  return list.slice(0, 5)
}

function actionsC() {
  return [
    { text: 'Move to a smaller place or rent out a spare room immediately', impact: 'very high' },
    { text: 'Sell your car — use public transport, a bike, or rideshare instead', impact: 'very high' },
    { text: 'Take a second job or go full-time freelance right now', impact: 'very high' },
    { text: 'Liquidate non-essentials: gadgets, jewelry, collectibles, gym gear', impact: 'high' },
    { text: 'Apply for every gig available: tutoring, delivery, virtual assistant work', impact: 'high' },
  ]
}

export function generateRoutes(data) {
  const base = calculateSurvivalDays(data.cash, data.expenses)
  return [
    {
      id: 'a',
      name: 'Play Safe',
      subtitle: 'Small tweaks, zero drama',
      emoji: '🛡️',
      expenseReduction: '15%',
      multiplier: 0.85,
      description: "Cut the obvious waste. You probably won't even notice.",
      cardBorder: 'border-blue-500/40',
      accentText: 'text-blue-400',
      accentBg: 'bg-blue-500/10',
      barColor: 'bg-blue-500',
      btnClass: 'bg-blue-600 hover:bg-blue-500',
      newExpenses: data.expenses * 0.85,
      newDays: calculateSurvivalDays(data.cash, data.expenses * 0.85),
      daysGained: calculateSurvivalDays(data.cash, data.expenses * 0.85) - base,
      actions: actionsA(data),
    },
    {
      id: 'b',
      name: 'Get Serious',
      subtitle: 'Real changes, real results',
      emoji: '💪',
      expenseReduction: '30%',
      multiplier: 0.70,
      description: "Uncomfortable but very doable. This is where real change happens.",
      cardBorder: 'border-amber-500/40',
      accentText: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      barColor: 'bg-amber-500',
      btnClass: 'bg-amber-600 hover:bg-amber-500',
      newExpenses: data.expenses * 0.70,
      newDays: calculateSurvivalDays(data.cash, data.expenses * 0.70),
      daysGained: calculateSurvivalDays(data.cash, data.expenses * 0.70) - base,
      actions: actionsB(data),
    },
    {
      id: 'c',
      name: 'Do Whatever It Takes',
      subtitle: 'Max mode. No excuses.',
      emoji: '🔥',
      expenseReduction: '50%',
      multiplier: 0.50,
      description: "Drastic and effective. Your future self will thank you.",
      cardBorder: 'border-emerald-500/40',
      accentText: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      barColor: 'bg-emerald-500',
      btnClass: 'bg-emerald-600 hover:bg-emerald-500',
      newExpenses: data.expenses * 0.50,
      newDays: calculateSurvivalDays(data.cash, data.expenses * 0.50),
      daysGained: calculateSurvivalDays(data.cash, data.expenses * 0.50) - base,
      actions: actionsC(data),
    },
  ]
}

export function generateWeeklyProgress(baseDays, route, totalWeeks = 8) {
  const labels = ['First cuts made', 'Habits forming', 'Momentum building', 'New normal',
                  'System working', 'Compounding', 'Crushing it', 'Goal reached']
  return Array.from({ length: totalWeeks }, (_, i) => {
    const w = i + 1
    const progress = Math.pow(w / totalWeeks, 0.65) // accelerating curve
    const gained = Math.floor(route.daysGained * progress)
    return { week: w, days: baseDays + gained, gained, label: labels[i] }
  })
}

export function fmt$(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

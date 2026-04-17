export const T = {
  en: {
    brand: 'Financial Survival',
    heroLine1: 'How long can you survive',
    heroLine2: 'without income?',
    heroSub: 'Most people guess wrong. Find out the real number in 30 seconds.',
    ctaBtn: 'Find Out Now →',
    ctaNote: 'No account · No data stored online · 30 seconds',
    whereLabel: 'Where will you land?',
    criticalLabel: 'CRITICAL', riskyLabel: 'RISKY', stableLabel: 'STABLE',
    under30: 'Under 30 days', days3090: '30 – 90 days', days90p: '90+ days',

    back: '← Back', startOver: '← Start over',
    yourNumbers: 'YOUR NUMBERS',
    inputTitle: 'Just 4 numbers.',
    inputSub: 'Totally honest. No judgment.',
    fieldLabels: { cash: 'Cash on hand', income: 'Monthly income', expenses: 'Monthly expenses', debt: 'Total debt' },
    fieldHints: {
      cash: 'Savings + checking — money available right now',
      income: 'Take-home pay after taxes',
      expenses: 'Rent, food, bills, transport, subscriptions',
      debt: 'Credit cards, loans, BNPL (enter 0 if none)',
    },
    required: 'Required',
    submitBtn: 'Show Me My Number →',
    dataNote: 'Your data never leaves this device',

    youCanSurvive: 'You can survive',
    days: 'days',
    meterL: '0 days', meterR: '1 year',
    critMeter: 'CRITICAL <30', riskMeter: 'RISKY 30–90', stabMeter: 'STABLE 90+',
    monthlyBurn: 'Monthly burn', savingsRate: 'Savings rate', debtIncome: 'Debt/income',
    gameplanBtn: 'See Your Game Plan →',
    gameplanSub: '3 routes to more runway. Pick what fits your life.',

    heresPlan: "Here's your game plan",
    youHave: 'You have', rightNow: 'right now. Pick a route and change that number.',
    safeTag: 'Safe', seriousTag: 'Serious', extremeTag: 'Extreme',
    daysRunway: 'days runway', daysGained: 'days',
    nowLabel: 'Now:', afterLabel: 'After:',
    showActions: 'Show concrete actions', hideActions: 'Hide actions',
    spendCut: 'spend',
    chooseBtn: "I'll Do This →",

    routeA: { name: 'Play It Safe',  sub: 'Small wins, zero drama',       desc: "Easy wins you can start this week. You won't even feel them — but they add up." },
    routeB: { name: 'Get Serious',   sub: 'Real changes, real results',    desc: "Takes commitment — but you'll see results within 30 days. Most people start here." },
    routeC: { name: 'All In',        sub: 'Maximum impact. No excuses.',   desc: "The nuclear option. Optimizing for survival, not comfort. Use when you need max results fast." },

    weekProjection: 'Your 8-week projection',
    stickToPlan: 'Stick to the plan. Watch your runway grow.',
    today: 'Today', after8w: 'After 8 weeks',
    daysGainedFull: 'days gained from today',
    weekByWeek: 'Week-by-week progress',
    keyMilestones: 'Key milestones',
    missionTitle: 'Your mission:',
    missionBody: (route, from, to, saved) =>
      `Follow ${route} for 8 weeks. Cut monthly expenses from ${from} down to ${to}. That's ${saved}/month freed up — every dollar extends your runway.`,
    recalc: 'Recalculate', tryOther: 'Try Another Route',
    weekLabels: ['First cuts made','Habits forming','Momentum building','New normal','System working','Compounding','Crushing it','Goal reached'],

    advisorMsg: (days, tier) => {
      if (tier === 'critical') {
        if (days === 0) return "Zero runway — every day you wait costs you options. But you can change this."
        if (days <= 7)  return `${days} days. I need you to act today. The good news: this is fixable fast.`
        if (days <= 14) return `${days} days is your window. The right moves now can triple this number.`
        return `${days} days — less than a month. Tight, but I've seen people turn this around in weeks.`
      }
      if (tier === 'risky') {
        if (days < 60) return `${days} days. About ${Math.ceil(days/30)} months. You have time to act — just not time to waste.`
        return `${days} days. Three months is workable. A few focused changes and you'll be in a stronger spot.`
      }
      if (days <= 180) return `${days} days — that's solid. You're ahead of most people. Let's push it even higher.`
      return `${days} days? That's over ${Math.floor(days/30)} months. Genuinely impressive. You've built real resilience.`
    },

    actionsA: ({ income, expenses }) => {
      const a = []
      if (expenses * 0.35 > income * 0.30) a.push({ t: "Find a roommate — cut rent 30–40% overnight", i: 'high' })
      a.push({ t: "Cancel every subscription unused in the last 30 days", i: 'medium' })
      a.push({ t: "Cook at home 5 nights a week — eating out is the biggest food budget killer", i: 'medium' })
      a.push({ t: "Negotiate a cheaper phone or internet plan — takes 20 mins, saves every month", i: 'low' })
      a.push({ t: "Use cashback apps on every purchase (Honey, Rakuten)", i: 'low' })
      return a.slice(0, 4)
    },
    actionsB: ({ income, expenses, debt }) => {
      const a = []
      a.push({ t: "Negotiate your rent — landlords almost always prefer keeping good tenants", i: 'high' })
      a.push({ t: "Start freelancing on weekends using your current skills — even 10 hrs/week helps", i: 'high' })
      a.push({ t: "Sell unused items: electronics, clothes, gear, furniture — list everything now", i: 'medium' })
      a.push(debt > income * 2
        ? { t: "Consolidate high-interest debt to cut your monthly payment significantly", i: 'high' }
        : { t: "Drive rideshare or do food delivery evenings — $300–600/mo extra is real", i: 'medium' })
      a.push({ t: "Meal prep every Sunday — 40% food savings, zero willpower needed during the week", i: 'medium' })
      return a.slice(0, 5)
    },
    actionsC: () => [
      { t: "Downsize your home or rent out a spare room — housing is usually the #1 cost", i: 'very high' },
      { t: "Sell your car — switch to transit, bike, or rideshare and pocket the difference", i: 'very high' },
      { t: "Take a second job or go full-time freelance immediately — no half-measures", i: 'very high' },
      { t: "Liquidate non-essentials: gadgets, jewelry, collectibles, gym equipment", i: 'high' },
      { t: "Apply for every gig you qualify for: tutoring, delivery, VA work, dog walking", i: 'high' },
    ],
  },

  th: {
    brand: 'แผนรอดชีวิตทางการเงิน',
    heroLine1: 'คุณอยู่ได้กี่วัน',
    heroLine2: 'ถ้าไม่มีรายได้?',
    heroSub: 'คนส่วนใหญ่เดาผิด รู้คำตอบที่แท้จริงใน 30 วินาที',
    ctaBtn: 'รู้เลยตอนนี้ →',
    ctaNote: 'ไม่ต้องสมัคร · ข้อมูลไม่ออกจากเครื่อง · 30 วินาที',
    whereLabel: 'คุณอยู่ในกลุ่มไหน?',
    criticalLabel: 'วิกฤต', riskyLabel: 'เสี่ยง', stableLabel: 'ปลอดภัย',
    under30: 'ไม่ถึง 30 วัน', days3090: '30 – 90 วัน', days90p: '90+ วัน',

    back: '← กลับ', startOver: '← เริ่มใหม่',
    yourNumbers: 'ข้อมูลของคุณ',
    inputTitle: 'แค่ 4 ตัวเลข',
    inputSub: 'ตอบตามจริง ไม่ตัดสิน',
    fieldLabels: { cash: 'เงินสดในมือ', income: 'รายได้ต่อเดือน', expenses: 'ค่าใช้จ่ายต่อเดือน', debt: 'หนี้รวมทั้งหมด' },
    fieldHints: {
      cash: 'เงินออม + บัญชีธนาคาร — เงินที่เข้าถึงได้ตอนนี้',
      income: 'เงินเดือนที่รับจริงหลังหักภาษี',
      expenses: 'ค่าเช่า อาหาร ค่าน้ำไฟ ค่าเดินทาง ค่าสมาชิกต่างๆ',
      debt: 'บัตรเครดิต สินเชื่อ ผ่อนสินค้า (ใส่ 0 ถ้าไม่มี)',
    },
    required: 'จำเป็น',
    submitBtn: 'คำนวณผลของฉัน →',
    dataNote: 'ข้อมูลของคุณไม่ออกจากเครื่องนี้',

    youCanSurvive: 'คุณอยู่ได้',
    days: 'วัน',
    meterL: '0 วัน', meterR: '1 ปี',
    critMeter: 'วิกฤต <30', riskMeter: 'เสี่ยง 30–90', stabMeter: 'ปลอดภัย 90+',
    monthlyBurn: 'ใช้จ่าย/เดือน', savingsRate: 'อัตราออม', debtIncome: 'หนี้/รายได้',
    gameplanBtn: 'ดูแผนของฉัน →',
    gameplanSub: '3 เส้นทาง เพิ่มวันรอดชีวิต เลือกที่เหมาะกับคุณ',

    heresPlan: 'นี่คือแผนของคุณ',
    youHave: 'ตอนนี้คุณมี', rightNow: 'วัน เลือกเส้นทางแล้วเปลี่ยนตัวเลขนั้น',
    safeTag: 'ปลอดภัย', seriousTag: 'จริงจัง', extremeTag: 'สุดขีด',
    daysRunway: 'วันที่รอดได้', daysGained: 'วัน',
    nowLabel: 'ตอนนี้:', afterLabel: 'หลังทำ:',
    showActions: 'ดูสิ่งที่ต้องทำ', hideActions: 'ซ่อน',
    spendCut: 'ค่าใช้จ่าย',
    chooseBtn: 'ฉันจะทำแบบนี้ →',

    routeA: { name: 'เริ่มง่ายๆ',   sub: 'ปรับเล็กน้อย ไม่เจ็บปวด',  desc: 'ทำได้สัปดาห์นี้เลย แทบไม่รู้สึก แต่สะสมแล้วได้ผลจริง' },
    routeB: { name: 'จริงจังขึ้น',  sub: 'เปลี่ยนจริง ได้ผลจริง',    desc: 'ต้องใช้ความตั้งใจ แต่เห็นผลภายใน 30 วัน คนส่วนใหญ่เริ่มที่นี่' },
    routeC: { name: 'ทุ่มสุดตัว',   sub: 'สูงสุด ไม่มีข้อแม้',        desc: 'ทางเลือกสุดขีด เอาความอยู่รอดเป็นที่ตั้ง ใช้เมื่อต้องการผลสูงสุดด่วน' },

    weekProjection: 'การคาดการณ์ 8 สัปดาห์',
    stickToPlan: 'ทำตามแผน แล้วดูตัวเลขเพิ่มขึ้น',
    today: 'วันนี้', after8w: 'หลัง 8 สัปดาห์',
    daysGainedFull: 'วันที่เพิ่มขึ้นจากวันนี้',
    weekByWeek: 'ความคืบหน้าแต่ละสัปดาห์',
    keyMilestones: 'เป้าหมายสำคัญ',
    missionTitle: 'ภารกิจของคุณ:',
    missionBody: (route, from, to, saved) =>
      `ทำตามแผน ${route} เป็นเวลา 8 สัปดาห์ ลดค่าใช้จ่ายจาก ${from} ให้เหลือ ${to} นั่นคือ ${saved}/เดือนที่ประหยัดได้ — ทุกบาทช่วยเพิ่มวันรอดชีวิต`,
    recalc: 'คำนวณใหม่', tryOther: 'ลองเส้นทางอื่น',
    weekLabels: ['เริ่มลดค่าใช้จ่าย','นิสัยกำลังก่อตัว','ได้โมเมนตัม','ชีวิตปกติใหม่','ระบบทำงานแล้ว','สะสมผลลัพธ์','สุดยอดมาก','ถึงเป้าหมาย'],

    advisorMsg: (days, tier) => {
      if (tier === 'critical') {
        if (days === 0) return "ไม่มีเงินสำรองเลย อย่ารอช้า ยิ่งช้ายิ่งเสียโอกาส แต่ยังแก้ได้"
        if (days <= 7)  return `${days} วัน ต้องลงมือวันนี้เลย ข่าวดี: แก้ได้เร็วถ้าเริ่มเดี๋ยวนี้`
        if (days <= 14) return `${days} วันคือโอกาสของคุณ ถ้าเดินถูกทางตอนนี้ ตัวเลขนี้เพิ่มได้สามเท่า`
        return `${days} วัน ไม่ถึงเดือน ตึงมือ แต่เคยเห็นคนพลิกสถานการณ์ได้ในไม่กี่สัปดาห์`
      }
      if (tier === 'risky') {
        if (days < 60) return `${days} วัน ราว ${Math.ceil(days/30)} เดือน มีเวลาพอ แต่อย่าปล่อยให้เสียเปล่า`
        return `${days} วัน สามเดือนพอทำอะไรได้ ปรับไม่กี่อย่างก็แข็งแกร่งขึ้นมาก`
      }
      if (days <= 180) return `${days} วัน — ดีมาก คุณนำหน้าคนส่วนใหญ่แล้ว มาผลักให้สูงกว่านี้กัน`
      return `${days} วัน? นั่นคือกว่า ${Math.floor(days/30)} เดือน น่าประทับใจมาก คุณสร้างความมั่นคงได้จริง`
    },

    actionsA: ({ income, expenses }) => {
      const a = []
      if (expenses * 0.35 > income * 0.30) a.push({ t: 'หาคนมาเช่าห้องด้วย — ลดค่าเช่าได้ทันที 30–40%', i: 'high' })
      a.push({ t: 'ยกเลิก subscription ที่ไม่ได้ใช้ใน 30 วันที่ผ่านมาทั้งหมด', i: 'medium' })
      a.push({ t: 'ทำอาหารกินเองที่บ้าน 5 คืน/สัปดาห์ — ค่าอาหารนอกบ้านคือตัวร้ายอันดับ 1', i: 'medium' })
      a.push({ t: 'ต่อรองแพ็กเกจมือถือหรืออินเทอร์เน็ต — ใช้เวลา 20 นาที ประหยัดทุกเดือน', i: 'low' })
      a.push({ t: 'ใช้แอปคืนเงิน/โค้ดส่วนลดทุกครั้งที่ซื้อของ', i: 'low' })
      return a.slice(0, 4)
    },
    actionsB: ({ income, expenses, debt }) => {
      const a = []
      a.push({ t: 'ต่อรองค่าเช่ากับเจ้าของบ้าน — เจ้าของส่วนใหญ่ชอบคนเช่าที่ดีมากกว่าหาคนใหม่', i: 'high' })
      a.push({ t: 'รับงาน freelance สุดสัปดาห์โดยใช้ทักษะที่มีอยู่ — แค่ 10 ชม./สัปดาห์ก็ช่วยได้', i: 'high' })
      a.push({ t: 'ขายของที่ไม่ใช้ผ่าน Facebook Marketplace: อุปกรณ์ไฟฟ้า เสื้อผ้า เฟอร์นิเจอร์', i: 'medium' })
      a.push(debt > income * 2
        ? { t: 'รวมหนี้ดอกเบี้ยสูงให้เป็นก้อนเดียว เพื่อลดยอดจ่ายรายเดือน', i: 'high' }
        : { t: 'ขับ Grab/Bolt หรือส่งอาหารช่วงเย็น — เพิ่มได้ 3,000–6,000 บาท/เดือน', i: 'medium' })
      a.push({ t: 'เตรียมอาหารทุกวันอาทิตย์ — ประหยัดค่าอาหาร 40% โดยไม่ต้องฝืนใจระหว่างสัปดาห์', i: 'medium' })
      return a.slice(0, 5)
    },
    actionsC: () => [
      { t: 'ย้ายไปอยู่ที่เล็กลง หรือปล่อยเช่าห้องว่าง — ที่อยู่อาศัยมักเป็นค่าใช้จ่ายอันดับ 1', i: 'very high' },
      { t: 'ขายรถ แล้วใช้ขนส่งสาธารณะ/จักรยาน/แกร็บแทน ประหยัดได้มาก', i: 'very high' },
      { t: 'รับงานที่สองหรือทำ freelance เต็มเวลาทันที ไม่มีข้อแม้', i: 'very high' },
      { t: 'ขายของที่ไม่จำเป็น: อุปกรณ์ไฟฟ้า เครื่องประดับ ของสะสม อุปกรณ์ออกกำลังกาย', i: 'high' },
      { t: 'สมัครงาน gig ทุกอย่างที่ทำได้: ติวหนังสือ ส่งอาหาร งาน VA งานอิสระออนไลน์', i: 'high' },
    ],
  },
}

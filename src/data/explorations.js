// 宇宙探索目標配置
export default [
  {
    id: 'relic',
    name: '宇宙遺跡',
    desc: '發現遠古文明遺跡，獲得稀有知識與資源。',
    cost: { energy: 1000, knowledge: 1 },
    cooldown: 600, // 秒
    commonPool: [
      { res: 'knowledge', min: 0.1, max: 1, weight: 5 },
      { res: 'matter', min: 200, max: 2000, weight: 3 },
      { res: 'energy', min: 200, max: 2000, weight: 2 }
    ],
    rarePool: [
      { res: 'alienFragment', chance: 0.03 },
      { res: 'ancientLog', chance: 0.01 }
    ],
    failReward: { relicShard: 1 }, // 失敗必得“遺跡碎片”
    chance: 0.3
  },
  {
    id: 'singularity',
    name: '時空奇點',
    desc: '探索到時空奇點，獲得能量與特殊科技碎片。',
    cost: { energy: 2000, matter: 1000 },
    cooldown: 1200,
    commonPool: [
      { res: 'energy', min: 100, max: 4000, weight: 5 },
      { res: 'knowledge', min: 0.5, max: 2, weight: 2 }
    ],
    rarePool: [
      { res: 'singularityCore', chance: 0.02 },
      { res: 'timeLog', chance: 0.01 }
    ],
    failReward: { timeShard: 1 },
    chance: 0.2
  },
  {
    id: 'alienTech',
    name: '外星科技',
    desc: '獲得外星文明遺留的科技，提升科技效率。',
    cost: { energy: 1000, knowledge: 1 },
    cooldown: 1800,
    commonPool: [
      { res: 'knowledge', min: 0.1, max: 1, weight: 5 },
      { res: 'energy', min: 100, max: 2000, weight: 2 }
    ],
    rarePool: [{ res: 'techBoost', chance: 0.02 }],
    failReward: { techFragment: 1 },
    chance: 0.15
  },
  {
    id: 'specialPlanet',
    name: '特殊星球',
    desc: '發現資源豐富的特殊星球，獲得大量資源。',
    cost: { energy: 4000, matter: 4000 },
    cooldown: 2400,
    commonPool: [
      { res: 'energy', min: 1000, max: 5000, weight: 5 },
      { res: 'matter', min: 1000, max: 5000, weight: 5 },
      { res: 'darkMatter', min: 0.1, max: 1, weight: 1 }
    ],
    rarePool: [{ res: 'planetRelic', chance: 0.01 }],
    failReward: { planetDust: 1 },
    chance: 0.1
  },
  {
    id: 'void',
    name: '虛空探索',
    desc: '探索虛空，可能一無所獲，也可能獲得意外之喜。',
    cost: { energy: 1000, knowledge: 1 },
    cooldown: 600,
    commonPool: [
      { res: 'energy', min: 100, max: 2000, weight: 2 },
      { res: 'knowledge', min: 0.1, max: 1, weight: 1 }
    ],
    rarePool: [{ res: 'voidCrystal', chance: 0.005 }],
    failReward: { voidLog: 1 },
    chance: 0.25
  }
]

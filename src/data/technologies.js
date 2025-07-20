// 科技靜態數據，僅包含靜態屬性，不含動態狀態
export default {
  // 基礎科技 - 支持原子級熵減
  atomicManipulation: {
    unlocked: true,
    efficiency: 1,
    prerequisites: [],
    cost: { energy: 10, matter: 5 },
    group: '基礎科技',
    effect: '解鎖原子排序能力',
    entropyStage: 'atomicOrdering'
  },
  thermalControl: {
    group: '熱控制',
    effect: '通過精確控制分子熱運動，降低系統溫度，為更高階有序度打下基礎。',
    unlocked: false,
    efficiency: 1.2,
    cost: { energy: 50, matter: 20, knowledge: 10 },
    entropyStage: 'molecularCooling',
    prerequisites: ['atomicManipulation']
  },
  // 恆星科技 - 支持恆星級熵減
  stellarEngineering: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 200, matter: 100, knowledge: 50 },
    prerequisites: ['thermalControl'],
    group: '恆星科技',
    effect: '解鎖恆星熄滅能力',
    entropyStage: 'stellarExtinction'
  },
  // 黑洞科技 - 支持黑洞級熵減
  blackholePhysics: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 1000, matter: 500, knowledge: 200, darkMatter: 10 },
    prerequisites: ['stellarEngineering'],
    group: '黑洞科技',
    effect: '解鎖黑洞解壓能力',
    entropyStage: 'blackholeDecompression'
  },
  // 宇宙科技 - 支持宇宙級熵減
  energyConversion: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 5000, matter: 2000, knowledge: 1000, darkMatter: 100 },
    prerequisites: ['blackholePhysics'],
    group: '宇宙科技',
    effect: '解鎖能量物質化能力',
    entropyStage: 'energyMaterialization'
  },
  universalTheory: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 20000, matter: 10000, knowledge: 5000, darkMatter: 500, antiMatter: 100 },
    prerequisites: ['energyConversion'],
    group: '宇宙科技',
    effect: '解鎖宇宙單一化能力',
    entropyStage: 'universalUnification'
  },
  quantumComputing: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 100, matter: 50, knowledge: 20 },
    prerequisites: ['thermalControl'],
    group: '高等科技',
    effect: '提升熵減計算效率',
    entropyStage: 'molecularCooling'
  },
  spacetimeManipulation: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 2000, matter: 1000, knowledge: 500, darkMatter: 50 },
    prerequisites: ['stellarEngineering'],
    group: '宇宙科技',
    effect: '提升時空操控能力',
    entropyStage: 'universalUnification'
  },
  lowPotentialTrapTech: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 500, matter: 200, knowledge: 100 },
    prerequisites: ['thermalControl'],
    group: '分子冷卻科技',
    effect: '解鎖低勢能陷阱',
    entropyStage: 'molecularCooling'
  },
  quantumDecoherenceTech: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 1000, matter: 500, knowledge: 200 },
    prerequisites: ['thermalControl'],
    group: '分子冷卻科技',
    effect: '解鎖量子退相干抑制器',
    entropyStage: 'molecularCooling'
  },
  brownianCaptureTech: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 2000, matter: 1000, knowledge: 500 },
    prerequisites: ['thermalControl'],
    group: '分子冷卻科技',
    effect: '解鎖布朗運動捕獲網',
    entropyStage: 'molecularCooling'
  },
  // 新科技
  stealthAlgorithm: {
    unlocked: false,
    efficiency: 1,
    cost: { energy: 5000, matter: 2000, knowledge: 1000 },
    prerequisites: ['stellarEngineering'],
    group: '隱匿科技',
    effect: '解鎖隱匿發生器，降低暴露值增長速率',
    entropyStage: 'stellarExtinction'
  },
  darkMatterExtraction: {
    group: '暗物質提取',
    effect: '提升暗物質收集器的產出效率。',
    unlocked: false,
    efficiency: 1.5, // 產出提升倍率
    cost: { energy: 5000, matter: 2000, knowledge: 10000 },
    entropyStage: 'stellarExtinction'
  },
  antiMatterSynthesis: {
    group: '反物質合成',
    effect: '提升反物質合成器的產出效率。',
    unlocked: false,
    efficiency: 2, // 產出提升倍率
    cost: { knowledge: 20000, energy: 100000, darkMatter: 10000 },
    entropyStage: 'blackholeDecompression',
    prerequisites: ['blackholePhysics']
  },
  nanoManufacturing: {
    group: '奈米製造',
    effect: '提升奈米工廠的產出效率。',
    unlocked: false,
    efficiency: 2, // 產出提升倍率
    cost: { knowledge: 5000, energy: 5000, matter: 2000 },
    entropyStage: 'molecularCooling',
    prerequisites: ['thermalControl']
  }
}

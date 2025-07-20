// 無限遞迴成就類型配置
export default [
  // 資源類成就
  {
    id: 'energy_achievement',
    name: '能量大師',
    desc: '累計獲得能量',
    type: 'resource',
    resource: ['energy'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { energy: 10 }
  },
  {
    id: 'matter_achievement',
    name: '物質富翁',
    desc: '累計獲得物質',
    type: 'resource',
    resource: ['matter'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { matter: 10 }
  },
  {
    id: 'knowledge_achievement',
    name: '知識淵博',
    desc: '累計獲得知識',
    type: 'resource',
    resource: ['knowledge'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { knowledge: 10 }
  },
  {
    id: 'darkMatter_achievement',
    name: '暗物質獵手',
    desc: '累計獲得暗物質',
    type: 'resource',
    resource: ['darkMatter'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { darkMatter: 10 }
  },
  {
    id: 'antiMatter_achievement',
    name: '反物質專家',
    desc: '累計獲得反物質',
    type: 'resource',
    resource: ['antiMatter'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { antiMatter: 10 }
  },
  {
    id: 'nanoMaterial_achievement',
    name: '奈米材料大師',
    desc: '累計獲得奈米材料',
    type: 'resource',
    resource: ['nanoMaterial'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { nanoMaterial: 10 }
  },
  {
    id: 'quantumBits_achievement',
    name: '量子比特大師',
    desc: '累計獲得量子比特',
    type: 'resource',
    resource: ['quantumBits'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { quantumBits: 10 }
  },
  {
    id: 'bioOrder_achievement',
    name: '生物有序度大師',
    desc: '累計獲得生物有序度',
    type: 'resource',
    resource: ['bioOrder'],
    baseTarget: 100,
    targetMultiplier: 10,
    baseReward: 10,
    rewardMultiplier: 2,
    reward: { bioOrder: 10 }
  },
  // 建築類成就
  {
    id: 'build_atomicSorter',
    name: '原子排序器建造者',
    desc: '累計建造原子排序器',
    type: 'building',
    resource: ['energy'],
    building: 'atomicSorter',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_molecularCooler',
    name: '分子冷卻器建造者',
    desc: '累計建造分子冷卻器',
    type: 'building',
    resource: ['energy'],
    building: 'molecularCooler',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_stellarExtinguisher',
    name: '恆星熄滅器建造者',
    desc: '累計建造恆星熄滅器',
    type: 'building',
    resource: ['energy'],
    building: 'stellarExtinguisher',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_blackholeDecompressor',
    name: '黑洞解壓器建造者',
    desc: '累計建造黑洞解壓器',
    type: 'building',
    resource: ['energy'],
    building: 'blackholeDecompressor',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_energyMaterializer',
    name: '能量物質化器建造者',
    desc: '累計建造能量物質化器',
    type: 'building',
    resource: ['energy'],
    building: 'energyMaterializer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_universalUnifier',
    name: '宇宙單一化器建造者',
    desc: '累計建造宇宙單一化器',
    type: 'building',
    resource: ['energy'],
    building: 'universalUnifier',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_quantumComputer',
    name: '量子計算機建造者',
    desc: '累計建造量子計算機',
    type: 'building',
    resource: ['quantumBits'],
    building: 'quantumComputer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { quantumBits: 5 }
  },
  {
    id: 'build_spacetimePortal',
    name: '時空傳送門建造者',
    desc: '累計建造時空傳送門',
    type: 'building',
    resource: ['energy'],
    building: 'spacetimePortal',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_lowPotentialTrap',
    name: '低勢能陷阱建造者',
    desc: '累計建造低勢能陷阱',
    type: 'building',
    resource: ['energy'],
    building: 'lowPotentialTrap',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_quantumDecoherenceSuppressor',
    name: '量子退相干抑制器建造者',
    desc: '累計建造量子退相干抑制器',
    type: 'building',
    resource: ['quantumBits'],
    building: 'quantumDecoherenceSuppressor',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { quantumBits: 5 }
  },
  {
    id: 'build_brownianCaptureNet',
    name: '布朗運動捕獲網建造者',
    desc: '累計建造布朗運動捕獲網',
    type: 'building',
    resource: ['energy'],
    building: 'brownianCaptureNet',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_stealthGenerator',
    name: '隱匿發生器建造者',
    desc: '累計建造隱匿發生器',
    type: 'building',
    resource: ['energy'],
    building: 'stealthGenerator',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_antiMatterSynthesizer',
    name: '反物質合成器建造者',
    desc: '累計建造反物質合成器',
    type: 'building',
    resource: ['antiMatter'],
    building: 'antiMatterSynthesizer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { antiMatter: 5 }
  },
  {
    id: 'build_darkMatterCollector',
    name: '暗物質收集器建造者',
    desc: '累計建造暗物質收集器',
    type: 'building',
    resource: ['darkMatter'],
    building: 'darkMatterCollector',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { darkMatter: 5 }
  },
  {
    id: 'build_aotoumRealityPerforator',
    name: '奧陶姆現實透孔儀建造者',
    desc: '累計建造奧陶姆現實透孔儀',
    type: 'building',
    resource: ['nanoMaterial'],
    building: 'aotoumRealityPerforator',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { nanoMaterial: 5 }
  },
  {
    id: 'build_crystalDefectRepairer',
    name: '晶體缺陷修儀建造者',
    desc: '累計建造晶體缺陷修儀',
    type: 'building',
    resource: ['nanoMaterial'],
    building: 'crystalDefectRepairer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { nanoMaterial: 5 }
  },
  {
    id: 'build_bioEntropyStabilizer',
    name: '生物熵穩定艙建造者',
    desc: '累計建造生物熵穩定艙',
    type: 'building',
    resource: ['bioOrder'],
    building: 'bioEntropyStabilizer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { bioOrder: 5 }
  },
  {
    id: 'build_orbitalOptimizer',
    name: '行星軌道最佳化器建造者',
    desc: '累計建造行星軌道最佳化器',
    type: 'building',
    resource: ['energy'],
    building: 'orbitalOptimizer',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { energy: 5 }
  },
  {
    id: 'build_nanoFactory',
    name: '奈米工廠建造者',
    desc: '累計建造奈米工廠',
    type: 'building',
    resource: ['nanoMaterial'],
    building: 'nanoFactory',
    baseTarget: 10,
    targetMultiplier: 2,
    baseReward: 5,
    rewardMultiplier: 2,
    reward: { nanoMaterial: 5 }
  },
  // 科技類成就
  {
    id: 'unlock_atomicManipulation',
    name: '原子操控解鎖者',
    desc: '解鎖科技：原子操控',
    type: 'tech',
    tech: 'atomicManipulation',
    baseReward: 20,
    reward: { knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_thermalControl',
    name: '熱控先鋒',
    desc: '解鎖科技：熱控制',
    type: 'tech',
    tech: 'thermalControl',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_stellarEngineering',
    name: '恆星工程師',
    desc: '解鎖科技：恆星工程',
    type: 'tech',
    tech: 'stellarEngineering',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_blackholePhysics',
    name: '黑洞物理學家',
    desc: '解鎖科技：黑洞物理',
    type: 'tech',
    tech: 'blackholePhysics',
    baseReward: 20,
    reward: { darkMatter: 10, knowledge: 10 },
    once: true
  },
  {
    id: 'unlock_energyConversion',
    name: '能量轉化大師',
    desc: '解鎖科技：能量轉化',
    type: 'tech',
    tech: 'energyConversion',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_universalTheory',
    name: '宇宙理論家',
    desc: '解鎖科技：宇宙理論',
    type: 'tech',
    tech: 'universalTheory',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_quantumComputing',
    name: '量子計算先鋒',
    desc: '解鎖科技：量子計算',
    type: 'tech',
    tech: 'quantumComputing',
    baseReward: 20,
    reward: { knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_spacetimeManipulation',
    name: '時空操控者',
    desc: '解鎖科技：時空操控',
    type: 'tech',
    tech: 'spacetimeManipulation',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_lowPotentialTrapTech',
    name: '低勢能陷阱專家',
    desc: '解鎖科技：低勢能陷阱',
    type: 'tech',
    tech: 'lowPotentialTrapTech',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_quantumDecoherenceTech',
    name: '量子退相干專家',
    desc: '解鎖科技：量子退相干',
    type: 'tech',
    tech: 'quantumDecoherenceTech',
    baseReward: 20,
    reward: { quantumBits: 10, knowledge: 10 },
    once: true
  },
  {
    id: 'unlock_brownianCaptureTech',
    name: '布朗捕獲專家',
    desc: '解鎖科技：布朗運動捕獲',
    type: 'tech',
    tech: 'brownianCaptureTech',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_stealthAlgorithm',
    name: '隱匿算法大師',
    desc: '解鎖科技：隱匿算法',
    type: 'tech',
    tech: 'stealthAlgorithm',
    baseReward: 20,
    reward: { energy: 20, knowledge: 20 },
    once: true
  },
  {
    id: 'unlock_darkMatterExtraction',
    name: '暗物質提取專家',
    desc: '解鎖科技：暗物質提取',
    type: 'tech',
    tech: 'darkMatterExtraction',
    baseReward: 20,
    reward: { darkMatter: 10, knowledge: 10 },
    once: true
  },
  {
    id: 'unlock_antiMatterSynthesis',
    name: '反物質合成專家',
    desc: '解鎖科技：反物質合成',
    type: 'tech',
    tech: 'antiMatterSynthesis',
    baseReward: 20,
    reward: { antiMatter: 10, knowledge: 10 },
    once: true
  },
  {
    id: 'unlock_nanoManufacturing',
    name: '奈米製造專家',
    desc: '解鎖科技：奈米製造',
    type: 'tech',
    tech: 'nanoManufacturing',
    baseReward: 20,
    reward: { nanoMaterial: 10, knowledge: 10 },
    once: true
  },
  // 熵減階段成就
  {
    id: 'entropy_atomicOrdering',
    name: '原子排序突破',
    desc: '完成熵減階段：原子排序',
    type: 'entropyStage',
    entropyStage: 'atomicOrdering',
    baseReward: 50,
    reward: { energy: 50, matter: 50 },
    once: true
  },
  {
    id: 'entropy_molecularCooling',
    name: '分子冷卻突破',
    desc: '完成熵減階段：分子冷卻',
    type: 'entropyStage',
    entropyStage: 'molecularCooling',
    baseReward: 50,
    reward: { energy: 100, matter: 100 },
    once: true
  },
  {
    id: 'entropy_stellarExtinction',
    name: '恆星熄滅突破',
    desc: '完成熵減階段：恆星熄滅',
    type: 'entropyStage',
    entropyStage: 'stellarExtinction',
    baseReward: 50,
    reward: { energy: 200, matter: 200, darkMatter: 20 },
    once: true
  },
  {
    id: 'entropy_blackholeDecompression',
    name: '黑洞解壓突破',
    desc: '完成熵減階段：黑洞解壓',
    type: 'entropyStage',
    entropyStage: 'blackholeDecompression',
    baseReward: 50,
    reward: { energy: 500, matter: 500, darkMatter: 50, antiMatter: 10 },
    once: true
  },
  {
    id: 'entropy_energyMaterialization',
    name: '能量物質化突破',
    desc: '完成熵減階段：能量物質化',
    type: 'entropyStage',
    entropyStage: 'energyMaterialization',
    baseReward: 50,
    reward: { energy: 1000, matter: 1000, nanoMaterial: 100 },
    once: true
  },
  {
    id: 'entropy_universalUnification',
    name: '宇宙單一化突破',
    desc: '完成熵減階段：宇宙單一化',
    type: 'entropyStage',
    entropyStage: 'universalUnification',
    baseReward: 50,
    reward: { energy: 5000, matter: 5000, nanoMaterial: 500 },
    once: true
  },
  // 複合條件成就
  {
    id: 'compound_energy_quantumComputing',
    name: '能量與量子',
    desc: '擁有10.00A能量並解鎖量子計算科技',
    type: 'compound',
    conditions: [
      { type: 'resource', resource: 'energy', target: 10000 },
      { type: 'tech', tech: 'quantumComputing' }
    ],
    reward: { energy: 2000, quantumBits: 100, knowledge: 200 },
    once: true
  },
  {
    id: 'compound_darkMatter_darkMatterCollector',
    name: '暗物質大亨',
    desc: '擁有500.000暗物質並建造10.000個暗物質收集器',
    type: 'compound',
    conditions: [
      { type: 'resource', resource: 'darkMatter', target: 500 },
      { type: 'building', building: 'darkMatterCollector', target: 10 }
    ],
    reward: { darkMatter: 200, energy: 500 },
    once: true
  },
  {
    id: 'compound_nanoFactory_nanoManufacturing',
    name: '奈米工業先鋒',
    desc: '建造10.000個奈米工廠並解鎖奈米製造科技',
    type: 'compound',
    conditions: [
      { type: 'building', building: 'nanoFactory', target: 10 },
      { type: 'tech', tech: 'nanoManufacturing' }
    ],
    reward: { nanoMaterial: 200, knowledge: 100 },
    once: true
  },
  {
    id: 'compound_blackholeDecompression_antiMatterSynthesis',
    name: '黑洞與反物質',
    desc: '完成黑洞解壓階段並解鎖反物質合成科技',
    type: 'compound',
    conditions: [
      { type: 'entropyStage', entropyStage: 'blackholeDecompression' },
      { type: 'tech', tech: 'antiMatterSynthesis' }
    ],
    reward: { antiMatter: 200, darkMatter: 100, knowledge: 200 },
    once: true
  },
  {
    id: 'compound_knowledge_quantumComputer_quantumComputing',
    name: '知識量子突破',
    desc: '擁有10.00A知識，建造5個量子計算機，並解鎖量子計算科技',
    type: 'compound',
    conditions: [
      { type: 'resource', resource: 'knowledge', target: 10000 },
      { type: 'building', building: 'quantumComputer', target: 5 },
      { type: 'tech', tech: 'quantumComputing' }
    ],
    reward: { knowledge: 2000, quantumBits: 200 },
    once: true
  },
  {
    id: 'compound_antiMatter_energyMaterialization',
    name: '反物質能量化',
    desc: '擁有1.00A反物質並完成能量物質化階段',
    type: 'compound',
    conditions: [
      { type: 'resource', resource: 'antiMatter', target: 1000 },
      { type: 'entropyStage', entropyStage: 'energyMaterialization' }
    ],
    reward: { antiMatter: 500, energy: 2000, nanoMaterial: 200 },
    once: true
  },
  {
    id: 'compound_allTech_allStage',
    name: '終極文明',
    desc: '解鎖所有科技並完成所有熵減階段',
    type: 'compound',
    conditions: [{ type: 'allTech' }, { type: 'allEntropyStage' }],
    reward: { energy: 10000, matter: 10000, knowledge: 5000, darkMatter: 2000, antiMatter: 1000, nanoMaterial: 1000 },
    unlock: { building: 'universalUnifier' },
    once: true
  }
]

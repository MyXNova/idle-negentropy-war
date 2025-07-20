// 熵減進程
export default {
  // 第一階段：微觀熵減
  atomicOrdering: {
    name: '原子排序',
    description: '手動排列原子，建立有序結構',
    unlocked: true,
    progress: 0,
    maxProgress: 1000,
    efficiency: 0.1,
    cost: { energy: 0.5, matter: 0.5 },
    effect: '基礎熵減，減緩局部熱運動'
  },
  molecularCooling: {
    name: '分子冷卻',
    description: '減緩分子熱運動，降低系統溫度',
    unlocked: false,
    progress: 0,
    maxProgress: 5000,
    efficiency: 0.5,
    cost: { energy: 2.5, matter: 1 },
    effect: '中等熵減，建立分子級有序'
  },
  // 第二階段：宏觀熵減
  stellarExtinction: {
    name: '恆星熄滅',
    description: '熄滅恆星，停止核融合產生的熵增',
    unlocked: false,
    progress: 0,
    maxProgress: 10000,
    efficiency: 2.0,
    cost: { energy: 10, matter: 5, darkMatter: 1 },
    effect: '大規模熵減，控制恆星活動'
  },
  blackholeDecompression: {
    name: '黑洞解壓',
    description: '解壓黑洞，釋放被壓縮的資訊',
    unlocked: false,
    progress: 0,
    maxProgress: 50000,
    efficiency: 5.0,
    cost: { energy: 100, matter: 50, darkMatter: 10, antiMatter: 5 },
    effect: '超大規模熵減，資訊恢復'
  },
  // 第三階段：宇宙級熵減
  energyMaterialization: {
    name: '能量物質化',
    description: '將純能量轉化為有序物質',
    unlocked: false,
    progress: 0,
    maxProgress: 100000,
    efficiency: 10.0,
    cost: { energy: 1000, matter: 100, darkMatter: 50, antiMatter: 20 },
    effect: '宇宙級熵減，能量有序化'
  },
  universalUnification: {
    name: '宇宙單一化',
    description: '將所有物質重新轉化為氫，達到最低熵狀態',
    unlocked: false,
    progress: 0,
    maxProgress: 1000000,
    efficiency: 50.0,
    cost: { energy: 10000, matter: 1000, darkMatter: 100, antiMatter: 50, nanoMaterial: 10 },
    effect: '終極熵減，宇宙回歸原始狀態'
  }
}

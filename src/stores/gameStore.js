import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { decryptData, encryptData } from '@/plugins/crypto'
import buildingsData from '@/data/buildings'
import technologiesData from '@/data/technologies'
import entropyReductionData from '@/data/entropyReductions'
import resourcesData from '@/data/resources'
import explorationResData from '@/data/explorationRes'
import achievementsData from '@/data/achievements'
import { useAchievementService } from '@/plugins/achievementService'
import { ElNotification } from 'element-plus'

export const useGameStore = defineStore(
  'game',
  () => {
    // 遊戲狀態
    const isGm = ref(false)
    const gameTime = ref(0) // 遊戲時間（天）
    const civilizationLevel = ref(0) // 文明等級
    // 宇宙狀態
    const universeState = ref('chaos') // 'order' | 'chaos'
    const tripleStarDeviation = ref(0)
    // 事件系統
    const events = ref([])
    const activeEvent = ref(null)
    const eventBonus = ref(1)
    // 暴露冷卻
    const exposureCooldown = ref(0) // 單位：秒
    // 成就相關邏輯
    const achievementService = useAchievementService()
    // 熵減進程
    const entropyReductionStages = ref({})
    Object.keys(entropyReductionData).forEach(key => {
      entropyReductionStages.value[key] = {
        unlocked: entropyReductionData[key].unlocked,
        progress: 0,
        efficiency: entropyReductionData[key].efficiency
      }
    })
    // 當前熵減階段
    const currentEntropyStage = ref('atomicOrdering')
    // 熵減速率
    const entropyReductionRate = ref(0)
    // 坐標暴露值上限
    const coordinateExposureMax = ref(0)
    // 資源系統
    const resources = ref({})
    Object.keys(resourcesData).forEach(key => {
      resources.value[key] = resourcesData[key].count
    })
    if (resources.value['[object Object]']) delete resources.value['[object Object]']
    // 探索相關資源
    const explorationres = ref({})
    Object.keys(explorationResData).forEach(key => {
      explorationres.value[key] = explorationResData[key].count
    })
    // 探索冷卻
    const cooldowns = ref({})
    // 科技
    const technologies = ref({})
    Object.keys(technologiesData).forEach(key => {
      technologies.value[key] = {
        unlocked: technologiesData[key].unlocked,
        efficiency: technologiesData[key].efficiency
      }
    })
    // 建築
    const buildings = ref({})
    Object.keys(buildingsData).forEach(key => {
      const { count, level, unlocked } = buildingsData[key]
      buildings.value[key] = { count, level, unlocked }
    })
    // 成就系統狀態
    const achievements = ref({})
    // 初始化成就
    achievementsData.forEach(cfg => {
      achievements.value[cfg.id] = {
        level: 0,
        unlocked: false,
        currentTarget: cfg.baseTarget || 1,
        completed: false, // 是否可領取
        progress: 0 // 進度型成就
      }
    })

    // 畢業強度計算
    const techRatio = computed(() => {
      const unlocked = Object.values(technologies.value).filter(t => t.unlocked).length
      const total = Object.keys(technologies.value).length
      return total ? unlocked / total : 0
    })

    const stageOrder = [
      'atomicOrdering',
      'molecularCooling',
      'stellarExtinction',
      'blackholeDecompression',
      'energyMaterialization',
      'universalUnification'
    ]

    const stageRatio = computed(() => {
      const lastIndex = stageOrder.length - 1
      const currentIndex = stageOrder.findIndex(s => currentEntropyStage.value === s)
      return Math.max(0, Math.min(1, currentIndex / lastIndex))
    })

    const buildRatio = computed(() => {
      const maxLevel = 100 // 理論滿級
      const totalLevel = Object.values(buildings.value).reduce((sum, b) => sum + (b.level || 0), 0)
      const maxTotal = Object.keys(buildings.value).length * maxLevel
      return maxTotal ? totalLevel / maxTotal : 0
    })

    const entropyGap = computed(() => {
      const stages = Object.values(entropyReductionStages.value)
      const entropy = Object.values(entropyReductionData)
      const maxEntropy = entropy.reduce((sum, s) => sum + (s.maxProgress || 0), 0)
      const currentEntropy = stages.reduce((sum, s) => sum + (s.progress || 0), 0)
      const max = (maxEntropy - currentEntropy) / maxEntropy
      return max === 0 ? 1 : max
    })

    const progressRatio = computed(() => {
      return (techRatio.value + stageRatio.value + buildRatio.value + entropyGap.value) / 4
    })

    // 事件類型
    const triggerRandomEvent = () => {
      if (gameTime.value > 0 && gameTime.value % 300 === 0) {
        const duration = 3650
        const remaining = duration
        const day = duration / 365
        const rand = Math.random()
        let title, type, description
        if (rand < 0.1) {
          title = '科技突破'
          type = 'breakthrough'
          description = `全體產出翻倍，持續${day}年`
          eventBonus.value = 2
          // 科技突破
          activeEvent.value = { type, title, description, duration, remaining }
          addEvent({ timestamp: Date.now(), title, description, type })
        } else if (rand < 0.18) {
          title = '宇宙災變'
          type = 'disaster'
          description = `所有產出減半，持續${day}年`
          eventBonus.value = 0.5
          // 宇宙災變
          activeEvent.value = { type, title, description, duration, remaining }
          addEvent({ timestamp: Date.now(), title, description, type })
        } else if (rand < 0.25) {
          title = '貿易繁榮'
          type = 'tradeboom'
          description = `奈米材料產出翻倍，持續${day}年`
          eventBonus.value = 1
          // 貿易繁榮
          activeEvent.value = { type, title, description, duration, remaining }
          addEvent({ timestamp: Date.now(), title, description, type })
        }
      }
    }

    // 推進熵減階段
    const completeEntropyStage = stageKey => {
      const currentIndex = stageOrder.indexOf(stageKey)
      if (currentIndex < stageOrder.length - 1) {
        const nextStageKey = stageOrder[currentIndex + 1]
        entropyReductionStages.value[nextStageKey].unlocked = true
        currentEntropyStage.value = nextStageKey
        Object.keys(buildingsData).forEach(key => {
          if (buildingsData[key].entropyStage === nextStageKey && !buildings.value[key].unlocked) {
            buildings.value[key].unlocked = true
          }
        })
      }
    }

    // 執行熵減
    const performEntropyReduction = (times = 1) => {
      for (let i = 0; i < times; i++) {
        const currentStage = entropyReductionStages.value[currentEntropyStage.value]
        const data = entropyReductionData[currentEntropyStage.value]
        if (!currentStage || !currentStage.unlocked) return
        if (!canAfford(data.cost)) return
        Object.entries(data.cost).forEach(([resource, amount]) => {
          resources.value[resource] -= amount
        })
        const reductionAmount = currentStage.efficiency * getEntropyReductionBonus()
        currentStage.progress += reductionAmount
        if (currentStage.progress >= data.maxProgress) {
          completeEntropyStage(currentEntropyStage.value)
          achievementService.checkAllAchievements()
          break // 階段完成後停止批次
        }
        entropyReductionRate.value += reductionAmount
      }
      achievementService.checkAllAchievements()
    }

    const getEntropyReductionBonus = () => {
      let bonus = 1
      // 科技效率加成
      const currentTech = getCurrentStageTech()
      if (currentTech && currentTech.efficiency) {
        bonus *= currentTech.efficiency
      }
      return bonus
    }

    const getCurrentStageTech = () => {
      const stageTechMap = {
        atomicOrdering: 'atomicManipulation',
        molecularCooling: 'thermalControl',
        stellarExtinction: 'stellarEngineering',
        blackholeDecompression: 'blackholePhysics',
        energyMaterialization: 'energyConversion',
        universalUnification: 'universalTheory'
      }
      const techKey = stageTechMap[currentEntropyStage.value]
      return techKey ? technologies.value[techKey] : null
    }

    // 判斷資源是否足夠
    const canAfford = (baseCost, factor = 1) => {
      if (!baseCost || typeof baseCost !== 'object') return false
      const cost = calcDynamicCost(baseCost, factor)
      return Object.entries(cost).every(([res, amt]) => {
        return resources.value[res] >= amt
      })
    }

    // 根據原始成本 + 動態係數，返回實際成本表
    const calcDynamicCost = (baseCost, factor = 1) =>
      Object.fromEntries(Object.entries(baseCost).map(([res, amt]) => [res, amt * factor]))

    // 獲取實際產出資源
    const canResource = item => {
      const data = buildingsData[item]
      const info = buildings.value[item]
      const arr = []
      if (info.count) {
        // 獲取科技加成等
        let techEff = 1
        // 建築-科技映射表
        const buildingTechMap = {
          atomicSorter: 'atomicManipulation',
          molecularCooler: 'thermalControl',
          stellarExtinguisher: 'stellarEngineering',
          blackholeDecompressor: 'blackholePhysics',
          energyMaterializer: 'energyConversion',
          universalUnifier: 'universalTheory',
          quantumComputer: 'quantumComputing',
          spacetimePortal: 'spacetimeManipulation'
        }
        const techKey = buildingTechMap[item]
        if (techKey && technologies.value[techKey]) {
          techEff = technologies.value[techKey].efficiency
        }
        // 階段加成
        const isCurrentStageBuilding = data.entropyStage === currentEntropyStage.value
        const stageBonus = isCurrentStageBuilding ? 2 : 1
        // 產出
        Object.entries(data.outputs).forEach(([res, baseVal]) => {
          arr.push({ res, val: baseVal * info.level * info.count * techEff * stageBonus * eventBonus.value })
        })
      }
      return arr
    }

    // 判斷科技是否可解鎖
    const canUnlockTech = key => {
      const tech = technologies.value[key]
      if (tech.unlocked) return false
      if (!tech.prerequisites || tech.prerequisites.length === 0) return true
      return tech.prerequisites.every(prereq => technologies.value[prereq].unlocked)
    }

    // 解鎖科技
    const unlockTechnology = key => {
      const tech = technologies.value[key]
      const data = technologiesData[key]
      if (!tech.unlocked && canAfford(data.cost) && canUnlockTech(key)) {
        tech.unlocked = true
        // 扣除資源
        Object.entries(data.cost).forEach(([resource, amount]) => {
          resources.value[resource] -= amount
        })
        // 解鎖科技
        const techToBuilding = {
          fire: 'campfire',
          agriculture: 'farm',
          metallurgy: 'mine',
          mining: 'mine',
          electricity: 'datacenter',
          nuclear: 'reactor',
          quantum: 'quantumComputer',
          spacetime: 'spaceport',
          vacuum: 'dysonSphere',
          eco: 'ecoPark',
          gene: 'geneCenter',
          deepSpace: 'probe',
          ai: 'aiCenter',
          trade: 'tradeStation',
          blackhole: 'blackholePlant',
          lowPotentialTrapTech: 'lowPotentialTrap',
          quantumDecoherenceTech: 'quantumDecoherenceSuppressor',
          brownianCaptureTech: 'brownianCaptureNet',
          stealthAlgorithm: 'stealthGenerator',
          darkMatterExtraction: 'darkMatterCollector',
          antiMatterSynthesis: 'antiMatterSynthesizer',
          nanoManufacturing: 'nanoFactory'
        }
        const buildingName = techToBuilding[key]
        if (buildingName && buildings.value[buildingName]) {
          buildings.value[buildingName].unlocked = true
        }
        achievementService.checkAllAchievements()
      }
    }

    // 建築建造
    const buildStructure = key => {
      const building = buildings.value[key]
      const data = buildingsData[key]
      if (!building) return
      const cost = getDisplayCost(data.cost, building.count, building.level, false)
      if (!updateDisplayCost(data.cost, building.count, building.level, false)) return
      // 解鎖校驗
      const ok =
        building.unlocked ||
        data.entropyStage === currentEntropyStage.value ||
        ['quantumComputer', 'spacetimePortal'].includes(key)
      if (!ok) return
      // 扣費 & 建造
      Object.entries(cost).forEach(([res, amt]) => (resources.value[res] -= amt))
      building.count++
      achievementService.checkAllAchievements()
    }

    // 建築升級
    const upgradeBuilding = key => {
      const building = buildings.value[key]
      const data = buildingsData[key]
      if (!building) return
      const cost = getDisplayCost(data.upgradeCost, building.count, building.level, true)
      if (!updateDisplayCost(data.upgradeCost, building.count, building.level, true)) return
      // 扣費 & 升級
      Object.entries(cost).forEach(([res, amt]) => (resources.value[res] -= amt))
      building.level++
      achievementService.checkAllAchievements()
    }

    // 返回“建造下一座”或“升級下一級”的實際成本
    const getDisplayCost = (baseCost, count = 0, level = 1, isUpgrade = false) =>
      calcDynamicCost(baseCost, isUpgrade ? (level + 1) * 1.7 || 1 : count * 1.7 || 1)

    // 返回能否“建造下一座”或“升級下一級”
    const updateDisplayCost = (baseCost, count = 0, level = 1, isUpgrade = false) => {
      const cost = getDisplayCost(baseCost, count, level, isUpgrade)
      return Object.entries(cost).every(([res, amt]) => resources.value[res] >= amt)
    }

    // 遊戲邏輯
    const updateGame = () => {
      gameTime.value++
      // 更新三體運動偏差
      tripleStarDeviation.value = Math.log10(civilizationLevel.value + 1 + gameTime.value / 100000)
      if (tripleStarDeviation.value >= 100) return
      // 更新資源生產
      let totalProduction = 0,
        max = 0
      Object.entries(buildings.value).forEach(([key, item]) => {
        // 產出
        canResource(key).forEach(({ res, val }) => {
          resources.value[res] += val
          totalProduction += item.count
          max += item.count * item.level
        })
      })
      // 更新坐標暴露值上限
      coordinateExposureMax.value = 100 + max
      // 更新熵減速率
      entropyReductionRate.value = totalProduction * (universeState.value === 'order' ? 3 : 0.1)
      // 檢查宇宙狀態切換
      if (entropyReductionRate.value > 1 && universeState.value === 'chaos') {
        universeState.value = 'order'
        setTimeout(() => {
          universeState.value = 'chaos'
        }, 72 * 60 * 60 * 1000) // 72小時有序態
      }
      // 檢查黑暗森林打擊
      checkDarkForestStrike()
      // 更新文明等級
      updateCivilizationLevel()
      // 事件觸發
      triggerRandomEvent()
      // 事件倒數計時與結束
      if (activeEvent.value) {
        activeEvent.value.remaining--
        if (activeEvent.value.remaining <= 0) {
          eventBonus.value = 1
          activeEvent.value = null
        }
      }
      // 檢查成就達成
      achievementService.checkAllAchievements()
    }

    // 發送歷史事件通知
    const addEvent = event => {
      events.value.unshift(event)
      if (events.value.length > 20) {
        events.value.length = 20
      }
    }

    // 文明等級更新
    const updateCivilizationLevel = () => {
      const newLevel = Math.floor(Math.log10(resources.value.knowledge + 1))
      if (newLevel > civilizationLevel.value) {
        civilizationLevel.value = newLevel
        // 獎勵：所有科技效率提升
        Object.values(technologies.value).forEach(tech => {
          if (tech.unlocked) tech.efficiency *= 1.05
        })
        addEvent({
          title: '文明進化',
          description: '文明等級提升，科技效率提升！',
          type: 'reward'
        })
      } else if (newLevel < civilizationLevel.value) {
        civilizationLevel.value = newLevel
        // 懲罰：所有科技效率降低
        Object.values(technologies.value).forEach(tech => {
          if (tech.unlocked) tech.efficiency *= 0.9
        })
        addEvent({
          title: '文明退化',
          description: '文明等級下降，科技效率降低！',
          type: 'punish'
        })
      }
    }

    // 降維打擊判定邏輯前，增加冷卻判斷
    const checkDarkForestStrike = () => {
      const { coordinateExposure } = resources.value
      // 冷卻期間或者閾值小於100或者文明等級小於1不觸發打擊
      if (exposureCooldown.value > 0 || coordinateExposure < coordinateExposureMax.value || civilizationLevel.value < 3)
        return
      if (Math.random() < 1 && civilizationLevel.value < 10) {
        // 冷卻
        exposureCooldown.value = 3650
        // 懲罰遞增
        Object.values(technologies.value).forEach(tech => {
          if (tech.unlocked) {
            tech.efficiency *= Math.exp(-0.05 * civilizationLevel.value)
          }
        })
        // 暴露值清零並進入冷卻
        if (coordinateExposure !== undefined) {
          resources.value.coordinateExposure = 0
        }
        // 所有建築的等級和數量減半
        Object.values(buildings.value).forEach(b => {
          b.level = Math.max(1, Math.floor(b.level / 2))
          b.count = Math.max(0, Math.floor(b.count / 2))
          // 移除建築
          if ((b.level && !b.count) || (!b.level && !b.count)) {
            delete buildings.value[b]
          }
        })
        const title = '降維打擊'
        const message =
          '由於坐標暴露過高，文明遭受降維打擊，科技效率下降！所有建築等級和數量損失過半！如果建築等級或數量過低建築會被移除！暴露值已清零，10年內不會再次被打擊。'
        ElNotification({ title, message })
        events.value.unshift({ title, description: message, type: 'strike' })
      }
    }

    const formatTime = seconds => {
      const totalDays = Math.floor(seconds) // 總天數
      const years = Math.floor(totalDays / 365)
      const months = Math.floor((totalDays % 365) / 30) || 1
      const days = totalDays % 30 || 1
      return `${years}年${months}月${days}天`
    }

    // 格式化函數
    const formatNumber = num => {
      const absNum = Math.abs(num) // 取絕對值來做單位判斷
      if (absNum < 1000) return num.toFixed(3)
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const units = []
      for (let i = 0; i < 100; i++) {
        let symbol = ''
        let temp = i
        if (temp < 26) {
          symbol = alphabet[temp]
        } else {
          const first = Math.floor(temp / 26) - 1
          const second = temp % 26
          symbol = alphabet[first] + alphabet[second]
        }
        const value = Math.pow(1000, i + 1)
        units.unshift({ value, symbol })
      }
      for (let unit of units) {
        if (absNum >= unit.value) {
          const value = (num / unit.value).toFixed(2) // 保留符號
          return `${value}${unit.symbol}`
        }
      }
      return Math.floor(num).toString()
    }

    return {
      gameTime,
      civilizationLevel,
      resources,
      explorationres,
      technologies,
      buildings,
      universeState,
      tripleStarDeviation,
      events,
      activeEvent,
      eventBonus,
      entropyReductionStages,
      currentEntropyStage,
      canAfford,
      updateGame,
      buildStructure,
      unlockTechnology,
      upgradeBuilding,
      canUnlockTech,
      performEntropyReduction,
      getEntropyReductionBonus,
      getCurrentStageTech,
      completeEntropyStage,
      exposureCooldown,
      checkDarkForestStrike,
      canResource,
      getDisplayCost,
      updateDisplayCost,
      formatTime,
      achievements,
      formatNumber,
      addEvent,
      entropyReductionRate,
      coordinateExposureMax,
      cooldowns,
      techRatio,
      stageRatio,
      buildRatio,
      entropyGap,
      progressRatio,
      isGm,
      stageOrder
    }
  },
  {
    persist: {
      key: __APP_NAME__,
      storage: localStorage,
      serializer: {
        serialize: state => encryptData(state),
        deserialize: value => decryptData(value)
      }
    }
  }
)

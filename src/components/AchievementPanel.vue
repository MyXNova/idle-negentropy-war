<template>
  <el-card class="achievement-panel" shadow="never">
    <template #header>
      <div class="card-header">
        <span>成就系統</span>
      </div>
    </template>
    <el-tabs v-model="activeCategory">
      <el-tab-pane :label="cat.label" :name="cat.key" v-for="cat in categories" :key="cat.key" />
      <div class="achievement-grid">
        <div
          v-for="cfg in filteredAchievements"
          :key="cfg.id"
          class="achievement-item"
          :class="{ completed: gameStore.achievements[cfg.id].completed }"
        >
          <div class="achievement-info">
            <h4>
              {{ cfg.name }}
              <template v-if="!cfg.once">(Lv.{{ gameStore.achievements[cfg.id].level }})</template>
            </h4>
            <p>{{ cfg.desc }}</p>
          </div>
          <div class="achievement-cost">
            <p>
              目標：
              <span class="highlight">
                <template v-if="cfg.type === 'resource'">
                  {{ gameStore.formatNumber(gameStore.achievements[cfg.id].currentTarget) }}
                  {{ resourcesData[cfg.resource[0]]?.name }}
                </template>
                <template v-else-if="cfg.type === 'building'">
                  {{ gameStore.formatNumber(gameStore.achievements[cfg.id].currentTarget) }}
                  {{ buildingsData[cfg.building]?.name }}
                </template>
                <template v-else-if="cfg.type === 'tech'">{{ technologiesData[cfg.tech].group }}</template>
                <template v-else-if="cfg.type === 'entropyStage'">
                  達成{{ entropyReductionsData[cfg.entropyStage].name }}階段
                </template>
                <template v-else-if="cfg.type === 'compound'">複合條件</template>
                <template v-else>達成條件</template>
              </span>
            </p>
          </div>
          <div class="achievement-cost">
            <p>
              獎勵：
              <span class="highlight">
                {{
                  Object.entries(achievementService.getAchievementReward(cfg, gameStore.achievements[cfg.id]))
                    .map(([k, v]) => `${gameStore.formatNumber(v)} ${resourcesData[k]?.name || k}`)
                    .join('、')
                }}
              </span>
            </p>
            <p>
              <span v-if="cfg.unlock">
                解鎖：
                <span v-if="cfg.unlock.tech">科技({{ technologiesData[cfg.unlock.tech].group }})</span>
                <span v-if="cfg.unlock.building">建築({{ buildingsData[cfg.unlock.building].name }})</span>
              </span>
            </p>
          </div>
          <el-progress
            :show-text="false"
            v-if="cfg.type === 'resource' || cfg.type === 'building'"
            :percentage="
              Math.min(
                100,
                (cfg.type === 'resource'
                  ? gameStore.resources[cfg.resource[0]] / gameStore.achievements[cfg.id].currentTarget
                  : gameStore.buildings[cfg.building]?.count / gameStore.achievements[cfg.id].currentTarget) * 100
              )
            "
            :text-inside="true"
            :stroke-width="20"
            style="margin: 8px 0"
          />
          <el-button
            type="success"
            class="panelButton"
            :disabled="!gameStore.achievements[cfg.id].completed || gameStore.achievements[cfg.id].unlocked"
            @click="achievementService.claimAchievement(cfg.id)"
          >
            <template v-if="cfg.once && gameStore.achievements[cfg.id].unlocked">已完成</template>
            <template v-else-if="gameStore.achievements[cfg.id].completed">領取獎勵</template>
            <template v-else>條件不足</template>
          </el-button>
        </div>
      </div>
    </el-tabs>
  </el-card>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import achievementsData from '@/data/achievements'
  import buildingsData from '@/data/buildings'
  import resourcesData from '@/data/resources'
  import technologiesData from '@/data/technologies'
  import { useAchievementService } from '@/plugins/achievementService'
  import entropyReductionsData from '@/data/entropyReductions'
  import { useGameStore } from '@/stores/gameStore'

  const gameStore = useGameStore()
  const achievementService = useAchievementService()

  // 分類
  const categories = [
    { key: 'resource', label: '資源' },
    { key: 'building', label: '建築' },
    { key: 'tech', label: '科技' },
    { key: 'entropyStage', label: '熵減' },
    { key: 'compound', label: '其他' }
  ]
  const activeCategory = ref('resource')
  const filteredAchievements = computed(() => achievementsData.filter(a => a.type === activeCategory.value))
</script>

<style scoped>
  .achievement-panel {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .achievement-grid {
    display: grid;
    gap: 15px;
  }

  .achievement-item {
    padding: 16px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .achievement-info h4 {
    margin: 0 0 4px;
    font-size: 1.1em;
    color: #4fc3f7;
  }

  .achievement-info p {
    margin: 2px 0;
    font-size: 0.9em;
  }

  .achievement-cost {
    margin-top: 8px;
    font-size: 0.9em;
    color: #ccc;
  }

  .panelButton {
    margin-top: 5px;
    width: 100%;
  }
</style>

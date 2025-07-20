<template>
  <div id="app">
    <div class="game-header">
      <h1>{{ title }}{{ version }}</h1>
      <p>{{ desc }}</p>
      <div
        class="music-vinyl"
        :class="{ spinning: isPlaying }"
        @click="toggleMusic"
        :title="isPlaying ? '暫停音樂' : '播放音樂'"
      >
        <div class="music-cover">
          <img src="/cover.jpg" alt="音樂封面" class="vinyl-img" />
          <el-icon class="vinyl-icon">
            <component :is="isPlaying ? MusicNoteOutlined : MusicOffOutlined" />
          </el-icon>
        </div>
      </div>
      <audio ref="audioRef" src="/music.mp3" loop preload="auto" />
    </div>
    <div class="game-container">
      <div class="game-main">
        <div class="game-interface">
          <!-- 面板 -->
          <el-card class="resource-panel" shadow="never">
            <template #header>
              <div class="card-header">
                <span>{{ categories[activeCategory][1] }}</span>
                <el-button-group style="float: right">
                  <el-button
                    v-for="(item, key) in categories"
                    :key="key"
                    size="small"
                    :type="activeCategory === key ? 'primary' : 'default'"
                    @click="activeCategory = key"
                  >
                    {{ item[0] }}
                  </el-button>
                </el-button-group>
              </div>
            </template>
            <!-- 資源 -->
            <div class="resource-grid" v-show="activeCategory == 'resourceSys'">
              <div class="resource-item" v-for="(item, index) in resourcesData" :key="index">
                <el-icon><AutoAwesomeOutlined /></el-icon>
                <span>{{ item.name }}: {{ gameStore.formatNumber(gameStore.resources[index]) }}</span>
              </div>
            </div>
            <!-- 資訊 -->
            <div class="status-grid" v-show="activeCategory == 'cosmicInfo'">
              <div class="status-item">
                <el-icon><WatchLaterOutlined /></el-icon>
                <span>時間: {{ gameStore.formatTime(gameStore.gameTime) }}</span>
              </div>
              <div class="status-item">
                <el-icon><WifiChannelRound /></el-icon>
                <span>科技效率: {{ gameStore.eventBonus }}</span>
              </div>
              <div class="status-item">
                <el-icon><TurnSharpLeftOutlined /></el-icon>
                <span>熵減速率: {{ gameStore.entropyReductionRate }}</span>
              </div>
              <div class="status-item">
                <el-icon><TrendingUpOutlined /></el-icon>
                <span>坐標暴露值上限: {{ gameStore.coordinateExposureMax }}</span>
              </div>
              <div class="status-item">
                <el-icon><WebhookOutlined /></el-icon>
                <span>文明等級: {{ gameStore.civilizationLevel }}</span>
              </div>
              <div class="status-item">
                <el-icon><SpokeOutlined /></el-icon>
                <span>存續度: {{ civilizationSurvival.toFixed(2) }}</span>
              </div>
              <div
                class="status-item"
                :class="{ chaos: gameStore.universeState === 'chaos', order: gameStore.universeState === 'order' }"
              >
                <el-icon><StreamOutlined /></el-icon>
                <span>宇宙狀態: {{ gameStore.universeState === 'chaos' ? '混沌態' : '有序態' }}</span>
              </div>
            </div>
            <!-- 監控 -->
            <div class="jiankong" v-show="activeCategory == 'cosmicWatch'">
              <div class="universe-grid">
                <div class="universe-item">
                  <h4>
                    坐標暴露值
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="當文明等級>3並且暴露值超過上限會遭受到來自黑暗森林的降維打擊(懲罰很嚴重)"
                      placement="top"
                    >
                      <el-icon><ErrorOutlineFilled /></el-icon>
                    </el-tooltip>
                  </h4>
                  <p>
                    {{
                      gameStore.formatNumber(gameStore.resources.coordinateExposure) +
                      '/' +
                      gameStore.formatNumber(gameStore.coordinateExposureMax)
                    }}
                    <el-tag v-if="gameStore.exposureCooldown > 0" type="success" effect="dark" style="margin-left: 8px">
                      安全期：{{ gameStore.formatTime(gameStore.exposureCooldown) }}
                    </el-tag>
                  </p>
                  <el-progress
                    :percentage="
                      Math.min(
                        Math.max((gameStore.resources.coordinateExposure / gameStore.coordinateExposureMax) * 100, 0),
                        100
                      )
                    "
                    :color="getExposureColor"
                    :show-text="false"
                  />
                </div>
                <div class="universe-item">
                  <h4>
                    三體偏差值
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="當三體偏差值達到無限時這個世界會在受到不可抗力因素後毀滅, 完成終極文明後可以阻止"
                      placement="top"
                    >
                      <el-icon><ErrorOutlineFilled /></el-icon>
                    </el-tooltip>
                  </h4>
                  <p>{{ gameStore.tripleStarDeviation.toFixed(3) }}/∞</p>
                  <el-progress
                    :percentage="Math.min(Math.max((gameStore.tripleStarDeviation / 2) * 100, 0), 100)"
                    :color="getDeviationColor"
                    :show-text="false"
                  />
                </div>
              </div>
              <el-card class="grad-progress-card" shadow="never" style="margin-top: 20px">
                <template #header>
                  <span>畢業進度({{ (gameStore.progressRatio * 100).toFixed(1) }}%)</span>
                </template>
                <div class="grad-progress-list">
                  <el-descriptions :column="2" border>
                    <el-descriptions-item :label="item.name" v-for="item in gradProgress" :key="item">
                      {{ (item.progress * 100).toFixed(1) }}%
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </div>
            <!-- 系統 -->
            <div class="status-controls" v-show="activeCategory == 'entropyMgmt'">
              <el-button
                @click="toggleGame"
                :icon="gameRunning ? PauseCircleOutlineFilled : PlayCircleOutlineFilled"
                class="status-controls-item main-action"
              >
                {{ gameRunning ? '暫停遊戲' : '繼續遊戲' }}
              </el-button>
              <el-button @click="resetGame" :icon="RefreshOutlined" class="status-controls-item secondary-action">
                重設遊戲
              </el-button>
              <el-upload
                class="button el-button status-controls-item secondary-action"
                action="#"
                style="display: unset"
                :http-request="upload"
                :show-file-list="false"
                accept="application/json"
              >
                <el-icon>
                  <FileUploadOutlined />
                </el-icon>
                導入存檔
              </el-upload>
              <el-button @click="download" :icon="FileDownloadOutlined" class="status-controls-item secondary-action">
                導出存檔
              </el-button>
              <el-button
                @click="showHelp = true"
                :icon="QuestionMarkOutlined"
                class="status-controls-item secondary-action"
              >
                遊戲說明
              </el-button>
              <el-tooltip effect="dark" content="QQ群: 920930589" placement="top">
                <el-button :icon="ChatBubbleOutlineFilled" class="status-controls-item secondary-action">
                  官方群聊
                </el-button>
              </el-tooltip>
              <a
                class="el-button status-controls-item"
                target="_blank"
                href="https://github.com/setube/idle-negentropy-war"
              >
                <el-icon>
                  <LinkFilled />
                </el-icon>
                <span>開源地址</span>
              </a>
              <el-tooltip effect="dark" content="《熵減協議》- 星緣之境" placement="top">
                <a
                  class="el-button status-controls-item"
                  target="_blank"
                  href="https://y.qq.com/n/ryqq/songDetail/001QffDb04FXzY"
                >
                  <el-icon>
                    <LibraryMusicOutlined />
                  </el-icon>
                  <span>遊戲主題曲</span>
                </a>
              </el-tooltip>
            </div>
          </el-card>
          <div class="main-game-area">
            <el-tabs v-model="activeName">
              <template v-for="(item, index) in tabsList" :key="index">
                <el-tab-pane :label="item.name" :name="item.type" v-if="item.show">
                  <component :is="item.is" />
                </el-tab-pane>
              </template>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="game-sidebar">
        <EventSystem />
      </div>
    </div>
    <el-dialog
      v-model="showHelp"
      title="熵減戰爭 - 遊戲說明"
      width="80%"
      :lock-scroll="false"
      destroy-on-close
      class="help-dialog"
    >
      <el-scrollbar height="400px" class="help-content">
        <h3>世界觀</h3>
        <p>
          在熵減戰爭中，你領導一個文明對抗宇宙的熵增法則。從微觀的原子排序開始，逐步實現分子冷卻、恆星熄滅、黑洞解壓，最終達到能量物質化和宇宙單一化，將所有物質重新轉化為氫，實現最低熵狀態。
        </p>
        <h3>熵減進程</h3>
        <ul>
          <li>
            <strong>原子排序</strong>
            ：手動排列原子，建立有序結構，減緩局部熱運動
          </li>
          <li>
            <strong>分子冷卻</strong>
            ：減緩分子熱運動，降低系統溫度，建立分子級有序
          </li>
          <li>
            <strong>恆星熄滅</strong>
            ：熄滅恆星，停止核融合產生的熵增，控制恆星活動
          </li>
          <li>
            <strong>黑洞解壓</strong>
            ：解壓黑洞，釋放被壓縮的資訊，實現超大規模熵減
          </li>
          <li>
            <strong>能量物質化</strong>
            ：將純能量轉化為有序物質，實現宇宙級熵減
          </li>
          <li>
            <strong>宇宙單一化</strong>
            ：將所有物質重新轉化為氫，達到最低熵狀態
          </li>
        </ul>
        <h3>核心系統</h3>
        <ul>
          <li>
            <strong>漸進熵減</strong>
            ：從微觀到宏觀，逐步實現宇宙的有序化
          </li>
          <li>
            <strong>雙態宇宙規則</strong>
            ：有序態時科技效率+300%，混沌態時資源產出-90%
          </li>
          <li>
            <strong>黑暗森林法則</strong>
            ：坐標暴露值過高會觸發降維打擊。暴露值代表文明在宇宙中的可被發現程度，過高時將遭受資源損失或建築摧毀。可通過特定科技和建築降低暴露值。
          </li>
          <li>
            <strong>三體混沌引擎</strong>
            ：偏差值過大時觸發亂紀元，建築產出歸零
          </li>
          <li>
            <strong>知識黑洞效應</strong>
            ：文明等級提升時前代技術效率衰減
          </li>
        </ul>
        <h3>遊戲目標</h3>
        <p>
          通過建造熵減建築、解鎖相關科技、管理資源，逐步完成從原子到宇宙的熵減進程。最終目標是實現宇宙單一化，將所有物質重新轉化為氫，達到最低熵狀態。
        </p>
        <h3>進度與熵減階段說明</h3>
        <p>
          遊戲的核心進度完全由“熵減階段”推進決定。每當你手動完成一個熵減階段，文明將進入新的時代，解鎖新的科技和建築。只有推進到下一個熵減階段，才會解鎖該階段的科技和建築內容。文明時代的變遷、資源體系的擴展、科技的分支，全部與熵減階段同步。熵減階段的推進需要消耗資源，建議優先提升產出和效率，避免陷入資源瓶頸或死局。遊戲目標是逐步完成所有熵減階段，最終實現宇宙單一化，達到最低熵狀態。
        </p>
        <h3>文明時代推進</h3>
        <p>
          文明時代的推進完全由熵減階段決定。每當你完成一個熵減階段，文明自動進入新時代，解鎖新科技和建築，並獲得全局獎勵（如科技效率+10%、建築產出+10%、資源與文明基因獎勵等）。文明時代不會倒退，只能不斷進化。每次進入新時代，獎勵內容會在事件日誌中顯示。
        </p>
        <h3>操作指南</h3>
        <ul>
          <li>執行熵減：消耗資源進行當前階段的熵減操作</li>
          <li>建造建築：建造當前熵減階段的相關建築</li>
          <li>解鎖科技：解鎖支持當前熵減階段的科技</li>
          <li>階段推進：完成當前階段後自動解鎖下一階段</li>
          <li>保存文明基因：防止技術效率過度衰減</li>
          <li>監控威脅：注意坐標暴露和三體偏差</li>
        </ul>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
  import { useGameStore } from '@/stores/gameStore'
  import { ref, onBeforeUnmount, computed, onMounted } from 'vue'
  import {
    PauseCircleOutlineFilled,
    PlayCircleOutlineFilled,
    RefreshOutlined,
    FileUploadOutlined,
    FileDownloadOutlined,
    QuestionMarkOutlined,
    ChatBubbleOutlineFilled,
    LinkFilled,
    MusicNoteOutlined,
    MusicOffOutlined,
    LibraryMusicOutlined,
    ErrorOutlineFilled,
    AutoAwesomeOutlined,
    WatchLaterOutlined,
    WebhookOutlined,
    WifiChannelRound,
    TurnSharpLeftOutlined,
    TrendingUpOutlined,
    StreamOutlined,
    SpokeOutlined
  } from '@vicons/material'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { saveAs } from 'file-saver'
  import resourcesData from '@/data/resources'
  import WorkerTimer from '@/plugins/worker-timer.js?worker'
  import buildings from '@/components/buildings.vue'
  import technologies from '@/components/technologies.vue'
  import AchievementPanel from '@/components/AchievementPanel.vue'
  import EntropyProgress from '@/components/EntropyProgress.vue'
  import EventSystem from '@/components/EventSystem.vue'
  import ExplorationPanel from '@/components/ExplorationPanel.vue'
  import GmPanel from '@/components/GmPanel.vue'

  const version = __APP_VER__
  const title = __APP_TITLE__
  const desc = __APP_DESC__
  const gameStore = useGameStore()
  const gameRunning = ref(true)
  const showHelp = ref(false)
  const exposureCooldownTimer = ref(null)
  const worker = new WorkerTimer()
  const activeName = ref('buildings')
  const activeCategory = ref('resourceSys')
  const gmNum = ref(0)
  const isPlaying = ref(false)
  const audioRef = ref(null)

  const toggleMusic = () => {
    const audio = audioRef.value
    if (!audio) return
    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      audio.play()
      isPlaying.value = true
    }
  }

  // 存續度計算
  const civilizationSurvival = computed(() => {
    const knowledgeDensity = Math.log10(gameStore.resources.knowledge + 1)
    const energyDensity = Math.log10(gameStore.resources.energy + 1)
    return knowledgeDensity * energyDensity
  })

  const gradProgress = computed(() => {
    return {
      techRatio: { name: '科技畢業度', progress: gameStore.techRatio },
      stageRatio: { name: '階段畢業度', progress: gameStore.stageRatio },
      buildRatio: { name: '建築畢業度', progress: gameStore.buildRatio },
      entropyGap: { name: '熵減完成度', progress: gameStore.entropyGap }
    }
  })
  const categories = {
    resourceSys: ['資源', '資源系統'],
    cosmicInfo: ['資訊', '宇宙資訊'],
    cosmicWatch: ['監控', '宇宙監控'],
    entropyMgmt: ['系統', '管理系統']
  }

  const tabsList = computed(() => {
    return [
      { type: 'buildings', name: '建築系統', is: buildings, show: true },
      { type: 'technologies', name: '科技系統', is: technologies, show: true },
      { type: 'EntropyProgress', name: '熵減進程', is: EntropyProgress, show: true },
      { type: 'exploration', name: '宇宙探索', is: ExplorationPanel, show: true },
      { type: 'achievement', name: '成就系統', is: AchievementPanel, show: true },
      { type: 'gm', name: 'GM系統', is: GmPanel, show: gameStore.isGm }
    ]
  })

  const getExposureColor = computed(() => {
    const percentage = (gameStore.resources.coordinateExposure / gameStore.coordinateExposureMax) * 100
    if (percentage > 80) return '#f56c6c'
    if (percentage > 60) return '#e6a23c'
    return '#67c23a'
  })

  const getDeviationColor = computed(() => {
    const percentage = (gameStore.tripleStarDeviation / 0.5) * 100
    if (percentage > 80) return '#f56c6c'
    if (percentage > 60) return '#e6a23c'
    return '#67c23a'
  })

  const tickQueue = ref(0)
  const processing = ref(false)

  const scheduleNext = () => {
    if (tickQueue.value <= 0) {
      processing.value = false
      return
    }
    processing.value = true
    setTimeout(() => {
      gameStore.updateGame()
      tickQueue.value--
      scheduleNext()
    }, 1000)
  }

  // 遊戲循環
  const startGameLoop = () => worker.postMessage('start')

  // 停止遊戲循環
  const stopGameLoop = () => worker.postMessage('pause')

  worker.onmessage = () => {
    tickQueue.value++
    if (!processing.value) scheduleNext()
  }

  // 切換遊戲狀態
  const toggleGame = () => {
    gameRunning.value = !gameRunning.value
    if (gameRunning.value) startGameLoop()
    else stopGameLoop()
  }

  // 導出存檔
  const download = () => {
    try {
      saveAs(
        new Blob([localStorage.getItem(__APP_NAME__)], { type: 'application/json' }),
        `${__APP_TITLE__}存檔數據-${new Date().toISOString().slice(0, 10)}-${Date.now()}.json`
      )
      ElMessage.success('存檔已導出')
    } catch (error) {
      ElMessage.error('存檔導出失敗：' + error.message)
      gameStore.addToEventLog('存檔導出失敗：' + error.message)
    }
  }

  // 導入存檔
  const upload = data => {
    const file = data.file
    const reader = new FileReader()
    reader.onload = e => {
      try {
        localStorage.setItem(__APP_NAME__, e.target.result)
        location.reload()
      } catch (error) {
        ElMessage.error('存檔導入失敗：' + error.message)
      }
    }
    reader.readAsText(file)
  }

  // 重設遊戲
  const resetGame = () => {
    gmNum.value++
    if (gmNum.value >= 10) {
      gameStore.isGm = true
      ElMessage({ message: 'GM功能已開啟', type: 'success' })
      return
    }
    ElMessageBox.confirm('你確定要刪除數據嗎?', '提示', {
      type: 'warning',
      lockScroll: false,
      distinguishCancelAndClose: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    })
      .then(() => {
        localStorage.removeItem(__APP_NAME__)
        ElMessage.success('遊戲數據已重設')
        location.reload()
      })
      .catch(() => {})
  }

  // 組件掛載時啟動遊戲
  onMounted(() => {
    startGameLoop()
    exposureCooldownTimer.value = setInterval(() => {
      if (gameStore.exposureCooldown > 0) {
        gameStore.exposureCooldown--
      }
    }, 1000)
    if (!gameStore.achievements['compound_allTech_allStage'].unlocked && gameStore.tripleStarDeviation >= 100) {
      ElMessageBox.confirm(
        '這個誤差被無限放大，最終導致文明無法預測未來、無法避免毀滅，你的文明已毀滅！',
        '三體偏差值已被無限放大',
        {
          lockScroll: true,
          showClose: false,
          showCancelButton: false,
          confirmButtonText: '重新開始',
          closeOnPressEscape: false,
          closeOnClickModal: false
        }
      )
        .then(() => {
          localStorage.removeItem(__APP_NAME__)
          ElMessage.success('遊戲數據已重設')
          location.reload()
        })
        .catch(() => {})
    }
  })
  // 組件卸載時清理
  onBeforeUnmount(() => {
    stopGameLoop()
    if (exposureCooldownTimer.value) {
      clearInterval(exposureCooldownTimer.value)
      exposureCooldownTimer.value = null
    }
    if (audioRef.value) audioRef.value.pause()
  })
</script>

<style scoped>
  #app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .game-header {
    text-align: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .game-header h1 {
    margin: 0;
    font-size: 2.5em;
    color: #409eff;
    text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
  }

  .game-header p {
    margin: 10px 0 0 0;
    color: #a0a0a0;
    font-size: 1.1em;
  }

  .game-container {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 20px;
    padding: 20px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .game-main {
    min-height: 600px;
  }

  .game-sidebar {
    min-height: 600px;
  }

  .help-dialog {
    background: rgba(15, 15, 35, 0.95);
  }

  .help-content {
    color: #e0e0e0;
    line-height: 1.6;
  }

  .help-content h3 {
    color: #409eff;
    margin: 20px 0 10px 0;
  }

  .help-content ul {
    margin: 10px 0;
    padding-left: 20px;
  }

  .help-content li {
    margin: 5px 0;
  }

  .game-interface {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    color: #e0e0e0;
  }

  .status-bar {
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .status-controls-item {
    width: 23%;
    margin-bottom: 10px;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    width: 100%;
  }

  .status-item.chaos {
    background: rgba(245, 108, 108, 0.2);
    border: 1px solid rgba(245, 108, 108, 0.3);
  }

  .status-item.order {
    background: rgba(103, 194, 58, 0.2);
    border: 1px solid rgba(103, 194, 58, 0.3);
  }

  .resource-panel {
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .resource-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
  }

  .main-game-area {
    margin-bottom: 20px;
  }

  .universe-panel {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .universe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .universe-item {
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .universe-item h4 {
    margin: 0 0 10px 0;
    color: #409eff;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .card-header {
    font-weight: bold;
    color: #409eff;
  }

  :deep(.el-tabs__item) {
    color: var(--el-border-color-light);
  }

  :deep(.el-tabs__item.is-active, .el-tabs__item:hover) {
    color: var(--el-color-primary);
  }

  :deep(.el-dialog__title) {
    color: #e0e0e0;
  }

  .grad-progress-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }

  .music-vinyl {
    position: absolute;
    right: 32px;
    top: 32px;
    z-index: 10;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: radial-gradient(circle at 60% 40%, #fff 0%, #222 80%, #000 100%);
    border: 6px solid #222;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.2s;
    animation: spin 10s linear infinite;
    animation-play-state: paused;
  }

  .music-vinyl.spinning {
    animation-play-state: running;
    box-shadow: 0 8px 32px #409eff88;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .music-cover {
    display: grid;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 8px #000a;
  }

  .music-cover::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .vinyl-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .vinyl-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: #fff;
    text-shadow: 0 0 8px #000a;
    z-index: 1;
    font-size: 32px;
  }

  @media (max-width: 768px) {
    .game-header h1 {
      font-size: 2em;
    }

    .game-container {
      padding: 10px;
      display: initial;
    }
    .main-game-area {
      grid-template-columns: 1fr;
    }

    .status-grid {
      grid-template-columns: 1fr;
    }

    .resource-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .status-controls-item {
      width: 45%;
    }

    .music-vinyl {
      width: 51px;
      height: 51px;
      right: 20px;
      top: 20px;
    }

    .music-cover {
      border: 2px solid #fff;
    }

    .vinyl-img {
      width: 41px;
      height: 41px;
    }

    .vinyl-icon {
      font-size: 20px;
    }
  }
</style>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow-x: hidden;
    max-width: 100%;
    image-rendering: -webkit-optimize-contrast;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC,
      Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga' on;
    -webkit-font-smoothing: subpixel-antialiased;
    font-style: normal;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background-color: #0000004d;
  }

  /* Element Plus 組件樣式覆蓋 */
  .el-card {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: #e0e0e0 !important;
  }

  .el-card__header {
    background: rgba(255, 255, 255, 0.05) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  .el-dialog {
    background: rgba(15, 15, 35, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  .el-dialog__header,
  .el-message-box__header {
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: #409eff !important;
  }

  .el-dialog__body,
  .el-message-box {
    background: rgba(15, 15, 35, 0.95) !important;
    color: #e0e0e0 !important;
  }

  .el-message-box__message p,
  .el-message-box__title {
    color: #e0e0e0;
  }

  a:-webkit-any-link {
    text-decoration: none;
  }

  .status-controls .el-button + .el-button {
    margin-left: 0px;
    margin-right: 12px;
  }

  .status-controls .el-button:nth-child(2) {
    margin-left: 12px;
  }
</style>

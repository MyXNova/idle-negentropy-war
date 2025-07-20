<template>
  <el-card class="event-log" shadow="never">
    <template #header>
      <div class="card-header">
        <span>當前事件</span>
      </div>
    </template>
    <div v-if="gameStore.activeEvent" class="active-event">
      <h4>{{ gameStore.activeEvent.title }}</h4>
      <p>{{ gameStore.activeEvent.description }}</p>
      <p>剩餘時間: {{ gameStore.formatTime(gameStore.activeEvent.remaining) }}</p>
    </div>
    <div v-else class="active-event">
      <p>當前暫無活躍事件</p>
    </div>
  </el-card>
  <el-card class="event-log" shadow="never">
    <template #header>
      <div class="card-header">
        <span>歷史事件</span>
      </div>
    </template>
    <el-scrollbar :max-height="300" class="event-list">
      <template v-if="gameStore.events.length">
        <div v-for="(event, key) in gameStore.events" :key="key" class="event-item">
          <div class="event-content">
            <h4>{{ event.title }}</h4>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </template>
      <div v-else class="active-event">
        <p>當前暫無歷史事件</p>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script setup>
  import { useGameStore } from '@/stores/gameStore'
  const gameStore = useGameStore()
</script>

<style scoped>
  .event-system {
    max-width: 400px;
    margin: 0 auto;
    padding: 10px;
  }
  .event-log {
    margin-bottom: 20px;
  }
  .active-event {
    padding: 10px;
    background: rgba(64, 158, 255, 0.08);
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .event-item {
    padding: 8px;
  }
  .event-item + .event-item {
    border-top: 1px solid #eee;
  }
  .event-content h4 {
    margin: 0 0 4px 0;
    color: #409eff;
  }
</style>

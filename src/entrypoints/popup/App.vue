<script lang="ts" setup>
import BcSwitch from '@/components/BcSwitch.vue'
import { useConfig } from '@/composables/useconfig'

const { config, loadConfig, toggleFeature } = useConfig()

onMounted(async () => {
  await loadConfig()
})
</script>

<template>
  <div class="popup">
    <header class="popup-header">
      <h1>Bacatari</h1>
    </header>

    <main>
      <div class="option-container">
        <div class="option-item">
          <span>Proteksi clipboard</span>
          <BcSwitch :model-value="config.antiClipboard" @update:modelValue="toggleFeature('antiClipboard')" />
        </div>
        <div class="option-item">
          <span>Tampilkan artikel lengkap</span>
          <BcSwitch :model-value="config.showFullArticle" @update:modelValue="toggleFeature('showFullArticle')" />
        </div>
      </div>
    </main>

    <footer>
      <span>V{{ browser.runtime.getManifest().version }}</span>
    </footer>
  </div>
</template>

<style scoped>
.popup {
  padding: 0 1rem 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  user-select: none;
}

main {
  flex: 1 0 auto;
}

footer {
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 20px;
  height: 20px;
}

.power-bc {
  background: transparent;
  border: none;
  cursor: pointer;
}

.option-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.option-item span {
  font-size: 0.9rem;
  color: var(--bc-text);
  cursor: default;
}
</style>

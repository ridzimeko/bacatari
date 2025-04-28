<script lang="ts" setup>
import BcSwitch from '@/components/BcSwitch.vue'
import ClipboardIcon from '@/components/icons/Clipboard.vue'
import NewsPaperCheck from '@/components/icons/NewsPaperCheck.vue'
import { useConfig } from '@/composables/useconfig'

const { config, loadConfig, toggleFeature } = useConfig()

onMounted(async () => {
  await loadConfig()
})
</script>

<template>
  <div class="popup">
    <header class="popup-header">
      <img src="/public/bacatari.svg" alt="Bacatari" class="logo" />
      <h1>Bacatari</h1>
    </header>

    <main>
      <div class="option-container">
        <div class="option-item">
          <div class="option-item-icon">
            <ClipboardIcon />
            <span>Proteksi clipboard</span>
          </div>
          <BcSwitch :model-value="config.antiClipboard" @update:modelValue="toggleFeature('antiClipboard')" />
        </div>
        <div class="option-item">
          <div class="option-item-icon">
            <NewsPaperCheck />
            <span>Tampilkan artikel lengkap</span>
          </div>
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
  align-items: center;
  gap: 0.6rem;
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

.option-item-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-item span {
  font-size: 0.9rem;
  color: var(--bc-text);
  cursor: default;
}
</style>

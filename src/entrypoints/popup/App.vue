<script lang="ts" setup>
import PowerLine from '@/components/icons/PowerLine.vue'

const isDisabled = ref(true)

const toggleSiteHandler = async () => {
  await browser.runtime.sendMessage({ type: 'BC_TOGGLE_HANDLER', setToggle: !isDisabled.value })
}

const checkStatus = async () => {
  await browser.runtime.sendMessage({ type: 'BC_CURRENT_STATUS' })
}

onMounted(() => {
  checkStatus()

  browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'BC_CURRENT_STATUS') {
      isDisabled.value = message.status
    }
  })
})
</script>

<template>
  <div class="popup">
    <header class="popup-header">
      <h1>Bacatari</h1>
      <!-- power icon button -->
      <PowerLine
        role="button"
        :aria-label="`${isDisabled ? 'Enable' : 'Disable'} Bacatari temporary`"
        :style="{ color: !isDisabled ? 'var(--bc-primary)' : 'var(--bc-text)' }"
        @click="toggleSiteHandler"
      />
    </header>

    <main>
      <p style="text-align: center; margin-top: 1rem; font-size: 1rem; color: gray">
        Opsi pengaturan saat ini masih belum tersedia, tunggu update berikutnya ;)
      </p>
    </main>

    <footer>
      <span>v.1.0.0</span>
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

.power-bc svg:hover {
  color: var(--bc-accent);
}

.option-list {
  padding: 1rem;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.option-item span {
  font-size: 1rem;
  color: var(--bc-text);
}
</style>

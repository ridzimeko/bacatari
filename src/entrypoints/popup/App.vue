<script lang="ts" setup>
import PowerLine from '@/components/icons/PowerLine.vue'

const isDisabled = ref(false)

const toggleSiteHandler = async () => {
  browser.runtime.sendMessage({ type: 'BC_TOGGLE_HANDLER', setToggle: !isDisabled.value })
}

onMounted(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'BC_TOGGLE_HANDLER') {
      isDisabled.value = message.isDisabled
    } else if (message.type === 'BC_CURRENT_STATUS') {
      isDisabled.value = message.isDisabled
    }
  })

  browser.runtime.sendMessage({ type: 'BC_CURRENT_STATUS' })
})
</script>

<template>
  <div class="popup">
    <div class="popup-header">
      <h1>Bacatari</h1>
      <!-- power icon button -->
      <PowerLine
        role="button"
        :aria-label="`${isDisabled ? 'Enable' : 'Disable'} Bacatari temporary`"
        :style="{ color: !isDisabled ? 'var(--bc-primary)' : 'var(--bc-text)' }"
        @click="toggleSiteHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  user-select: none;
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

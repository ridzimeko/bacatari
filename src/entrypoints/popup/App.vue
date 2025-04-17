<script lang="ts" setup>
import PowerLine from "@/components/icons/PowerLine.vue";
import { useConfig } from "@/composables/useconfig";

const isDisabled = ref(false);

function toggleSite() {
  // TODO: implement
}
</script>

<template>
  <div class="popup">
    <div class="popup-header">
      <h1>Bacatari</h1>
      <!-- power icon button -->
      <PowerLine
        role="button"
        :aria-label="`Turn ${isDisabled ? 'on' : 'off'} Bacatari`"
        :style="{ color: !isDisabled ? 'var(--bc-primary)' : 'var(--bc-text)' }"
        @click="toggleSite"
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

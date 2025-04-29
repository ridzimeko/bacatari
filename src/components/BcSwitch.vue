<script lang="ts" setup>
const { modelValue } = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="isChecked" />
    <span class="slider"></span>
  </label>
</template>

<style scoped>
/* From Uiverse.io by TimTrayler */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 1.6em;
  flex-shrink: 0;
  user-select: none;
}

.switch input {
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #313033;
  transition: 0.2s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.2em;
  width: 1.2em;
  border-radius: 20px;
  left: 0.2em;
  bottom: 0.2em;
  background-color: #aeaaae;
  transition: 0.2s;
}

input:checked + .slider::before {
  background-color: var(--bc-primary);
}

input:checked + .slider {
  background-color: var(--bc-secondary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--bc-secondary);
}

input:checked + .slider:before {
  transform: translateX(1.9em);
}
</style>

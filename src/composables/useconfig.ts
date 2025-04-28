import { ref, toRaw } from 'vue'
import { DEFAULT_CONFIG } from '../utils/browser'

const config = ref<BcConfig>({ ...DEFAULT_CONFIG })

export function useConfig() {
  const loadConfig = async () => {
    const result = await getBcConfig()

    config.value = result || { ...DEFAULT_CONFIG }
  }

  const saveConfig = () => {
    browser.storage.local.set({
      bacatariConfig: toRaw(config.value),
    })
  }

  const toggleFeature = (feature: keyof BcConfig) => {
    config.value[feature] = !config.value[feature]
    saveConfig()
  }

  return {
    config,
    loadConfig,
    toggleFeature,
  }
}

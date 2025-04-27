import { ref, toRaw } from 'vue'

const defaultConfig: BcConfig = {
  antiClipboard: true,
  showFullArticle: true,
}

const config = ref<BcConfig>({ ...defaultConfig })

export function useConfig() {
  const loadConfig = async () => {
    const result = await getBcConfig()

    config.value = result || { ...defaultConfig }
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

// composables/useBacatariConfig.ts
import { ref, toRaw } from "vue";

interface BacatariConfig {
  disabledSites: string[];
  antiClipboard: boolean;
}

const defaultConfig: BacatariConfig = {
  disabledSites: [],
  antiClipboard: true,
};

const config = ref<BacatariConfig>({ ...defaultConfig });

export function useConfig(currentHostname: string) {
  const isDisabled = ref(false);

  const loadConfig = async () => {
    const result = await browser.storage.local.get("bacatariConfig");
    config.value = result.bacatariConfig || { ...defaultConfig };
    isDisabled.value = config.value.disabledSites.includes(currentHostname);
  };

  const saveConfig = () => {
    browser.storage.local.set({
      bacatariConfig: toRaw(config.value),
    });
  };

  const toggleSite = () => {
    const idx = config.value.disabledSites.indexOf(currentHostname);
    if (idx >= 0) {
      config.value.disabledSites.splice(idx, 1);
      isDisabled.value = false;
    } else {
      config.value.disabledSites.push(currentHostname);
      isDisabled.value = true;
    }
    saveConfig();
  };

  const toggleClipboard = () => {
    config.value.antiClipboard = !config.value.antiClipboard;
    saveConfig();
  };

  return {
    config,
    isDisabled,
    loadConfig,
    toggleSite,
    toggleClipboard,
  };
}

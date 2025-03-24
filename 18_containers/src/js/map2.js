export default class Settings {
  constructor(...settings) {
    function changeSettings(settings) {
      const defaultSettings = new Map([
        ['theme', 'dark'],
        ['music', 'trance'],
        ['difficulty', 'easy'],
      ]);
      if (settings.length > 0) {
        const playerSettings = settings[0];
        for (const key in playerSettings) {
          defaultSettings.set(key, playerSettings[key]);
        }
      }
      return defaultSettings;
    }
    this.setting = changeSettings(settings);
  }
}

import './index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Particles from '@tsparticles/vue3';

createApp(App)
  .use(Particles, {
    init: async (engine) => {
      const { loadFull } = await import('tsparticles');
      const { loadFireflyPreset } = await import('@tsparticles/preset-firefly');
      await loadFull(engine);
      await loadFireflyPreset(engine);
    },
  })
  .mount('#app');

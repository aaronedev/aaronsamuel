import "./index.css";
import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";

createApp(App)
	.use(Particles, {
		init: async (engine) => {
			await loadFull(engine); // Load the full tsParticles engine
			await loadFireflyPreset(engine); // Load the Firefly preset
		},
	})
	.mount("#app");

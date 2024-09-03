<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      :options="particlesOptions"
      class="absolute inset-0 z-0"
      @particles-loaded="particlesLoaded"
    />
  </div>
</template>

<script>
export default {
	data() {
		return {
			particlesOptions: {
				preset: "",
				particles: {
					color: {
						value: "#bedce470",
					},
					move: {
						speed: 0.8,
					},
					number: {
						value: 0,
					},
					size: {
						value: 2,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "circle",
					},
				},
			},
		};
	},
	methods: {
		particlesLoaded(container) {
			console.log("Particles container loaded", container);
		},
	},
};
</script>

<style scoped>
#tsparticles {
	@apply h-screen w-full;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>

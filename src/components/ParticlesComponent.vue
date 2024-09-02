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
				preset: "firefly", // Use the firefly preset as a base
				background: {
					color: "#161217", // Customize the background color
				},
				particles: {
					color: {
						value: "#ffffff", // Customize particle color#0d0c0d
					},
					move: {
						speed: 0.8, // Adjust the speed of particles
					},
					number: {
						value: 100, // Customize the number of particles
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

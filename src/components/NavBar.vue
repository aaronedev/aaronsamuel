<template>
  <nav
    :class="[
      'fixed left-0 top-0 z-50 w-full shadow-lg transition-transform duration-300',
      isNavbarVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo or Brand Name -->
      <div class="text-xl font-bold">
        <a
          href="#"
          class="text-cyan hover:text-purple hover:underline"
        >About</a>
      </div>

      <!-- Home Icon -->
      <div>
        <a
          href="#"
          class="text-cyan hover:text-purple"
        >
          <i class="fas fa-home" />
        </a>
      </div>

      <!-- Icons -->
      <div class="relative flex items-center space-x-4">
        <!-- GitHub Icon with Tooltip -->
        <div class="group relative">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            :class="['text-lg text-cyan hover:text-purple', animationClass]"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
          >
            <i class="fab fa-github" />
          </a>
          <!-- Tooltip -->
          <div
            v-if="!isHovered && !thankYouMessage"
            class="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-700 px-2 py-1 text-xs text-white transition-opacity duration-300"
          >
            HELP ME HOVER ME I NEED TO RELAX
          </div>
          <div
            v-if="thankYouMessage"
            class="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-700 px-2 py-1 text-xs text-white transition-opacity duration-300"
          >
            Thhaaaanks x3333333
          </div>
        </div>

        <!-- LinkedIn Icon -->
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg text-cyan hover:text-purple"
        >
          <i class="fab fa-linkedin" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
	data() {
		return {
			isNavbarVisible: true,
			lastScrollPosition: 0,
			animationClass: "animate-bounce-in-up-fast",
			isHovered: false,
			thankYouMessage: false,
			timeoutId: null, // Store timeout ID to clear if needed
		};
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		onMouseEnter() {
			this.isHovered = true;
			this.animationClass = "animate-bounce-in-up-fast";

			// Clear any existing timeout to avoid multiple triggers
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
			}
		},
		onMouseLeave() {
			this.animationClass = "animate-bounce-in-up-slow";

			// Start the timeout to show the thank you message after 5 seconds
			this.timeoutId = setTimeout(() => {
				this.thankYouMessage = true;
				this.isHovered = false;
			}, 5000);
		},
		handleScroll() {
			const currentScrollPosition = window.pageYOffset;
			if (currentScrollPosition > this.lastScrollPosition) {
				this.isNavbarVisible = false;
			} else {
				this.isNavbarVisible = true;
			}
			this.lastScrollPosition = currentScrollPosition;
		},
	},
};
</script>

<style scoped>
/* Define different speed animations */
.animate-bounce-in-up-fast {
	animation: bounce-in-up 0.1s infinite;
}

.animate-bounce-in-up-slow {
	animation: bounce-in-up 1s infinite;
}
</style>

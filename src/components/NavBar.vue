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
          class="text-muted hover:underline"
        >About</a>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <!-- FontAwesome Icons -->
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent text-lg hover:text-accent-cyan"
        >
          <i class="fab fa-github" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent text-lg hover:text-accent-cyan"
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
		};
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
			const currentScrollPosition = window.pageYOffset;
			if (currentScrollPosition > this.lastScrollPosition) {
				this.isNavbarVisible = false; // Hide navbar when scrolling down
			} else {
				this.isNavbarVisible = true; // Show navbar when scrolling up
			}
			this.lastScrollPosition = currentScrollPosition;
		},
	},
};
</script>

<style scoped></style>

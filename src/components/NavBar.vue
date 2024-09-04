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
        >
          About
        </a>
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
        <!-- GitHub Icon with Tooltip -->
        <div class="group relative">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg text-cyan hover:text-purple"
            @mouseenter="active = true"
          >
            <i
              :class="[
                'fab fa-github',
                isBouncing ? 'animate-bounce-in-up-fast' : '',
              ]"
            />
          </a>

          <!-- Tooltip for hover -->
          <div
            v-if="!thankYouMessage"
            class="absolute left-1/2 mt-2 w-max -translate-x-1/2 transform rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            HELP ME HOVER ME I NEED TO RELAX
          </div>

          <!-- Tooltip for thank you message -->
          <div
            v-if="thankYouMessage"
            class="absolute left-1/2 mt-2 w-max -translate-x-1/2 transform rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
      active: false,
      thankYouMessage: false,
      isBouncing: false, // Controls the bounce animation
    };
  },
  watch: {
    active(value) {
      if (value) {
        setTimeout(() => {
          this.thankYouMessage = true; // Change tooltip after 5 seconds
        }, 5000);
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // Start bouncing after a 3-second delay
    setTimeout(() => {
      this.isBouncing = true;
    }, 3000);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.isNavbarVisible = currentScrollPosition <= this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>

<style scoped>
/* Bounce Animation */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-bounce-in-up-fast {
  animation: bounce-slow 0.5s infinite;
}
</style>

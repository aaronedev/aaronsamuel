<template>
  <nav
    :class="[
      'fixed left-0 top-0 z-50 w-full shadow-lg transition-transform duration-300',
      isNavbarVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo or Brand Name -->
      <div class="font-bold text-xl">
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
        <!-- GitHub Icon with dynamic tooltip -->
        <div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-cyan text-lg hover:text-purple"
          >
            <i :class="['fab fa-github']" />
          </a>
        </div>

        <!-- LinkedIn Icon -->
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan text-lg hover:text-purple"
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
/* Tooltip Style */
.tooltip-container {
  transition: opacity 0.3s;
  position: absolute;
  left: 0;
  transform: translate(-100%, 20px);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.75rem;
  white-space: nowrap;
  width: max-content;
  z-index: 1000;
}
</style>

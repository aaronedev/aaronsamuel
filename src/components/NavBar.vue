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
    <!-- GitHub Icon with dynamic tooltip -->
    <div class="group relative">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-lg text-cyan hover:text-purple"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <i
          :class="['fab fa-github', isBouncing ? 'animate-bounce-in-up-fast' : '']"
        />
      </a>

      <!-- Dynamic message container that follows the bounce animation -->
      <div
        v-if="showMessage"
        class="tooltip-container"
        :style="{ top: messagePosition }"
      >
        {{ dynamicMessage }}
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
      thankYouMessage: false, // Controls the tooltip message
      isBouncing: false, // Controls the bounce animation
      showMessage: false, // Controls when to show the dynamic message
      dynamicMessage: "HELP ME HOVER ME I NEED TO RELAX", // Initial message
      messagePosition: "0px", // Position of the message container (sync with animation)
    };
  },
  watch: {
    active(value) {
      if (value) {
        setTimeout(() => {
          this.thankYouMessage = true; // Change the tooltip after 5 seconds of hover
          this.dynamicMessage = "Thhaaaanks x3333333"; // Change message after 5 seconds
        }, 5000);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // Start the bounce and show the tooltip after 3 seconds
    setTimeout(() => {
      this.isBouncing = true; // Start bouncing the icon
      this.showMessage = true; // Show the tooltip/message
      this.startMessageMovement(); // Start moving the message with the icon
    }, 3000); // 3 seconds delay
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.isNavbarVisible = currentScrollPosition <= this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    startMessageMovement() {
      let bounceInterval = setInterval(() => {
        if (!this.isBouncing) {
          clearInterval(bounceInterval); // Stop the movement when bouncing stops
          return;
        }
        // Sync tooltip movement with bounce animation
        this.messagePosition = Math.random() > 0.5 ? "-15px" : "-25px"; // Move up and down along with the icon
      }, 300); // Every 300ms
    },
    handleMouseEnter() {
      this.active = true; // Trigger active state to start the tooltip countdown
    },
    handleMouseLeave() {
      this.active = false; // Reset behavior on mouse leave (optional)
      this.thankYouMessage = false; // Reset the message state
      this.dynamicMessage = "HELP ME HOVER ME I NEED TO RELAX"; // Reset the initial message
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
  animation: bounce-slow 0.5s infinite; /* Fast bounce animation */
}

/* Tooltip Style */
.tooltip-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.75rem;
  white-space: nowrap; /* Ensure the text doesn't wrap to new lines */
  width: max-content; /* The container adjusts to the text size */
  transition: top 0.3s ease; /* Smooth transition for following bounce */
}
</style>
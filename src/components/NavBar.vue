<template>
  <nav
    class="fixed left-0 top-0 z-50 w-full bg-slate-950 text-text-primary shadow-lg"
  >
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo or Brand Name -->
      <div class="text-xl font-bold">
        <a
          href="#"
          class="text-accent-blue hover:underline"
        >My Portfolio</a>
      </div>

      <!-- Icons and Toggle -->
      <div class="flex items-center space-x-4">
        <!-- FontAwesome Icons -->
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg text-accent-blue hover:text-accent-purple"
        >
          <i class="fab fa-github" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg text-accent-blue hover:text-accent-purple"
        >
          <i class="fab fa-linkedin" />
        </a>

        <!-- Toggle Switch for Light/Dark Mode -->
        <div>
          <label
            for="themeToggle"
            class="flex cursor-pointer items-center"
          >
            <div class="relative flex items-center">
              <input
                id="themeToggle"
                type="checkbox"
                class="sr-only"
                @change="toggleTheme"
              >
              <div
                class="flex h-6 w-10 items-center rounded-full bg-gray-400 shadow-inner"
              />
              <div
                class="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition"
              />
            </div>
            <span class="ml-3 text-sm">Dark Mode</span>
          </label>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
	methods: {
		toggleTheme() {
			// This method toggles between light and dark themes
			const body = document.body;
			body.classList.toggle("dark-mode");
		},
	},
};
</script>

<style scoped>
/* Center the dot on the toggle switch */
input:checked ~ .dot {
	transform: translateX(100%);
	background-color: #4a5568; /* Dark mode color */
}

/* Dark mode styles */
.dark-mode {
	--background: #1a202c;
	--text-primary: #edf2f7;
	--accent-blue: #63b3ed;
	--accent-purple: #805ad5;
	--text-muted: #a0aec0;
}
</style>

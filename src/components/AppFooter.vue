<template>
  <Footer class="py-6">
    <div class="container mx-auto flex flex-col items-center space-y-4">
      <!-- Social Media Links -->
      <div class="flex space-x-4">
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
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent text-lg hover:text-accent-cyan"
        >
          <i class="fab fa-twitter" />
        </a>
      </div>

      <!-- Back to Top Link -->
      <a
        href="#"
        class="text-accent-cyan text-sm hover:underline"
      >
        Back to Top
      </a>

      <!-- Copyright Notice -->
      <p class="text-muted text-slate-500 text-sm">
        &copy; {{ new Date().getFullYear() }} My Portfolio. All rights reserved.
      </p>
    </div>
  </Footer>
</template>

<script>
export default {};
</script>

<style scoped>
/* AppFooter Styling */
AppFooter {
  border-top: 1px solid var(--text-muted);
}
</style>

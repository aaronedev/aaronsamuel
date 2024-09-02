<template>
  <Footer class="bg-background py-6 text-text-primary">
    <div class="container mx-auto flex flex-col items-center space-y-4">
      <!-- Social Media Links -->
      <div class="flex space-x-4">
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
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg text-accent-blue hover:text-accent-purple"
        >
          <i class="fab fa-twitter" />
        </a>
      </div>

      <!-- Back to Top Link -->
      <a
        href="#"
        class="text-sm text-accent-purple hover:underline"
      >
        Back to Top
      </a>

      <!-- Copyright Notice -->
      <p class="text-muted text-sm">
        &copy; {{ new Date().getFullYear() }} My Portfolio. All rights reserved.
      </p>
    </div>
  </Footer>
</template>

<script>
export default {
};
</script>

<style scoped>
/* AppFooter Styling */
AppFooter {
	border-top: 1px solid var(--text-muted);
}
</style>

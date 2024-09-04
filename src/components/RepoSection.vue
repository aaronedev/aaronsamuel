<template>
  <div class="mt-10 w-full max-w-lg text-left">
    <h2 class="mb-4 text-xl font-bold text-accent-blue">
      <i class="fas fa-star mr-2" /> Favorite Repositories
    </h2>
    <ul class="space-y-4">
      <li
        v-for="repo in repos"
        :key="repo.id"
      >
        <a
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan hover:underline"
        >
          {{ repo.name }}
        </a>
        <p class="text-muted">
          {{ repo.description }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
};
</script>

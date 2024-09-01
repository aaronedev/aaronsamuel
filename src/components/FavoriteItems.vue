<template>
  <div class="mt-8 block">
    <h3 class="mb-4 text-lg font-bold text-accent-blue">
      <i class="fas fa-star mr-2" />Favorite Repositories & Gists
    </h3>
    <ul class="space-y-2">
      <li
        v-for="repo in favoriteRepos"
        :key="repo.id"
      >
        <a
          :href="repo.html_url"
          target="_blank"
          class="text-link underline"
        >
          <i class="fas fa-book mr-1" />{{ repo.name }}
        </a>
        -
        <span class="text-text-lightMuted">{{
          repo.description || "No description available."
        }}</span>
      </li>
      <li
        v-for="gist in favoriteGists"
        :key="gist.id"
      >
        <a
          :href="gist.html_url"
          target="_blank"
          class="text-link underline"
        >
          <i class="fas fa-code mr-1" />{{
            gist.description || "Untitled Gist"
          }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	props: {
		favoriteRepos: {
			type: Array,
			default: () => [],
		},
		favoriteGists: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

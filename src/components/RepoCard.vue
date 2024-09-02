<template>
  <div
    class="card rounded-lg bg-[#1e1e1e] p-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
  >
    <h3 class="mb-2 text-xl font-bold text-[#c792ea]">
      <a
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        <i class="fas fa-code-branch mr-2" />{{ repo.name }}
      </a>
    </h3>
    <p class="mb-4 text-[#7f65d4]">
      {{ repo.description || "No description available." }}
    </p>
    <div class="mb-4 flex flex-wrap items-center space-x-4">
      <span class="rounded-full bg-[#ffb444] px-2 py-1 text-sm text-black">
        <i class="fas fa-star mr-1" />{{ repo.stargazers_count }} Stars
      </span>
      <span class="rounded-full bg-[#ffb444] px-2 py-1 text-sm text-black">
        <i class="fas fa-code-branch mr-1" />{{ repo.forks_count }} Forks
      </span>
      <span class="rounded-full bg-[#ffb444] px-2 py-1 text-sm text-black">
        <i class="fas fa-exclamation-circle mr-1" />{{ repo.open_issues_count }}
        Issues
      </span>
      <span
        v-if="repo.language"
        class="rounded-full bg-[#60F8DE] px-2 py-1 text-sm text-black"
      >
        <i
          class="fas fa-circle mr-1"
          :style="{ color: languageColor }"
        />{{
          repo.language
        }}
      </span>
      <span
        v-if="repo.license"
        class="rounded-full bg-[#60F8DE] px-2 py-1 text-sm text-black"
      >
        <i class="fas fa-balance-scale mr-1" />{{ repo.license.name }}
      </span>
    </div>
    <p class="text-sm text-[#7f65d4]">
      Updated on {{ new Date(repo.updated_at).toLocaleDateString() }}
    </p>
  </div>
</template>

<script>
export default {
	name: "RepoCard",
	props: {
		repo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		languageColor() {
			// Define colors for popular languages, fallback to gray if not defined
			const colors = {
				JavaScript: "#f1e05a",
				Python: "#3572A5",
				Java: "#b07219",
				CSS: "#563d7c",
				HTML: "#e34c26",
			};
			return colors[this.repo.language] || "#9b9b9b";
		},
	},
};
</script>

<style scoped>
.card {
	border: 1px solid #2a2a2a;
}
</style>

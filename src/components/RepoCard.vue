<template>
  <div
    class="card rounded-lg bg-[#1e1e1e] p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
  >
    <h3 class="mb-2 text-xl font-bold text-[#c792ea]">
      <i class="fas fa-code-branch mr-2" />{{ repo.name }}
    </h3>
    <p class="mb-4 text-[#7f65d4]">
      {{ repo.description || "No description available." }}
    </p>
    <div class="flex space-x-4">
      <span class="text-[#ffb444]">
        <i class="fas fa-star mr-1" />{{ repo.stargazers_count }}
      </span>
      <span class="text-[#ffb444]">
        <i class="fas fa-code-branch mr-1" />{{ repo.forks_count }}
      </span>
      <span class="text-[#ffb444]">
        <i class="fas fa-exclamation-circle mr-1" />{{ repo.open_issues_count }}
        Issues
      </span>
    </div>
    <p class="mt-4 text-sm text-[#7f65d4]">
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
};
</script>

<style scoped>
@keyframes slideUp {
	0% {
		transform: translateY(10px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>

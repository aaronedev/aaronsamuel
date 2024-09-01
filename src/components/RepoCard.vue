<template>
  <div class="card p-4 bg-[#1e1e1e] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 class="text-[#c792ea] font-bold text-xl mb-2">
      <i class="fas fa-code-branch mr-2" />{{ repo.name }} 
    </h3>
    <p class="text-[#7f65d4] mb-4">
      {{ repo.description || 'No description available.' }}
    </p>
    <div class="flex space-x-4">
      <span class="text-[#ffb444]">
        <i class="fas fa-star mr-1" />{{ repo.stargazers_count }}
      </span>
      <span class="text-[#ffb444]">
        <i class="fas fa-code-branch mr-1" />{{ repo.forks_count }}
      </span>
      <span class="text-[#ffb444]">
        <i class="fas fa-exclamation-circle mr-1" />{{ repo.open_issues_count }} Issues
      </span>
    </div>
    <p class="text-sm text-[#7f65d4] mt-4">
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
.card {
  animation: slideUp 0.7s ease-in-out;
}

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

<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <a
        :href="repo.html_url"
        target="_blank"
        class="text-[#00d1b2] text-lg font-semibold hover:underline"
      >
        "{{ repo.name }}"
      </a>
      <div class="flex space-x-4">
        <div class="flex items-center space-x-1 text-[#ffb444]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.469 2.066 10.531 2.066 10.951 2.927l1.286 2.603a1 1 0 00.753.545l2.868.416c.81.117 1.133 1.114.547 1.68l-2.074 2.022a1 1 0 00-.287.885l.489 2.854c.138.808-.714 1.426-1.44 1.045L10 13.187l-2.565 1.348c-.726.381-1.578-.237-1.44-1.045l.489-2.854a1 1 0 00-.287-.885L4.123 8.171c-.586-.566-.263-1.563.547-1.68l2.868-.416a1 1 0 00.753-.545l1.286-2.603z" />
          </svg>
          <span>{{ repo.stargazers_count }}</span>
        </div>
        <div class="flex items-center space-x-1 text-[#ffb444]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 00-5.293 13.707L10 22l5.293-6.293A8 8 0 0010 2z" />
          </svg>
          <span>{{ repo.forks_count }}</span>
        </div>
      </div>
    </div>
    <p class="mt-2 text-[#7f65d4]">
      "description": "{{ repo.description || 'No description provided.' }}",
    </p>
    <p class="mt-1 text-[#7f65d4]">
      "language": "{{ repo.language || 'Not specified' }}",
    </p>
    <p class="mt-1 text-[#7f65d4]">
      "updated_at": "{{ new Date(repo.updated_at).toLocaleDateString() }}",
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
  background-color: #04010b;
  border: 1.5px solid #915aff;
  padding: 1.5em;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
</style>

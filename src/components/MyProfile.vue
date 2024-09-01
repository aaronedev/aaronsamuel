<template>
  <div class="block mb-4">
    <h2 class="text-accent-blue font-bold text-xl mb-4">
      <i class="fab fa-github mr-2" />GitHub Profile
    </h2>
    <div class="flex items-center space-x-4 mb-4">
      <img
        :src="profile.avatar_url"
        alt="GitHub Profile Picture"
        class="rounded-full w-16 h-16 border-2 border-accent-purple"
      >
      <div>
        <p class="text-lg text-accent-purple">
          {{ profile.name }} <i class="fas fa-user-circle" />
        </p>
        <p class="text-sm text-primary-cyan">
          @{{ profile.login }}
        </p>
      </div>
    </div>
    <p class="text-text-muted mb-4">
      <i class="fas fa-code mr-1" /> {{ profile.bio }}
    </p>
    <div class="space-y-2">
      <p class="text-accent-purple font-bold">
        <i class="fas fa-book mr-1" /> "Repositories"
      </p>
      <p class="text-text-lightMuted">
        <i class="fas fa-code-branch mr-1" /> Public: {{ publicRepos }}
      </p>
      <p class="text-text-lightMuted">
        <i class="fas fa-lock mr-1" /> Private: {{ privateRepos }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  profile: {
    type: Object,
    default: () => ({})
  },
  publicRepos: Number,
  privateRepos: Number,
}
};
</script>

<template>
  <div class="profile-container mb-4 block">
    <h2 class="fade-slide text-accent-blue mb-4 text-xl font-bold">
      <i class="fab fa-github mr-2" />GitHub Profile
    </h2>
    <div class="fade-slide mb-4 flex items-center space-x-4">
      <img
        :src="profile.avatar_url"
        alt="GitHub Profile Picture"
        class="hover:scale-up border-accent-purple h-16 w-16 rounded-full border-2"
      >
      <div>
        <p class="text-accent-purple text-lg">
          {{ profile.name }} <i class="fas fa-user-circle" />
        </p>
        <p class="text-primary-cyan text-sm">
          @{{ profile.login }}
        </p>
      </div>
    </div>

    <div class="fade-slide text-text mb-4">
      <i class="fas fa-code mr-1" />
    </div>
    <div class="fade-slide space-y-2">
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
			default: () => ({}),
		},
		publicRepos: {
			type: Number,
			default: 0,
		},
		privateRepos: {
			type: Number,
			default: 0,
		},
	},
};
</script>

<style scoped>
/* Animations */
.profile-container {
	animation: fadeSlide 1s ease-in-out;
}

.fade-slide {
	animation: fadeSlide 0.8s ease-in-out;
}

.hover\:scale-up:hover {
	transform: scale(1.05);
	transition: transform 0.3s ease;
}

/* Keyframes */
@keyframes fadeSlide {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

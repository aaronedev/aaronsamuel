<template>
  <div class="profile-container mb-4 block">
    <h2 class="fade-slide mb-4 text-xl font-bold text-accent-blue">
      <i class="fab fa-github mr-2" />GitHub Profile
    </h2>
    <div class="fade-slide mb-4 flex items-center space-x-4">
      <img
        :src="profile.avatar_url"
        alt="GitHub Profile Picture"
        class="hover:scale-up h-16 w-16 rounded-full border-2 border-accent-purple"
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
    <p class="fade-slide mb-4 text-text-muted">
      <i class="fas fa-code mr-1" /> {{ profile.bio }}
    </p>
    <div class="fade-slide space-y-2">
      <p class="font-bold text-accent-purple">
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

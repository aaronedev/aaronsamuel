<template>
  <div
    id="app"
    class="w-full bg-background text-text-primary"
  >
    <main class="w-full p-4">
      <!-- Top Section: Split into two columns -->
      <div class="mb-8 flex flex-wrap justify-between md:flex-nowrap">
        <!-- Left Column (GitHub Profile + Favorite Repos/Gists) -->
        <div class="mb-8 w-full pr-4 md:mb-0 md:w-1/2">
          <div class="mb-4 block">
            <h2 class="mb-4 text-xl font-bold text-accent-blue">
              <i class="fab fa-github mr-2" />GitHub Profile
            </h2>
            <div
              v-if="profile"
              class="mb-4 flex items-center space-x-4"
            >
              <img
                :src="profile.avatar_url"
                :alt="profile.name"
                class="h-16 w-16 rounded-full border-2 border-accent-purple"
              >
              <div>
                <p class="text-lg text-accent-purple">
                  {{ profile.name }} <i class="fas fa-user-circle" />
                </p>
                <p class="text-muted">
                  <a
                    :href="profile.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View GitHub Profile
                  </a>
                </p>
              </div>
            </div>
            <div v-else>
              <p>Loading GitHub profile...</p>
            </div>
          </div>

          <!-- Favorite Repos -->
          <div class="block">
            <h2 class="mb-4 text-xl font-bold text-accent-blue">
              <i class="fas fa-star mr-2" /> Favorite Repositories
            </h2>
            <ul>
              <li
                v-for="repo in repos"
                :key="repo.id"
                class="mb-4"
              >
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-brightBlue hover:underline"
                >
                  {{ repo.name }}
                </a>
                <p class="text-muted">
                  {{ repo.description }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			profile: null,
			repos: [],
			username: "aaronedev",
		};
	},
	created() {
		this.fetchGitHubProfile();
		this.fetchGitHubRepos();
	},
	methods: {
		async fetchGitHubProfile() {
			try {
				const response = await axios.get(
					`https://api.github.com/users/${this.username}`,
				);
				this.profile = response.data;
			} catch (error) {
				console.error("Failed to fetch GitHub profile:", error);
			}
		},
		async fetchGitHubRepos() {
			try {
				const response = await axios.get(
					`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=5`,
				);
				this.repos = response.data;
			} catch (error) {
				console.error("Failed to fetch GitHub repositories:", error);
			}
		},
	},
};
</script>

<style scoped>
#app {
	font-size: 16px;
	width: 100%;
	padding: 0.5em;
	animation: slideUp 0.5s ease-in-out;
}
</style>

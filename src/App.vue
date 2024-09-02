<template>
  <div
    id="app"
    class="w-full bg-background p-5 font-mono font-medium text-white"
  >
    <main class="w-full p-4">
      <div class="mb-8 flex flex-wrap justify-between md:flex-nowrap">
        <div class="mb-8 w-full pr-4 md:mb-0 md:w-1/2">
          <!-- GitHub Profile Section -->
          <div
            class="profile-container mb-4 block rounded-lg bg-[#212121] p-4 shadow-md"
          >
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

          <!-- Favorite Projects Section -->
          <div class="favorite-items rounded-lg bg-[#292d3e] p-4 shadow-md">
            <h2 class="mb-2 text-xl font-bold text-[#c792ea]">
              Featured Projects
            </h2>
            <ul class="text-white">
              <li>
                <strong>Violet Void Theme 🟣</strong>: A dark, elegant theme
                that unifies your digital workspace across code editors, Windows
                Terminal, Windows 11, and more. It features a rich violet
                palette, subtle glowing effects, and custom icons.
              </li>
            </ul>
          </div>

          <!-- My GitHub Stats Section -->
          <div class="my-stats rounded-lg bg-[#212121] p-4 shadow-md">
            <h2 class="mb-2 text-xl font-bold text-[#ffcb6b]">
              My GitHub Stats
            </h2>
            <p class="text-white">
              🌟 Stars: 927
            </p>
            <p class="text-white">
              👥 Followers: 28
            </p>
            <p class="text-white">
              🔗 Following: 140
            </p>
          </div>
        </div>

        <div class="w-full pl-4 md:w-1/2">
          <!-- Personal Info Section -->
          <div class="mb-4 block rounded-lg bg-[#292d3e] p-4 shadow-md">
            <p>
              <span class="text-accent-purple font-bold"><i class="fas fa-user mr-1" />"name"</span>: <span class="text-accent-purple">"Aaron-Samuel Hauck"</span>,
            </p>
            <p class="mt-2">
              <span class="text-accent-purple font-bold"><i class="fas fa-info-circle mr-1" />"description"</span>:
              <span class="text-text-lightMuted">"I'm a Web Developer and System Administrator working
                extensively with DevOps practices, building fast, secure, and
                scalable web applications."</span>
            </p>
          </div>

          <!-- Fake Terminal Section -->
          <div
            class="fake-terminal rounded-lg bg-black p-4 text-green-500 shadow-md"
          >
            <h2 class="mb-2 text-2xl font-bold">
              Fake Terminal
            </h2>
            <pre>
              {{ terminalOutput }}
            </pre>
          </div>
        </div>
      </div>

      <div
        class="from-accent-purple to-accent-blue my-8 h-px w-full bg-gradient-to-r via-link"
      />
      <div class="block">
        <p>
          <span class="text-accent-blue font-bold">
            <font-awesome-icon
              :icon="['fas', 'code']"
              class="mr-1"
            />
            "public_repos"
          </span>
          : [
        </p>
        <div
          class="ml-6 grid grid-cols-1 gap-4 space-y-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <!-- Repo Card Section -->
          <div
            v-for="repo in repos"
            :key="repo.id"
            class="repo-card card rounded-lg bg-[#1e1e1e] p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <h3 class="mb-2 text-xl font-bold text-[#c792ea]">
              <i class="fas fa-code-branch mr-2" />{{ repo.name }}
            </h3>
            <p class="mb-4 text-[#7f65d4]">
              {{ repo.description || "No description available." }}
            </p>
            <div class="flex space-x-4 text-[#ffb444]">
              <span>
                <i class="fas fa-star mr-1" />{{ repo.stargazers_count }}
              </span>
              <span>
                <i class="fas fa-code-branch mr-1" />{{ repo.forks_count }}
              </span>
              <span>
                <i class="fas fa-exclamation-circle mr-1" />{{
                  repo.open_issues_count
                }}
                Issues
              </span>
            </div>
            <p class="mt-4 text-sm text-[#7f65d4]">
              Updated on {{ new Date(repo.updated_at).toLocaleDateString() }}
            </p>
          </div>
        </div>
        <p>]</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
	name: "App",
	data() {
		return {
			profile: {},
			repos: [],
			publicRepos: 0,
			privateRepos: 0,
			favoriteRepos: [],
			favoriteGists: [],
			terminalOutput: `
        Last login: Wed Sep  1 15:43:21 on ttys000
        johndoe@MacBook-Pro ~ % ls
        Documents  Downloads  Music  Pictures
        johndoe@MacBook-Pro ~ % 
      `,
		};
	},
	mounted() {
		this.fetchRepos();
		this.fetchRepoCounts();
		this.fetchFavoriteRepos();
		this.fetchFavoriteGists();
		this.fetchProfile();
	},
	methods: {
		async fetchRepos() {
			try {
				const response = await axios.get(
					"https://api.github.com/users/aaronedev/repos",
				);
				this.repos = response.data;
			} catch (error) {
				console.error("Error fetching repos:", error);
			}
		},
		async fetchRepoCounts() {
			try {
				const response = await axios.get(
					"https://api.github.com/users/aaronedev",
				);
				this.publicRepos = response.data.public_repos;
				this.privateRepos = response.data.total_private_repos || 0;
			} catch (error) {
				console.error("Error fetching repo counts:", error);
			}
		},
		fetchFavoriteRepos() {
			this.favoriteRepos = [
				{
					id: 1,
					name: "Repo1",
					html_url: "https://github.com/aaronedev/repo1",
					description: "My favorite repo 1",
				},
				{
					id: 2,
					name: "Repo2",
					html_url: "https://github.com/aaronedev/repo2",
					description: "My favorite repo 2",
				},
			];
		},
		fetchFavoriteGists() {
			this.favoriteGists = [
				{
					id: 1,
					html_url: "https://gist.github.com/aaronedev/gist1",
					description: "Useful Gist 1",
				},
				{
					id: 2,
					html_url: "https://gist.github.com/aaronedev/gist2",
					description: "Useful Gist 2",
				},
			];
		},
		async fetchProfile() {
			try {
				const response = await axios.get(
					"https://api.github.com/users/aaronedev",
				);
				this.profile = response.data;
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		},
	},
};
</script>

<style scoped>
/* Custom Styles */
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

/* Repo Card Animation */
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

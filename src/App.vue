<template>
  <div
    id="app"
    class="w-full bg-background p-5 font-mono font-medium text-white"
  >
    <main class="w-full p-4">
      <div class="mb-8 flex flex-wrap justify-between md:flex-nowrap">
        <div class="mb-8 w-full pr-4 md:mb-0 md:w-1/2">
          <MyProfile
            :profile="profile"
            :public-repos="publicRepos"
            :private-repos="privateRepos"
          />
          <FavoriteItems
            :favorite-repos="favoriteRepos"
            :favorite-gists="favoriteGists"
          />
          <MyStats />
        </div>
        <div class="w-full pl-4 md:w-1/2">
          <PersonalInfo />
          <FakeTerminal />
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
          <RepoCard
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
            class="card"
          />
        </div>
        <p>]</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import RepoCard from "./components/RepoCard.vue";
import MyProfile from "./components/MyProfile.vue";
import FavoriteItems from "./components/FavoriteItems.vue";
import MyStats from "./components/MyStats.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
import FakeTerminal from "./components/FakeTerminal.vue";

export default {
	name: "App",
	components: {
		RepoCard,
		MyProfile,
		FavoriteItems,
		MyStats,
		PersonalInfo,
		FakeTerminal,
	},
	data() {
		return {
			profile: {},
			repos: [],
			publicRepos: 0,
			privateRepos: 0,
			favoriteRepos: [],
			favoriteGists: [],
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
/* Additional styling can be added here */
</style>

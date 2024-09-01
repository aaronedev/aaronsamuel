<template>
  <div
    id="app"
    class="w-full bg-background text-text-primary"
  >
    <main class="w-full p-4">
      <div class="flex flex-wrap md:flex-nowrap justify-between mb-8">
        <div class="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
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
        <div class="w-full md:w-1/2 pl-4">
          <PersonalInfo />
        </div>
      </div>
      <div class="w-full h-px bg-gradient-to-r from-accent-purple via-link to-accent-blue my-8" />
      <div class="block">
        <p><span class="text-accent-blue font-bold"><i class="fas fa-code mr-1" />"public_repos"</span>: [</p>
        <div class="ml-6 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default {
  name: "App",
  components: {
    RepoCard,
    MyProfile,
    FavoriteItems,
    MyStats,
    PersonalInfo,
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
        const response = await axios.get("https://api.github.com/users/aaronedev/repos");
        this.repos = response.data;
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    },
    async fetchRepoCounts() {
      try {
        const response = await axios.get("https://api.github.com/users/aaronedev");
        this.publicRepos = response.data.public_repos;
        this.privateRepos = response.data.total_private_repos || 0;
      } catch (error) {
        console.error("Error fetching repo counts:", error);
      }
    },
    fetchFavoriteRepos() {
      this.favoriteRepos = [
        { id: 1, name: "Repo1", html_url: "https://github.com/aaronedev/repo1", description: "My favorite repo 1" },
        { id: 2, name: "Repo2", html_url: "https://github.com/aaronedev/repo2", description: "My favorite repo 2" },
      ];
    },
    fetchFavoriteGists() {
      this.favoriteGists = [
        { id: 1, html_url: "https://gist.github.com/aaronedev/gist1", description: "Useful Gist 1" },
        { id: 2, html_url: "https://gist.github.com/aaronedev/gist2", description: "Useful Gist 2" },
      ];
    },
    async fetchProfile() {
      try {
        const response = await axios.get("https://api.github.com/users/aaronedev");
        this.profile = response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
  },
};
</script>

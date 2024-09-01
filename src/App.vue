<template>
  <div id="app" class="w-full">
    <main class="w-full bg-[#0b0a0b] text-[#baa3ff] font-hack p-4">
      <!-- Top Section: Split into two columns -->
      <div class="flex flex-wrap md:flex-nowrap justify-between mb-8">
        <!-- Left Column (GitHub Profile) -->
        <div class="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
          <div class="block mb-4">
            <h2 class="text-[#c792ea] font-bold text-xl mb-4">GitHub Profile</h2>
            <div class="flex items-center space-x-4 mb-4">
              <img src="https://avatars.githubusercontent.com/u/0000000?v=4" alt="GitHub Profile Picture" class="rounded-full w-16 h-16">
              <div>
                <p class="text-lg text-[#7f65d4]">Aaron-Samuel Hauck</p>
                <p class="text-sm text-[#00d1b2]">@aaronedev</p>
              </div>
            </div>
            <p class="text-[#7f65d4] mb-4">
              Experienced Full-Stack Developer with a passion for building efficient and scalable applications. Specializing in DevOps and cloud architecture.
            </p>
            <div class="space-y-2">
              <p class="text-[#c792ea] font-bold">"Repositories"</p>
              <p class="text-[#7f65d4]">Public: 50</p>
              <p class="text-[#7f65d4]">Private: 10</p>
            </div>
          </div>
          <div class="block mb-4">
            <h3 class="text-[#c792ea] font-bold text-lg mb-4">GitHub Stats</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-[#16161a] p-4 rounded-md">
                <p>Total Stars Earned: 21</p>
                <p>Total Commits (2024): 52</p>
                <p>Total PRs: 1</p>
                <p>Total Issues: 1</p>
                <p>Contributed to (last year): 2</p>
              </div>
              <div class="bg-[#16161a] p-4 rounded-md text-center">
                <p class="text-xl font-bold">566</p>
                <p>Total Contributions</p>
                <p>Oct 26, 2018 - Present</p>
              </div>
              <div class="bg-[#16161a] p-4 rounded-md text-center">
                <p class="text-xl font-bold">3</p>
                <p>Current Streak</p>
                <p>Aug 30 - Sep 1</p>
              </div>
              <div class="bg-[#16161a] p-4 rounded-md text-center">
                <p class="text-xl font-bold">24</p>
                <p>Longest Streak</p>
                <p>Aug 5 - Aug 28</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column (Personal Information) -->
        <div class="w-full md:w-1/2 pl-4">
          <div class="block mb-4">
            <p><span class="text-[#c792ea] font-bold">"name"</span>: <span class="text-[#7f65d4]">"Aaron-Samuel Hauck"</span>,</p>
            <p class="mt-2"><span class="text-[#c792ea] font-bold">"description"</span>: <span class="text-[#7f65d4]">"I'm a Web Developer and System Administrator working extensively with DevOps practices, building fast, secure, and scalable web applications."</span></p>
          </div>
          <div class="block mb-4">
            <p><span class="text-[#c792ea] font-bold">"address"</span>: [</p>
            <ul class="ml-6 list-disc text-[#7f65d4]">
              <li>"Germany",</li>
              <li>"Cologne"</li>
            </ul>
            <p>],</p>
          </div>
          <div class="block mb-4">
            <p><span class="text-[#c792ea] font-bold">"contact"</span>: {</p>
            <ul class="ml-6">
              <li><span class="text-[#c792ea] font-bold">"email"</span>: <a href="mailto:work@aaronsamuel.de" class="text-[#00d1b2] underline">"work@aaronsamuel.de"</a></li>
            </ul>
            <p>},</p>
          </div>
          <div class="block mb-4">
            <p><span class="text-[#c792ea] font-bold">"profiles"</span>: [</p>
            <ul class="ml-6 list-disc text-[#7f65d4]">
              <li><a href="https://www.linkedin.com/in/aaronsamuelhauck/" target="_blank" class="text-[#00d1b2] underline">"LinkedIn"</a>,</li>
              <li><a href="https://github.com/aaronedev/" target="_blank" class="text-[#00d1b2] underline">"GitHub"</a></li>
            </ul>
            <p>],</p>
          </div>
        </div>
      </div>

      <!-- Separator between top section and public repos -->
      <div class="w-full h-px bg-gradient-to-r from-[#c792ea] via-[#7f65d4] to-[#c792ea] my-8"></div>

      <!-- Public Repos Section -->
      <div class="block">
        <p><span class="text-[#c792ea] font-bold">"public_repos"</span>: [</p>
        <div class="ml-6 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
        </div>
        <p>]</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import RepoCard from "./components/RepoCard.vue";

export default {
  name: "App",
  components: {
    RepoCard,
  },
  data() {
    return {
      repos: [],
    };
  },
  mounted() {
    this.fetchRepos();
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
  },
};
</script>

<style scoped>
/* Additional styling for App.vue */

h2, h3 {
  font-size: 1.5em;
}

img {
  border-radius: 50%;
}

.separator {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #c792ea, #7f65d4);
}

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

<template>
  <div
    id="app"
    class="w-full"
  >
    <main class="w-full bg-[#0b0a0b] text-[#baa3ff] font-hack p-4">
      <!-- Name and Description Section -->
      <div class="block mb-8 ml-4">
        <p><span class="text-[#c792ea] font-bold">"name"</span>: <span class="text-[#7f65d4]">"Aaron-Samuel Hauck"</span>,</p>
        <p class="mt-2">
          <span class="text-[#c792ea] font-bold">"description"</span>: <span class="text-[#7f65d4]">"I'm a Web Developer and System Administrator working extensively with DevOps practices, building fast, secure, and scalable web applications."</span>
        </p>
      </div>

      <!-- Address Section -->
      <div class="block mb-8 ml-4">
        <p><span class="text-[#c792ea] font-bold">"address"</span>: [</p>
        <ul class="ml-6 list-disc text-[#7f65d4]">
          <li>"Germany",</li>
          <li>"Cologne"</li>
        </ul>
        <p>],</p>
      </div>

      <!-- Contact Section -->
      <div class="block mb-8 ml-4">
        <p><span class="text-[#c792ea] font-bold">"contact"</span>: {</p>
        <ul class="ml-6">
          <li>
            <span class="text-[#c792ea] font-bold">"email"</span>: <a
              href="mailto:work@aaronsamuel.de"
              class="text-[#00d1b2] underline"
            >"work@aaronsamuel.de"</a>
          </li>
        </ul>
        <p>},</p>
      </div>

      <!-- Profiles Section -->
      <div class="block mb-8 ml-4">
        <p><span class="text-[#c792ea] font-bold">"profiles"</span>: [</p>
        <ul class="ml-6 list-disc text-[#7f65d4]">
          <li>
            <a
              href="https://www.linkedin.com/in/aaronsamuelhauck/"
              target="_blank"
              class="text-[#00d1b2] underline"
            >"LinkedIn"</a>,
          </li>
          <li>
            <a
              href="https://github.com/aaronedev/"
              target="_blank"
              class="text-[#00d1b2] underline"
            >"GitHub"</a>
          </li>
        </ul>
        <p>],</p>
      </div>

      <!-- Public Repos Section -->
      <div class="block ml-4">
        <p><span class="text-[#c792ea] font-bold">"public_repos"</span>: [</p>
        <div class="ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RepoCard
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
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
</style>

<template>
  <div
    id="app"
    class="w-full bg-background text-text-primary"
  >
    <main class="w-full p-4">
      <!-- Top Section: Split into two columns -->
      <div class="flex flex-wrap md:flex-nowrap justify-between mb-8">
        <!-- Left Column (GitHub Profile + Favorite Repos/Gists) -->
        <div class="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
          <div class="block mb-4">
            <h2 class="text-accent-blue font-bold text-xl mb-4">
              <i class="fab fa-github mr-2" />GitHub Profile
            </h2>
            <div class="flex items-center space-x-4 mb-4">
              <img
                src="https://avatars.githubusercontent.com/u/0000000?v=4"
                alt="GitHub Profile Picture"
                class="rounded-full w-16 h-16 border-2 border-accent-purple"
              >
              <div>
                <p class="text-lg text-accent-purple">
                  Aaron-Samuel Hauck <i class="fas fa-user-circle" />
                </p>
                <p class="text-sm text-primary-cyan">
                  @aaronedev
                </p>
              </div>
            </div>
            <p class="text-text-muted mb-4">
              <i class="fas fa-code mr-1" /> Experienced Full-Stack Developer with a passion for building efficient and scalable applications. Specializing in DevOps and cloud architecture.
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
          
          <!-- Favorite Repos and Gists Section -->
          <div class="block mt-8">
            <h3 class="text-accent-blue font-bold text-lg mb-4">
              <i class="fas fa-star mr-2" />Favorite Repositories & Gists
            </h3>
            <ul class="space-y-2">
              <li
                v-for="repo in favoriteRepos"
                :key="repo.id"
              >
                <a
                  :href="repo.html_url"
                  target="_blank"
                  class="text-link underline"
                >
                  <i class="fas fa-book mr-1" />{{ repo.name }}
                </a> - <span class="text-text-lightMuted">{{ repo.description || 'No description available.' }}</span>
              </li>
              <li
                v-for="gist in favoriteGists"
                :key="gist.id"
              >
                <a
                  :href="gist.html_url"
                  target="_blank"
                  class="text-link underline"
                >
                  <i class="fas fa-code mr-1" />{{ gist.description || 'Untitled Gist' }}
                </a>
              </li>
            </ul>
          </div>
          
          <div class="block mb-4">
            <h3 class="text-accent-blue font-bold text-lg mb-4">
              <i class="fas fa-chart-line mr-2" />GitHub Stats
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-editor-background p-4 rounded-md border border-text-muted">
                <p><i class="fas fa-star mr-1 text-warning" />Total Stars Earned: 21</p>
                <p><i class="fas fa-code-branch mr-1 text-accent-purple" />Total Commits (2024): 52</p>
                <p><i class="fas fa-pull-request mr-1 text-primary-cyan" />Total PRs: 1</p>
                <p><i class="fas fa-exclamation-circle mr-1 text-warning" />Total Issues: 1</p>
                <p><i class="fas fa-project-diagram mr-1 text-link" />Contributed to (last year): 2</p>
              </div>
              <div class="bg-editor-background p-4 rounded-md text-center border border-text-muted">
                <p class="text-xl font-bold text-accent-brightBlue">
                  566
                </p>
                <p><i class="fas fa-history mr-1 text-accent-yellow" />Total Contributions</p>
                <p class="text-text-lightMuted">
                  Oct 26, 2018 - Present
                </p>
              </div>
              <div class="bg-editor-background p-4 rounded-md text-center border border-text-muted">
                <p class="text-xl font-bold text-accent-brightBlue">
                  3
                </p>
                <p><i class="fas fa-burn mr-1 text-accent-yellow" />Current Streak</p>
                <p class="text-text-lightMuted">
                  Aug 30 - Sep 1
                </p>
              </div>
              <div class="bg-editor-background p-4 rounded-md text-center border border-text-muted">
                <p class="text-xl font-bold text-accent-brightBlue">
                  24
                </p>
                <p><i class="fas fa-calendar-day mr-1 text-primary-blue" />Longest Streak</p>
                <p class="text-text-lightMuted">
                  Aug 5 - Aug 28
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column (Personal Information + Fake Shell) -->
        <div class="w-full md:w-1/2 pl-4">
          <div class="block mb-4">
            <p><span class="text-accent-purple font-bold"><i class="fas fa-user mr-1" />"name"</span>: <span class="text-accent-purple">"Aaron-Samuel Hauck"</span>,</p>
            <p class="mt-2">
              <span class="text-accent-purple font-bold"><i class="fas fa-info-circle mr-1" />"description"</span>: <span class="text-text-lightMuted">"I'm a Web Developer and System Administrator working extensively with DevOps practices, building fast, secure, and scalable web applications."</span>
            </p>
          </div>
          <div class="block mb-4">
            <p><span class="text-accent-purple font-bold"><i class="fas fa-map-marker-alt mr-1" />"address"</span>: [</p>
            <ul class="ml-6 list-disc text-accent-cyan">
              <li>"Germany",</li>
              <li>"Cologne"</li>
            </ul>
            <p>],</p>
          </div>
          <div class="block mb-4">
            <p><span class="text-accent-purple font-bold"><i class="fas fa-envelope mr-1" />"contact"</span>: {</p>
            <ul class="ml-6">
              <li>
                <span class="text-accent-purple font-bold">"email"</span>: <a
                  href="mailto:work@aaronsamuel.de"
                  class="text-primary-cyan underline"
                >"work@aaronsamuel.de"</a>
              </li>
            </ul>
            <p>},</p>
          </div>
          <div class="block mb-4">
            <p><span class="text-accent-purple font-bold"><i class="fas fa-link mr-1" />"profiles"</span>: [</p>
            <ul class="ml-6 list-disc text-accent-cyan">
              <li>
                <a
                  href="https://www.linkedin.com/in/aaronsamuelhauck/"
                  target="_blank"
                  class="text-link underline"
                ><i class="fab fa-linkedin mr-1" />"LinkedIn"</a>,
              </li>
              <li>
                <a
                  href="https://github.com/aaronedev/"
                  target="_blank"
                  class="text-link underline"
                ><i class="fab fa-github mr-1" />"GitHub"</a>
              </li>
            </ul>
            <p>],</p>
          </div>

          <!-- Fun Fake Shell Interface -->
          <div class="block mb-4 bg-editor-background p-4 rounded-lg border border-selection">
            <h3 class="text-accent-blue font-bold text-lg mb-4">
              <i class="fas fa-terminal mr-2" />Fun Fake Shell
            </h3>
            <div class="fake-shell text-terminal-cursor font-mono">
              <p><span class="shell-command">$ echo</span> <span class="shell-output">"Hello, World!"</span><span class="shell-cursor">_</span></p>
              <p><span class="shell-output">Hello, World!</span></p>
              <p><span class="shell-command">$ ls -l</span><span class="shell-cursor">_</span></p>
              <p><span class="shell-output">total 4</span></p>
              <p><span class="file-name">-rw-r--r--</span>  1 user  staff  1048576 Sep 1 12:34 <span class="file-name">README.md</span></p>
              <p><span class="file-name">-rw-r--r--</span>  1 user  staff  1048576 Sep 1 12:34 <span class="file-name">index.html</span></p>
              <p><span class="shell-command">$ git status</span><span class="shell-cursor">_</span></p>
              <p><span class="shell-output">On branch <span class="branch-name">main</span></span></p>
              <p><span class="shell-output">Your branch is up to date with 'origin/<span class="branch-name">main</span>'.</span></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Separator between top section and public repos -->
      <div class="w-full h-px bg-gradient-to-r from-accent-purple via-link to-accent-blue my-8" />

      <!-- Public Repos Section -->
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

export default {
  name: "App",
  components: {
    RepoCard,
  },
  data() {
    return {
      repos: [],
      publicRepos: 0,
      privateRepos: 0,
      favoriteRepos: [], // Array to store favorite repositories
      favoriteGists: [], // Array to store favorite gists
    };
  },
  mounted() {
    this.fetchRepos();
    this.fetchRepoCounts();
    this.fetchFavoriteRepos(); // Fetch favorite repositories
    this.fetchFavoriteGists(); // Fetch favorite gists
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
        this.privateRepos = response.data.total_private_repos || 0; // If authenticated, use total_private_repos
      } catch (error) {
        console.error("Error fetching repo counts:", error);
      }
    },
    fetchFavoriteRepos() {
      // Example favorite repos; replace with actual data fetching
      this.favoriteRepos = [
        { id: 1, name: "Repo1", html_url: "https://github.com/aaronedev/repo1", description: "My favorite repo 1" },
        { id: 2, name: "Repo2", html_url: "https://github.com/aaronedev/repo2", description: "My favorite repo 2" },
      ];
    },
    fetchFavoriteGists() {
      // Example favorite gists; replace with actual data fetching
      this.favoriteGists = [
        { id: 1, html_url: "https://gist.github.com/aaronedev/gist1", description: "Useful Gist 1" },
        { id: 2, html_url: "https://gist.github.com/aaronedev/gist2", description: "Useful Gist 2" },
      ];
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
  background: linear-gradient(to right, #7B5AFF, #2883FF, #5339FF);
}

.card {
  animation: slideUp 0.7s ease-in-out;
  border: 1px solid #5a297d; /* Border using selection-purple */
}

/* Syntax highlighting for the fake shell */
.shell-command {
  color: #02E4DC;
}

.shell-output {
  color: #00ff00;
}

.file-name {
  color: #ff79c6;
}

.branch-name {
  color: #8be9fd;
}

.shell-cursor {
  display: inline-block;
  width: 10px;
  background-color: #FF338C; /* Terminal cursor color */
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  50.01%, 100% {
    opacity: 0;
  }
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

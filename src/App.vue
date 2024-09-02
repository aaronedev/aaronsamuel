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
import { faker } from '@faker-js/faker';

export default {
  data() {
    return {
      profile: null,
      repos: [],
    };
  },
  created() {
    this.fetchFakeGitHubProfile();
    this.fetchFakeGitHubRepos();
  },
  methods: {
    fetchFakeGitHubProfile() {
      this.profile = {
        name: faker.person.fullName(),
        avatar_url: faker.image.avatar(),
        html_url: faker.internet.url(),
      };
    },
    fetchFakeGitHubRepos() {
      this.repos = Array.from({ length: 5 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        html_url: faker.internet.url(),
        stargazers_count: faker.number.int({ min: 0, max: 1000 }),
        forks_count: faker.number.int({ min: 0, max: 1000 }),
        open_issues_count: faker.number.int({ min: 0, max: 100 }),
        language: faker.helpers.arrayElement(['JavaScript', 'Python', 'Java', 'CSS', 'HTML']),
        license: { name: faker.helpers.arrayElement(['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause']) },
        updated_at: faker.date.recent(),
      }));
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

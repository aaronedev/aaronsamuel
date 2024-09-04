<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="text-center"
    >
      <div
        v-if="profile"
        class="flex flex-col items-center space-y-4"
      >
        <img
          :src="profile.avatar_url"
          :alt="profile.name"
          class="h-20 w-20 rounded-full border-2 border-purple shadow-lg"
        >
        <h2 class="font-bold text-cyan">
          <i class="fab fa-github mr-2" /> Portfolio / About
        </h2>
        <div>
          <div class="wakatime mb-2">
            <a
              href="https://wakatime.com/@018cc02c-e893-42e6-b1c7-48cb3ef3ccfe"
            >
              <img
                src="https://wakatime.com/badge/user/018cc02c-e893-42e6-b1c7-48cb3ef3ccfe.svg?style=social"
                alt="Total time coded since Dec 31 2023"
              >
            </a>
          </div>

          <p class="text-accent-cyan text-lg">
            {{ profile.name }} <i class="fas fa-user-circle" />
          </p>
          <p class="text-muted">
            <a
              :href="profile.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-600 text-sm hover:underline"
            >
              View GitHub Profile
            </a>
          </p>
        </div>

        <!-- Additional GitHub Info -->
        <div class="mt-4 text-muted text-slate-300 text-sm">
          <p>
            <i class="fas fa-users mr-1" /> Followers:
            {{ profile.followers }}
          </p>
          <p>
            <i class="fas fa-user-friends mr-1" /> Following:
            {{ profile.following }}
          </p>
          <p>
            <i class="fas fa-book mr-1" /> Public Repos:
            {{ profile.public_repos }}
          </p>
          <p>
            <i class="fas fa-code-branch mr-1" /> Public Gists:
            {{ profile.public_gists }}
          </p>
        </div>
      </div>
      <div v-else>
        <p>Loading GitHub profile...</p>
      </div>
    </div>
  </transition>

  <!-- Button to toggle visibility -->
  <button
    class="mt-4 bg-slate-800 px-4 py-2"
    @click="toggleVisibility"
  >
    Toggle Profile Section
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';

// Define reactive variables
const isVisible = ref(true);
const profile = ref(null);

// Fetch fake GitHub profile on component mount
const fetchFakeGitHubProfile = () => {
  profile.value = {
    name: faker.person.fullName(),
    avatar_url: faker.image.avatar(),
    html_url: faker.internet.url(),
    followers: faker.number.int({ min: 100, max: 10000 }),
    following: faker.number.int({ min: 10, max: 500 }),
    public_repos: faker.number.int({ min: 10, max: 200 }),
    public_gists: faker.number.int({ min: 0, max: 50 }),
  };
};

// Toggle the visibility of the profile section
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

onMounted(() => {
  fetchFakeGitHubProfile();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

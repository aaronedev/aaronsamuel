<template>
  <div>
    <h3 class="mb-2 text-lg font-bold text-yellow-300">
      Favorite Repos
    </h3>
    <ul class="space-y-2">
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="rounded-lg bg-slate-800 p-2 shadow-xl"
      >
        <a
          :href="repo.html_url"
          target="_blank"
          class="text-text-accent hover:underline"
        >
          {{ repo.name }}
        </a>
        <p class="text-sm">
          {{ repo.description }}
        </p>
        <div class="mt-1 text-xs text-muted">
          <span><i class="fas fa-star" /> {{ repo.stargazers_count }} stars</span>
          |
          <span><i class="fas fa-code-branch" /> {{ repo.forks_count }} forks</span>
          |
          <span><i class="fas fa-exclamation-circle" />
            {{ repo.open_issues_count }} issues</span>
          |
          <span>Language: {{ repo.language }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';

// Repos ref to hold the fake repository data
const repos = ref([]);

// Function to generate fake repo data
const fetchFakeRepos = () => {
  repos.value = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    html_url: faker.internet.url(),
    stargazers_count: faker.number.int({ min: 0, max: 1000 }),
    forks_count: faker.number.int({ min: 0, max: 1000 }),
    open_issues_count: faker.number.int({ min: 0, max: 100 }),
    language: faker.helpers.arrayElement([
      'JavaScript',
      'Python',
      'Java',
      'CSS',
      'HTML',
    ]),
  }));
};

onMounted(() => {
  fetchFakeRepos();
});
</script>

<style scoped>
.text-muted {
  color: #6b7280;
}
</style>

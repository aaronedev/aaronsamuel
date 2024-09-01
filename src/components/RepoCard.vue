<template>
  <div class="repo-card">
    <h2>{{ repo.name }}</h2>
    <dl>
      <dt>Stargazers</dt>
      <dd>{{ repo.stargazers_count }}</dd>
      <dt>Forks</dt>
      <dd>{{ repo.forks_count }}</dd>
      <dt>Description</dt>
      <dd>{{ repo.description || 'No description provided.' }}</dd>
      <dt>Language</dt>
      <dd>{{ repo.language || 'Not specified' }}</dd>
      <dt>Updated at</dt>
      <dd>{{ formatDateTime(repo.updated_at) }}</dd>
    </dl>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDateTime(date) {
      return moment(date).format('MMMM D, YYYY');
    },
  },
};
</script>

<style scoped>
.repo-card {
  @apply bg-white p-4 border border-gray-300 rounded-lg shadow-md mb-4;
}
.repo-card h2 {
  @apply text-lg font-bold mb-2;
}
.repo-card dl {
  @apply mb-4;
}
.repo-card dt {
  @apply font-bold mb-1;
}
.repo-card dd {
  @apply mb-1;
}
</style>
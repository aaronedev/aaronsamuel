<template>
  <div>
    <FormattedJson
      v-if="isValidJson(yourJsonData)"
      :data="yourJsonData"
    />
    <RepoCard
      v-for="repo in repos"
      :key="repo.id"
      :repo="repo"
    />
  </div>
</template>

<script>
import axios from 'axios';
import FormattedJson from './components/FormattedJson.vue';
import RepoCard from './components/RepoCard.vue';

export default {
  name: 'App',
  components: {
    RepoCard,
    FormattedJson,
  },
  data() {
    return {
      repos: [],
      yourJsonData: {}, // Replace with your actual JSON data
    };
  },
  mounted() {
    axios.get('https://api.github.com/users/aaronedev/repos')
      .then(response => {
        this.repos = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    isValidJson(data) {
      try {
        JSON.parse(JSON.stringify(data));
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
<template>
  <div
    id="app"
    class="w-full text-text-primary"
  >
    <main class="mt-20 p-4">
      <NavBar />
      <ParticlesComponent />
      <ProfileSection
        :profile="profile"
        :repos="repos"
      />
      <RepoSection :repos="repos" />
      <AppFooter />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ProfileSection from './components/ProfileSection.vue';
import RepoSection from './components/RepoSection.vue';
import AppFooter from './components/AppFooter.vue';
import ParticlesComponent from './components/ParticlesComponent.vue';

export default {
  components: {
    NavBar,
    AppFooter,
    ParticlesComponent,
    ProfileSection,
    RepoSection,
  },
};
</script>

<style scoped></style>

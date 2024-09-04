<template>
  <div
    id="app"
    class="text-text-primary flex min-h-screen flex-col items-center justify-center bg-background"
  >
    <main class="mt-20 p-4">
      <NavBar />
      <ParticlesComponent />
      <ProfileSection
        :profile="profile"
        :repos="repos"
      />
      <FavoriteRepos :repos="repos" />
      <AppFooter />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ProfileSection from './components/ProfileSection.vue';
import FavoriteRepos from './components/FavoriteRepos.vue';
import AppFooter from './components/AppFooter.vue';
import ParticlesComponent from './components/ParticlesComponent.vue';

export default {
  components: {
    NavBar,
    AppFooter,
    ParticlesComponent,
    ProfileSection,
    FavoriteRepos,
  },
};
</script>

<style scoped></style>

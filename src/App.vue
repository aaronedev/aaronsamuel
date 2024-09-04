<template>
  <div
    id="app"
    class="flex min-h-screen flex-col items-center justify-center bg-background text-base"
  >
    <main class="container mx-auto mt-20 w-full max-w-4xl p-4">
      <NavBar />
      <ParticlesComponent />
      <ProfileSection
        :profile="profile"
        :repos="repos"
      />
      <hr class="my-6 border-t border-gray-300">
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

<template>
	<div id="app" class="w-full bg-background text-text-primary">
		<main class="mt-20 w-full p-4">
			<!-- NavBar -->
			<NavBar @toggle-theme="toggleTheme" />
			<!-- Centered Section -->
			<div class="flex flex-col items-center justify-center space-y-8">
				<!-- GitHub Profile -->
				<div class="w-full max-w-lg text-center">
					<div v-if="profile" class="flex flex-col items-center space-y-4">
						<img
							:src="profile.avatar_url"
							:alt="profile.name"
							class="h-20 w-20 rounded-full border-2 border-accent-purple shadow-lg"
						/>
						<h2 class="text-xl font-bold text-accent-blue">
							<i class="fab fa-github mr-2" /> GitHub Profile
						</h2>
						<div>
							<p class="text-lg text-accent-purple">
								{{ profile.name }} <i class="fas fa-user-circle" />
							</p>
							<p class="text-muted">
								<a
									:href="profile.html_url"
									target="_blank"
									rel="noopener noreferrer"
									class="hover:underline"
								>
									View GitHub Profile
								</a>
							</p>
						</div>
						<!-- Additional GitHub Info -->
						<div class="text-muted mt-4 text-sm">
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

				<!-- Favorite Repos -->
				<div class="mt-10 w-full max-w-lg text-left">
					<h2 class="mb-4 text-xl font-bold text-accent-blue">
						<i class="fas fa-star mr-2" /> Favorite Repositories
					</h2>
					<ul class="space-y-4">
						<li v-for="repo in repos" :key="repo.id">
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
		</main>
		<!-- Footer Component -->
		<Footer />
	</div>
</template>

<script>
import { faker } from "@faker-js/faker";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
	components: {
		NavBar,
		Footer,
	},
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
				followers: faker.number.int({ min: 100, max: 10000 }),
				following: faker.number.int({ min: 10, max: 500 }),
				public_repos: faker.number.int({ min: 10, max: 200 }),
				public_gists: faker.number.int({ min: 0, max: 50 }),
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
				language: faker.helpers.arrayElement([
					"JavaScript",
					"Python",
					"Java",
					"CSS",
					"HTML",
				]),
				license: {
					name: faker.helpers.arrayElement([
						"MIT",
						"Apache-2.0",
						"GPL-3.0",
						"BSD-2-Clause",
					]),
				},
				updated_at: faker.date.recent(),
			}));
		},
	},
};
</script>

<style scoped>
#app {
	padding: 0.5em;
	animation: slideUp 0.5s ease-in-out;
}
</style>

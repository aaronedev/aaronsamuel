<script lang="ts">
	import { LightSwitch, Avatar } from '@skeletonlabs/skeleton';
	
	const profile = {
		name: "Aaron",
		description: "📌 I basically have sudo rights in real life </br>🚀 Working on Violet Void Theme </br>⚙️ I .config basically anything to make dope stuff.",
		location: "Cologne, Germany",
		website: "https://aar.one",
		linkedin: "https://linkedin.com/in/aaronsamuelhauck",
		steam: "https://steamcommunity.com/sharedfiles/filedetails/?id=3147664564",
		avatarUrl: "https://avatars.githubusercontent.com/u/your-user-id",  // Replace with your actual avatar URL
	};
	const socialLinks = [
		{ name: "Website", url: profile.website, icon: "🌐" },
		{ name: "LinkedIn", url: profile.linkedin, icon: "🔗" },
		{ name: "Steam", url: profile.steam, icon: "🎮" },
	];
	const featuredProjects = [
		{
			name: 'Violet Void Theme 🟣',
			description:
				'A dark, elegant theme that unifies your digital workspace across code editors, Windows Terminal, Windows 11, and more.',
			link: 'https://github.com/Violet-Void-Theme'
		},
		{
			name: 'aaronsamuel',
			description: 'Personal contact webpage.',
			link: 'https://github.com/aaronedev/aaronsamuel'
		},
		{
			name: 'violet-void-theme',
			description:
				'Violet Void features a rich violet palette, subtle glowing effects, custom icons, and more.',
			link: 'https://github.com/aaronedev/violet-void-theme'
		}
	];
</script>

<LightSwitch class="mx-auto" />

<div class="p-4 text-center">
	<div class="container mx-auto p-8 max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-8">
		<img
			src={profile.avatarUrl}
			alt="{profile.name}'s profile picture"
			class="w-32 h-32 rounded-full mx-auto border-4 border-primary-500 dark:border-primary-400"
		/>
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
		<p class="text-gray-700 dark:text-gray-300">{profile.description}</p>
		<p class="text-gray-500 dark:text-gray-400 italic">{profile.location}</p>

		<section class="flex justify-center space-x-4">
			{#each socialLinks as link}
				<a
					href={link.url}
					class="btn variant-filled-primary flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-500 transition"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>{link.icon}</span>
					<span>{link.name}</span>
				</a>
			{/each}
		</section>
	</div>
</div>

<style>
	.profile-card {
		background-color: var(--color-bg);
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
	}
	.profile-details h1 {
		margin-bottom: 0.5rem;
	}
	.profile-details p {
		margin-bottom: 1rem;
		color: var(--color-text-secondary);
	}
	.social-links a {
		margin: 0 0.5rem;
		color: var(--color-primary);
		text-decoration: none;
	}
	.featured-projects {
		margin-top: 2rem;
	}
	.featured-projects h2 {
		margin-bottom: 1rem;
	}
	.project-card {
		margin-bottom: 1rem;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background-color: var(--color-bg-secondary);
	}
	.project-card a {
		color: var(--color-link);
		font-weight: bold;
	}
</style>

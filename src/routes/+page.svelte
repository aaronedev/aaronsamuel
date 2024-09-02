<script lang="ts">
	import { AppShell, AppBar, LightSwitch, Avatar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<AppBar class="bg-primary-50">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		(title)
		<svelte:fragment slot="trail">(actions)</svelte:fragment>
	</AppBar>

	<LightSwitch class="mx-auto" />

	<div class="p-4 text-center">
		<div class="bg-warning-400 dark:bg-warning-500"></div>

		<div class="container mx-auto p-8 space-y-8">
			<Avatar
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				width="w-32"
				rounded="rounded-2xl"
				class="mx-auto"
			/>
			<h1 class="h1">Hello Skeleton</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<section>
				<a class="btn variant-filled-primary" href="https://kit.svelte.dev/">SvelteKit</a>
				<a class="btn variant-filled-secondary" href="https://tailwindcss.com/">Tailwind</a>
				<a class="btn variant-filled-tertiary" href="https://github.com/">GitHub</a>
			</section>
		</div>
	</div>
</AppShell>

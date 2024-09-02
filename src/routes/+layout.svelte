<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	// Highlight JS and other imports
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	import { onMount } from 'svelte';
	onMount(() => {
		hljs.highlightAll();
	});
</script>

<AppShell>
	<AppBar class="bg-primary-50">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		(title)
		<svelte:fragment slot="trail">(actions)</svelte:fragment>
	</AppBar>

	<slot></slot>
</AppShell>

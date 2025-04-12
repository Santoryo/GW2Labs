<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		// This is a workaround to ensure that the page is not reloaded when navigating to the same page
		console.log(page.url.pathname);
	});
</script>

{#if page.url.pathname != "/widget"}
	mammia mia
	{@render children()}
{:else}
	{@render children()}
{/if}


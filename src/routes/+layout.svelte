<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
	});
</script>

{#if page.url.pathname != "/widget"}
	{@render children()}
{:else}
	{@render children()}
{/if}


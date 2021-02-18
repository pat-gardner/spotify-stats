<script context="module">
	export async function preload(page, { authenticated }) {
		if(!authenticated) return
	}
</script>

<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}
</style>

<script>
	import { stores } from '@sapper/app'
	const { session } = stores()

	export let currentlyPlaying = 'something unknown'
</script>

<svelte:head>
	<title>Spotify Stats</title>
</svelte:head>

<h1>Hello!</h1>

{#if $session.authenticated}
	<p>Welcome back! You are playing {currentlyPlaying}</p>
{:else}
	<p>Please <a href="/auth/login">log in</a></p>
{/if}
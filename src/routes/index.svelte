<script context="module">
	export async function preload(page, { authenticated }) {
		if(!authenticated) return

		const res = await this.fetch('/spotify/currentlyPlaying')
		if (!res.ok) return

		const item = await res.json()
		if (!item) return
		
		return {
			track: item.name,
			artist: item.artists && item.artists[0].name
		}
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

	export let track
	export let artist
</script>

<svelte:head>
	<title>Spotify Stats</title>
</svelte:head>

<h1>Hello!</h1>

{#if $session.authenticated}
	<p>Welcome back! {track ? 
		`You are playing ${track}${artist ? ` by ${artist}` : ''}!`
		: "You aren't playing anything"}</p>
{:else}
	<p>Please <a href="/auth/login">log in</a></p>
{/if}
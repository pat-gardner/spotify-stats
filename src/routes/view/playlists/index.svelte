<script context='module'>
    export async function preload(page, { spotify }) {
        if (!spotify) {
            return this.redirect(302, '/')
        }

        const res = await this.fetch('/spotify/playlists')
        if (!res.ok) return

        const playlists = await res.json()
        if (!playlists) return

        return { playlists }
    }
</script>

<script>
    export let playlists
</script>

<svelte:head>
    <title>Your playlists | Spotify Stats</title>
</svelte:head>

<ul>
    {#each playlists as { name, id } (id)}
        <li>
            <a href='/view/playlists/{id}'>{name}</a>
        </li>
    {/each}
</ul>

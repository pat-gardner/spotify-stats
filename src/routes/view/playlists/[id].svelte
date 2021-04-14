<script context='module'>
    // Get the tracks in a playlist and show some stats
    export async function preload({ params: { id } }, { spotify }) {
        if (!spotify) {
            return this.redirect(302, '/')
        }

        const res = await this.fetch(`/spotify/playlists/${id}`)
        if (!res) return

        const { name, tracks} = await res.json()
        if (!name || !tracks) return

        return { name, tracks }
    }
</script>

<script>
    export let name
    export let tracks

    const featureNames = ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'time_signature']
    
    const avgFeatures = {}
    featureNames.forEach(name => {
        avgFeatures[name] = tracks.reduce((total, next) => total + next.features[name], 0) / tracks.length
    })

    const avgPop = tracks.reduce((total, next) => total + next.popularity, 0) / tracks.length
</script>

<svelte:head>
    <title>{name} | Spotify Stats</title>
</svelte:head>

<h2>Some stats about {name}</h2>
<p>It contains {tracks.length} tracks</p>
<p>The average popularity is {avgPop.toFixed(0)} out of 100</p>
<h3>Detailed stats</h3>
<ul>
    {#each Object.entries(avgFeatures) as [feature, value]}
        <li>Average {feature}: {value.toFixed(3)}</li>
    {/each}
</ul>
import { spotifyFactory } from 'spotify-utils'

/**
 * Get a list of the tracks in playlist by playlist ID
 * @returns the name of the playlist and an array of tracks
 */
export async function get(req, res) {
    const spotify = await spotifyFactory(req.session.spotify)

    const playlistId = req.params.id

    // TODO: paging
    const playlist = await spotify.getPlaylist(playlistId, {
        fields: 'name,tracks.items(added_at,track(artists(name),duration_ms,id,name,popularity))'
    })

    const ids = playlist.body.tracks.items.map(item => item.track.id)
    const features = await spotify.getAudioFeaturesForTracks(ids)
    // The audio features are returned in order requested so zip them
    // together with the matching tracks
    const tracks = playlist.body.tracks.items.map(({
        added_at, 
        track: {
            artists,
            duration_ms,
            name,
            popularity
        }}, i) => {
        return {
            added_at,
            artists,
            duration_ms,
            features: features.body.audio_features[i],
            name,
            popularity
        }
    })

    const name = playlist.body.name

    res.end(JSON.stringify({ name, tracks} ))
}
/* 
Request fields
tracks.items(
    added_at,
    track(
        duration_ms,
        id,
        name,

    )
)

Response fields
data.body.tracks.items
    added_at
    track
        duration_ms
        id
        name
        popularity
        
*/
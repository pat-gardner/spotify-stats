import { spotifyFactory } from 'spotify-utils'

/**
 * Get a list of the tracks in playlist by playlist ID
 * @returns an array of tracks
 */
export async function get(req, res) {
    const spotify = await spotifyFactory(req.session.spotify)

    const playlistId = req.params.id

    // TODO: real field limits, paging
    const data = await spotify.getPlaylist(playlistId)
    // const data = await spotify.getPlaylist(playlistId, {
    //     fields: 'tracks.items(added_at,track(duration_ms,id,name))'
    // })

    res.end(JSON.stringify(data.body.tracks))
}
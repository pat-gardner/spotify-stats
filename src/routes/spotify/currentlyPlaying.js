import { spotifyFactory } from 'spotify-utils'

/**
 * Get the track the user is currently playing
 * @returns track metadata about the current song
 */
export async function get(req, res) {
    const spotify = await spotifyFactory(req.session.spotify)

    const data = await spotify.getMyCurrentPlayingTrack()

    res.end(JSON.stringify(data.body.item))

}
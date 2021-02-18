import { spotifyFactory } from 'spotify-utils'

export async function get(req, res) {
    if (!req.session.spotify) {
        req.statusCode = 401
        req.end('Please log in first')
    }
    const spotify = await spotifyFactory(req.session.spotify)

    const data = await spotify.getMyCurrentPlayingTrack()

    res.end(JSON.stringify(data.body.item))

}
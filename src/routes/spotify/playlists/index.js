import { spotifyFactory } from 'spotify-utils'

/**
 * Get a list of the current user's playlists
 * @returns an array of playlists, containing their name and ID
 */
export async function get(req, res) {
    const spotify = await spotifyFactory(req.session.spotify)

    // TODO: paging
    const data = await spotify.getUserPlaylists()
    const playlists = data.body.items.map(({ name, id, image }) => {
        return {
            name,
            id
        }
    })
    res.end(JSON.stringify(playlists))
}

// Get a list of playlists and their ids, then we can use the id and 
// call the get playlist endpoint to get a list of tracks
// Track list contains popularity and IDs. Pass IDs to get audio features
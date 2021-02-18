import { requiredScopes, simpleSpotifyFactory } from 'spotify-utils'
import crypto from 'crypto-random-string'

export async function get(req, res) {
    const spotify = simpleSpotifyFactory()

    const state = crypto({ length: 30, type: 'url-safe' })
    req.session.state = state

    res.writeHead(302, { Location: spotify.createAuthorizeURL(requiredScopes, state) })
    res.end()
}
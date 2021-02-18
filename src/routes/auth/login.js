import { simpleSpotifyFactory } from 'spotify-utils'
import crypto from 'crypto-random-string'

export async function get(req, res) {
    const spotify = simpleSpotifyFactory()
    const scopes = []

    const state = crypto({ length: 30, type: 'url-safe' })
    req.session.state = state

    res.writeHead(302, { Location: spotify.createAuthorizeURL(scopes, state) })
    res.end()
}
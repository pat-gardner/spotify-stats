import { simpleSpotifyFactory } from 'spotify-utils'

export async function get(req, res) {
    const { code, state } = req.query // TODO: handle request.query.error

    if(state !== req.session.state) {
        res.statusCode = 401
        res.end()
    }

    const spotify = simpleSpotifyFactory()

    const data = await spotify.authorizationCodeGrant(code)

    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + data.body['expires_in'])

    req.session.spotify = {
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token'],
        expires
    }

    res.writeHead(302, { Location: '/' })
    res.end()
}
export async function get(req, res) {
    req.session.spotify = undefined

    res.writeHead(302, { Location: '/' })
    res.end()
}
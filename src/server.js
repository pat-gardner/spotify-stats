import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import * as sapper from '@sapper/server';

import env from 'dotenv-safe'
env.config()

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = sessionFileStore(session)

polka()
	.use(session({
		secret: process.env.SESSION_SECRET, // TODO
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 365 * 24 * 60 * 60 * 1000 // One year
		},
		store: new FileStore()
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => {
				return {
					authenticated: req.session && req.session.spotify
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

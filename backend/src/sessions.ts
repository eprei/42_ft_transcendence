import * as session from 'express-session'
import * as crypto from 'crypto'

const generateSessionSecret = () => {
    const secretLength = 32 // Secret length in bytes
    return crypto.randomBytes(secretLength).toString('hex')
}

export default session({
    secret: generateSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        sameSite: 'lax',
        httpOnly: true,
        secure: false,
        path: '/',
    },
})

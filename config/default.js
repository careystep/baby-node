export default {
    dburl: 'mongodb://localhost:27017/shop',
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure:   false,
            maxAge:   3 * 24 * 60 * 60,
        }
    }
}
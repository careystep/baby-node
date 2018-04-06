'use strict';

import user from './user';
import admin from './admin';
import shop from './shop';

const appRouter = (app) => {
    app.use('/user', user);
    app.use('/admin', admin);
    app.use('/shop', shop);
}

export default appRouter;
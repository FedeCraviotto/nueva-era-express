const db = require('../database/models');

async function userLoggedValidator(req, res, next) {
    res.locals.isLogged = false;
    res.locals.isAdmin = false;
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        if (res.locals.isLogged && req.session.userLogged.type_id == '1') {
            res.locals.isAdmin = true;
        }
        next();
    } else if (req.cookies.userEmail) {
        const emailInCookie = req.cookies.userEmail;

        // buscamos en nuestra db
        const userFromCookie = await db.User.findOne({
            where: {email : emailInCookie}
        });
        res.locals.isLogged = true;
        req.session.userLogged = userFromCookie;
        res.locals.userLogged = userFromCookie;

        if (res.locals.isLogged && userFromCookie.type_id == '1') {
            res.locals.isAdmin = true;
        }

        next();
    } else {
        next();
    }
}

module.exports = userLoggedValidator;

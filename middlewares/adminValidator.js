function onlyAdminMiddleware (req, res, next) {
    if (res.locals.isAdmin == false) {
        res.render('404', { title : 'Houston we have an error'});
    } else {
        next()
    }
}
module.exports = onlyAdminMiddleware

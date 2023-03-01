let contactController = {
    show : (req, res) => {
        res.render('contact', {contactFormValidator: true});
    }
}
module.exports = contactController;
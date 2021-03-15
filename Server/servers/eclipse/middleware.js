function middleware(req, res) {
    // X-Powered-By header
    // A: Why is it an ASCII char array? To hopefully deter CTRL+SHIFT+Fs of "Rboxlo"
    // B: Why is "Rboxlo" hardcoded here? Because Rboxlo is the application powering it
    if (global.rboxlo.env.SERVER_X_POWERED_BY) {
        let poweredBy = [ 82, 98, 111, 120, 108, 111, 47, 49, 46, 48, 46, 48 ] // "Rboxlo/1.0.0"
        res.setHeader("X-Powered-By", String.fromCharCode.apply(null, poweredBy))
    }
}

// Don't modify this
module.exports.obj = ((req, res, next) => {
    middleware(req, res)
    next()
})
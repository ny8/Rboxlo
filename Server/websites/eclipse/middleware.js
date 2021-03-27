const moment = require("moment")

const path = require("path")

const util = require(path.join(global.rboxlo.root, "util"))
const user = require(path.join(__dirname, "lib", "user"))

async function middleware(req, res) {
    req.rboxlo = {}
    req.session.rboxlo = {}
    req.session.rboxlo.bust = moment().unix() // resets contents each page req

    // X-Powered-By header
    // A: Why is it an ASCII char array? To hopefully deter CTRL+SHIFT+Fs of "Rboxlo"
    // B: Why is "Rboxlo" hardcoded here? Because Rboxlo is the application powering it
    if (global.rboxlo.env.SERVER_X_POWERED_BY) {
        let poweredBy = [ 82, 98, 111, 120, 108, 111, 47, 49, 46, 48, 46, 48 ] // "Rboxlo/1.0.0"
        res.setHeader("X-Powered-By", String.fromCharCode.apply(null, poweredBy))
    }

    // Get IP and store in req.rboxlo.ip
    let realip = req.connection.remoteAddress.trim()
    if (realip.startsWith("::ffff:")) realip = realip.slice(7)

    if (req.headers["http_cf_connecting_ip"] && global.rboxlo.env.SERVER_CLOUDFLARE) {
        let cfip = req.headers["http_cf_connecting_ip"].trim()
        req.rboxlo.ip = ((realip != cfip) ? cfip : realip)
    } else {
        req.rboxlo.ip = realip
    }

    // Session security
    if (!req.session.rboxlo.ip) {
        req.session.rboxlo.ip = req.rboxlo.ip
    } else {
        if (req.session.rboxlo.ip !== req.rboxlo.ip) {
            // Clear the session if different IP
            req.session.rboxlo = {}
            req.session.rboxlo.ip = req.rboxlo.ip
        }
    }
    
    // Remember me
    if (req.cookies.remember_me && !req.session.rboxlo.user) {
        let verified = await user.verifyLongTermSession(req.cookies.remember_me)

        if (verified !== false) {
            let info = await user.getNecessarySessionInfoForUser(verified)
            req.session.rboxlo.user = info
        } else {
            // crumbs of a cookie, sweep it up
            res.clearCookie("remember_me")
        }
    }

    // Non-sensitive session details for view engine
    // FYI: Session NEVER gets changed besides at registration and sign-in, so we only do this once (or at least try to-- these are set once per request)
    if (req.session.rboxlo.user && !res.locals.session) {
        res.locals.session = {
            id: req.session.rboxlo.user.id,
            username: req.session.rboxlo.user.username
        }
    }
}

// Don't modify this
module.exports = {obj: ((req, res, next) => {
    middleware(req, res)
    next()
})}
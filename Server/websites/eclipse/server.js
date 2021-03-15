const express = require("express")
const exphbs = require("express-handlebars")
const layouts = require("handlebars-layouts")
const path = require("path")
const hbh = require("./helpers")
const util = require("../../util")

let app = express()

// Static resources (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, "public")))

// Expose some non-sensitive environment variables to the view engine
app.locals.env = {
    NAME: global.rboxlo.env.NAME,
    PROPER_NAME: util.titlecase(global.rboxlo.env.NAME),
    VERSION: util.getVersion(),
    DOMAIN: global.rboxlo.env.SERVER_DOMAIN,
    PROPER_DOMAIN: `${global.rboxlo.env.SERVER_HTTPS ? "https://" : "http://"}${global.rboxlo.env.SERVER_DOMAIN}`,
    DSR: (global.rboxlo.env.PRODUCTION ? ".min" : "") // "Debug Static Resource"
}

// Set up view engine
let hbs = exphbs.create({ helpers: hbh, extname: ".hbs" })

hbs.handlebars.registerHelper(layouts(hbs.handlebars))
hbs.handlebars.registerPartial("partials/layout", "{{prefix}}")

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.disable("x-powered-by") // Disable "Express" in X-Powered-By

// Use our Rboxlo middleware
app.use(require("./middleware").obj)

// Routes
app.use(require("./routes"))

module.exports.app = app
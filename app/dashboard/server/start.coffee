connect = require "connect"
Vein = require "vein"
mongo = require "./lib/mongo"
config = require './config'

# Web server
webServer = connect()
#webServer.use connect.responseTime()
webServer.use connect.favicon()
#webServer.use connect.limit config.images.maxsize
webServer.use connect.staticCache()
webServer.use connect.static app.paths.public
webServer.use connect.static config.images.location
webServer.use connect.multipart
  uploadDir: config.images.location
  limit: config.images.maxsize
  keepExtensions: true

server = webServer.listen config.app.port

# Vein
global.vein = new Vein server
global.vein.addFolder app.paths.services

console.log "Server started on #{config.app.port}"
console.log "Using database #{config.mongo.host}"
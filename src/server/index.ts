import fastify, { type FastifyReply, type FastifyRequest } from "fastify"
import fastifyCache, { fastifyCaching } from '@fastify/caching'
import * as dotenv from "dotenv"
import definedRoutes from "./routes"

dotenv.config()

const sbbApp = fastify({
  logger: true,
})

const basePrefix = process.env.BASE_PREFIX

if (basePrefix && !(basePrefix?.startsWith("/"))) {
  throw new Error(`BASE_PREFIX should start with "/"`)
}

const env_originURL = process.env.ORIGIN_PRODUCTION_URL

// Entry point
sbbApp.addHook("onSend", (request, reply, payload, done) => {
  if (env_originURL) {
    reply
      .header("Access-Control-Allow-Origin", env_originURL || "http://localhost:3000")
      .header("Access-Control-Allow-Methods", "GET")

    done()
    return
  }

  reply
    .header("Access-Control-Allow-Methods", "GET")

  done()
  return
})

sbbApp.register(fastifyCache, {
  privacy: fastifyCaching.privacy.PUBLIC,
  expiresIn: 48 * 60
})

sbbApp.register(definedRoutes, { prefix: basePrefix ?? "/" })

sbbApp.listen((err) => {
  if (err) {
    sbbApp.log.error(`There's an oopsie: ${err}`)
    process.exit(1)
  }
})

export default async (req: FastifyRequest, res: FastifyReply) => {
  await sbbApp.ready()
  sbbApp.server.emit("request", req, res)
}
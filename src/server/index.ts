import fastify from "fastify"
import fastifyCache, { fastifyCaching } from '@fastify/caching'
import * as dotenv from "dotenv"
import definedRoutes from "./routes"

const app = async () => {
  dotenv.config()

  const server = await fastify({
    logger: true,
  })

  const basePrefix = process.env.BASE_PREFIX

  if (basePrefix && !(basePrefix?.startsWith("/"))) {
    throw new Error(`BASE_PREFIX should start with "/"`)
  }

  // Entry point
  server.addHook("onSend", (request, reply, payload, done) => {
    reply
      .header("Access-Control-Allow-Origin", process.env.ORIGIN_PRODUCTION_URL || "http://localhost:3000")
      .header("Access-Control-Allow-Methods", "GET")

    done()
  })

  server.register(fastifyCache, {
    privacy: fastifyCaching.privacy.PUBLIC,
    expiresIn: 48 * 60
  })

  server.register(definedRoutes, { prefix: basePrefix ?? "/" })

  server.listen(
    {
      port: Number(process.env.SERVER_PORT) || 4000,
      host: process.env.SERVER_HOST || "localhost",
    },
    (err) => {
      if (err) {
        server.log.error(`There's an oopsie: ${err}`)
        process.exit(1)
      }
    }
  )
}

app()

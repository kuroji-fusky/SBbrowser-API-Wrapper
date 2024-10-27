import type { FastifyInstance, FastifyReply, HTTPMethods, RouteHandlerMethod } from "fastify"
import { rootRoute } from "./root"
import { useridRoute } from "./userid"
import { usernameRoute } from "./username"
import { uuidRoute } from "./uuid"
import { videoRoute } from "./video"
import { vipUsersRoute } from "./vipUsers"

const supportedMethods: HTTPMethods[] = ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]

// @ts-expect-error Request type not needed for this handler
async function methodNotAllowed(_, reply: FastifyReply) {
  return reply.code(405).send({
    message: "Method not allowed; all endpoints are GET requests only."
  })
}

export default async function definedRoutes(fastify: FastifyInstance) {
  const handleRoute = (url: string, handler: Function) => {
    fastify.get(url, handler as RouteHandlerMethod)

    if (url.includes(":")) {
      const [baseUrl, dynamicUrlParam] = url.split(":")

      const baseUrlStripped = baseUrl.slice(0, baseUrl.length - 1)

      fastify.get(baseUrl, async (_, reply: FastifyReply) => {
        return reply.code(400).send({
          message: `"${dynamicUrlParam}" is required`
        })
      })

      fastify.get(baseUrlStripped, async (_, reply: FastifyReply) => {
        return reply.code(400).send({
          message: `"${baseUrlStripped}" is a dynamic route and its route parameter of "${dynamicUrlParam}" is required.`
        })
      })

      fastify.route({
        url: baseUrlStripped,
        method: supportedMethods,
        handler: methodNotAllowed
      })
    }

    // Attach to all supported methods and send HTTP 405
    fastify.route({
      url,
      method: supportedMethods,
      handler: methodNotAllowed
    })
  }

  handleRoute("/", rootRoute)
  handleRoute("/vip-users", vipUsersRoute)

  handleRoute("/video/:id", videoRoute)
  handleRoute("/uuid/:uuid", uuidRoute)
  handleRoute("/userid/:userid", useridRoute)
  handleRoute("/username/:username", usernameRoute)
}
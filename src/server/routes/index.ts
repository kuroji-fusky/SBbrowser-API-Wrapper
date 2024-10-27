import type { FastifyInstance, RouteHandlerMethod } from "fastify"
import { rootRoute } from "./root"
import { useridRoute } from "./userid"
import { usernameRoute } from "./username"
import { uuidRoute } from "./uuid"
import { videoRoute } from "./video"
import { vipUsersRoute } from "./vipUsers"
import { methodNotAllowedMsg } from "./methodNotAllowedMsg"

const definedRoutes = async (fastify: FastifyInstance) => {
  const handleGetRoute = (url: string, handler: Function) => {
    fastify.get(url, handler as RouteHandlerMethod)

    fastify.route({
      method: ["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "COPY", "HEAD", "LOCK", "MOVE", "MKCALENDAR", "REPORT"],
      url,
      handler: methodNotAllowedMsg
    })
  }

  handleGetRoute("/", rootRoute)

  handleGetRoute("/vip-users", vipUsersRoute)

  handleGetRoute("/video/:id", videoRoute)

  handleGetRoute("/uuid/:uuid", uuidRoute)

  handleGetRoute("/userid/:userid", useridRoute)
  handleGetRoute("/username/:username", usernameRoute)
}

export default definedRoutes

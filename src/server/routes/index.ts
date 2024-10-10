import type { FastifyInstance } from "fastify"
import { rootRoute } from "./root"
import { useridRoute } from "./userid"
import { usernameRoute } from "./username"
import { uuidRoute } from "./uuid"
import { videoRoute } from "./video"
import { vipUsersRoute } from "./vipUsers"

const definedRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", rootRoute)
  fastify.get("/video/:id", videoRoute)

  fastify.get("/uuid/:uuid", uuidRoute)

  fastify.get("/userid/:userid", useridRoute)
  fastify.get("/username/:username", usernameRoute)

  fastify.get("/vip-users", vipUsersRoute)
}

export default definedRoutes

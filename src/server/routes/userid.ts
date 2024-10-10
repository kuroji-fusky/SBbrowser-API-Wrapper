import type { FastifyReply, FastifyRequest } from "fastify"
import type { QueryParams } from "../../types"

interface UserIDRequestRoute {
  Params: {
    userid: string
  },
  Querystring: Omit<QueryParams, "userid">
}

export async function useridRoute(request: FastifyRequest<UserIDRequestRoute>, reply: FastifyReply) {

}

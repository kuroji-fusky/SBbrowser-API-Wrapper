import { FastifyReply, FastifyRequest } from "fastify"
import { QueryParams } from "../../types"

export async function rootRoute(request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) {
  return reply.code(200).send({
    ping: "ok",
  })
}

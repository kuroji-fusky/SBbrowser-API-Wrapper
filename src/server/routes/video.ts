import type { FastifyReply, FastifyRequest } from "fastify"
import type { QueryParams } from "../../types";

interface VideoRequestRoute {
  Params: {
    id: string
  },
  Querystring: Omit<QueryParams, "videoid">
}

export async function videoRoute(request: FastifyRequest<VideoRequestRoute>, reply: FastifyReply) {
  const { id } = request.params

  return reply.code(200).send({
    id
  })
}

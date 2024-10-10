import { FastifyReply, FastifyRequest } from "fastify"

export async function rootRoute(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(200).send({
    message: "hi"
  })
}

import type { FastifyReply } from "fastify"

export async function vipUsersRoute(_: any, reply: FastifyReply) {
  return reply.code(200).send(["a user"])
}

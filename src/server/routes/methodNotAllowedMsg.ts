import type { FastifyReply } from "fastify"

// @ts-expect-error Request type not needed for this handler
export async function methodNotAllowedMsg(_, reply: FastifyReply) {
  return reply.code(405).send({
    message: "Method not allowed; all endpoints are GET requests only."
  })
}

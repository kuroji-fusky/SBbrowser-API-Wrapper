import type { FastifyReply, FastifyRequest } from "fastify";

interface UUIDRequestRoute {
  Params: {
    username: string;
  };
}

export async function uuidRoute(
  request: FastifyRequest<UUIDRequestRoute>,
  reply: FastifyReply,
) {}

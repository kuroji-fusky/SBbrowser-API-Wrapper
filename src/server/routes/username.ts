import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryParams } from "../../types";

interface UsernameRequestRoute {
  Params: {
    username: string;
  };
  Querystring: Omit<QueryParams, "userid">;
}

export async function usernameRoute(
  request: FastifyRequest<UsernameRequestRoute>,
  reply: FastifyReply,
) {}

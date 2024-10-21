import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryParams } from "../../types";

export async function rootRoute(
  request: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply,
) {
  return reply.code(200).send({
    ping: "ok",

    video_id_endpoint: "/video/{id}",
    uuid_endpoint: "/uuid/{uuid}",
    userid_endpoint: "/userid/{userid}",
    username_endpoint: "/username/{username}",
    vip_users_endpoint: "/vip-users",
  });
}

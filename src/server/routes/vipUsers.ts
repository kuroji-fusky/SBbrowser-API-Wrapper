import type { FastifyReply } from "fastify";
import { SB_BASE_URL } from "../../constants";

export async function vipUsersRoute(_: any, reply: FastifyReply) {
  const vipUserReq = await fetch(`${SB_BASE_URL}/database/vipUsers.csv`);

  if (!vipUserReq.ok) {
    return reply.code(vipUserReq.status).send({
      message: "There's an oopsie on SBbrowser's end",
      statusCode: vipUserReq.status,
    });
  }

  const vipUserIDText = await vipUserReq.text();
  const vipUserArray = vipUserIDText.trim().split("\n").slice(1);

  const vipUserIDs = vipUserArray.map((i) => ({
    id: i,
    url: `${SB_BASE_URL}/userid/${i}`,
  }));

  return reply.code(200).send({ userID: vipUserIDs });
}

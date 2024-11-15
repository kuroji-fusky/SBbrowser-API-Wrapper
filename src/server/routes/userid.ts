import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryParams } from "../../types";
import { SB_BASE_URL } from "../../constants";
import { loadUrl, parseTableData } from "../scraper";

interface UserIDRequestRoute {
  Params: {
    userid: string;
  };
  Querystring: Omit<QueryParams, "userid">;
}

export async function useridRoute(
  request: FastifyRequest<UserIDRequestRoute>,
  reply: FastifyReply,
) {
  const { userid } = request.params;

  const reqUrl = `${SB_BASE_URL}/userid/${userid}`;
  const { submissionTable } = await parseTableData(await loadUrl(reqUrl));

  const submissions = submissionTable.map((col) => ({
    date: col[0],
    video: {
      id: col[1],
      yt_link: `https://youtu.be/${col[1]}`,
      sb_link: `${SB_BASE_URL}/video/${col[1]}`
    },
    length: [col[2], col[3]],
    length_total: col[4],
    votes: parseInt(col[5]),
    views: parseInt(col[6]),
    category: col[7],
    shadowhidden: col[8],
    uuid: col[9],
    action: col[10],
    hidden: col[11],
  }));

  return reply.code(200).send({
    reqUrl,
    submissions,
  });
}

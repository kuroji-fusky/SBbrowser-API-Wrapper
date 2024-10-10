import type { FastifyReply, FastifyRequest } from "fastify"
import type { QueryParams } from "../../types";
import { SB_BASE_URL } from "../../constants";
import { loadUrl, parseTableData } from "../scraper";

interface VideoRequestRoute {
  Params: {
    id: string
  },
  Querystring: Omit<QueryParams, "videoid">
}

export async function videoRoute(request: FastifyRequest<VideoRequestRoute>, reply: FastifyReply) {
  const { id } = request.params

  if (id === "") {
    return reply.code(400).send({
      message: "No video param input"
    })
  }

  const reqUrl = `${SB_BASE_URL}/video/${id}`

  const { submissionTable } = await parseTableData(await loadUrl(reqUrl))

  const submissions = submissionTable.map((col) => ({
    date: col[0],
    start: col[1],
    end: col[2],
    length: col[3],
    votes: parseInt(col[4]),
    views: parseInt(col[5]),
    category: col[6],
    shadowhidden: col[7],
    uuid: col[8],
    username: col[9],
    action: col[10],
    hidden: col[11],
    userid: col[12],
  }))

  return reply.code(200).send({
    reqUrl,
    id,
    submissions
  })
}

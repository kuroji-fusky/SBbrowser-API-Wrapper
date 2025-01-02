import type { FastifyReply, FastifyRequest } from "fastify";
import type { QueryParams } from "../../types";
import { SB_BASE_URL } from "../../constants";
import { loadUrl, parseTableData } from "../scraper";

interface VideoRequestRoute {
  Params: {
    id: string;
  };
  Querystring: Omit<QueryParams, "videoid">;
}

export async function videoRoute(
  request: FastifyRequest<VideoRequestRoute>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  if (id === "") {
    return reply.code(400).send({
      message: "No video param input",
    });
  }

  const reqUrl = `${SB_BASE_URL}/video/${id}`;
  const ytUrl = `https://youtu.be/${id}`;
  const { submissionTable } = await parseTableData(await loadUrl(reqUrl));


  const submissions = submissionTable.map((col) => {
    const [date, lengthStart, lengthEnd, lengthTotal, votes, views, category, shadowhidden, uuid, username, action, hidden] = col;

    return {
      date: date.text,
      length: [lengthStart.text, lengthEnd.text],
      length_total: lengthTotal.text,
      votes: parseInt(votes.text),
      isLocked: votes?.title?.some((x) => x.includes("This segment is locked by a VIP")),
      views: parseInt(views.text),
      category: {
        title: category.text,
        ext: category.title[0]
      },
      action: action.title[0],
      userid: uuid.text,
      username: username.text === "—" ? null : username.text,
      isUserVIP: votes?.title?.some((x) => x === "This user is a VIP"),
      isShadowHidden: !(shadowhidden.text === "—"),
      hidden: !(hidden.text === "—"),
    }
  })

  return reply.code(200).send({
    reqUrl,
    youtubeUrl: ytUrl,
    submissions,
  });
}

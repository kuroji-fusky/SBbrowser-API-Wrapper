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

  const submissions = submissionTable.map((col) => {
    const [date, id, lengthStart, lengthEnd, lengthTotal, votes, views, category, shadowhidden, uuid, action, hidden] = col;

    return {
      date: date.text,
      video: {
        id: id.text,
        yt_link: `https://youtu.be/${id.text}`,
        sb_link: `${SB_BASE_URL}/video/${id.text}`
      },
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
      isUserVIP: votes?.title?.some((x) => x === "This user is a VIP"),
      isShadowHidden: !(shadowhidden.text === "—"),
      hidden: !(hidden.text === "—"),
    }
  })

  return reply.code(200).send({
    reqUrl,
    submissions,
  });
}

import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

export const loadUrl = async (url: string | URL) => {
  const req = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  return cheerio.load(await req.text(), {
    xml: {
      decodeEntities: false,
    },
  });
};

export const parseTableData = async (cheerioDoc: cheerio.CheerioAPI) => {
  const $ = cheerioDoc;

  const findAll = <E extends cheerio.Cheerio<AnyNode>>(
    el: E,
    selector: string,
  ) => {
    const childrenElements = el.children(selector).map((_, el) => $(el).html()).toArray()

    return childrenElements;
  };

  const _tableEl = $(".row table tbody");
  const _listGroupEl = $(".list-group");

  // Submission table data
  const submissionTable = findAll(_tableEl, "tr").map((tr) => {
    const clean = tr.split("\n").map((x) => x.trim()).filter(Boolean)

    return clean.map((x) => {
      const textContent = $(x).text();

      return {
        title: $(x).children("span[title]").map((_, el) => $(el).attr("title")).toArray(),
        // Split its contents from this particular emoji
        text: textContent.split("✂")[0]
      }
    })
  });

  // List group data
  const listGroupData = findAll(_listGroupEl, ".list-group-item").map((c) => {
    return c;
  });

  return { submissionTable, listGroupData };
};

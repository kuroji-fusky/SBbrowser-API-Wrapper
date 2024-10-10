import * as cheerio from "cheerio"

const selectors = {
  infoTable: "table",
  segmentTable: "table",
  updatedTime: "div > div",
} as const

export const loadUrl = async (url: string | URL) => await cheerio.fromURL(url)
export const parseTableData = async (cdoc: cheerio.CheerioAPI, callback?: Function) => {
}
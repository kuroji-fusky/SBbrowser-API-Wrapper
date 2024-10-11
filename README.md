# SBbrowser API Wrapper

A wrapper for Lanrza's [SBbrowser][sbb] frontend as a digestable API built on Fastify and [Cheerio][cheerio].

This is built in conjunction with [SponsorExplorer][se] for ease of access through a REST API without
the concerns of rewriting it in a form of a web scraper.

## Setup and Installation

Requires Node and Yarn package manager, install it with Yarn with

```console
yarn
```

Then run the server locally

```console
yarn dev
```

### Environment variables

- `ORIGIN_PRODUCTION_URL`: If you self-host [SponsorExplorer][se], point to its domain name you provided to be resolved by CORS
- `SERVER_PROTOCOL` (default: `http:`)
- `SERVER_HOST` (default: `localhost`)
- `SERVER_PORT` (default: `4000`)

## License

Apache-2.0

[se]: https://github.com/kuroji-fusky/SponsorExplorer
[sbb]: https://sb.ltn.fi
[cheerio]: https://github.com/cheeriojs/cheerio

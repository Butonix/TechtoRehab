const { createReadStream, createWriteStream } = require("fs");
const { resolve } = require("path");
const { createGzip } = require("zlib");
const {
  SitemapAndIndexStream,
  SitemapStream,
  lineSeparatedURLsToSitemapOptions,
} = require("sitemap");
export default async (req, res) => {
  const { posts } = req.body;

  const sms = new SitemapAndIndexStream({
    limit: 50000,
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({
        hostname: "https://techtorehab.com",
      });
      const path = `./sitemap.xml`;

      sitemapStream.pipe(createWriteStream(resolve(`./public/sitemap.xml`))); // write it to sitemap-NUMBER.xml

      return [
        new URL(path, "https://techtorehab.com/").toString(),
        sitemapStream,
      ];
    },
  });

  sms.pipe(createWriteStream(resolve("./public/sitemap-main.xml")));

  posts.forEach((item) =>
    sms.write({
      url: `https://techtorehab.com/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`,
      changefreq: "weekly",
    })
  );
  sms.end();
  res.send(
    JSON.stringify({
      result: "ok",
    })
  );
};

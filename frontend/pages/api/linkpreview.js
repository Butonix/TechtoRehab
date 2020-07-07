const linkPreviewGenerator = require("link-preview-generator");

export default async (req, res) => {
  const { url } = req.query;
  const previewData = await linkPreviewGenerator(url);

  res.end(
    JSON.stringify({
      success: 1,
      meta: {
        title: previewData.title,
        description: previewData.description,
        image: {
          url: previewData.img,
        },
      },
    })
  );
};

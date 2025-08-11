import Url from "../models/urlModel.js";

// Create a short URL
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();
    res.json({ shortUrl: `http://localhost:5000/api/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Redirect and track clicks
export const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // increment clicks
    urlDoc.clicks = (urlDoc.clicks || 0) + 1;
    await urlDoc.save();

    // redirect
    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin - get all URLs with clicks
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

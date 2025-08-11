import express from "express";
import { createShortUrl, getOriginalUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);

// ✅ Redirect short code → original URL
router.get("/:shortCode", getOriginalUrl);

export default router;

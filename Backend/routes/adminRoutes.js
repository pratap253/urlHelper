import express from "express";
import { getAllUrls } from "../controllers/urlController.js";

const router = express.Router();

function adminAuth(req, res, next) {
  const adminPass = process.env.ADMIN_PASSWORD || "changeme";
  const provided = req.header("x-admin-password") || req.query.admin_password;
  if (!provided || provided !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.get("/list", adminAuth, getAllUrls);

export default router;

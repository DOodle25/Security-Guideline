const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

// WARNING: The routes in this file are intentionally vulnerable for local/demo use only.
// Do NOT expose them on production or public networks.

/**
 * Vulnerable GET endpoint
 * - GET /demo/vuln/find?q=<json-or-string>
 *   If q is valid JSON it's parsed and used directly as the Mongo query object.
 *   If q is a plain string it's used to search the `email` field.
 */
router.get("/vuln/find", async (req, res) => {
  try {
    const raw = req.query.q || "";
    let query = {};

    try {
      query = JSON.parse(raw);
    } catch (err) {
      if (raw) query = { email: raw };
    }

    const user = await User.findOne(query).lean();
    if (!user) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

/**
 * Vulnerable POST endpoint
 * - POST /demo/vuln/find
 *   The entire JSON body is trusted and used directly as a Mongo query object.
 */
router.post("/vuln/find", async (req, res) => {
  try {
    const query = req.body || {};
    const user = await User.findOne(query).lean();
    if (!user) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

/**
 * Safe alternative for demonstration
 * - GET /demo/safe/find-by-email?email=...
 *   Only accepts a single email param and performs basic validation.
 */
router.get("/safe/find-by-email", async (req, res) => {
  try {
    const email = (req.query.email || "").toString().trim().toLowerCase();
    if (!email)
      return res.status(400).json({ ok: false, message: "email required" });

    if (!/^[a-z0-9@._-]+$/.test(email)) {
      return res
        .status(400)
        .json({ ok: false, message: "invalid email format" });
    }

    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

module.exports = router;

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Response is sending get");
});

export default router;

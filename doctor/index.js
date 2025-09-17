import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ doctors: ["Dr. Smith", "Dr. Johnson"] });
});

export default router;

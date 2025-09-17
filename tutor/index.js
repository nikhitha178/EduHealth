import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ tutors: ["Tutor Alice", "Tutor Bob"] });
});

export default router;

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- FRONTEND ROUTES ---------- //
// Serve user-facing React app
app.use("/", express.static(path.join(__dirname, "eduhealth-main/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "eduhealth-main/build/index.html"));
});

// Serve admin React app
app.use("/admin", express.static(path.join(__dirname, "my-admin-interface/build")));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-admin-interface/build/index.html"));
});

// ---------- BACKEND ROUTES ---------- //
// Mount doctor service
import doctorApp from "./doctor/index.js"; // adjust if entry file is different
app.use("/api/doctor", doctorApp);

// Mount tutor service
import tutorApp from "./tutor/index.js"; // adjust if entry file is different
app.use("/api/tutor", tutorApp);

// ---------- START SERVER ---------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EduHealth running on http://localhost:${PORT}`);
});

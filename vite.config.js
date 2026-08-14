import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" เพราะเว็บเป็นหลายหน้าแบบ client-side routing (react-router) ที่ deploy ที่รากโดเมน
// การ deploy บน Vercel ใช้ rewrites ใน vercel.json ส่งทุก path กลับมาที่ index.html
export default defineConfig({
  plugins: [react()],
  base: "/",
});

import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css"; // ✅ Ensure Tailwind is imported
import App from "./components/App"; // ✅ Ensure correct path
import React from "react";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

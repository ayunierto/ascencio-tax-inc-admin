import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AscencioTaxApp } from "./AscencioTaxApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AscencioTaxApp />
  </StrictMode>
);

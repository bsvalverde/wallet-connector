import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootContainer } from "./components/RootContainer.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootContainer />
  </StrictMode>,
);

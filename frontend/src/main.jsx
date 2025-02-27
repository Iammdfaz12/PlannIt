import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </UserProvider>
  </StrictMode>
);

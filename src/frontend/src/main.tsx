import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./hooks/useLanguage";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
  interface Window {
    __caffeine_env?: {
      backend_canister_id?: string;
      backend_host?: string;
      project_id?: string;
      ii_derivation_origin?: string;
    };
  }
}

const queryClient = new QueryClient();

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>,
  );
}

// Fetch /env.json at runtime. The Caffeine platform populates this file
// with the real backend_canister_id before serving the app.
// We load it eagerly so useBackend.ts can read it from window.__caffeine_env.
fetch("/env.json")
  .then((res) => (res.ok ? res.json() : Promise.resolve({})))
  .then((env: Record<string, string>) => {
    if (env && typeof env === "object") {
      window.__caffeine_env = {
        backend_canister_id: env.backend_canister_id || "",
        backend_host: env.backend_host || "",
        project_id: env.project_id || "",
        ii_derivation_origin: env.ii_derivation_origin || "",
      };
      if (env.backend_canister_id) {
        console.info(
          "[UdyamSathi] Runtime canister ID loaded:",
          env.backend_canister_id,
        );
      }
    }
  })
  .catch(() => {
    // env.json not available (local dev without platform); continue without it
    console.warn(
      "[UdyamSathi] Could not load /env.json — using build-time env vars.",
    );
  })
  .finally(() => {
    renderApp();
  });

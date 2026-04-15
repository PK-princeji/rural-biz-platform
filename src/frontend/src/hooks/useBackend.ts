import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useMemo } from "react";
import { createActor } from "../backend";
import { ExternalBlob } from "../backend";
import { mockBackend } from "../mocks/backend";

const _env = (import.meta as unknown as { env: Record<string, string> }).env;

// In production the platform populates /env.json at runtime.
// We read it synchronously via a script tag injected by the platform,
// or fall back to a fetch-at-startup approach. Here we read the
// window.__caffeine_env object (populated by the platform's runtime injection)
// or env.json values that were fetched at app startup.
// Priority: window.__caffeine_env → Vite build-time env → empty string

type CaffeineEnv = {
  backend_canister_id?: string;
  backend_host?: string;
};

function getRuntimeEnv(): CaffeineEnv {
  // The platform injects runtime config into window.__caffeine_env
  // or exposes it via window.__env. Check both.
  const w = window as unknown as Record<string, unknown>;
  if (w.__caffeine_env && typeof w.__caffeine_env === "object") {
    return w.__caffeine_env as CaffeineEnv;
  }
  if (w.__env && typeof w.__env === "object") {
    return w.__env as CaffeineEnv;
  }
  return {};
}

function resolveCanisterId(): string {
  // 1. Runtime env from platform (populated after app load via env.json)
  const runtimeEnv = getRuntimeEnv();
  if (runtimeEnv.backend_canister_id) {
    return runtimeEnv.backend_canister_id;
  }

  // 2. Vite build-time env vars (set by vite-plugin-environment)
  const buildTimeId =
    _env.CANISTER_ID_BACKEND || _env.VITE_CANISTER_ID_BACKEND || "";
  if (buildTimeId) {
    return buildTimeId;
  }

  return "";
}

// Only use mock when explicitly requested AND no real canister ID is available
const BUILD_TIME_ID =
  _env.CANISTER_ID_BACKEND || _env.VITE_CANISTER_ID_BACKEND || "";
const EXPLICIT_MOCK = _env.VITE_USE_MOCK === "true";
// In production, NEVER use mock if a canister ID is available
const USE_MOCK = EXPLICIT_MOCK && !BUILD_TIME_ID;

async function noopUpload(_file: ExternalBlob): Promise<Uint8Array> {
  return new Uint8Array();
}

async function noopDownload(_bytes: Uint8Array): Promise<ExternalBlob> {
  return ExternalBlob.fromURL("");
}

export function useBackend() {
  const { identity } = useInternetIdentity();

  const backend = useMemo(() => {
    // Resolve canister ID at render time (picks up runtime env.json values
    // that the platform may have injected after page load)
    const canisterId = resolveCanisterId();

    if (USE_MOCK && !canisterId) {
      return mockBackend;
    }

    if (!canisterId) {
      console.error(
        "[useBackend] Canister ID is required but could not be resolved. " +
          "Checked: window.__caffeine_env.backend_canister_id, " +
          "window.__env.backend_canister_id, " +
          "CANISTER_ID_BACKEND (build-time), " +
          "VITE_CANISTER_ID_BACKEND (build-time). " +
          "The platform should populate /env.json at runtime with the real canister ID. " +
          "Backend calls will fail until this is resolved.",
      );
      // Fall back to mock so the UI doesn't break completely
      return mockBackend;
    }

    const agent = HttpAgent.createSync({
      host: window.location.origin,
      ...(identity ? { identity } : {}),
    });

    return createActor(canisterId, noopUpload, noopDownload, { agent });
  }, [identity]);

  return backend;
}

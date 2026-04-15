import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useMemo } from "react";
import { createActor } from "../backend";
import { ExternalBlob } from "../backend";
import { mockBackend } from "../mocks/backend";

const _env = (import.meta as unknown as { env: Record<string, string> }).env;

const USE_MOCK = _env.VITE_USE_MOCK === "true";

// vite.config.js exposes CANISTER_* prefix vars via vite-plugin-environment
// so the correct key is CANISTER_ID_BACKEND (no VITE_ prefix).
// Fall back to VITE_CANISTER_ID_BACKEND for local dev overrides.
const CANISTER_ID =
  _env.CANISTER_ID_BACKEND || _env.VITE_CANISTER_ID_BACKEND || "";

if (!CANISTER_ID && !USE_MOCK) {
  console.warn(
    "[useBackend] Canister ID is not set. " +
      "Ensure CANISTER_ID_BACKEND is available in the build environment. " +
      "Backend calls will fail until a valid canister ID is provided.",
  );
}

async function noopUpload(_file: ExternalBlob): Promise<Uint8Array> {
  return new Uint8Array();
}

async function noopDownload(_bytes: Uint8Array): Promise<ExternalBlob> {
  return ExternalBlob.fromURL("");
}

export function useBackend() {
  const { identity } = useInternetIdentity();

  const backend = useMemo(() => {
    if (USE_MOCK) {
      return mockBackend;
    }

    const agent = HttpAgent.createSync({
      host: window.location.origin,
      ...(identity ? { identity } : {}),
    });

    return createActor(CANISTER_ID, noopUpload, noopDownload, { agent });
  }, [identity]);

  return backend;
}

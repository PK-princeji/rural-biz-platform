import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useMemo } from "react";
import { createActor } from "../backend";
import { ExternalBlob } from "../backend";
import { mockBackend } from "../mocks/backend";

const USE_MOCK =
  (import.meta as unknown as { env: Record<string, string> }).env
    .VITE_USE_MOCK === "true";

const CANISTER_ID =
  (import.meta as unknown as { env: Record<string, string> }).env
    .VITE_CANISTER_ID_BACKEND ?? "";

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

import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  identity: Identity | undefined;
  principal: string | null;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, login, clear, isAuthenticated, isLoggingIn } =
    useInternetIdentity();

  const principal =
    isAuthenticated && identity ? identity.getPrincipal().toText() : null;

  return {
    isAuthenticated,
    isLoading: isLoggingIn,
    identity,
    principal,
    login,
    logout: clear,
  };
}

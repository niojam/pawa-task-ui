import { SimpleAuthApi, SimpleAuthResponse } from '@/auth/SimpleAuthApi';
import { reactive, readonly } from 'vue';
import { addSeconds, isAfter } from 'date-fns';
import jwtDecode from 'jwt-decode';
import axios, { AxiosError } from 'axios';

export const ACCESS_TOKEN_KEY = 'task_access_token';
const EXPIRES_AT_KEY = 'decision_engine_expires_at';

export interface User {
  username: string;
  name: string | null;
  email: string | null;
}

export interface Authentication {
  user: User | null;
  accessToken: string | null;
  expiresAt: Date | null;
  expired: boolean;
}

function extractUser(accessToken: string | null): User | null {
  if (accessToken === null) {
    return null;
  }
  const { sub: username } = <{ sub: string }>jwtDecode(accessToken);
  return {
    username,
    name: null,
    email: null,
  };
}

export function getAccessToken(): string | null {
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

const authentication: Authentication = reactive({
  user: null,
  accessToken: null,
  expiresAt: null,
  expired: false,
});

function sessionTick() {
  if (authentication.expiresAt !== null) {
    authentication.expired = isAfter(new Date(), authentication.expiresAt);
  }
}

let sessionTickTimer: number | null = null;

function init() {
  if (!window.sessionStorage) {
    throw new Error('Session storage is not available. Check your browser settings.');
  }
  restoreTokens();
  if (sessionTickTimer !== null) {
    window.clearInterval(sessionTickTimer);
  }
  sessionTick();
  if (sessionTickTimer !== null) {
    window.clearInterval(sessionTickTimer);
  }
  sessionTickTimer = window.setInterval(sessionTick, 10000);
}

function storeTokens(response: SimpleAuthResponse) {
  authentication.accessToken = response.access_token;
  authentication.expiresAt = addSeconds(new Date(), response.expires_in);
  authentication.user = extractUser(authentication.accessToken);
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, authentication.accessToken);
  window.sessionStorage.setItem(EXPIRES_AT_KEY, authentication.expiresAt.toISOString());
}

function clearTokens() {
  authentication.accessToken = null;
  authentication.expiresAt = null;
  authentication.user = null;
  authentication.expired = false;
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(EXPIRES_AT_KEY);
}

function restoreTokens() {
  authentication.accessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  authentication.expiresAt = new Date(<string>window.sessionStorage.getItem(EXPIRES_AT_KEY));
  authentication.user = extractUser(authentication.accessToken);
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

async function login(username: string, password: string) {
  try {
    const response: SimpleAuthResponse = (await SimpleAuthApi.token(username, password)).data;
    storeTokens(response);
    sessionTick();
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new InvalidCredentialsError('Invalid credentials');
    } else {
      console.error(error);
      throw new Error('Unexpected error');
    }
  }
}

function logout() {
  if (sessionTickTimer !== null) {
    window.clearInterval(sessionTickTimer);
  }
  clearTokens();
}

function isAuthenticated() {
  return authentication.accessToken !== null && !authentication.expired;
}

export const auth = {
  authentication: readonly(authentication),
  isAuthenticated,
  init,
  login,
  logout,
};
